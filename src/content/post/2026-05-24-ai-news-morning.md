---
title: "AI 晨間精選｜2026 年 5 月 24 日"
description: "OpenAI 搶進投影片入口，Anthropic 補上企業內網通道，NVIDIA 則拿出更快的開放解碼路線。"
publishDate: "2026-05-24T08:00:00+08:00"
updatedDate: "2026-05-24T18:34:00+08:00"
tags: ["OpenAI", "PowerPoint", "Anthropic", "MCP", "NVIDIA", "Nemotron"]
coverImage:
  src: "@/assets/post-covers/2026-05-24-ai-news-morning.png"
  alt: "AI 晨間精選｜2026-05-24"
series: "daily-ai-report"
seriesOrder: 8
draft: false
---

## 今日觀察

5 月 24 日這批消息放在一起看，最有意思的不是哪家模型又多會聊天一點，而是三家大廠都在補 agent 真正落地前最麻煩的那一段。OpenAI 把 ChatGPT 直接塞進 PowerPoint，想拿下知識工作者每天都會碰到的成果物；Anthropic 則把焦點放在企業內網邊界，讓私有 MCP 伺服器能接進 Claude 而不用把服務暴露到公網；NVIDIA 的 Nemotron-Labs Diffusion 則把競爭點從模型分數拉回吞吐量，直接回答「同樣一張卡，到底能不能更快吐字」。

這三條線其實指向同一個判斷：2026 年的 agent 戰場，已經不只是模型本身夠不夠聰明，而是誰能更自然地接到工作物件、企業資料和推論基礎設施。今天最大的變化，就是產品入口、企業安全邊界和底層解碼效率，開始被當成同一套能力來競爭。

## OpenAI 把 ChatGPT 推進投影片本體 — 不只是幫你寫稿，而是直接改 deck

OpenAI 這次上線的 `ChatGPT for PowerPoint`，關鍵不在於「AI 會幫你做簡報」這件老故事，而在於它終於直接進入 PowerPoint 側邊欄。官方 help center 把範圍寫得很清楚：它可以從筆記、文件、試算表或既有 deck 生成初稿，也能改寫既有投影片、補段落、調整敘事順序，還會盡量保留可編輯的 slide 結構。ChatGPT 官方使用頁面則更直接，把典型任務寫成「把 KPI 和 notes 變成 10 頁董事會簡報」或「把截圖轉成可編輯投影片」這種工作流。這代表 OpenAI 想吃掉的不是文案草稿，而是投影片這個最後要拿去開會、交付、被修改的成果物本身。

它一開始就把限制講得很明白。官方同時提醒這仍是 beta，複雜版型、字體和進階編輯能力還不完整，而且如果指令不夠清楚，ChatGPT 可能會改掉甚至刪掉內容。The Decoder 的整理也補了一刀：OpenAI 明顯把這個產品對準季度報告、客戶簡報和策略 deck 這種高頻商務場景。這和前陣子的 Excel、Google Sheets 整合放在一起看，很像 OpenAI 正在把 agent 從聊天視窗往 Office 裡最常見的工作物件推。和單純生成一段文字相比，直接改 deck 的門檻高得多，因為它碰的是版本、結構、格式與責任邊界。我自己的判斷是，如果這條線做得穩，未來企業採購看的就不只是模型品質，而是「AI 能不能在不毀掉原檔的前提下，真的接手一小段工作」。

## Anthropic 補上企業內網通道 — MCP 開始從公開工具走向私有系統

Anthropic 這週替 Claude Managed Agents 補上的兩個能力，真正重要的是它們把「agent 可以做事」往企業可接受的範圍又推進了一步。Claude 官方部落格和平台 release notes 都把時間點標得很清楚：5 月 19 日起，self-hosted sandboxes 進入 public beta，MCP tunnels 進入 research preview。官方文件寫得很直白，MCP tunnels 的目的就是讓 Claude 能連到跑在私有網路裡的 MCP 伺服器，而且不需要開 inbound port，也不用把服務暴露到公網；流量走的是 outbound-only 連線。對很多企業來說，這比模型多會幾個工具還更實際，因為真正拖慢上線的通常不是 prompt，而是資安、稽核和網路審查。

