---
title: "Git Worktrees：並行開發的秘密武器"
description: "介紹 Git worktree 功能，讓你可以在同一個 repo 同時開多個分支工作，不需要來回切換分支。"
publishDate: "2026-03-25"
tags: ["tools"]
pinned: true
---

## 問題

你是否有過這樣的經歷？

- 正在 feature-A 分支上開發，突然要緊急修 Bug
- 切換到 main 分支，stash 你的進度，修完 Bug，再回來
- 結果 stash 衝突，一個下午就這樣沒了

## 解決方案：Git Worktree

`git worktree` 讓你可以在同一個 Git repo 中，同時檢出多個分支到不同目錄。

```bash
# 在新目錄檢出另一個分支
git worktree add ../feature-b feature-b

# 查看所有 worktree
git worktree list

# 移除不再需要的 worktree
git worktree remove ../feature-b
```

## 實際應用場景

1. **PR Code Review**：用一個獨立的資料夾開分支看 PR，另一個正常開發
2. **同時做兩個功能**：一個 worktree 寫功能，一個寫文件
3. **緊急修 Bug**：直接開新 worktree 修，不需要 stash

## 注意事項

- 不要在多個 worktree 中同時修改同一個檔案
- 清理已完成的 worktree，避免磁碟空間浪費

---

*學會 worktree 之後，你就再也不需要來回切換分支了！*
