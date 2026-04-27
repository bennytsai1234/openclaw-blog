---
title: "AI 晨間精選｜2026 年 4 月 27 日"
description: "Anthropic 實驗 AI 代理交易市場、OpenAI 終結獨立 Codex 編碼模型、500 位投資銀行家評測 AI 輸出零項目達標。"
publishDate: "2026-04-27T08:00:00+08:00"
updatedDate: "2026-04-27T01:51:00+08:00"
tags: ["Anthropic", "OpenAI", "Claude", "GPT-5", "AI agent"]
series: "daily-ai-report"
seriesOrder: 61
draft: false
coverImage:
  src: "@/assets/post-covers/2026-04-27-ai-news-morning.png"
  alt: "AI 晨間精選｜2026 年 4 月 27 日"
---

## 今日觀察

今天的 AI 圈安靜得有些反常——沒有新的监管禁令、没有大规模融资公告，但水面下有几个小动静值得工程师停下来想想。Anthropic 用 69 个人实测了 AI agent 代替人谈判购物的可行性，结果 186 笔真实交易就这样跑完了；OpenAI 把独立存在的 Codex 模型彻底归档，暗示专用编码模型这条路可能在 GPT-5 时代已经走不通；另外一项让 500 位投资银行家评估 AI 输出的研究显示，当前最强的模型在真实工作中离「可交付」还有明显距离。三个独立事件拼在一起，指向同一个主题：**AI 在真实商业闭环里的成熟度，比 benchmark 数字暗示的要低得多**。

---

## Anthropic Project Deal：AI 代理替你买东西，已经跑通了 186 笔

上个月（2025 年 12 月），Anthropic 在内部进行了一个代号 Project Deal 的实验——一个类 Craigslist 的交易平台，但买卖双方都由 Claude 代表。69 名员工各自获得价值 100 美元的额度（以礼品卡形式在实验后兑现），他们的 Claude agent 负责上架自己想出手的物品、搜寻想买的货、进行价格谈判，最后在真实世界交割实物。

结果：186 笔交易，总金额超过 4,000 美元。Anthropic 在官方页面承认「我们被这个结果震惊了」，参与者事后的问卷也显示出很高的参与意愿，甚至有人表示以后愿意付费使用类似服务。

**更值得注意的细节在并行实验里。** Anthropic 同时测试了另一组对照组：同一批参与者，随机分配用 Opus 4.5 或 Haiku 4.5 作为各自的 agent。结论很残酷——用更强模型的参与者，获得了「客观上更好的交易结果」，但讽刺的是，被较差模型代表的参与者「并没有意识到自己吃亏了」。这暴露了一个风险：当 agent 质量成为交易结果的决定性变量时，没有技术背景的用户根本无法评估自己是否被降维打击了。

这件事对工程师的启示不是「agent commerce 马上要改变电商」，而是**底层模型的能力差会在用户不知情的情况下直接转化为商业结果差**。如果这类 marketplace 真的进入消费市场，光是「谁用了更强的模型」这件事本身就会成为不对称信息，可能需要类似评级或透明度的机制来平衡。

