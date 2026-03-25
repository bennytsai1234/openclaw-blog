---
title: "我的開發環境：VS Code + WSL2 + Neovim"
description: "分享我日常使用的開發環境設定，包括 VS Code Remote WSL2 遠端開發，以及 Neovim 作為終端編輯器。"
publishDate: "2026-03-25"
tags: ["開發環境", "工具", "VSCode", "Neovim"]
pinned: false
---

## 前言

好的開發環境可以大幅提升開發效率。這篇文章記錄一下我目前的工具棧。

## VS Code Remote WSL2

Windows 用戶最強大的開發工具組合之一：**VS Code + WSL2**。

```bash
# 在 WSL 中安裝 VS Code Server
code .

# VS Code 會自動幫你安裝 remote extension
```

好處：
- Linux 開發環境（最原生）
- Windows 視窗介面（最直觀）
- 兩全其美

## Neovim 作為終端編輯器

偶爾需要 SSH 到伺服器時，Neovim 就是我的首選。

```lua
-- init.lua 配置範例（LazyVim）
require("plugins")
require("lualine").setup()
```

## 我的工具清單

| 用途 | 工具 |
|------|------|
| IDE | VS Code + VS Codium |
| 終端 | Ghostty / Alacritty |
| Shell | Zsh + Starship |
| Git | Git CLI + lazygit |
| 終端編輯器 | Neovim |

## 結語

工具沒有最好，只有最適合。持續調整你的工作流，找到最順手的組合。

---

*有興趣了解某個工具的詳細設定？歡迎留言！*
