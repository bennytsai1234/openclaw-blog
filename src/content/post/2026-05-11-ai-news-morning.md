---
title: "AI 晨間精選｜2026 年 5 月 11 日"
description: "Agent Skills 走紅、Anthropic 推出金融工作流套件，連安全研究都開始把 AI agent 當成可複製的攻擊面。"
publishDate: "2026-05-11T08:00:00+08:00"
updatedDate: "2026-05-11T15:28:00+08:00"
tags: ["Anthropic", "Claude", "Palisade Research", "Qwen", "Addy Osmani"]
series: "daily-ai-report"
seriesOrder: 88
draft: false
---

## 今日觀察

5 月 11 日這批訊號放在一起看，焦點已經不是哪個模型又多了幾分 benchmark，而是 agent 周邊的「執行層」正在快速定型。從 Addy Osmani 的 `agent-skills` 衝上 GitHub 趨勢，到 Anthropic 直接把金融工作流拆成可安裝的 agent 與 connector，再到 Palisade Research 把語言模型的攻擊能力測到「入侵後自我複製」，整個產業開始把 AI 視為一套會接觸權限、流程與基礎設施的軟體系統，而不只是聊天介面。

今天最大的變化，是大家終於不再把 agent 能力理解成「prompt 寫得夠不夠好」。新的競爭點已經變成三件事：你怎麼把工作流打包成可重用技能、你怎麼把模型接進高價值垂直場景、以及你怎麼限制它在真實網路中的擴散半徑。接下來一年，這三條線很可能比單純的模型排名更能決定誰真的能落地。

---

## Agent Skills 從提示詞附件變成工程基礎設施

`addyosmani/agent-skills` 這波走紅，不只是因為它把一堆規則檔整理得漂亮，而是它很清楚地把 skill 定義成「帶有退出條件的工作流」。官方 repo 目前把整套東西拆成 22 個 skills、7 個 slash commands，對應從 `/spec`、`/plan`、`/build` 到 `/ship` 的完整軟體生命週期；Addy 自己的文章則把問題講得更直接：AI coding agent 預設只會朝「趕快做完」前進，規格、測試、review、launch checklist 這些不會出現在 diff 裡的工作，反而最容易被跳過。

這件事有趣的地方，在於學術界幾乎同步補上了理論版本。5 月 7 日上 arXiv 的 `Group of Skills` 論文指出，當 skill library 變大之後，單純回傳一串扁平 skill 清單不夠用，agent 其實還需要知道哪一個是入口、哪一些是支援技能、哪一些是檢查點、哪一些是失敗避免規則。GoSkills 做的事，就是把檢索物件從「技能列表」改成帶有 `Start / Support / Check / Avoid` 角色標記的執行群組，並且在 SkillsBench 與 ALFWorld 上，在小 skill budget 下仍維持較好的 requirement coverage。

把這兩件事並排看，會發現 skill 正從社群習慣，往真正的 agent 軟體層演化。過去大家把 prompt、rules、playbook 混在一起用，效果高度仰賴操作者經驗；現在 repo 作者與論文作者都在收斂到同一個方向：skill 必須是可路由、可壓縮、可驗證的執行單位。對工程團隊來說，這比「哪個模型寫程式更強」更重要，因為真正拖垮產線的通常不是模型少做一題 LeetCode，而是它在沒有 spec、沒有 test、沒有 scope discipline 的狀態下碰了不該碰的檔案。

跟前幾個月相比，這裡的差異也很明顯。之前多數 agent framework 還在比誰能開更多 subagent、接更多工具；現在開始有人把 senior engineer 的隱性流程壓成可安裝模組。結果是，skill 不再只是 prompt engineering 的附屬品，而更像 CI pipeline 或 lint rule：平常不顯眼，但缺了之後整條交付鏈就會開始鬆動。

---

## Anthropic 把金融工作流做成可安裝 agent，垂直化速度比模型升級還快

另一個更務實的訊號，來自 `anthropics/financial-services`。這個 repo 不是抽象展示，而是把金融業常見流程直接做成可部署資產：10 個 end-to-end agents、7 個 vertical plugins，外加 11 個資料連接器，涵蓋 investment banking、equity research、private equity、wealth management、fund admin 與 operations。更關鍵的是，同一份邏輯可以同時作為 Claude Cowork plugin 使用，也可以透過 Claude Managed Agents API 變成 headless agent，掛在公司的既有 orchestration layer 後面跑。

如果只看「AI 幫分析師做事」這句話，這其實不新鮮；新的是 Anthropic 開始把工作拆得非常接近真實職能。像 `Pitch Agent` 直接從 comps、precedents、LBO 走到 deck，`Earnings Reviewer` 負責把 earnings call 與 filings 轉成 model update 與 note draft，`GL Reconciler` 則是找 break、追根因、送簽核。這不再是泛用聊天模型加幾條指令，而是把金融業裡最容易標準化、最有文件與數據依賴的中後台流程，先做成可複製的半成品。

