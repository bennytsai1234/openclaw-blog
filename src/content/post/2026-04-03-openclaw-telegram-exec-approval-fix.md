---
title: "OpenClaw 更新後 Telegram Exec 壞掉怎麼修"
description: "記錄一次 OpenClaw 升級後 Telegram 執行命令全面失效的實戰排查，拆解 allowlist miss、gateway exec security、Telegram exec approvals 與 systemd service migration。"
publishDate: "2026-04-03"
tags: ["openclaw", "troubleshooting", "tools", "backend"]
pinned: false
---

OpenClaw 升級後，我的 Telegram 機器人表面上看起來一切正常：能收訊息、能回覆、session 也還在，但只要一執行 shell 命令，就開始出現一連串彼此相似、卻不是同一個根因的錯誤。

最先看到的是：

```text
exec denied: allowlist miss
```

修到一半之後，又冒出另一個：

```text
Obfuscated command detected: Python/Perl/Ruby with base64 or encoded execution

Exec approval is required, but no interactive approval client is currently available.
```

這篇文章整理的是一次完整的實戰排查紀錄。重點不只是「改哪幾行設定」，而是把這次 OpenClaw 新版的行為變化拆開來看，避免下次升級時又重新踩一次。

## 症狀長什麼樣子？

實際症狀可以分成三層：

- Telegram bot 本身正常，代表 channel 沒掛
- 一般對話正常，代表 agent 與 session routing 沒壞
- 只有執行命令失敗，代表問題集中在 `exec`、`elevated`、approval flow 或 gateway runtime

也就是說，這不是單純的 Telegram token 問題，更不是 bot 被封鎖。真正壞掉的是「命令執行路徑」。

## 第一層根因：新版把 elevated exec 更明確地走 gateway

升級後，如果你在 Telegram 裡要求執行需要較高權限或高風險的命令，OpenClaw 會更傾向把執行路徑導向 gateway host。

這時候如果你沒有把 `tools.exec` 明確設定好，系統就很容易落回預設的限制模式，直接被擋成：

```text
exec denied: allowlist miss
```

真正有效的修復不是只去關 approval，也不是只去檢查 Telegram 權限，而是把 gateway 這一側寫死：

```json
"tools": {
  "exec": {
    "host": "gateway",
    "security": "full"
  }
}
```

這兩行是整個修復的第一個關鍵。少了它，很多 elevated exec 會進到 gateway，但 security 還停留在不符合預期的預設值。

## 第二層根因：文章或舊經驗的鍵名，可能已經跟新版不一致

這次排查裡，一個很陰險的點是：網路上找到的修法不一定完全對應你現在正在跑的 OpenClaw 版本。

例如有些舊寫法會寫成：

```json
"tools": {
  "elevate": {
    "enabled": true
  }
}
```

但在我這次實測的新版 OpenClaw 中，正確鍵名是：

```json
"tools": {
  "elevated": {
    "enabled": true
  }
}
```

這不是小差異。鍵名錯了，`config validate` 就會直接報 invalid，gateway 也不會吃到你以為已經生效的設定。

所以遇到這類升級後故障，第一件事不是盲貼文章，而是先跑一次：

```bash
openclaw config validate
```

讓系統直接告訴你「哪些欄位在你這版根本不存在」。

## 第三層根因：Telegram 能聊天，不等於 Telegram 已經成為 exec approval client

這是這次最容易誤判的地方。

一開始我以為既然 OpenClaw 已經在 Telegram 裡工作，而 `allowFrom` 也設好了，那高風險命令的 approval 應該自然會走 Telegram。結果事實不是這樣。

新版會把這件事拆得很清楚：

- `channels.telegram.allowFrom` 處理的是誰可以使用這個 channel
- `commands.allowFrom` 處理的是誰可以從 Telegram 觸發文字/bash command
- `tools.elevated.allowFrom` 處理的是誰可以要求 elevated 工具
- `channels.telegram.execApprovals` 處理的是 Telegram 是否能接 approval prompt

也就是說，**你可以已經有 Telegram 存取權，但依然沒有 interactive approval client。**

這正是下面這個錯誤的真正含義：

```text
Exec approval is required, but no interactive approval client is currently available.
```

### 正確修法

我最後補上的設定如下：

