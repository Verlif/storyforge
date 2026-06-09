# Changelog

## v3.0.0 — 2026-06-09 · 架构重构（三注册表地基）+ 数据安全根治

> 一次系统性重构(Phase 0/1/2/3),把项目从"散落手写、加功能易冒同类 bug"的状态,收口到 **三个单一事实源注册表 + CI 自动守护 + 87 个测试**。核心目标是**地基**:不再头疼医头,改一处让所有相关功能受益。
>
> 验证:tsc=0 / 87 测试全绿 / 架构 lint 0 违规 / 必需表 45 / AI 说明书与代码一致 / build OK。浏览器实测:新建·持久化·导出·多世界迁移·删除级联(零孤儿)·真实 AI 生成 全过。

---

### 🏛️ 架构变化(本次重构的核心)

引入**三个单一事实源注册表**,所有"读 / 写 / 表生命周期"必须收口到这里,不允许散落手写:

| 注册表 | 管什么 | 取代了什么 |
|---|---|---|
| **① `PROJECT_TABLES` + 派生生命周期 API** | 表的生命周期(导出/导入/删除/迁移) | 此前 export/deleteProject/deleteGroup/migrate **各处手列表清单**,漏表反复发生 |
| **② `FIELD_REGISTRY` + `AdoptionSchema` + `adopt()`** | AI 写回什么(字段映射/去重/外键/类型) | 此前散落 `db.x.add/update` + 手写字段映射,字段错位、重复记录 |
| **③ `CONTEXT_SOURCES` + `assembleContext()`** | AI 读什么(上下文装配,18 个源) | 此前面板里**手挑** `buildWorldContext+...`,多世界串台 |

**配套地基**:
- 启动期注册表校验(`main.tsx` 校验 45 张表与注册表一致)
- **CI 架构 lint**(`check-architecture.mjs`):自动拦截"绕过注册表的手写代码"——重构中真的抓到过违规
- **AI 说明书自动生成**(`generate-ai-manual.mjs`):从代码扫描生成,CI 校验与实际一致,杜绝文档漂移
- 真上下文裁剪(L3→L2→L1 按预算分层裁剪)
- 项目"宪法" `CLAUDE.md`(三注册表铁律 + 动手前四问)+ 完整接手文档

---

### 🛡️ 数据安全 bug 根治(Phase 0 · 8 个 P0)

这些都是**可能直接损坏用户手稿**的高危 bug:

| # | Bug | 修复 |
|---|---|---|
| P0-1 | `deleteGroup` 事务作用域不全 | 删世界用完整 45 表事务,不再漏删/半删 |
| P0-2 | `migrateToMultiWorld` 漏 `codexEntries` | 多世界迁移事务纳入词条表 |
| P0-3 | `ensureSchema` **有删库风险** | 生产环境 schema 自检改为**阻止重置**而非删 IndexedDB |
| P0-4 | `BUG-EXPORT-WG` 多世界导出 worldGroupId 重映射错位 | 导出用 export id、导入正确还原到对应世界组 |
| P0-5 | `importProjectJSON` 非事务 + 外键不校验 | 导入包进单一 45 表事务,外键非法即快速失败,提交前做完整性断言 |
| P0-6 | `deleteProject` 漏间接归属表 | 删项目级联覆盖导入/作品学习的间接归属 + blob |
| P0-7 | `deleteNode` 绕过章节级联 | 大纲删除统一走章节级联入口 |
| P0-8 | `migrateToMultiWorld` 漏给 outlineNodes 盖章 | 迁移时旧大纲节点盖章到主世界(否则启用多世界后大纲卷消失) |

---

### 🔗 多世界 + 内容完整性(Phase 2 · P1 修复)

| 项 | 修复 |
|---|---|
| 真实与幻想多世界化(Phase 40) | `worldRulesProfiles` 改为世界级,每世界一套规则;9 处调用点逐一传值 |
| 章节正文不读世界规则 | `chapter.content` 接入 `worldRulesContext` |
| AIFieldCard 不带当前值生成 | 单字段生成默认带 currentValue(扩写/润色),rewrite 模式才不带 |
| 分块导入不分目标世界 | 导入数据按选定目标世界盖章,跨世界同名隔离 |
| 批量正文用错世界上下文 | 支持每章 worldContextResolver |
| 角色删除/合并引用残留 | 共享 remap 清理细纲角色数组/场景 JSON/关系/状态卡 |
| 状态卡全量召回 | 改为按正文选择性召回 |
| P1-9~P1-16 一批 | 真请求裁剪、真中止信号、多世界上下文锁、ID 过滤、portal 清理、地理递归删除、导出脱敏等 8 项 |

