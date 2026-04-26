---
title: "【技術解析】ParaRNN：牛頓法拆牆，非線性 RNN 的訓練終於不再原地卡關"
description: "RNN 的推理速度快，但訓練向來只能順著時間一步一步算。Apple 的新框架用牛頓法把這個順序依賴拆掉，讓 7B 參數的非線性 RNN 也能在 GPU 上並行訓練，而且速度不比 Mamba 慢。"
publishDate: "2026-04-24T15:00:00+08:00"
updatedDate: "2026-04-24T15:00:00+08:00"
tags: ["RNN", "並行訓練", "牛頓法", "深度學習", "Apple"]
draft: false
---

Transformer 席捲了這個時代。但偶爾還是會有人回頭提起 RNN，提起那個讓人又愛又恨的特質：推理時的常數時間生成。context 再長，產生下一個 token 的成本都不變。這一點Attention 做不到。

問題是，訓練的時候怎麼辦？

這個問題卡了很久。RNN 的遞迴結構天生是序列的，每一個時間步都依賴前一個時間步的 hidden state。沒有辦法像 Attention 那樣把整個序列同時攤開處理。在 GPU 運算當道的年代，無法平行化的模型就是跑不快，跑不快就無法Scale，無法 Scale 就只能眼睜睜看著 Transformer 和 Mamba 吃掉所有的研究資源。

所以當 Apple 的研究團隊宣稱他們做出了一個框架，能讓非線性 RNN 以 665 倍的速度差在 GPU 上並行訓練，並且 Scale 到 70 億參數時，這不只是在某個 benchmark 上多贏一點點的事。它牽涉到一個根本的前提假設：RNN 的訓練效率瓶頸是否真的無法突破？

## 推理快、訓練慢：RNN 長期被卡在這個矛盾裡

Transformer 的 attention 機制計算量隨序列長度二次方成長，光這一點就讓它在長上下文應用裡愈來愈貴。RNN 的優勢在這裡就特別突出，只要維護一個固定大小的 hidden state，無論前面看了多少 token，產生下一個輸出的成本永遠是 O(1)。

Mamba 這類狀態空間模型正是利用了這個特性。透過把遞迴關係簡化成純線性，允許矩陣乘法具有結合律，然後用平行掃描演算法（parallel scan）一口氣算出所有時間步的 hidden state，把本來 O(L) 的序列步驟降到 O(log L)。代價是放棄了非線性，而這個非線性在某些任務上是有意義的。

非線性讓 RNN 能表達更複雜的hidden state 更新邏輯，在需要狀態追蹤、資訊持久化的任務上，理論上應該比線性 SSM 更強。過去的實驗也確實觀察到這件事，但問題是，沒有非線性就沒有辦法用平行掃描，一用就退回了傳統的順序計算。於是 RNN 的設計者長期面臨一個抉擇：要非線性表達力，還是要訓練速度。

魚與熊掌，一直選不起來。

## 牛頓法把整件事變成了另一道題目

Apple 的團隊在處理的其實不是 RNN 的問題，而是數值計算裡一道已經被研究很久的題目：怎麼高效地解一個非線性方程組。

牛頓法的核心精神很直覺。你想要求 F(x) = 0，但 F 不是線性的，沒辦法直接解。那就先在某一個點附近取 F 的局部線性近似，解那個簡單的線性系統，把得到的解當成新的起點，再線性化一次，再解，反覆迭代。只要函數足夠乖，收斂速度可以非常快。

他們把這個方法移植到 RNN 上面。整個序列的 hidden state 不是一個一個跟著時間展開的，而是一個大型聯立方程組，所有時間步的 hidden state 同時都是未知數。對這個系統做牛頓迭代，每一次迭代都會產生一個線性化的子問題，而這個子問題的形式剛好和 SSM 的遞迴一模一樣，可以直接拿平行掃描來解。

所以具體做起來是這樣的：定義好 RNN cell 的遞迴關係之後，框架自動把整個序列組裝成一個非線性系統，然後反覆做線性化 → 平行掃描 → 更新，直到收斂。實驗中只要三步，收斂就完成了。

## 結構化Jacobian讓這一切可以真的跑到 GPU 上

牛頓迭代需要反覆存取和運算 Jacobian 矩陣。對一個普通的非線性 RNN 來說，這個矩陣是 dense 的，儲存要 O(n²)，乘法要 O(n³)。隨著 hidden state 變大，這個成本馬上就會把平行化的收益全部吃掉。

