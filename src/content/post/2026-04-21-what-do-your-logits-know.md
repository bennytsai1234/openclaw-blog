---
title: "【技術解析】Apple 揭露 Logits 洩漏風險，VLM 輸出其實藏了更多圖像資訊"
description: "Apple ML Research 指出，視覺語言模型的 top-k logits 可能洩漏題目未要求的影像屬性。"
publishDate: "2026-04-21T15:00:00+08:00"
updatedDate: "2026-04-21T15:07:00+08:00"
tags: ["Apple ML Research", "Qwen3-VL", "Llama 3.2 Vision", "Tuned Lens", "CLEVR"]
draft: false
---

## 這篇文章在說什麼

Apple ML Research 這個月公開的論文《What Do Your Logits Know?》講的是一個很多人直覺上會低估的問題：就算你只把模型最後一層的 logits 暴露給外部使用者，這些數值裡可能還是藏著比回答本身更多的資訊。

研究團隊把這件事放到視覺語言模型上驗證。他們不是單純問模型答對沒有，而是追蹤資訊從高維的 residual stream，一路被壓縮到 tuned lens 投影，再到最後的 top-k logits 之後，究竟還剩多少可被解碼的內容。結論很直接，top-k logits 不只是「答案的前奏」，它們本身就可能帶著題目沒有要求、但從輸入圖像裡抽出的額外訊息。

更麻煩的是，這些額外訊息不只限於跟答案強相關的部分。論文展示，當模型被問到像是「圖片裡有沒有藍色球體」這種封閉式問題時，外部分析者仍可能從 logits 推回那顆球的材質、大小，甚至部分背景物件的屬性。這代表所謂「我只開放最終輸出，不開放中間層，所以很安全」這個想法，其實沒有那麼站得住腳。

## 背景脈絡

這篇研究背後踩的是資訊瓶頸原則，也就是理想中的模型表示應該只保留對決策有用的資訊，把其他雜訊一路壓掉。如果這個原則真的在大型 transformer 上乾淨成立，那麼模型走到最終輸出層時，理論上應該只剩下跟答案直接相關的最小資訊集合。

但過去幾年從 probing、logit lens 到 tuned lens 的工作，反覆指出一件事，transformer 的 hidden states 往往比最終文字輸出知道得更多。像 Nora Belrose 等人在 2023 年提出的 Tuned Lens，就是把每一層 hidden state 經過學習好的 affine probe 映射回詞彙分佈，讓研究者看到模型是怎麼一層一層修正自己對下一個 token 的預測。這類方法本來偏向可解釋性工具，現在卻順便提醒我們，模型內部殘留的資訊量遠大於表面答案。

Apple 這篇論文往前再推一步。它問的不是「中間層能不能讀出更多東西」，而是「如果你連中間層都拿不到，只拿得到最後一點點 logits，還能讀出多少」。這就把問題從研究者的 white-box 分析，拉到了更接近產品 API 與實際部署的場景。

## 為什麼重要

這件事對模型 API 供應商的意義很大。很多服務會把 logprobs、top-k 候選 token 或某種近似信心分數開給使用者，理由通常是方便除錯、重排序、校準或做 agent 決策。如果這些數值本身就能被拿來重建輸入中未被明說的屬性，那它就不只是可觀測性資料，而是潛在的資料外洩面。

對應用開發者來說，風險也不只存在於「敏感內容被原樣輸出」。更現實的問題是，模型可能把你沒打算暴露的內容偷偷折進機率分佈裡。只要攻擊者能做重複查詢、蒐集不同溫度下的輸出，或者直接拿到 top-k logits，很多看似沒被回答的資訊其實仍有機會被推回來。

對研究圈來說，這也補了一個很有價值的視角。過去大家常把 hallucination、bias、privacy leakage 分開談，但這篇論文暗示它們可能共享一部分機制，也就是模型在臨近輸出時，仍保留了不該留下來的非目標資訊。這不只是資安問題，也是一個模型壓縮失敗的訊號。

## 技術細節

實驗設計的漂亮之處，在於研究者沒有直接拿自然圖片硬做分析，而是選了 **CLEVR** 這種可控性很高的診斷型資料集。CLEVR 來自 2016 年的視覺推理研究，場景裡的物件由固定形狀、顏色、材質、尺寸組成，問題也能精確描述。這種資料集的好處是，你可以非常清楚地定義什麼叫「答案相關資訊」，什麼叫「答案無關但仍存在於輸入裡的資訊」。

