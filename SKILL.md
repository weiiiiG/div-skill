---
name: div-skill
description: Use when building CSS layouts for web pages — dashboards, landing pages, admin panels, settings forms, or any multi-container page structure. Triggers: creating CSS layout from scratch, reviewing CSS for overflow/overlap issues, organizing CSS files, or ensuring responsive layouts without fixed pixel sizing. Combines container hierarchy architecture with CSS file organization standards.
---

# DivSkill

> **Div**ine **Skill** of CSS Layout — 一套容器层级架构和 CSS 文件组织规范，用于构建稳健、无溢出、响应式的页面布局。

---

## 一、容器层级架构 · Container Hierarchy Architecture

> 通用 CSS 布局规范：一种从外到内、层层递进的容器嵌套模式，确保所有容器撑满视口、内容不溢出、缩小时不重叠。

### 1.1 三层结构（必须遵守）

```
外层容器          (负责：定宽/高、背景、边框、定位、装饰伪元素)
  └── 内层容器     (负责：flex/grid 划分空间、height:100% 撑满、padding/gap 间距)
      ├── 子容器 A  (负责：overflow 约束、自身对齐、display:flex 组织内容)
      ├── 子容器 B
      └── 子容器 C
```

**每一层只做自己该做的事，不越界。**

| 层级 | 职责 | 禁止 |
|---|---|---|
| **外层容器** | 宽高、背景、边框、`position:relative`、`::before`/`::after` 装饰 | `display:flex/grid` 做内部划分、`padding`/`gap` |
| **内层容器** | `display:grid/flex` 划分空间、`height:100%` 撑满、`padding/gap`间距 | 背景色、边框、装饰伪元素 |
| **子容器** | `overflow:hidden` 约束内容、`display:flex` 对齐内容 | `padding`/`gap`（放在内层容器）、`margin` |

> ⚠️ **区分"自身定位"和"内部划分"：** 外层容器可以有 `flex: 0 0 auto` 或 `width/height` 来控制自身在父级布局中的位置，这是允许的。但外层容器绝不能有 `display:flex/grid` 来组织自己的子元素——那会强制外层既做背景装饰又做内部布局，违反单一职责。`display:flex/grid` 永远属于内层容器。

> ⚠️ **float 也属于内部布局：** 在外层容器上使用 `float: left/right` 来排列子元素，和用 `display:flex` 一样违反规则。正确做法：外层仅负责背景，内层用 `display:flex + gap` 或 `display:grid + gap` 排列子元素。

### 1.2 视口填充

```css
/* 最外层根容器：必须撑满视口 + 溢出隐藏 */
.root {
  display: flex; flex-direction: column;
  height: 100vh; width: 100vw;
  overflow: hidden;
}
```

> ⚠️ 没有 `overflow: hidden` 的根容器，内容溢出后会触发 body 滚动条，破坏全屏布局。

### 1.3 禁止固定像素定尺寸

```css
/* ❌ 错误：固定 px */
.header { height: 56px; }                     /* nav 固定高度，缩小会溢出 */
.sidebar { width: 240px; }                    /* 固定宽度，小屏放不下 */

/* ✅ 正确：内容撑高 + 最小高度保护 */
.header { flex: 0 0 auto; min-height: 44px; }

/* ✅ 正确：相对比例 */
.main   { flex: 1; }              /* 撑满剩余空间 */
.grid   { flex: 1 1 0; }          /* 等分剩余空间 */

/* ✅ 正确：响应式固定宽度用 clamp */
.sidebar { flex: 0 0 clamp(200px, 20vw, 320px); }
```

| 场景 | 正确写法 |
|---|---|
| 撑满剩余空间 | `flex: 1` 或 `flex: 1 1 0` |
| 等分多列 | `grid-template-columns: 1fr 1fr 1fr` |
| 内容撑高 | `flex: 0 0 auto` + 可选 `min-height` |
| 响应式固定宽度 | `clamp(200px, 20vw, 320px)` |

### 1.4 禁止 margin 做容器间距

```css
/* ❌ 错误：margin 撑开容器 */
.sidebar__section { margin-bottom: 24px; }    /* margin 不在 gap 控制范围内 */
.card__label { margin-bottom: 4px; }          /* 内容间距不应由子项决定 */

/* ✅ 正确：gap 或 padding */
.sidebar-groups { display: flex; flex-direction: column; gap: 24px; }
.card-body { display: flex; flex-direction: column; gap: 4px; }
```

