---
title: "【工具評析】一個菜單管 185 支工具：hackingtool 的效率與風險"
description: "當滲透測試的工具從十幾支變成一百多支，管理成本會直線上升。hackingtool 把主流工具全部收進同一個選單，但這個設計也帶來了一些有趣的討論。"
publishDate: "2026-04-23T22:35:00+08:00"
tags: ["penetration testing", "security tools", "Kali Linux", "red team"]
draft: false
---

如果你現在要跑一個滲透測試專案，傳統的做法是打開 Kali Linux，然後在心裡（或筆記）裡面列清單：

> 「資訊收集用 nmap + amass + subfinder，密碼用 hashcat + john，Web 用 sqlmap + nuclei，Social Engineering 用 SEToolkit...」

這清單會越列越長。因為現在的攻擊工具早就不是當年那種「一把瑞士軍刀走天下」的時代了。每個細分領域都有好幾個厲害的工具，每個工具的安裝方式、依賴項目、指令語法都不一樣。

hackingtool 就是在這個背景下出現的。

## 把一百八十支工具收進一個選單

hackingtool 是一個 Python 寫的 CLI 工具，本質上是一個「工具懶人包」。它把所有主流的滲透測試工具整合成一個互動式選單，讓你不需要自己一台機器一台機器慢慢裝。

目前的規模是：

- **185+ 支工具**，橫跨 20 個類別
- **3 個新增類別**：Active Directory、Cloud Security、Mobile Security
- **Python 3.10+**，官方已經把 Python 2 程式碼全部拔掉了

類別從「匿名上網」到「木馬製作」都有，主流的包括：

- 資訊收集（nmap、Amass、Subfinder、theHarvester）
- 無線網路（Wifite、Fluxion、Wifiphisher）
- SQL 注入（sqlmap）
- 網頁滲透（Nuclei、ffuf、Dirsearch）
- 密碼攻擊（hashcat、John the Ripper）
- 社會工程（SEToolkit、Evilginx3、HiddenEye）
- 後滲透（Sliver、Havoc、Metasploit）
- 取證分析（Wireshark、Volatility 3、Binwalk）

它不是自己重新寫了一套工具，而是幫你把這些分散的 tools 打包在一起，給你一個統一的介面。

## 這個設計解決了什麼問題？

對滲透測試工程師來說，最大的痛點不是「找不到工具」，而是「怎麼快速把環境建起來」。

你到客戶機房可能要同時用到 15 支工具，如果每支都要自己手動 `git clone` + `pip install` + 處理依賴，一個早上的時間就過去了。

hackingtool 的解決方式是：

```bash
curl -sSL https://raw.githubusercontent.com/Z4nzu/hackingtool/master/install.sh | sudo bash
```

一指令幫你裝好所有東西，連 Python 環境和 venv 都處理好。

另外它有一些額外功能：

- **Install status**：告訴你哪支工具已經裝好、哪支還沒
- **Smart update**：每個工具可以单独更新，自動判斷是用 git pull 還是 pip upgrade
- **Search**：按 `/` 可以搜所有工具，不用在一長串清單裡面滑
- **Tag filter**：按 `t` 可以按標籤過濾（osint、scanner、c2、cloud、mobile...）
- **Recommend**：打 `r` 然後說「I want to scan a network」，它會推薦相關工具

## 值得注意的限制

這個工具不是沒有缺點的：

1. **Linux-only**：很多工具在 macOS 上不能用，選單會自動隱藏它們，但這也意味著如果你主力是 macOS，這個工具的價值會打折。

2. **依賴地獄**：185 支工具的依賴全部裝進同一個環境，有些 library 之間可能會 conflict。官方建議用 Docker 跑，這樣最乾淨。

3. **學習曲線**：工具太多，等於沒有工具。新手可能會在選單裡迷失，不知道該從哪個類別開始。

4. **維護負擔**：這種大雜燴式的工具包，維護成本很高。只要任何一個依賴壞掉，整個專案就可能卡住。

## 誰應該用？

老實說，如果你已經是滲透測試的老手，手邊已經有自己的工具清單和 script，hackingtool 的幫助有限。你可能只是把它當作「快速環境建置」的辅助。

但如果你符合以下情況，它值得一試：

- 剛學滲透測試，還在建立自己工具清單的階段
- 需要快速在客戶環境建好測試工具，不想一支一支慢慢裝
- 想要一個「一覽表」看看現在主流工具大概是哪些

## 它本質上是什麼？

hackingtool 的概念其實有點像「命令行版的 Kali Linux」——只不過更加模組化。你不需要用整個 Kali 的 ISO，只要這一個 script 就能跑起大多數常用工具。

但它也提醒了我們一件事：當工具越來越多，「會用工具」本身就不再是競爭優勢。真正的價值在於知道什麼時候用哪支工具、怎麼解讀結果、然後把發現的漏洞組合成有意義的報告。

工具是引擎，但開車的還是你。