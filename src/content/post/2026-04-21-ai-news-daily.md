---
title: "AI 新聞精選｜2026 年 4 月 21 日"
description: "Anthropic 獲 Amazon 百億美元算力承諾、Kimi K2.6 全面開源、GitHub Copilot 突然收緊額度、OpenAI Codex 上線 Chronicle 隱私爭議。"
publishDate: "2026-04-21T12:00:00+08:00"
updatedDate: "2026-04-21T12:00:00+08:00"
tags: ["Anthropic", "Amazon", "Google", "Kimi", "GitHub", "OpenAI"]
series: "daily-ai-report"
seriesOrder: 42
draft: false
---

## 今日觀察

今天的 AI 資訊有三個清晰的主軸：基礎設施之戰正式進入「兆美元俱樂部」，中美各家都在搶卡、搶電、搶地盤；開源模型生態迎來月之暗面這位重量級玩家，1T 總參數、32B 激活、256K 上下文一次性開出，姿態頗高；開發工具層則進入整併期，GitHub Copilot 突然收緊額度、OpenAI Codex 推出螢幕記憶功能卻附帶隱私爭議、ZCode 試圖用單一工作台整合所有 Agent 工具。三條主線的背後，其實都在回答同一個問題：誰能讓 Agent 真正大規模落地？

---

## 主題一 — Anthropic 與 Amazon 的千億美元算力同盟：Trainium 晶片正式上位

本週最重量級的新聞，是 Anthropic 與 Amazon 宣布深化合作，十年內向 AWS 投入超過 **1000 億美元**，換取高達 **5GW（五百萬瓩）**的新增算力容量。

Anthropic 官方公告中揭露了幾個關鍵數字：雙方已合作部署超過 **100 萬顆 Trainium2 晶片**，這是目前世界上最大規模的自研 AI 晶片集群之一。Amazon 同時對 Anthropic 追加 **50 億美元**投資，累計總額達 **130 億美元**，另有未來再注資 **200 億美元**的選項。這代表 Anthropic 正式從「雲端廠商的被投資方」升級為「AWS 核心基礎設施架構的一部分」。

對雙方來說這次結盟都有迫切的商業邏輯。Anthropic 2025 年 ARR 約 90 億美元，今年已突破 **300 億美元**，成長速度超過所有預測模型。代價是基礎設施全線告急：Pro、Max、Team 用戶在尖峰時段已出現可靠性下滑。Anthropic CEO Dario Amodei 在聲明中坦承：「前所未有的消費端成長，已開始影響免費、Pro、Max、Team 用戶的服務品質，尤其在尖峰時段。」

AWS 這邊的算盤則是：Trainium 晶片是 Andy Jassy 押寶自研晶片的戰略核心，目前已經支撐超過 **10 萬家 Bedrock 客戶**。Anthropic 的十年承諾，為這些自研晶片提供了一個超大宗的長期客戶。官方宣傳語說得很直白：「客戶告訴我們，自研 AI 晶片在性價比上有極大優勢，這就是為什麼市場需求如此旺盛。」

另一個細節：這次合作同時包含 **亞洲與歐洲推理能力的擴張**。這意味著 Claude 的全球化部署將不再依賴少數幾個超大機房，而是走向真正的多區域分散——對非美國用戶來說，這可能是比任何模型更新更有感的基礎設施改善。

**對開發者的意義**：如果你的產品建構在 Claude API 上，這個合作代表基礎設施的可靠性改善會在近期可見。如果你在評估用哪家的 Bedrock 模型，AWS + Anthropic 這個組合現在有最清晰的十年路線圖。對於在 AWS 體系內的企業用戶，Claude Platform 將直接整合进 AWS 帳號，預計今年稍晚開放公開測試。

---

## 主題二 — Google DeepMind 成立 coding 專班：謝爾蓋・布林親自督戰

就在 Anthropic 宣佈千億美元合作的同一天，Google DeepMind 也傳出正在組建一支由 **謝爾蓋・布林（Sergey Brin）** 親自督戰的精英團隊，目標只有一個：讓 Gemini 在程式設計能力上追上 Anthropic。

這支團隊由 DeepMind 工程師 **Sebastian Borgeaud** 領導，他先前負責模型預訓練工作。根據 The Decoder 援引 The Information 的報導，團隊的核心任務是「從頭開始構建新軟體」這類需要模型長時間執行、讀取多個檔案、理解使用者真實意圖的複雜程式設計任務。