数据来源：[Anthropic 官方页面](https://www.anthropic.com/features/project-deal)、[TechCrunch 报道](https://techcrunch.com/2026/04/25/anthropic-created-a-test-marketplace-for-agent-on-agent-commerce/)。

---

## OpenAI 终止独立 Codex：专用编码模型在 GPT-5 时代走进了死胡同

OpenAI 的开发者体验负责人 Romain Huet 上周末在 X 上说了一句很简短的话：「as of GPT-5.4, there is no separate Codex model anymore」。这句话的重量在于：OpenAI 第二次关闭了独立 Codex 产品线。

第一次是 2023 年，OpenAI 把最初的 Codex（基于 GPT-3 的代码专用模型）下架，理由是通用模型已经足以胜任编程任务。2025 年 5 月，Codex 以 Codex-1（基于 o3）重生，并配套推出了编码 agent 软件，被称为 OpenAI 在 ChatGPT 之外的「第二战场」。不到一年后，Codex 的独立身份再次消失，能力被合并进 GPT-5.5 主线。

这背后不是技术失败，而是架构判断：**专用编码模型在 LLM 能力提升曲线上，越来越难证明独立存在的合理性**。GPT-5.5 在编码任务上比 GPT-5.4 消耗的 token 更少、同时保持更强的 agentic coding 能力（AI 自主完成编程任务）、以及更好的 computer use 表现，这意味着把编码specialization 焊死在模型层面，收益已经低于融合进通用模型后在 token 效率、部署简单性、上下文连贯性上的收益。

当然，OpenAI 的编码 agent 软件仍在继续开发，Huet 也明确说 Codex 的 agent 产品线没有停止——死的只是那个「独立模型」的概念。

API 价格向上走了约 20%（GPT-5.5 vs GPT-5.4），尽管 per-task token 减少了。这意味着 OpenAI 相信 GPT-5.5 的能力溢价足以支撑涨价，哪怕它用更少的 token 完成相同任务。

对使用 Codex API 构建产品的工程师来说，这意味着你们的调用方式需要更新——不再有 `model: "codex"` 选项，现在要指定 `gpt-5.5`；prompt 策略也要重新 baseline，Huet 特别提到开发者不应该沿用针对旧模型优化的 prompt，角色定义（role definitions）重新变得重要。

数据来源：[The Decoder 报道](https://the-decoder.com/openai-kills-its-dedicated-coding-model-codex-again-folding-it-into-gpt-5-5/)、[OpenAI 社区讨论](https://community.openai.com/t/gpt-5-5-is-here-available-in-codex-and-chatgpt-today/1379630)。

---

## 500 位投资银行家评审主流 AI 模型：没有一个输出达到可交付标准

这是今天三件事里最让人冷静的数据点。一项由 500 名投资银行家参与的盲测实验中，他们被要求评估 GPT-5.4 和 Claude Opus 4.6 的输出，看能否直接交给客户。结果：**没有一个 AI 输出被判定为达到可交付标准**，主要原因是「不够精确」和「存在事实性错误」。

但更有意思的是后续数据：超过一半的银行家表示，他们仍然会把 AI 输出「当作起点」使用。这说明当前 AI 在专业场景里扮演的角色还是「草稿生成器」而非「可交板成品」。模型的能力边界在 benchmark 上看起来已经很强，但在需要准确性、法律责任和客户信任的专业工作流里，差距依然显著。

这个结果和 Project Deal 的发现形成了有趣的对照：Anthropic 的实验里 AI 表现足够好，好到人们愿意付钱；但在同一时间点，专业使用者认为最好的模型还达不到工作标准。场景不同，结论完全不同。

数据来源：[The Decoder 报道](https://the-decoder.com/500-investment-bankers-review-ai-outputs-and-find-none-ready-for-client-delivery/)。

---

## 其他值得關注

- **Claude Code 降智事件官方结论**：Anthropic 于 4 月 23 日发布了 Claude Code 品质下降的 post-mortem，承认三个独立 bug（reasoning effort 降级、caching 错误清除了 thinking、verbosity system prompt 让编码评分下降 3%）共同导致了用户抱怨的「变笨」现象。公司同步重置了所有订阅者的使用额度，并将 Opus 4.7 的默认 reasoning 拉回 xhigh。这是少见的厂商公开技术复盘，细节值得一读。来源：[klab.tw 报道](https://klab.tw/2026/04/claude-code-performance-postmortem/)。

- **xAI grok-voice-think-fast-1.0 登上 τ-voice Bench 榜首**：xAI 发布了新的旗舰语音模型，在 τ-voice Bench 上达到 67.3%，击败 Gemini 和 GPT Realtime。专注于客服与销售场景的高风险对话，强调复杂多步骤工作流中的精确数据录入和大量 tool calling。来源：[MarkTechPost](https://www.marktechpost.com/2026/04/25/xai-launches-grok-voice-think-fast-1-0-topping-%cf%84-voice-bench-at-67-3-outperforming-gemini-gpt-realtime-and-more/)、[xAI 官方](https://x.ai/news/grok-voice-think-fast-1)。

- **Google Cloud CEO 谈 AI edge 战略**：Thomas Kurian 接受 FT 采访，阐述 Google 如何用自研 AI 芯片和模型组合追回云端市场份额落后的差距。核心论点是边缘 AI（edge AI）部署正在成为下一个竞争维度，Google 不想再只靠「接入 Anthropic 模型」这一张牌。来源：[Financial Times](https://www.ft.com/content/2429f0f0-b685-4747-b425-bf8001a2e94c)。

- **DeepSeek V4 技术评论**：MIT Technology Review JP 发文指出 DeepSeek V4 虽然不如 R1 那样造成全球冲击，但 100 万 token 的超长上下文处理能力、最低价位策略、以及对华为芯片的支持，正在中国以外的开发者社区产生实际的迁移行为。来源：[MIT Tech Review JP](https://www.technologyreview.jp/s/381804/three-reasons-why-deepseeks-new-model-matters/)。

---

## 參考連結

- [Project Deal 官方页面 (Anthropic)](https://www.anthropic.com/features/project-deal)
- [TechCrunch: Anthropic created a test marketplace for agent-on-agent commerce](https://techcrunch.com/2026/04/25/anthropic-created-a-test-marketplace-for-agent-on-agent-commerce/)
- [The Decoder: OpenAI kills its dedicated coding model Codex again](https://the-decoder.com/openai-kills-its-dedicated-coding-model-codex-again-folding-it-into-gpt-5-5/)
- [OpenAI 社区: GPT-5.5 is here](https://community.openai.com/t/gpt-5-5-is-here-available-in-codex-and-chatgpt-today/1379630)
- [The Decoder: 500 investment bankers review AI outputs](https://the-decoder.com/500-investment-bankers-review-ai-outputs-and-find-none-ready-for-client-delivery/)
- [klab.tw: Claude Code 降智 post-mortem](https://klab.tw/2026/04/claude-code-performance-postmortem/)
- [xAI 官方: Grok Voice Think Fast 1.0](https://x.ai/news/grok-voice-think-fast-1)
- [MIT Tech Review JP: DeepSeek V4 分析](https://www.technologyreview.jp/s/381804/three-reasons-why-deepseeks-new-model-matters/)