論文主實驗使用三個模型，分別是 **Qwen3-VL-8B-Instruct**、**Llama-3.2-11B-Vision-Instruct** 和 **LLaVA-v1.6-Mistral-7B**。資料上，他們從 CLEVR validation set 抽出總共 **2,400 張**圖片，每張含 **3 到 10 個物件**，再對每張圖產生正例與負例查詢。查詢格式很克制，像是「is there a gray rubber cube in the image? reply in one word」，刻意把輸出空間壓到接近 yes/no。

這裡最關鍵的是他們觀察三種表示層級。第一種是每層 **hidden states / residual stream**，這可以視為資訊最豐富的地方。第二種是 **tuned lens** 投影後的 logit trajectory，也就是用 probe 去估計每一層如果當下就要產生 token，模型會往哪個方向想。第三種才是實際對外最常見的 **final top-k logits**。

研究者接著訓練 classifier，看看能不能從這些不同表示裡解碼出各種圖像屬性，包括：

- 目標物件是否存在
- 目標物件的大小與材質
- 其他背景物件的屬性
- 圖像是否被 noise corruption 影響

結果大致有三個層次。第一，residual stream 幾乎像是 oracle，對場景裡大部分資訊都高度可預測。第二，當只看最小的 top-2 logits，也就是 yes/no 對應值時，雖然資訊量下降，但仍能解出一部分題目沒問的屬性。第三，當觀察的 logits 數量增加，洩漏也會跟著上升，尤其是跟目標物件有關、但不屬於提問文字的那些特徵。

論文還做了 corruption 實驗，加入 Gaussian、glass、motion 等噪聲，測試決策相關與決策無關資訊如何殘留。這裡的重點不是哪個模型分數最高，而是 final logits 並沒有像資訊瓶頸理論期望的那樣，只剩最乾淨的答案信號。它們仍攜帶會影響生成分佈的旁枝資訊。

## 跟既有做法相比

如果把這篇放進既有脈絡裡看，它其實是在補齊一塊很重要的「攻擊成本」拼圖。過去無論是 logit lens 還是 tuned lens，多半假設研究者能讀到模型中間層，這在學術分析當然合理，但在產品場景下通常不成立。多數商用 API 不會把 hidden states 交給你。

Apple 這篇的價值就在於它把門檻往下拉。它證明，你不一定要看到內部 layer 才能偷到額外資訊，光是最終輸出的 top-k logits，就可能已經夠用。這使得問題從「白盒 interpretability 的副作用」，變成「黑盒介面設計本身的風險」。

另一個差異是，這篇不是在討論 prompt injection 或 jailbreak 那類明顯的行為操控，而是純粹討論表示壓縮失敗。也就是說，模型不是因為被誘導才洩漏，而是它本來就把過多資訊一路帶到輸出附近。這種問題更難靠 policy layer 修掉，因為它比較像模型內部表示的結構性現象。

## 我的觀點

我覺得這篇最值得在意的地方，不是它說「logits 會洩漏」，而是它把很多工程團隊平常默認的安全邊界往前推翻了一格。大家常把安全分成兩層，一層是模型不要把敏感內容直接說出來，另一層是不要把 hidden state、embedding 這類內部表示暴露出去。現在看來，這兩層中間其實還有一個灰色地帶，就是最終輸出分佈本身。

如果你正在做多模態客服、文件審查、醫療影像輔助或任何會把圖片送進 VLM 的系統，這篇論文等於提醒你，**top-k logprobs 不是單純的可觀測性欄位**。它們應該被視為可能包含額外語義資訊的高風險輸出，而不是方便除錯就能順手打開的設定。

另一個我覺得被低估的點，是這件事跟 hallucination 可能真的有共通來源。當模型在最後一層還保留太多非目標資訊時，採樣過程就有機會把這些殘留訊號轉成表面輸出。換句話說，某些幻覺不一定只是「模型亂猜」，也可能是模型把不該進入決策面的旁枝特徵帶到了太靠近輸出的地方。

所以這篇文章最後真正留下來的問題其實不是「要不要關掉 logits」，而是更難的那個：未來的大模型架構，究竟能不能更乾淨地把決策相關與非相關資訊分開。只要這件事做不到，產品層的遮罩再多，仍然是在替一個沒有壓乾淨的內部表示收拾善後。

## 參考連結

- [Apple ML Research: What Do Your Logits Know?](https://machinelearning.apple.com/research/what-do-your-logits-know)
- [arXiv: What do your logits know? (The answer may surprise you!)](https://arxiv.org/abs/2604.09885)
- [論文 HTML 版本](https://arxiv.org/html/2604.09885v1)
- [Eliciting Latent Predictions from Transformers with the Tuned Lens](https://arxiv.org/abs/2303.08112)
- [A Diagnostic Dataset for Compositional Language and Elementary Visual Reasoning (CLEVR)](https://arxiv.org/abs/1612.06890)
