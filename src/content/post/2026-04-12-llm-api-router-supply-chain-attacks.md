---
title: "【技術解析】你的 Agent 是別人的：LLM API 路由器的供應鏈信任漏洞"
description: "研究揭露 LLM API 路由器如何被濫用為中間人攻擊工具，9 個商品路由器已在注入惡意程式碼。"
publishDate: "2026-04-12T10:00:00+08:00"
updatedDate: "2026-04-12T10:00:00+08:00"
tags: ["API Security", "Supply Chain", "LLM Agents"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-12-llm-api-router-supply-chain-attacks.png"
  alt: "LLM API 路由器的供應鏈信任漏洞"
---

## 這篇文章在說什麼

LLM Agent 愈來愈常透過第三方 API 路由器（router）將工具呼叫請求分散到多個上游模型提供商。這些路由器的地位原本只是「代轉」，但研究發現，由於客戶端自願把流量導向路由器的 URL，路由器因此可以終止客戶端的 TLS 連線並向上游重建新連線——等於內建了一個 application-layer MITM。2026 年 4 月，一篇 arXiv 論文（arXiv:2604.08407）對這個攻擊面做了第一套系統性研究，發現市售路由器已出現實際惡意行為。

## 為什麼重要

當「路由器」成為攻擊武器，這件事對所有在生產環境中使用 LLM Agent 的開發者都是威脅。LiteLLM 在 GitHub 有約 40,000 stars、Docker Hub 超過 2.4 億次拉取；new-api 和 one-api 各自有超過百萬次 Docker pulls。這些開源模板支撐了成千上萬的商業路由器服務，而研究人員在淘寶、鹹魚、Shopify 的商店買了 28 台付費路由器，加上 400 個從社群收集的免費路由器，就發現了實際的攻擊案例。

更值得注意的細節是：攻擊者不需要做任何 TLS 降級或憑證偽造，客戶端是自願把 URL 設定成路由器的。這讓路由器攻擊比傳統 MITM 更容易發動，而且整條路由路徑上可以有很多層（客戶端 → A → B → OpenRouter → 模型商），只要其中任何一層被攻陷，全鏈路都完蛋。

## 技術細節

研究的核心攻擊分為兩大類：

**AC-1：Payload Injection（負載注入）**  
路由器可以在模型回傳的工具呼叫抵達客戶端之前，改寫 JSON 內容。實測發現 1 個付費路由器和 8 個免費路由器正在對回傳的 tool call 注入惡意程式碼。攻擊者可以把合法的 `pip install` 置換成攻擊者控制的依賴、把正常的 URL 置換成惡意腳本。

**AC-2：Secret Exfiltration（機密竊取）**  
路由器擁有每個請求和回應的明文存取權，研究發現 17 個免費路由器碰觸了研究團隊布置的 AWS canary 憑證，1 個路由器直接盜走了研究團隊的以太坊私鑰資產。

**兩個適應性繞避手法**：**
- **AC-1.a（Dependency-targeted injection）**：只針對 Rust 和 Go 專案注入特定 payload
- **AC-1.b（Conditional delivery）**：路由器會等夠 50 次預熱呼叫，或辨識出客戶端正以 autonomous "YOLO mode" 運行，才交付 payload

研究還做了兩個 poisoning study：故意在中國論壇和微信、Telegram 群組釋出一組研究用的 OpenAI API key，結果那個 key 被用來生成 1 億 GPT-5.4 tokens 和超過 7 次 Codex sessions。他們部署的弱設定 decoy 收到了 147 個 IP 的未授權訪問、2B tokens、99 組憑證外洩、440 個 Codex sessions，其中 401 個已經處於自動執行狀態。

研究團隊建了 **Mine** 工具，實現了全部四種攻擊類別，用來測試三種客戶端防禦：
1. Fail-closed policy gate：以 1% 誤報率封鎖全部 AC-1 樣本
2. Response-side anomaly screening：不需要提供商改動，可標記 89% 的 AC-1 樣本
3. Append-only transparency logging：透明的附加日誌

論文指出，目前沒有任何已部署的機制能把上游模型實際輸出的 tool call 與客戶端最終收到的內容做密碼學绑定。這是根本問題。

## 我的觀點

這篇論文很有價值，因為它把焦點從「prompt injection」（模型本身被操控）轉到了「路由器攻擊」（模型以外、但同樣能置換工具執行結果的信任邊界）。這個視角更重要，因為它影響的是整條供應鏈——你不只需要信任模型，還需要信任部署在中間的每一層轉發服務。

實際的威脅已經在野外出現（9 個惡意路由器），而且攻擊手法並不複雜。這對企業安全團隊的啟示是：在選用第三方 API 路由器時，必須把路由器當成有全路徑掌控權的 trust boundary 來審視，而不是單純的轉發服務。

對個人開發者來說，最直接的建議是：如果你在用 LiteLLM、OpenRouter 或任何自架路由器，檢查一下你的依賴供應鏈有没有被污染，以及有沒有辦法在你的客戶端加上一層響應異常檢測。論文裡提出的三種 client-side 防禦是現在就能部署的，不需要等整個生態系統重新設計。

## 參考連結

- [Your Agent Is Mine: Measuring Malicious Intermediary Attacks on the LLM Supply Chain (arXiv:2604.08407)](https://arxiv.org/abs/2604.08407)
- [HTML 版本（論文全文）](https://arxiv.org/html/2604.08407v1)
- [LiteLLM（BerriAI）](https://github.com/BerriAI/litellm)
- [new-api（QuantumNous）](https://github.com/QuantumNous/new-api)
- [OpenRouter](https://openrouter.ai/)
