---
title: "【技術解析】Pi 為何反過來砍掉多數 Coding Agent 功能"
description: "Mario Zechner 用 Pi 證明，極簡工具鏈不只更可控，也未必比全家桶式 agent 弱。"
publishDate: "2026-05-03T16:30:00+08:00"
updatedDate: "2026-05-03T16:30:00+08:00"
tags: ["Pi", "Coding Agent", "Claude Code", "Context Engineering"]
draft: false
coverImage:
  src: "@/assets/post-covers/2026-05-03-pi-coding-agent-minimalism.png"
  alt: "【技術解析】Pi 為何反過來砍掉多數 Coding Agent 功能"
---

## Mario Zechner 這篇文章，幾乎是在對整個 coding agent 產品方向唱反調

當多數 AI coding agent 還在比誰的功能更多、提示詞更長、內建工作流更完整時，Mario Zechner 在 2025 年 11 月底寫的那篇〈What I learned building an opinionated and minimal coding agent〉，反而把焦點拉回一個更刺耳的問題：這些工具愈做愈大，真的有讓工程師更好掌握工作流嗎？還是只是把更多不透明的自動化塞進黑盒裡？

他的答案很直接，所以也很有辨識度：如果一個功能不是自己每天真的會用到，那它就不該預設存在。於是他做出來的 `pi-coding-agent`，不是一個什麼都有的終端代理，而是一個刻意把 system prompt、工具數量與內建工作流都壓到很薄的 coding harness。這不是單純的極簡主義姿態，而是一種很明確的工程判斷：模型已經比去年強太多，現在真正稀缺的東西，可能不是「再多一個功能」，而是「你能不能看清楚 agent 到底做了什麼」。

## Pi 想解的，不只是寫程式，而是上下文失控

Mario 在文中先交代自己為什麼會想重做一套工具。過去三年，他一路從 ChatGPT、Copilot、Cursor，用到 2025 年這波真正成熟起來的 coding agent：Claude Code、Codex、Amp、Droid、opencode。問題不是這些工具不強，反而是它們愈來愈強之後，也愈來愈像一艘艦橋滿滿按鈕的太空船。

他最在意的點有三個。第一，**上下文工程很重要，但現有 harness 常常偷偷注入你看不見的內容**。第二，**系統提示詞與工具定義一直變，會直接改變模型的工作方式**。第三，**使用者很難完整觀察一次 session 裡所有細節**，包含工具回傳、上下文轉手、子流程到底做了什麼。

所以 Pi 不是只做一個 CLI 而已。它背後其實拆成四層：統一多供應商 API 的 `pi-ai`、負責 agent loop 的 `pi-agent-core`、終端 UI 用的 `pi-tui`，以及最上層的 `pi-coding-agent`。這個切法的用意很清楚：把原本被很多產品揉在一起的東西拆開，讓你可以自己決定哪些層要換、哪些層要看、哪些層要保留。

## 它最有意思的地方，是故意不做很多現在很流行的東西

Pi 的 README 寫得很白：預設只給模型四個核心工具，`read`、`write`、`edit`、`bash`。Mario 在文章裡的立場更狠，他認為這四個工具對現在的前沿模型已經夠用，system prompt 加工具定義合起來壓在 1000 token 以內，也未必會比那些上萬 token 的重型 harness 差。

真正讓 Pi 跟多數同類工具分開的，是它**刻意不做**的清單：沒有內建 to-do、沒有 plan mode、沒有 MCP、沒有 background bash，也沒有 dedicated sub-agent。這些選擇乍看像是在把功能砍光，實際上是在表達另一套工作流哲學。

Mario 的邏輯是，to-do 與 planning 若真的重要，就該落成檔案，變成 session 外也看得到、版本控制也管得到的狀態；而不是藏在 agent 內部的一份易碎記憶。MCP 也被他點名太重，因為像 Playwright MCP 或 Chrome DevTools MCP 這類 server，單是工具描述就能吃掉一大塊 context window。相較之下，他更偏好讓 agent 透過 CLI 工具與 README 按需讀取能力，必要時再付 token 成本。