> ⚠️ **关键陷阱：`padding` 不能替代 `gap`。** 以下代码看似没问题，实则是违规：
> ```css
> .card-body { padding: 20px; }           /* ❌ 只有 padding，没有 display:flex + gap */
> .card-value { margin-bottom: 8px; }     /* ❌ 被迫用 margin 做间距 */
> ```
> 正确做法：内层容器必须用 `display:flex + gap`，即使只是简单的卡片：
> ```css
> .card-body { display: flex; flex-direction: column; gap: 8px; padding: 20px; }
> .card-value { /* 无 margin */ }
> ```

**特例：** `margin: 0 auto` 居中、负 margin 微调（只能用于绝对定位元素的精确定位，不能用于容器间距）。

### 1.5 内容不能决定容器大小

```css
/* ❌ 错误：内容撑宽容器 */
.container { display: flex; }
.long-text { white-space: nowrap; }  /* 长文字撑破父容器 */

/* ✅ 正确：容器约束内容 */
.parent { display: flex; min-width: 0; }
.child  { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

### 1.6 溢出保护四层

```css
/* 第1层：根容器溢出隐藏 */  .root { overflow: hidden; }
/* 第2层：卡片/面板溢出隐藏 */ .card { overflow: hidden; }
/* 第3层：内层容器溢出隐藏 + 滚动 */ .panel { overflow-y: auto; overflow-x: hidden; }
/* 第4层：文本元素溢出截断 */ .text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

### 1.7 视窗缩小时的保护

```css
/* 所有 flex/grid 子项必须允许收缩 */ .flex-item { min-width: 0; min-height: 0; }
/* 固定宽度元素用 clamp 保护 */ .sidebar { flex: 0 0 clamp(200px, 20vw, 320px); }
/* 表格使用固定布局 */ table { table-layout: fixed; width: 100%; }
th, td { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

### 1.8 重叠防护

```css
/* 绝对定位元素必须显式设置 z-index */
.overlay  { position: absolute; z-index: 10; }
.modal    { position: fixed; z-index: 100; }
.tooltip  { position: absolute; z-index: 50; }
/* ❌ 禁止：用 absolute 做布局排列 */
/* ✅ 允许：用 absolute 做装饰（glow、角标） */
```

### 1.9 居中方案

| 场景 | 实现 |
|---|---|
| 水平居中（flex） | `parent: display:flex; justify-content:center` |
| 垂直居中（flex） | `parent: display:flex; align-items:center` |
| 双向居中（flex） | `parent: display:flex; align-items:center; justify-content:center` |
| 双向居中（grid） | `parent: display:grid; place-items:center` |
| 文本居中 | `text-align: center` |
| flex 子项自身居中 | `child: align-self:center; margin:auto` |

### 1.10 完整示例

#### 顶部导航栏

```html
<header class="navbar">               <!-- 外层：背景 + 边框 -->
  <div class="navbar-body">           <!-- 内层：grid 三栏 -->
    <div class="nav-left">Logo</div>   <!-- 子容器 -->
    <div class="nav-center">标题</div> <!-- 子容器 -->
    <div class="nav-right">状态</div>  <!-- 子容器 -->
  </div>