---

### 🧰 工程化(Phase 3)

- **测试**:0 → 87 个(单元 + 18 条反例测试 R-01~R-18,每条锁一个已修 bug)
- **CI**:6 道关(必需表 → AI说明书 → 架构lint → tsc → 测试 → build)
- **安全**:GitHub PAT 默认 session-only(不再默认写 localStorage)
- **性能**:主包 gzip **587KB → 415KB(-30%)**,地图/编辑器懒加载 + vendor 分包
- **文档**:CONTRIBUTING / Issue·PR 模板 / README 英文 TL;DR
- **i18n**:零依赖框架预留(t() + 语言切换 + zh/en key 对齐测试),未全量迁移

---

### 🗣️ 社区反馈修复

| 编号 | Bug | 修复 |
|---|---|---|
| **FB-1** | 工作流多步链:第2步「世界起源」不读第1步、项目上下文全空(被感知为"串到别的书") | 双根因修复:① `useRef` 累加器替代陈旧 `results` 闭包(步骤链路贯通)② 每步走 `assembleContext` 注入项目名/流派/世界观/维度。**真实 AI(NVIDIA)抓包验证**:修复后步骤2请求含步骤1输出+项目设定 |
| FB-3(部分) | 世界起源生成读不到「一句话故事」 | 补 `assembleContext(['storyCore'])`,storyCore 早已登记、只让调用方 need 它 |

> 其余社区反馈(FB-2/4/5/6/7/8)与完善性专项(HEALTH-1~6)已立项,见 `docs/ROADMAP.md`。

---

## v2.0.0 — 2026-05-26 · Phase A-H 全量进化

> 一次性实现 8 个大版本（Phase A → H），覆盖记忆系统、故事线、伏笔增强、大纲强化、题材风格、质量控制、角色增强、导出优化共 25+ 个子功能模块。

---

### Phase A — 三层记忆系统

| 子模块 | 说明 |
|---|---|
| **A1 状态表自动提取** | AI 生成正文后自动提取角色/地点/物品/势力的状态变更（StateDiffModal 支持跳过） |
| **A2 三层记忆架构** | Working Memory（当前章节+近3章摘要）、Episodic Memory（状态卡+事件+关系变动）、Semantic Memory（世界观+角色+故事线+伏笔），按任务类型分配 token 预算 |
| **A3 章节摘要** | AI 自动生成 100-200 字章节摘要，用于 Working Memory 注入 |
| **A4 事件时间线** | 状态表新增"时间线"视图，事件按章节时间轴展示 |
| **A5 情感节拍卡** | 每章自动分析情绪走向，生成情感节拍可视化 |

**新增文件**：`memory-builder.ts` · `summary-adapter.ts` · `EventTimeline.tsx`

---

### Phase B — 全局故事线

| 子模块 | 说明 |
|---|---|
| **B1 数据模型** | `StoryArc`（主线/支线）→ `StoryStage[]`（阶段，含关键事件、转折点） |
| **B2 故事线面板** | Tab 切换多条线、手动添加/AI 生成、阶段卡编辑、进度条可视化 |
| **B3 上下文注入** | `buildStoryArcContext()` 自动注入 AI 写作 prompt |

**新增文件**：`story-arc.ts`(类型) · `story-arc.ts`(store) · `story-arc-adapter.ts` · `StoryArcPanel.tsx`

---

### Phase C — 伏笔系统增强

| 子模块 | 说明 |
|---|---|
| **C1 逾期检测** | `getOverdue()` / `getUpcoming()` / `computeUrgency()` — 自动判断 critical/high/medium/low |
| **C2 伏笔上下文注入** | `buildForeshadowContext()` — 按章节生成 [埋设]/[回收]/[呼应]/[逾期!] 标记注入 prompt |
| **C3 AI 伏笔建议** | `buildForeshadowSuggestPrompt()` — 根据故事线+已有伏笔+大纲建议 3-5 个新伏笔 |