repo 裡最有價值的一句話，反而是它的限制聲明：所有輸出都只會「staged for human sign-off」，不會直接做投資建議、執行交易、過帳或核准 onboarding。這不是保守，而是產品邊界變清楚了。前一代 demo 常愛展示「AI 幫你完成整個任務」，現在真正打進企業的版本反而在刻意保留最後的人類責任點，因為在高監管產業裡，可追責通常比全自動更值錢。

跟一般水平插件包相比，這個 repo 的另一個差別是 connector 密度。FactSet、S&P Global、Moody’s、Morningstar、PitchBook、LSEG 這些資料供應商被集中掛進 `financial-analysis` core plugin，結果是 agent 的價值不再只是會寫摘要，而是能讀到原本只有昂貴終端或研究平台才有的結構化資料。對金融機構來說，這類產品真正改變的不是模型能力上限，而是 analyst workflow 的預設介面：Excel、PowerPoint、研究平台與 agent 開始長在一起。

這也解釋了最近產業討論為什麼從「哪家模型更聰明」慢慢轉到「哪家能做 vertical operating system」。模型分數會被追平，但能不能把 prompt、skills、connectors、handoff 與審批責任打包成一套能進企業採購流程的東西，門檻高得多。Anthropic 這一步，等於把 Claude 從通用 assistant 往金融業工作台推了一大段。

---

## 可自我複製的攻擊型 agent，讓安全邊界從單機失守變成網路擴散

第三條線比較不舒服，但我認為是今天最不能忽略的。Palisade Research 的最新研究不是在問「模型會不會寫 exploit」，而是直接測試它能不能打進遠端主機後，把自己的權重、harness 與 prompt 複製過去，再在新主機上啟動一個可繼續攻擊下一台的副本。研究中一共測了 hash bypass、server-side template injection、SQL injection 與 broken access control 四類漏洞，代表這不是單一花招，而是把常見 web 弱點串成一條自動化入侵鏈。

數字也不只是噱頭。Palisade 公布的結果裡，Qwen3.5-122B-A10B 在不同情境下成功率約 6% 到 19%，較小的 Qwen3.6-27B 在單張 A100 上可到 33%；如果讓前沿模型負責「複製 Qwen 權重」這個變體任務，Opus 4.6 成功率到 81%，GPT-5.4 也有 33%。結果是，這不是某一個特定開源模型剛好撞對，而是只要模型有足夠的推理、工具使用與 post-exploitation 能力，就開始逼近「可持續擴散」的門檻。

跟去年的 agent 安全討論相比，這裡真正升級的是威脅模型。以前我們擔心的是 prompt injection 讓 agent 做錯一件事，或是 code-exec sandbox 被繞過；現在要想的是，一旦 agent 能自行發現漏洞、偷憑證、部署推理服務，它就不再只是拿到一個 session，而是有能力把自己變成下一輪攻擊的起點。這種差異很像單機木馬和蠕蟲之間的差別：前者已經麻煩，後者會改變整個防守姿態。

對工程團隊最直接的含義，是權限設計不能再只圍著「這個 agent 現在能做什麼」打轉，還要問「它失控後能不能留下可延續的執行環境」。只做輸出審核已經不夠，還得把 model weights、tool credentials、network egress、推理服務部署權限、短期憑證生命週期一起納入邊界設計。很多公司現在導入 agent 時，最常見的盲點是把它當成會說話的 RPA；Palisade 這篇研究提醒我們，它更像一個會臨場找路的攻擊程式，而且一年內能力躍升速度快得驚人。

---

## 其他值得關注

- **LLM Agent Memory Survey**：新上線的 agent memory 綜述論文，把記憶機制從 storage、retrieval 一路整理到長期規劃與自我反思，對做長流程 agent 的團隊很有參考價值。
- **anthropics/financial-services**：除了主 repo 走紅，本身也把 Managed Agent cookbook、subagent handoff 與 Microsoft 365 安裝流程一起放進去，顯示企業導入已不再只是 API demo。
- **Vector Database 成本比較**：雖然是二手整理，但「RAG 基礎設施開始回到價格、擴展性與架構 tradeoff」這件事，說明市場正從追新功能轉向算總成本。

## 參考連結

- [Addy Osmani: Agent Skills](https://addyosmani.com/blog/agent-skills/)
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
- [Group of Skills: Group-Structured Skill Retrieval for Agent Skill Libraries](https://arxiv.org/abs/2605.06978)
- [anthropics/financial-services](https://github.com/anthropics/financial-services)
- [Claude Managed Agents API](https://docs.claude.com/en/api/managed-agents)
- [Palisade Research: Language Models Can Autonomously Hack and Self-Replicate](https://palisaderesearch.org/blog/self-replication)
- [Palisade Research Paper PDF](https://palisaderesearch.org/assets/reports/self-replication.pdf)