</header>
```

```css
.navbar { flex: 0 0 auto; position: relative; background: #1a1a2e; border-bottom: 1px solid rgba(255,255,255,.1); }
.navbar-body { display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; height: 100%; padding: 0 16px; }
.nav-left, .nav-center, .nav-right { display: flex; align-items: center; overflow: hidden; }
.nav-right { justify-content: flex-end; }
```

#### 卡片面板

```html
<section class="card">                <!-- 外层：背景 + 圆角（无 display:flex） -->
  <div class="card-body">            <!-- 内层：flex 列 + padding + gap -->
    <div class="card-header">标题</div> <!-- 子容器 -->
    <div class="card-content">内容</div><!-- 子容器, flex:1 撑满 -->
    <div class="card-footer">底部</div> <!-- 子容器 -->
  </div>
</section>
```

```css
.card { border-radius: 8px; overflow: hidden; background: #fff; border: 1px solid #e2e8f0; }
.card-body { display: flex; flex-direction: column; padding: 12px; gap: 8px; }
.card-content { flex: 1; min-height: 0; overflow-y: auto; }
.card-header, .card-footer { flex: 0 0 auto; }
```

#### 左右分栏

```html
<div class="split">                   <!-- 外层 -->
  <div class="split-body">           <!-- 内层 -->
    <aside class="split-left">侧栏</aside>  <!-- 子容器 -->
    <main class="split-right">主区</main>   <!-- 子容器 -->
  </div>
</div>
```

```css
.split { display: flex; flex-direction: column; flex: 1; }
.split-body { display: grid; grid-template-columns: clamp(200px, 20vw, 300px) 1fr; gap: 12px; flex: 1; min-height: 0; }
.split-left, .split-right { overflow: hidden; }
```

---

## 二、CSS 文件组织 · CSS File Organization

> 规范页面设计时 CSS 代码的文件划分：按 **设计令牌 → 基础样式 → 组件样式 → 页面样式** 分层组织，避免一股脑全塞进一个文件。

### 2.1 逐层依赖（必须遵守）

```
tokens/           设计令牌（颜色、间距、断点）       ← 被所有文件引用
  └── base/       基础样式（reset、全局排版）        ← 可引用 tokens
      └── components/  组件样式（NavBar、Card）       ← 可引用 tokens，不可引用 pages/
          └── pages/   页面样式（Dashboard、Settings） ← 可引用 tokens + components
              └── main.css   入口聚合文件              ← 唯一被 HTML 加载的文件
```

**依赖方向是单向的：** tokens → base → components → pages。禁止反向引用或循环依赖。

### 2.2 目录结构

```
src/styles/
├── tokens/
│   ├── colors.css          # 颜色变量
│   ├── spacing.css         # 间距变量
│   ├── typography.css      # 字体、字号变量
│   └── breakpoints.css     # 断点变量
├── base/
│   ├── reset.css           # CSS reset / normalize
│   └── global.css          # body、html 全局样式
├── components/
│   ├── NavBar.css          # 导航栏组件（一个组件一个文件）
│   ├── Sidebar.css         # 侧边栏组件
│   ├── Card.css            # 卡片组件
│   └── DataTable.css       # 数据表格组件
├── pages/
│   ├── Dashboard.css       # Dashboard 页面（一个页面一个文件）
│   ├── Settings.css        # Settings 页面
│   └── Reports.css         # Reports 页面
└── main.css                # @import 聚合文件，HTML 唯一引用
```

### 2.3 tokens/ — 设计令牌

```css
/* tokens/colors.css */
:root {
  --color-bg-primary: #f1f5f9;
  --color-bg-card: #ffffff;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
  --color-accent: #3b82f6;
}
```

**规则：**
- 必须使用 CSS 自定义属性（`--var-name`），不能硬编码值
- 所有颜色、间距、字号、阴影、圆角值都必须从 tokens 引用
- tokens 文件中禁止写任何选择器或布局代码
- **tokens 只放纯设计值**，不应放布局结构相关的值（如 `--sidebar-width` 应放在组件 CSS 中用 `clamp()` 表达）

### 2.4 base/ — 基础样式

```css
/* base/reset.css */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
/* base/global.css */
html, body { height: 100%; font-family: var(--font-family-base); color: var(--color-text-primary); background: var(--color-bg-primary); }
```

**规则：** 只放全局 reset 和 html/body 基础样式。禁止放组件样式或页面布局代码。

### 2.5 components/ — 组件样式

```css
/* components/NavBar.css */
.navbar-outer { flex: 0 0 auto; background: var(--color-bg-card); border-bottom: 1px solid var(--color-border); }
.navbar-inner { display: flex; align-items: center; justify-content: space-between; height: 100%; padding: 0 var(--spacing-md); }
.navbar-left, .navbar-right { display: flex; align-items: center; gap: var(--spacing-sm); }
```

**规则：**
- 每个组件一个独立的 CSS 文件
- 必须从 tokens 引用变量，禁止硬编码颜色/间距
- **禁止引用 pages/** 下的文件
- 必须遵循容器层级规范的三层结构

### 2.6 pages/ — 页面样式

```css
/* pages/Dashboard.css */
.dashboard { display: flex; flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-lg); }
.dashboard-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-md); }
```

**规则：**
- 每个页面一个独立的 CSS 文件，仅包含该页面特有的布局
- 可引用 tokens 和 components，但**禁止引用其他 pages/** 下的文件
- 组件级样式必须放在 components/，绝不能放在 pages/

### 2.7 main.css — 聚合文件

```css
/* main.css — 唯一被 HTML 引用的 CSS 文件 */
@import url(./tokens/colors.css);
@import url(./tokens/spacing.css);
@import url(./tokens/typography.css);
@import url(./tokens/breakpoints.css);
@import url(./base/reset.css);
@import url(./base/global.css);
@import url(./components/NavBar.css);
@import url(./components/Sidebar.css);
@import url(./components/Card.css);
@import url(./components/DataTable.css);
@import url(./pages/Dashboard.css);
```

**规则：**
- 唯一被 HTML 以 `<link>` 引用的文件
- 严格按 tokens → base → components → pages 顺序导入
- 禁止跳过 main.css 直接在 HTML 中引用子文件

---

## 三、反例对照 · Anti-Pattern Reference

| 反例 | 问题 | 正确做法 |
|---|---|---|
| `height: 56px` | 固定 px，不可缩放 | `flex: 0 0 auto; min-height: 44px` |
| `width: 240px` | 固定宽度，小屏溢出 | `clamp(200px, 20vw, 320px)` |
| `margin-bottom: 24px` 在子项上 | 间距溢出父容器 | 父容器 `gap: 24px` |
| `position: absolute` 做三栏布局 | 无法自适应、层级混乱 | 父容器 `display: grid; grid-template-columns: 1fr 1fr 1fr` |
| 子项无 `min-width: 0` | flex 子项不收缩，内容溢出父容器 | 子项 `min-width: 0` |
| `table-layout: auto` | 列宽由内容决定，可能撑破容器 | `table-layout: fixed` + 每列显式宽度 |
| 无 `overflow: hidden` 的卡片 | 内容溢出后破坏下方布局 | 卡片加 `overflow: hidden` |
| 外层容器写 `display:flex` 加 `padding` | 混合外层/内层职责 | 拆分为外层(背景) + 内层(flex+padding) |
| 卡片内层只有 `padding` 无 `flex + gap` | 子项被迫用 margin 做间距 | 内层必须 `display:flex + gap` |
| 全部 CSS 在 `<style>` 中 | 无法复用、难以维护 | 拆分为 tokens/components/pages 分层文件 |
| 组件 CSS 中引用 pages/ 文件 | 循环依赖、组件和页面耦合 | 组件不可知页面，只引用 tokens |
| 页面 CSS 中写组件样式 | 组件样式分散，改一处需改 N 处 | 组件样式放 components/ |
| 硬编码颜色 `#3b82f6` | 改主题需全局搜索替换 | 使用 `var(--color-accent)` |