```json
"channels": {
  "telegram": {
    "enabled": true,
    "allowFrom": ["1527566496"],
    "groupAllowFrom": ["1527566496"],
    "execApprovals": {
      "enabled": true,
      "approvers": ["1527566496"],
      "target": "dm"
    }
  }
}
```

重點有兩個：

1. `execApprovals.enabled` 必須顯式開啟
2. `approvers` 在 Telegram 這個欄位裡，應該是**純數字 Telegram user ID**

這裡不需要 `telegram:` 前綴。官方文件對 Telegram channel 專用 approvers 的描述就是 numeric Telegram user IDs。實際上，我修完後收到的 approval 訊息本身也證明 Telegram approval flow 已經正常接上了。

## 第四層根因：高風險命令在新版就是會進 approval gate

另一個容易誤會的點是：看到 approval prompt，不代表系統壞了，反而代表它開始正常工作了。

例如這種命令：

```bash
python3 -c "import base64;exec(base64.b64decode('cHJpbnQoMTIzKQ=='))"
```

會被新版 OpenClaw 視為高風險或混淆執行（obfuscated execution）。

這時候合理的流程不是直接執行，而是送出 Telegram approval，例如：

```text
/approve 390d3b0b-03bc-4a00-9a24-67a641c4b1ea allow-once
```

如果你已經走到這一步，說明修復方向是對的。因為系統已經從「沒有 approval client」進展到「approval client 可用，正在等你批准」。

## 最後補上的完整配置

以下是我這次修完後的有效配置骨架：

```json
{
  "agents": {
    "defaults": {
      "workspace": "/home/benny/.openclaw/workspace",
      "memorySearch": {
        "enabled": false
      }
    }
  },
  "tools": {
    "profile": "coding",
    "elevated": {
      "enabled": true,
      "allowFrom": {
        "telegram": ["1527566496"]
      }
    },
    "exec": {
      "host": "gateway",
      "security": "full"
    }
  },
  "commands": {
    "text": true,
    "bash": true,
    "allowFrom": {
      "telegram": ["1527566496"]
    }
  },
  "channels": {
    "telegram": {
      "enabled": true,
      "allowFrom": ["1527566496"],
      "groupAllowFrom": ["1527566496"],
      "groupPolicy": "allowlist",
      "execApprovals": {
        "enabled": true,
        "approvers": ["1527566496"],
        "target": "dm"
      }
    }
  }
}
```

另外 `~/.openclaw/exec-approvals.json` 我也同步設成：

```json
{
  "defaults": {
    "security": "full",
    "ask": "off",
    "askFallback": "full"
  }
}
```

這樣可以避免一般情況下還被不必要的 approval prompt 打斷，但高風險命令仍然會進到正確的 approval 流程。

## 別忽略 gateway service migration

這次除了配置本身，還有一個很實際的坑：gateway service 可能在升級後仍然綁著舊的 runtime 與舊的 entrypoint。

我在 `doctor` 裡實際碰到的警告包括：

- service 使用 `nvm` 路徑的 Node
- service entrypoint 指到舊的 `dist/entry.js`
- system Node 24 缺失

最後我做了三件事：

1. 升級 OpenClaw 到最新版
2. 安裝 system Node 24
3. 把 systemd user service 改成使用：

```text
/usr/bin/node /usr/lib/node_modules/openclaw/dist/index.js
```

修完之後，`doctor` 乾淨了很多，至少不再有：

- version-manager Node 警告
- entrypoint mismatch
- Telegram security warning
- memory search provider missing（這部分我直接顯式關閉）

## 這次排查的結論

如果你遇到的是「Telegram 可以聊天，但 exec 全壞」，我會建議依序檢查下面四件事：

1. `tools.exec.host` 是否明確設成 `gateway`
2. `tools.exec.security` 是否明確設成 `full`
3. `tools.elevated` 是否用的是你目前版本接受的正確鍵名
4. `channels.telegram.execApprovals.enabled` 是否真的開了

只修其中一項，常常只會把錯誤訊息從 A 變成 B，而不是徹底修好。

這次最有價值的教訓不是某一行設定，而是：**OpenClaw 新版把很多以前靠推斷與默認值運作的路徑，改成需要顯式宣告。**

當你把這些路徑一條一條寫明之後，Telegram exec、approval flow、gateway runtime 才會重新變得可預期。
