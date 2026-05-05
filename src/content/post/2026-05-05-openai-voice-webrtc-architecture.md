---
title: "【技術解析】OpenAI 為什麼要把 WebRTC 拆成 relay 與 transceiver"
description: "當語音 agent 追求自然對話時，真正先撞牆的往往不是模型，而是封包怎麼進網路。"
publishDate: "2026-05-05T10:00:00+08:00"
updatedDate: "2026-05-05T10:08:00+08:00"
tags: ["OpenAI", "WebRTC", "Pion", "Kubernetes", "Realtime API"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-05-openai-voice-webrtc-architecture.png"
  alt: "【技術解析】OpenAI 為什麼要把 WebRTC 拆成 relay 與 transceiver"
---

## 真正讓語音 agent 露餡的，常常不是模型，而是那半拍延遲

OpenAI 這篇〈How OpenAI delivers low-latency voice AI at scale〉有意思的地方，在於它把問題點得很準：ChatGPT voice 或 Realtime API 一旦進到真實流量，使用者最先感受到的失敗，往往不是模型答錯，而是停頓、搶話失敗，或你明明打斷它，它卻晚一點才收住。對語音系統來說，這種尷尬不是小瑕疵，整個對話感就是在這裡壞掉的。

原因也很直接。語音不是把音檔傳上去再等答案，而是連續串流；模型得一邊收音、一邊轉寫、一邊推理，必要時還要同步吐回語音。只要第一跳慢、media round-trip time 不穩、jitter 和 packet loss 偏高，整體體驗就會立刻變鈍。OpenAI 給的約束很硬：要支撐超過 9 億週活躍使用者，還要讓連線建立夠快、封包往返夠穩。這已經是基礎設施問題，不是多調幾版 prompt 能補的。

## WebRTC 沒有錯，錯的是把它原封不動搬進雲端原生環境

MDN 對 WebRTC 的描述很標準：ICE 負責連線建立，DTLS 和 SRTP 處理加密傳輸，瀏覽器本身也幫你做好 jitter buffer 與 codec negotiation。這也是 OpenAI 選它的原因，因為 client 端可以維持標準行為，不必為了語音 agent 另外發明一套傳輸協定。

麻煩出在部署形狀。傳統 one-port-per-session 的做法，等於每個 session 都要佔一個公開 UDP port。規模小時還行，丟進 Kubernetes 就會變得很笨重：公開 port range 膨脹、load balancer 和 firewall 規則難管，pod 擴縮時還得想辦法維持穩定配置。另一條路是直接做成 SFU，但 OpenAI 面對的大多是 1 對 1 語音流量；如果每個後端服務都要自己扮演完整 WebRTC peer，ICE state、DTLS handshake 與 session lifecycle 的複雜度就會被複製到整個推理系統裡。

## 它不是重新發明 WebRTC，而是把責任邊界切乾淨

OpenAI 的做法是把 packet routing 和 protocol termination 拆開：外面放一層很薄的 relay，裡面保留真正持有 session state 的 transceiver。relay 不解密媒體、不跑 ICE state machine，只讀少量封包資訊，把第一個封包導去正確的 transceiver；真正的 DTLS、SRTP 與 session lifecycle 都留在後者手上。

這樣做的好處很實際。公開 UDP 面積可以縮到少數固定 port，不必暴露大量 session port；stateful 協定集中在 transceiver，推理、轉寫、語音生成等內部服務就能像普通服務那樣擴縮；而第一個 STUN binding request 進來時，relay 還能利用 ICE username fragment，也就是 ufrag，直接做 first-packet routing，避免熱路徑查表。OpenAI 還提到，他們沒有急著走 kernel bypass，而是先靠 Go relay、SO_REUSEPORT、thread pinning 與低配置解析把吞吐撐起來。這個判斷很成熟：先把架構切對，再談極致優化。

## 這篇文章真正提醒大家的，是語音產品的瓶頸排序變了

Pion 的 Go WebRTC 實作讓這條路更容易落地，因為 full ICE agent、TURN、RTP/RTCP 和 direct RTP access 本來就有，OpenAI 才能先用單一 transceiver 服務撐住 ChatGPT voice，再把 relay 往外抽。說到底，這不是新協定，而是把成熟協定放進更適合雲端原生的責任分工裡。

我認為它最值得在意的地方，是它把語音 agent 的核心難題重新排序了。很多團隊還在把焦點放在 ASR 準確率或 TTS 擬真度，但當產品真的要支撐全球、即時插話與長時間互動時，先決勝的常常是 first-hop latency、session ownership 與故障恢復。當然，OpenAI 的流量形狀、Cloudflare 導流和 backbone 條件不是一般團隊照抄就有；這是它容易被高估的地方。但它被低估的地方更重要：當語音 AI 不再只是 demo，你得先想清楚哪一層該持有 state，哪一層只該轉送，否則模型再好，對話還是會卡在那半拍。
## 參考連結

- https://openai.com/index/delivering-low-latency-voice-ai-at-scale/
- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
- https://github.com/pion/webrtc
- https://webrtcforthecurious.com/