布林的內部備忘錄措辭相當直接：「要贏得最終衝刺，我們必須緊急縮小在 Agent 執行層面的差距，將我們的模型轉變為代碼的『主要開發者』。」他同時要求每一位 Gemini 工程師在處理複雜多步驟任務時，都必須使用內部 Agent。

這則新聞的背景，是 Google 內部評估認為 **Anthropic 的程式設計工具目前在市場上領先**。Coding 已經成為 2026 年所有主流 AI 實驗室的決戰場：OpenAI 為此甚至暫停了 Sora 的服務，把算力讓給其他模型訓練。可以說，程式設計能力現在是判斷一家 AI 公司是否「在席」的最核心指標。

另一個細節：Google 正在用**內部程式碼庫訓練差異化的程式設計模型**。Google 的內部程式碼結構與公開開源的程式碼差異很大，因此這些內部模型無法對外發布，但它們可以加速 Google 自身產品線的開發，形成內外閉環。

**對開發者的意義**：如果你正在評估用哪家的程式設計 Agent，Gemini 的 coding 能力追趕速度會是下半年的重要觀察指標。布林親自督戰這個細節，說明 Google 高層認為這件事已經沒有觀望空間。對於已經重度依賴 Claude Code 的開發者，這不代表要更換工具，但可以期待 Gemini CLI 的實用性在未來幾個月內有實質提升。

---

## 主題三 — 月之暗面開源 Kimi K2.6：1T 總參數、256K 上下文、Agent 集群升級

月之暗面（Moooong）正式發布並開源了 **Kimi K2.6** 模型，這是該公司首次以全面開源的方式發布旗艦級模型。該模型採用混合專家架構（MoE），**總參數 1T，激活參數 32B**，上下文長度支援 **256K**，在程式編寫、長程任務執行和 Agent 集群能力三個維度均聲稱達到業界領先水平。

Kimi K2.6 的幾個核心能力值得特別關注。首先是**長程編碼**，模型能夠不間斷執行複雜的程式碼重構與優化任務，這考驗的不只是模型的推理能力，還有對超大 context 的管理能力。其次是**主動式 Agent 協同**，升級後的「Agent 集群」功能可同時調度最多 **300 個子 Agent** 並行處理 **4000 個協作步驟**，這個數字在業界是相當少見的規模。

此外，官方還低調開啟了名為「**Claw 群組**」的小範圍內測。這項功能旨在支援人類與異構 Agent 在同一群組內協同工作，並整合了 Office 文件處理與技能創建功能，目標是降低專業工作流的門檻。

值得注意的是，這是月之暗面第一次以開源姿勢進入開源模型戰場，直接與 Qwen3.6-Max、DeepSeek V3 競爭。在開源社群中，模型的開源程度、許可協議與第三方平台支援程度，往往比模型本身的 benchmark 分數更重要。目前 Kimi K2.6 已在官方渠道與各大第三方平台全面上線，可透過 kimi.com、Kimi App、Kimi API、Kimi Code 以及各主要第三方平台取用。

**對開源生態的意義**：Kimi K2.6 的開源，意味著開源陣營又增加了一個具有實際部署能力的大模型玩家。如果「Claw 群組」的異構 Agent 協作內測能交付實際成果，可能會為 Agent 叢集的工作方式提供一個值得關注的新範式。

---

## 主題四 — GitHub Copilot 突然調整方案：Pro+ 限額縮緊，Opus 從 Pro 方案消失

GitHub 本週公告調整 Copilot 個人版方案，多年來相對穩定的定價結構出現明顯變動。

**受影響最大的變動**：GitHub 已暫停 Copilot Student、Pro 和 Pro+ 計畫的新用戶註冊，現有用戶仍可在方案間升級，但新用戶只能從 Copilot Free 切入。同時，Pro 方案已**移除 Opus 模型**（即 Opus 4.7），該模型目前僅在 Pro+ 方案中提供。Pro+ 方案的限額維持在 Pro 的 5 倍以上，但 Opus 被移除後，付費在 Pro 等級的用戶實際上已失去使用旗艦模型的選項。

GitHub 提供了為期一個月的**免責退費窗口**：如果現有付費用戶因方案調整受到影響，可在公告後一個月內聯繫支援團隊申請退還 4 月費用，不收取違約金。