**新增字段**：`expectedResolveChapterId` · `importance` · `urgency`

---

### Phase D — 大纲流程强化

| 子模块 | 说明 |
|---|---|
| **D1 批量生成** | `batch-outline-runner.ts` — 按卷循环生成章节大纲，前一卷摘要自动作为下一卷上下文，支持进度条和中途取消 |
| **D2 细纲增强** | `DetailedOutline` 新增 6 字段：开头衔接 / 结尾悬念 / 场景地点 / 情绪走向 / 出场角色 / 关联伏笔 |
| **D3 大纲预览** | `OutlinePreview.tsx` — 编辑器内一键查看章节聚合信息（摘要、角色、伏笔、场景列表） |

**新增文件**：`batch-outline-runner.ts` · `OutlinePreview.tsx`

---

### Phase E — 题材模板 + 风格系统

| 子模块 | 说明 |
|---|---|
| **E1 题材元数据** | 20 个题材完整元数据（反模式清单、节奏策略、典型结构），GENRE_PACKS 从 5 扩充到 21 个 |
| **E2 写作风格预设** | 11 个风格预设：金庸武侠 / 古龙 / 张爱玲 / 鲁迅 / 网文爽文 / 纯文学 / 轻小说 / 硬核科幻 / 黑色幽默 / 暗黑哥特 / 现代极简 |
| **E3 创作方法论** | 5 种方法论：雪花法 / 英雄之旅(12阶段) / 三幕式 / 起承转合 / 救猫咪节拍表(15节拍) |

**新增文件**：`genre-metadata.ts` · `writing-styles.ts` · `methodology.ts`  
**新增字段**：`Project.writingStyleId` · `Project.methodologyId`

---

### Phase F — 质量控制三件套

| 子模块 | 说明 |
|---|---|
| **F1 章节审校** | 五维检测（逻辑一致性 / 人物行为 / 世界观 / 伏笔衔接 / 情节节奏），0-100 评分 + 逐条问题定位 |
| **F2 去AI味增强** | 五维检测（词汇 / 句法 / 叙事 / 情感 / 对话）+ 高频词统计，输出"人味指数" |
| **F3 追读力评估** | 四维评估（悬念钩子 / 爽点 / 微兑现 / 节奏），0-100 追读力评分 + 亮点&薄弱分析 |

**新增文件**：`review-adapter.ts` · `anti-ai-adapter.ts` · `readability-adapter.ts` · `ReviewPanel.tsx`

---

### Phase G — 角色 + 设定增强

| 子模块 | 说明 |
|---|---|
| **G1 角色动态状态** | `getCharacterState()` — 从状态卡实时获取角色当前位置、实力、持有物品等 |
| **G2 出场章节追踪** | `Character` 新增 `firstAppearChapterId` / `activeChapterRange` / `exitChapterId`，AI 写作时自动过滤未出场/已退场角色 |

**新增字段**：`Character.firstAppearChapterId` · `Character.activeChapterRange` · `Character.exitChapterId`

---

### Phase H — 导出 + 体验优化

| 子模块 | 说明 |
|---|---|
| **H1 HTML 导出** | 带样式排版的单页 HTML（宋体排版 + 目录 + 角色设定 + 世界观），可选包含内容 |
| **H3 便签系统** | 6 色便签 + 置顶 + 章节关联，编辑器侧边快速查阅，DB v17 新增 `notes` 表 |

**新增文件**：`html-builder.ts` · `note.ts`(类型) · `note.ts`(store) · `NotePanel.tsx`

---

### 编辑器工具栏新增

编辑器顶部新增三个切换按钮：

| 按钮 | 功能 |
|---|---|
| 📖 **大纲预览** | 展开当前章节的聚合信息面板（D3） |
| 🛡 **质量审校** | 展开审校/去AI味/追读力三合一面板（F） |
| 📝 **便签** | 展开便签面板，支持本章/全局/全部筛选（H3） |

---

### 数据库变更

- **v16**：新增 `storyArcs` 表
- **v17**：新增 `notes` 表