## 這篇文章最有爭議，也最誠實的地方，是他對安全感的態度

Pi 預設走的是 Mario 自己口中的 YOLO mode：不做一層又一層的權限提示，不把「每次都要批准」包成安全保證，也不假裝只要加幾個護欄就能阻止資料外流。他的論點很尖銳：只要 agent 同時有讀檔、寫檔、執行命令與連網能力，很多市面上的安全措施其實只是安全劇場。

這種講法當然會惹爭議。Hacker News 討論串裡就有人拿 Codex 的系統沙盒來反駁，認為作業系統層的隔離至少不是假的；也有人主張所有非讀取工具都該強制批准。可是在同一串討論裡，另一派人的看法也很務實：如果你最後只是疲勞式地一直按同意，那種審批流程未必真的讓人更警覺。

我覺得這裡真正有價值的，不是 Mario 的答案一定正確，而是他把問題拆得夠老實。Pi 沒有把安全、效率、可控性包裝成能同時免費拿到的三件事；它逼你承認，想要高生產力 agent，就得回到執行環境隔離、容器化與權限邊界這些更硬的工程手段。

## 它在對抗的，其實是「看起來很方便，實際上很難推理」的 agent 體驗

Mario 很不喜歡 sub-agent，也不喜歡 plan mode 變成一個被產品神祕化的功能，背後核心理由其實一樣：**觀察性**。當主代理把一段上下文蒐集工作偷偷交給子代理，使用者往往看不到它究竟漏讀了哪些檔案、忽略了哪個線索、又是用什麼摘要回傳。這會讓除錯變得很痛苦。

這一點和 Armin Ronacher 在〈Agent Design Is Still Hard〉裡談的方向剛好互相呼應。Armin 的重點是，真正把 agent 做進生產場景後，會發現高階 SDK 抽象很容易在 provider-side tools、cache control、reinforcement 與 failure isolation 這些地方開始漏水。Mario 則把同樣的挫折感，推進成更激進的產品選擇：既然黑盒只會愈疊愈厚，不如退回少量工具、可見 session 與檔案化規劃，讓上下文工程重新回到人手上。

## 為什麼這篇文章值得工程師現在就讀

因為它不是在宣傳「我又做了一個 agent」，而是在提醒我們：到了 2025 末、2026 這個時間點，coding agent 的競爭也許不該只看功能表，而該看你能不能**保住上下文、重用上下文、理解上下文怎麼被污染**。Hacker News 上有讀者特別認同 Pi 的 tree-shaped session 與 context reuse 思路，原因正是線性對話太容易把先前辛苦整理好的工作脈絡沖掉。

Mario 也沒有只停在理念層。他拿 Pi 去跑 Terminal-Bench 2.0，並提到像 Terminus 2 這種幾乎只靠 tmux 終端互動的極簡代理，也能在排行榜上撐住位置。benchmark 不會直接等於真實開發能力，但至少說明一件事：**極簡，不等於弱**。

我的看法是，這篇文章最值得吸收的，不是「大家都該去用 Pi」，而是它替整個 agent 生態問了一個更長期的問題：當模型本身已經夠強時，我們是不是該少做一點自作聰明的產品包裝，多做一點讓人看得懂、改得動、接得進自己 workflow 的基礎設施？如果你最近也開始對那些功能愈來愈多、卻愈來愈難推理的 coding agent 感到疲勞，Mario 這篇文章大概會讓你很有共鳴。

## 參考連結

- [What I learned building an opinionated and minimal coding agent](https://mariozechner.at/posts/2025-11-30-pi-coding-agent/)
- [Pi Coding Agent README](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent)
- [Agent Design Is Still Hard](https://lucumr.pocoo.org/2025/11/21/agents-are-hard/)
- [Hacker News 討論串](https://news.ycombinator.com/item?id=46844822)