---

## 四、速查清单 · Checklist

- [ ] 根容器 `height: 100vh; width: 100vw; overflow: hidden`
- [ ] 每个区块：外层 → 内层 → 子容器 三层结构
- [ ] 无固定 `px` 定高度/宽度（装饰性元素除外）
- [ ] 无 `margin` 做容器间距（`gap` / `padding` 替代）
- [ ] 所有 flex/grid 子项有 `min-width: 0` / `min-height: 0`
- [ ] 文本溢出有 `text-overflow: ellipsis` + `overflow: hidden` + `white-space: nowrap`
- [ ] `table-layout: fixed` + 每列显式宽度或比例
- [ ] 绝对定位元素有显式 `z-index`
- [ ] 卡片级容器有 `overflow: hidden`
- [ ] 字体大小使用 `clamp(min, vw, max)` 或相对单位
- [ ] 文件结构：tokens/ → base/ → components/ → pages/ → main.css
- [ ] HTML 仅引用 `main.css`，不直接引用子文件
- [ ] tokens 使用 CSS 自定义属性，无硬编码值
- [ ] 组件样式不引用页面文件

---

## 五、常见违规借口 · Common Rationalizations

| 借口 | 为什么是错的 |
|---|---|
| "nav 高度写 56px 没问题，设计稿就是 56px" | 设计稿是固定尺寸，页面需要适配不同字号/缩放级别 |
| "用 margin 更直观" | margin 不可被父容器控制，gap 统一管理间距 |
| "卡片内的 `margin-bottom` 只是内容间距" | 所有 flex/grid 子项间距应由父容器 gap 控制，不是子项自己的 margin |
| "卡片内容少，`display:flex` 多余" | 没有 display:flex 的子项会退化为 block 流，再用 margin 做间距更麻烦 |
| "`min-width: 0` 不写也能跑" | 等加长文本时 flex 子项会溢出，到时候排查很困难 |
| "卡片内容少，不需要 `overflow: hidden`" | 内容少只是当前状态，未来迁移/更新后可能出现溢出 |
| "一个文件更快，PM 要马上看到" | 一个文件只在初期快，后续每一次修改都更慢 |
| "后期再拆分" | 后期永远不会拆分，技术债会越积越多 |
| "在组件文件里引用 pages 方便" | 组件一旦依赖页面，组件就不能独立复用了 |
| "tokens 文件写几个选择器没关系" | 纯变量文件一旦混入选择器就不能安全地被任意文件导入 |