ParaRNN 的做法是把 RNN cell 重新設計成對角（diagonal）或區塊對角（block-diagonal）的結構，犧牲一點 hidden state 維度之間的混合，換來極度壓縮的 Jacobian 表示。對角矩陣只需要 O(n) 的儲存，區塊對角稍微多一點，但乘法仍然可以維持接近 O(n) 的效率。 

他們設計了 ParaGRU 與 ParaLSTM 兩個 cell，Jacobian 分別是對角和 2×2 區塊對角的結構。配套的是三個層級的實作：純 PyTorch（用於原型階段）、CUDA-Acceleated（自訂核心只加速平行掃描這一步）、Fully-Fused（全核融合，把牛頓迭代、系統組裝、掃描全部包在一個 CUDA kernel 裡）。

從純 PyTorch 到 Fully-Fused，序列長度 8192 的時候，兩種 cell 的加速比分別來到 665 倍和 597 倍。而且Fully-Fused 的實作跟 Mamba 的速度幾乎一樣，序列越長領先越多。

## 7B 參數的 RNN 現在可以和非線性單位比了

規模實驗的結果才是真正讓人停下來想一想的。他們訓練了從 400M 到 7B 參數的 ParaGRU、ParaLSTM，拿 Mamba2 和標準 Transformer 做對照。

7B 等級的數字出來的時候，其實有點讓人意外：ParaLSTM 的 perplexity 9.16，ParaGRU 是 9.19，而 Mamba2 是 8.62，Transformer 是 9.55。非線性 RNN 落後 Mamba2 但領先 Transformer，已經不是「可以接受」而是「真的 competitive」。

下游任務（Arc-C、HSwag、OBQA、WinoG、PiQA、MMLU）的數據也呼應了這個結論。ParaGRU 在 WinoG 測出了 76.66，幾乎與 Mamba2 持平。整體而言，RNN 家族在 7B 等級的表現已經不再需要用「小型模型的替代方案」來定義。

更有意思的是狀態追蹤實驗。Transformer 在 Multi-hop QA 只能做到 78%，Parity 任務 53%。Mamba2 稍好，Parity 拉高到 51%。但 ParaGRU 與 ParaLSTM 兩個都達到 100%。這個 gap 沒有辦法用模型大小解釋，它反映的是非線性遞迴真實的表達能力。

## 推理端的好處是確定的，代價也必須說清楚

RNN 在推理端的優勢是沒有長度衰減、O(1) 產生速度。這一點從論文中的 throughout 圖可以看出，Transformer 的生成時間隨序列長度線性成長，而所有 RNN 家族的曲線都是平的。到了 128K 以上的上下文，差距會非常顯著。

但代價也存在。牛頓迭代帶來的額外計算在訓練時是必須付出的成本。對於同樣的序列長度，ParaRNN 的單次前向仍然比純線性 SSM 多了 Jacobian 計算和迭代收斂這兩個步驟。三步收斂是一個觀察結果，不是理論保證。更複雜的 RNN cell 是否收斂得這麼乾淨，仍然是 open question。

此外，論文的對比對象是 Mamba2，一個經過大量工程優化的 SSM。Fully-Fused 的 CUDA 實作有沒有把 Mamba 的 kernel 級優化全部學過來，這個細節論文中沒有完全交代。如果兩邊的工程成熟度有落差，實際部署的數字可能會有所不同。

## 非線性遞迴的回歸，現在有了不一樣的前提

過去十年，我們習慣用「Transformer 取代 RNN」來描述歷史。但「取代」這個詞有時候掩蓋了一件事：Transformer 解決的是 RNN 訓練規模化的問題，而不是 RNN 推理效率的問題。兩個本來是各自獨立的取捨，結果變成了一個「選架構」的單一問題，大家直覺就選了 Transformer。

ParaRNN 的貢獻不是說讓 RNN 重新戰勝 Transformer。它做的事情更低調但更紮實：把「非線性」與「可訓練規模化」這兩個本來互相排斥的東西，重新放回同一張設計桌上。牛頓法讓非線性 RNN 不再被困在順序計算的地牢裡，結構化 Jacobian 讓這一切可以真的落實成高效能的 GPU kernel。

讓研究者可以重新考慮純線性 SSM 之外的其他可能性。這件事本身， 就值得在意。

## 參考連結

- [ParaRNN 論文（arXiv:2510.21450）](https://arxiv.org/abs/2510.21450)
- [Apple ML Research：ParaRNN](https://machinelearning.apple.com/research/pararnn)
- [ParaRNN GitHub（apple/ml-pararnn）](https://github.com/apple/ml-pararnn)
- [ICLR 2026 Oral 演講頁面](https://iclr.cc/virtual/2026/expo-talk-panel/10020580)