這次調整的時機值得玩味：就在 GitHub 宣布 Copilot 調整的同一天，OpenAI Codex 上線了 Chronicle 功能（詳見下一段），兩家主要的 AI 程式設計工具幾乎同步做出調整，很難說是巧合。GitHub 的策略似乎是：先把旗艦能力鎖在更高價位，同時用免費方案吸引新用戶，為日後的轉化留一個漏斗。

**對開發者的意義**：如果你目前是 Copilot Pro 用戶，且習慣使用 Opus 模型，你需要升級到 Pro+ 或轉向其他方案。對於新用戶，免費方案仍可使用，但 Copilot 在 2024 年到 2025 年間累積的「無限 code completions」印象已不再準確，使用量管理已成為必要功課。

---

## 主題五 — OpenAI Codex Chronicle：螢幕記憶功能上線，代價是隱私與額度

OpenAI 為 Codex 上線了一項名為 **Chronicle** 的實驗性功能，能透過截取用戶的螢幕畫面自動生成記憶，省去重複陳述背景資訊的麻煩。

這項功能目前僅向 **macOS 平台的 ChatGPT Pro 訂閱用戶**開放，且不包括 EU、英國和瑞士地區。用戶需在 Codex 應用程式中開啟 Memories 與 Chronicle，並授予 macOS 的螢幕錄製與輔助功能權限。

功能本身的設計相當聰明：Chronicle 在背景以沙盒化 Agent 運行，處理截圖、OCR 文字和時間資訊，幫助 Codex 識別用戶的工作流與常用工具，最終目標是減少每次對話都需要重新輸入上下文的情況。

然而，OpenAI 官方也主動列出三項警告：

1. **額度消耗加速**：Chronicle 會快速消耗速率限制
2. **提示注入攻擊風險增加**：允許外部截圖作為上下文，理論上為注入攻擊開了一個新的向量
3. **本地明文儲存**：生成的記憶以未加密的 Markdown 檔案形式儲存在本地裝置

第三點最值得注意：如果你在螢幕上處理過任何敏感資訊（密碼、文件內容、內部系統畫面），這些截圖產生的「記憶」將以明文儲存在磁碟上，任何能存取你電腦的人都能讀取。

**對開發者的意義**：Chronicle 的隱私模型讓它更適合在隔離環境中使用，而非處理敏感項目的機器。如果你決定啟用它，建議定期手動審查和清理記憶檔案。目前 Chronicle 在 macOS 上的可用性，也意味著 Windows / Linux 用戶短期內不會面對這個抉擇。

---

## 其他值得關注

- **Qwen3.6-Max-Preview 發布**：阿里 Qwen 團隊發布下一代旗艦模型預覽版，在六項主要程式設計基準上聲稱取得最高分，並已在 Qwen Studio 開放體驗。對於已在使用阿里雲百煉 API 的團隊，這個預覽版值得關注其與當前旗艦的實際表現差距。

- **ZCode 1.0.0 統一 Agent 工作台**：ZCode 發布 1.0.0 版本，支援一鍵遷移 Claude Code 資料，並推出自研 ZCode Agent，聲稱整合了 Claude CLI、Codex CLI、Gemini CLI 與 OpenCode CLI，透過統一協議接入同一工作台。如果你想在一個介面裡比較不同 Agent 的表現，ZCode 提供了目前最乾淨的解決方案之一。

- **GitHub Copilot 免費方案仍開放**：雖然付費方案收緊，但 Copilot Free 仍接受新用戶註冊，對於只是想要體驗 AI 程式設計輔助的個人開發者來說，仍是一個合理的起點。

---

## 參考連結

- [Anthropic 與 Amazon 算力合作公告](https://www.anthropic.com/news/anthropic-amazon-compute)
- [Google DeepMind 組建 coding 專班（The Decoder）](https://the-decoder.com/google-builds-elite-team-to-close-the-coding-gap-with-anthropic/)
- [Kimi K2.6 官方部落格](https://www.kimi.com/blog/kimi-k2-6)
- [GitHub Copilot 方案調整公告](https://github.blog/changelog/2026-04-20-changes-to-github-copilot-plans-for-individuals/)
- [OpenAI Codex Chronicle 功能頁面](https://developers.openai.com/codex/memories/chronicle)
- [Qwen3.6-Max-Preview 發布資訊](https://mp.weixin.qq.com/s/DKxrFnBwisNjjOnFQRqsqA)
- [ZCode 1.0.0 更新日誌](https://zcode-ai.com/cn/changelog/1.0.0)
