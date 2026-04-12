---
title: "AI 新聞精選｜2026 年 4 月 1 日"
description: "OpenAI 完成史上最大規模集資 1220 億美元，同日 Claude Code 原始碼因 npm 失誤全網暴露"
publishDate: "2026-04-01T20:00:00+08:00"
updatedDate: "2026-04-01T12:00:00+08:00"
tags: ["OpenAI", "Anthropic", "Google", "Ollama"]
draft: false
---

## OpenAI 完成史上最大規模集資，估值 8520 億劍指超級應用

今天 AI 產業最受矚目的新聞，毫無疑問是 OpenAI 宣布完成了 **1220 億美元**的集資，投後估值達到 **8520 億美元**——這個數字讓它成為科技史上最大的私人集資案，超越了孫正義軟銀願景基金所有曾經寫下的紀錄。

這輪融資由 Amazon、NVIDIA 和 SoftBank 擔任錨點投資者，Microsoft 繼續參與，a16z、D. E. Shaw Ventures、MGX、TPG 等聯合領投。支撐這個數字的底氣，來自 OpenAI 已經真實運轉的商業機器：每月 20 億美元收入，ChatGPT 超過 9 億周活躍用戶，以及付費訂閱人數突破 5000 萬。

但比數字更有意思的，是 OpenAI 對這筆錢的用途描述：打造一個「Agent 優先」的**超級單體應用**，將 ChatGPT、Codex 以及瀏覽能力整合為一。這代表 Sam Altman 的團隊正在做一個根本性的策略押注——不是做一個模型 API 提供商，而是成為 AI 時代的作業系統。

這個方向的隱含意義是：OpenAI 正在與它的投資者和合作夥伴（Microsoft、AWS、Oracle）形成一種越來越複雜的競合關係。它一方面依賴這些雲端夥伴的算力基礎建設，另一方面又在打造自己的終端應用生态，試圖繞過分發層直接觸及用戶。這種「我的基礎建設，你們的雲；我的應用，你們的用戶」的張力，會是未來幾年觀察 OpenAI 最重要的主線。

---

## Claude Code 原始碼全網暴露：Anthropic 的工程失誤暴露了什麼

就在同一天，Anthropic 遭遇了一個尷尬的工程失誤：Claude Code 的 TypeScript 原始碼，因為 npm 發布時附帶的 source map 文件，被社群完整還原並公開在 GitHub 上。

事情經過並不複雜：Anthropic 在 npm 上發布 Claude Code 時，打包後的程式碼同捆了一個 `.map` 檔。這個 source map 的功能本來是幫助開發者除錯——它能將壓縮後的編譯產物反向映射回原始碼。安全研究者 Chaofan Shou 提取了這個檔案中的 `sourcesContent` 欄位，直接還原出 1900 個檔案、超過 51.2 萬行程式碼。

社群後續在這些程式碼中挖出了大量資訊：Claude Code 的安全機制設計、未發布模型的功能代號、內部的系統提示詞架構。更諷刺的是：這次 source map 之所以被上傳，與同一天稍早發生的 axios 供應鏈攻擊幾乎脫不了關係——攻擊者劫持了 axios 維護者的帳號發布了帶毒版本，而 Claude Code 的 CI/CD 流程可能因此受到波及。

這件事對開發者的實際影響有限——Claude Code 的功能沒有因此受損，Anthropic 也很快下架了有問題的版本。但它暴露了一個更深層的事實：當 AI 公司的營運越來越依賴複雜的開源工具鏈和 npm 生態，每一個環節都成為潛在的攻擊面。Claude Code 的原始碼會因此被競爭對手研究？也許。但更值得擔心的是：有多少 AI 公司正在用同樣脆弱的方式維護它們的 CLI 工具？

---

## Ollama 接入 Apple MLX：Mac 端推理效能大升級，OpenClaw 也受益

今天另外一個值得關注的開發者新聞：Ollama 在 Apple Silicon 平台上正式接入 Apple 的 MLX 框架，取代以往間接依賴 llama.cpp 的方式，實現更高效的底層記憶體管理與執行效率。

這次更新的亮點是：官方明確點名 OpenClaw 作為受益應用之一。對於在 Mac 上運行個人 AI 助手的用戶來說，這代表更低的記憶體佔用與更快的回應速度。MLX 原本是 Apple 為自家晶片設計的高效能機器學習運算框架，這次 Ollama 的接入等於讓 Mac 用戶在本地執行大模型時，能直接享有硬體層級的優化，而不必依賴跨平台的通用方案。

---

## Google Veo 3.1 Lite：視頻生成進入成本競爭時代

稍微被今天的大新聞淹沒，但同樣值得關注的是：Google 發布了 Veo 3.1 Lite 視頻生成模型，並宣布將於 4 月 7 日下調 Fast 版價格。這款模型通過 Gemini API 和 AI Studio 提供，主打「成本不到前代一半」——在 Sora、Runway、Kling 百家競爭的視頻生成市場，Google 選擇直接以價格戰切入。

---

## 小結

今天的 AI 產業處於一種有趣的分裂狀態：一邊是 OpenAI 用 1220 億美元告訴全世界「規模才是護城河」，另一邊是 Anthropic 用一次 source map 失誤提醒大家「再強大的模型也需要過硬的工程」。這兩件事發生在同一天，並不是巧合——當 AI 公司的市値和用戶數量進入指數成長，它們的工程複雜度、風險暴露面也在同步擴張。基礎設施的規模，與工程紀律的要求，兩者之間的裂縫正在拡大。

---

## 參考連結

- [OpenAI: Accelerating the Next Phase of AI](https://openai.com/index/accelerating-the-next-phase-ai/)
- [VentureBeat: Claude Code's source code appears to have leaked](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know)
- [Google: Veo 3.1 Lite](https://blog.google/innovation-and-ai/technology/ai/veo-3-1-lite/)
- [Ollama: MLX framework on Apple Silicon](https://x.com/ollama/status/2038873482524811694)
