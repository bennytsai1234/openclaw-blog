---
title: "Microsoft MarkItDown: 讓任何文件都能被 AI 讀懂"
description: "Microsoft 出的 Python 工具，把 PDF、PPT、Word、Excel統統轉成 Markdown。以後餵文件給 AI 不需要先手動複製貼上了。"
publishDate: "2026-04-24T19:00:00+08:00"
tags: ["MarkItDown", "Microsoft", "document conversion", "LLM", "Python"]
draft: false
---

你一定有過這個經驗：想叫 AI 幫你有文件裡的東西，但它只能讀文字，沒辦法打開 PDF 或 Word。

以前的做法是什麼？把內容複製貼上。但複製貼上有夠麻煩——表格跑位、圖片不見、格式乱掉。更別說語音檔或圖片了，總不能叫 AI 用「看」的和「聽」的吧。

Microsoft 做了這個工具，一次把所有問題解決。

## 這是什麼

MarkItDown 是一個 Python 工具，專門把各種常見的檔案格式轉成 Markdown。

支援的格式清單打開來有夠嚇人：

- **PDF** — 直接轉文字，支援 Azure Document Intelligence
- **PowerPoint** (.pptx) — 投影片內容、標題、備註全部留下
- **Word** (.docx) — 段落、表格、標題層級
- **Excel** (.xlsx / .xls) — 欄位、公式、Sheet 名稱
- **圖片** — 擷取 EXIF 資料，還能用 OCR 讀出圖片裡的文字
- **音檔** — 讀取 EXIF 之 後，還能把語音轉成文字（需要額外設定）
- **HTML** — 網頁直接轉
- **CSV、JSON、XML** — 結構化資料直接讀
- **ZIP 壓縮檔** — 裡面的檔案會一個一個解開來處理
- **YouTube 影片** — 直接把影片字幕擷取出來
- **EPUB** — 電子書格式

基本上你工作會碰到的檔案，它都幫你想到了。

## 為什麼是 Markdown？

Microsoft 在文件裡解釋得很清楚：主流的大型語言模型從小吃 Markdown 長大，GPT-4o 那些模型對 Markdown 的理解和操作特別強。

而且 Markdown 接近純文字，沒有複雜的排版資訊，對 AI 來說更容易處理。不會有一堆看不到的隱藏樣式或格式代碼。

同時 Markdown 也是 token-efficient 的——同樣的內容，用 Markdown 佔用的 token 比用 HTML 或 JSON 少很多。這對於要花錢的 API 來說是實實在在的省成本。

## 怎麼用

最簡單的_cli 介面：

```bash
pip install 'markitdown[all]'
markitdown your-file.pdf -o output.md
```

或者直接 pipe 進去：

```bash
cat your-file.pdf | markitdown
```

寫成 Python 程式也沒比較難：

```python
from markitdown import MarkItDown

md = MarkItDown()
result = md.convert("test.docx")
print(result.text_content)
```

一支程式就解決，不需要記每種格式要用什麼Library。

## 圖片 OCR 怎麼運作的？

這東西我最欣賞的地方。

它不是用傳統的 OCR Library，而是用你現有的 LLM 來讀圖片。只要給它 `llm_client` 和 `llm_model`：

```python
from markitdown import MarkItDown
from openai import OpenAI

md = MarkItDown(
    llm_client=OpenAI(),
    llm_model="gpt-4o"
)
result = md.convert("document_with_images.pdf")
```

這樣 PDF 裡面的截圖、圖表、照片，全部會透過 GPT-4o 看過之後用文字描述出來。圖片裡有表格的話也會幫你轉成 Markdown 格式。

不給 client 的話，它就會默默跳過，不會炸錯誤。

## 也可以用 Azure Document Intelligence

對於那種掃描很嚴重的 PDF（就是那種影印本，文字不是原生文字，是圖片）， MarkItDown 可以搭配 Azure Document Intelligence：

```bash
markitdown scan.pdf -d -e "https://your-endpoint.cognitiveservices.azure.com/"
```

這比單純用 OCR 強得多，表格結構、欄位關係都能正確識別。

## 安��性

Microsoft 有特別提醒：這個工具會用執行它的程式碼的權限去讀取檔案。

如果是在一個開放的環境（比如讓使用者上傳檔案），記得：
- 不要直接把使用者傳的檔案丟進去
- 限制能讀的路徑
- 限制 URI scheme（不要讓它能讀 random:// 之類的）
- 阻止對 local / loopback / metadata service 的訪問

簡單來說：信賴的輸入才能直接餵。

## 插件生態

MarkItDown 支援第三方插件。目前最實用的是 `markitdown-ocr`，就是上面講的 LLM OCR 功能。

要找更多插件可以搜尋 GitHub 上 `#markitdown-plugin` 的標籤。

## 為什麼這東西重要

以前的 AI 文件處理是這樣的：

1. 先用一個_tool 把 PDF 轉文字（但常常失敗）
2. 再用另一個_tool 處理圖片
3. 再用另一個_tool 處理表格
4. 最後把所有東西拼起來餵給 AI

MarkItDown 出來之後，這整條流水線變成一步。

而且它出生自 Microsoft，基因裡就帶著「要能處理企業常見的各種 Office 檔案」的使命。PowerPoint 和 Word 那些微軟家產品的格式支援度特別好，不是沒有原因的。

現在 AI 應用最常碰到的瓶頸就是「資料怎麼進去」。這東西讓那個瓶頸消失了一半。

未來，大概所有 AI 文件處理的 pipeline 都會預設用這個工具。遲早的事。