這次更新有意思的地方，在於 Anthropic 把「編排」和「執行」拆得更乾淨。self-hosted sandboxes 把工具執行留在客戶自己的環境，MCP tunnels 則負責讓 Anthropic 管理的 agent 安全碰到內部系統。官方文件甚至明講，兩者是獨立能力，可以分開用，也可以一起用；如果兩個都開，代表工具執行與私有資料存取都留在企業邊界內。InfoQ 的報導點出了這件事的產業意義：企業現在缺的不是更會推理的 demo，而是能在合規環境裡落地的 agent 架構。我的看法是，MCP 從「本機工具標準」走到「企業內網接入層」，代表 Anthropic 想守的不只是 Claude 的模型位置，而是未來 agent 能不能碰到公司真正的資料、API 與工單系統。這條線如果被做成既有安全團隊能接受的樣子，MCP 才真的會從開發者熱詞變成企業基礎設施。

## NVIDIA 押注更快的開放解碼路線 — 不是只拼 benchmark，而是拼每次 forward 吐多少 token

NVIDIA 這次釋出的 Nemotron-Labs Diffusion，很值得工程師多看兩眼，因為它不是又一個單純追分的開源模型。研究頁面把主張講得很完整：這個家族把 autoregressive、diffusion 和 self-speculation 三種解碼模式放進同一個架構，規模有 3B、8B、14B，還有 8B 的 VLM 版本。最關鍵的數字有兩個。第一，研究團隊說 8B 版本相較 Qwen3-8B，在更好的準確度下，每次 forward 能解出 5.9 倍 token；第二，在 GB200 上搭配 SGLang 跑 SPEED-Bench 時，吞吐量可以到 4 倍。這不只是模型研究的漂亮句子，而是直接在回答推論成本和併發壓力。

Hugging Face 的官方技術文把這個方向解釋得更清楚：NVIDIA 不想把 autoregressive 和 diffusion 當成兩條分開的產品線，而是想讓同一個模型依場景切換模式。這背後的判斷很合理，因為真實服務環境裡的瓶頸常常不是單一請求品質，而是不同併發水位下，系統到底該選哪種解碼策略才划算。研究頁面還提到一個更激進的分析，在最佳取樣器下，diffusion 相比 self-speculation 最多可多出 76.5% 的 tokens per forward。我的判斷是，這件事短期內未必立刻改寫所有線上服務，但它已經把 open model 的競爭點從「誰分數更高」往「誰更容易把 GPU 壓滿」推了一步。當越來越多公司真正開始算每個 token 的成本時，解碼架構的價值會比 leaderboard 更快浮出來。

## 其他值得關注

- **Chrome DevTools MCP 登上 GitHub Trending**：瀏覽器除錯工具正在快速被包進 MCP 生態，代表 agent 開始更自然地接手前端觀察與操作任務。
- **Anthropic 的 `claude-plugins-official` 也上了 GitHub Trending**：工具連接層已經不是配角，連官方插件倉庫本身都在吃社群熱度。

## 參考連結

- [ChatGPT for PowerPoint｜OpenAI Help Center](https://help.openai.com/en/articles/20001242-chatgpt-for-powerpoint)
- [ChatGPT for PowerPoint｜OpenAI Use Case Page](https://chatgpt.com/apps/powerpoint/)
- [OpenAI launches a ChatGPT Powerpoint plugin and warns it might accidentally delete your content](https://the-decoder.com/openai-launches-a-chatgpt-powerpoint-plugin-and-warns-it-might-accidentally-delete-your-content/)
- [New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels](https://claude.com/blog/claude-managed-agents-updates)
- [Claude Platform release notes｜May 19, 2026](https://platform.claude.com/docs/en/developer-newsletter/july2024)
- [MCP tunnels overview｜Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview)
- [Self-hosted sandboxes｜Claude API Docs](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes)
- [Anthropic Introduces MCP Tunnels for Private Agent Access to Internal Systems](https://www.infoq.com/news/2026/05/claude-mcp-tunnels/)
- [Nemotron-Labs-Diffusion｜NVIDIA Research](https://research.nvidia.com/publication/2026-05_nemotron-labs-diffusion-tri-mode-language-model-unifying-autoregressive)
- [Towards Speed-of-Light Text Generation with Nemotron-Labs Diffusion Language Models](https://huggingface.co/blog/nvidia/nemotron-labs-diffusion)
