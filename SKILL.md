---
name: div-skill
description: Use when building CSS layouts for web pages — dashboards, landing pages, admin panels, settings forms, or any multi-container page structure. Triggers: creating CSS layout from scratch, reviewing CSS for overflow/overlap issues, splitting CSS into page/component files, or ensuring responsive layouts without fixed pixel sizing. Solves container nesting chaos and monolithic CSS bloat.
---

# DivSkill

> **Div**ine **Skill** of CSS Layout — 元素的容器化与代码拆分的精细化。
>
> 两个核心：① 用三层结构撑满所有容器、杜绝溢出；② 按页面和组件拆分 CSS 文件，每个模块只写自己的文件。

---

## 一、容器层级架构 · Container Hierarchy

> 从外到内、层层递进的容器嵌套模式，确保所有容器撑满视口、内容不溢出、缩小时不重叠。

### 1.1 三层结构（必须遵守）

```
外层容器          (负责：定宽/高、背景、边框、定位、装饰伪元素)
  └── 内层容器     (负责：flex/grid 划分空间、height:100% 撑满、padding/gap 间距)
      ├── 子容器 A  (负责：overflow 约束、自身对齐、display:flex 组织内容)
      ├── 子容器 B
      └── 子容器 C
```

每一层只做自己该做的事，不越界。

| 层级 | 职责 | 禁止 |
|---|---|---|
| **外层容器** | 宽高、背景、边框、`position:relative`、`::before`/`::after` 装饰 | `display:flex/grid` 做内部划分、`padding`/`gap` |
| **内层容器** | `display:grid/flex` 划分空间、`height:100%` 撑满、`padding/gap`间距 | 背景色、边框、装饰伪元素 |
| **子容器** | `overflow:hidden` 约束内容、`display:flex` 对齐内容 | `padding`/`gap`（放在内层容器）、`margin` |

> **区分"自身定位"和"内部划分"：** 外层容器可以有 `flex: 0 0 auto` 或 `width/height` 控制自身在父级中的位置，允许。但外层容器绝不能有 `display:flex/grid` 或 `float` 来组织自己的子元素。`display:flex/grid` 永远属于内层容器。

### 1.2 硬性规则

```css
/* 根容器：撑满视口 + 溢出隐藏 */
.root { display: flex; flex-direction: column; height: 100vh; width: 100vw; overflow: hidden; }
```

| # | 规则 | 正确写法 | 错误写法 |
|---|---|---|---|
| 1 | 无固定 px | `flex: 0 0 auto; min-height: 44px` | `height: 56px` |
| 2 | 响应式固定宽 | `clamp(200px, 20vw, 320px)` | `width: 240px` |
| 3 | 等分多列 | `grid-template-columns: 1fr 1fr 1fr` | `width: 33.33%` |
| 4 | 子项间距 | 父容器 `gap: 12px` | 子项 `margin-bottom: 12px` |
| 5 | 防止溢出 | 子项 `min-width: 0` | 省略 |
| 6 | 卡片溢出 | `overflow: hidden` | 省略 |
| 7 | 表格布局 | `table-layout: fixed` | `table-layout: auto` |
| 8 | 文本溢出 | `text-overflow: ellipsis; overflow: hidden; white-space: nowrap` | 省略 |
| 9 | 绝对定位 | 显式 `z-index`，仅用于装饰/弹层 | 用于布局排列 |

### 1.3 溢出保护四层

```css
.root { overflow: hidden; }           /* 第1层：根容器 */
.card { overflow: hidden; }           /* 第2层：卡片/面板 */
.panel { overflow-y: auto; }          /* 第3层：滚动区域 */
.text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }  /* 第4层：文本 */
```

### 1.4 完整示例

**顶部导航栏：**
```html
<header class="navbar">               <!-- 外层：背景 + 边框 -->
  <div class="navbar-body">           <!-- 内层：flex 布局 -->
    <div class="nav-left">Logo</div>   <!-- 子容器 -->
    <div class="nav-right">Avatar</div><!-- 子容器 -->
  </div>
</header>
```
```css
.navbar { flex: 0 0 auto; background: #1a1a2e; }
.navbar-body { display: flex; align-items: center; justify-content: space-between; height: 100%; padding: 0 16px; }
.nav-left, .nav-right { display: flex; align-items: center; gap: 8px; overflow: hidden; }
```

**卡片面板：**
```html
<section class="card">                <!-- 外层：背景 + 圆角 -->
  <div class="card-body">            <!-- 内层：flex 列 + padding + gap -->
    <div class="card-title">标题</div>  <!-- 子容器 -->
    <div class="card-value">值</div>    <!-- 子容器 -->
    <div class="card-change">变化</div> <!-- 子容器 -->
  </div>
</section>
```
```css
.card { border-radius: 8px; overflow: hidden; background: #fff; }  /* 外层 — 无 display:flex */
.card-body { display: flex; flex-direction: column; padding: 16px; gap: 8px; }  /* 内层 */
.card-title, .card-value, .card-change { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }  /* 子容器 — 无 margin */
```

---

## 二、代码拆分规范 · Code Splitting

> 按**页面 (Page)** 和**组件 (Component)** 拆分 CSS 文件。每个页面、每个组件都有自己对应的 CSS 文件，样式只写在自己的文件里。禁止一股脑全塞进一个 HTML 文件。

### 2.1 核心原则

```
project/
├── index.html              # 页面 HTML
├── pages/                  # 页面级 CSS（一个页面一个文件）
│   ├── dashboard.css
│   ├── settings.css
│   └── reports.css
└── components/             # 组件级 CSS（一个组件一个文件）
    ├── NavBar.css
    ├── Sidebar.css
    ├── Card.css
    └── DataTable.css
```

**规则：**

| # | 规则 | 说明 |
|---|---|---|
| 1 | 一个页面一个 CSS 文件 | `pages/dashboard.css` 只包含 Dashboard 页面的样式 |
| 2 | 一个组件一个 CSS 文件 | `components/NavBar.css` 只包含导航栏的样式 |
| 3 | 页面样式不进组件文件 | Dashboard 页面的专属样式写在 `pages/dashboard.css`，不在组件文件中 |
| 4 | 组件样式不进页面文件 | NavBar 的样式在 `components/NavBar.css`，不在页面 CSS 中 |
| 5 | HTML 需要什么就引用什么 | `<link rel="stylesheet" href="components/NavBar.css">` |
| 6 | 禁止全部塞入一个文件 | 不允许所有 CSS 写在 HTML 的 `<style>` 中 |

### 2.2 页面 CSS（pages/）

```css
/* pages/dashboard.css — 仅包含 Dashboard 页面的布局样式 */
.dashboard { display: flex; flex-direction: column; gap: 24px; padding: 24px; }
.dashboard-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
```

- 每个页面一个独立 CSS 文件
- 只包含该页面特有的布局和样式
- 组件样式（NavBar、Card 等）绝不写在这里

### 2.3 组件 CSS（components/）

```css
/* components/NavBar.css — 仅包含 NavBar 组件的样式 */
.navbar { flex: 0 0 auto; background: #1e293b; }
.navbar-body { display: flex; align-items: center; justify-content: space-between; height: 100%; padding: 0 20px; }
```

- 每个组件一个独立 CSS 文件
- 组件内部必须遵循三层容器结构（外层 → 内层 → 子容器）
- 组件的所有样式全在这个文件里，不分散到页面 CSS

### 2.4 HTML 引用方式

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="components/NavBar.css">
  <link rel="stylesheet" href="components/Sidebar.css">
  <link rel="stylesheet" href="components/Card.css">
  <link rel="stylesheet" href="components/DataTable.css">
  <link rel="stylesheet" href="pages/dashboard.css">
</head>
```

- 页面需要什么组件就引用什么
- 不需要通过一个聚合文件（没有 main.css）

### 2.5 命名约定

| 类型 | 文件命名 | CSS 类命名 |
|---|---|---|
| 组件 | PascalCase（`NavBar.css`） | kebab-case（`.nav-bar`）或 BEM |
| 页面 | kebab-case（`dashboard.css`） | 语义化（`.dashboard`） |

---

## 三、反例对照 · Anti-Patterns

| 反例 | 问题 | 正确做法 |
|---|---|---|
| `height: 56px` | 固定 px，不可缩放 | `flex: 0 0 auto; min-height: 44px` |
| `margin-bottom: 24px` 在子项上 | 间距溢出父容器 | 父容器 `gap: 24px` |
| 图标用 `margin-left: 8px` | 图标也是 flex 子项，margin 违规 | 父容器加 `gap` |
| 子项无 `min-width: 0` | flex 子项不收缩，内容溢出 | 子项 `min-width: 0` |
| 外层容器写 `display:flex` | 混合外层/内层职责 | 拆为外层(背景) + 内层(flex) |
| 全部 CSS 在 `<style>` 中 | 无法复用、维护困难 | 拆分为 pages/ + components/ 文件 |
| 页面 CSS 中写组件样式 | 组件修改需改 N 个页面 | 组件样式放 components/ |
| 组件 CSS 中写页面布局 | 组件和页面耦合 | 页面布局放 pages/ |

---

## 四、速查清单 · Checklist

- [ ] 根容器 `height: 100vh; width: 100vw; overflow: hidden`
- [ ] 每个区块：外层 → 内层 → 子容器 三层结构
- [ ] 外层无 `display:flex/grid`，无 `padding/gap`，无 `float`
- [ ] 内层有 `display:flex/grid` + `gap`（padding 单独不够）
- [ ] 无固定 `px` 定高度/宽度（装饰性元素除外）
- [ ] 无 `margin` 做 flex/grid 子项间距（包括图标）
- [ ] 所有 flex/grid 子项有 `min-width: 0` / `min-height: 0`
- [ ] 文本溢出有 `text-overflow: ellipsis` + `overflow: hidden` + `white-space: nowrap`
- [ ] `table-layout: fixed`
- [ ] 卡片级容器有 `overflow: hidden`
- [ ] 一个页面一个 CSS 文件（`pages/`）
- [ ] 一个组件一个 CSS 文件（`components/`）
- [ ] 组件样式不进页面 CSS，页面布局不进组件 CSS

---

## 五、常见违规借口 · Rationalizations

| 借口 | 为什么是错的 |
|---|---|
| "nav 高度 56px 没问题" | 页面需要适配不同字号/缩放级别 |
| "margin 更直观" | margin 不可被父容器控制，gap 统一管理 |
| "图标用 margin-left 做间距而已" | 图标也是 flex 子项，应使用父容器 gap |
| "`min-width: 0` 不写也能跑" | 加长文本时 flex 子项溢出，排查困难 |
| "卡片内容少，不需要 `overflow: hidden`" | 未来内容更新后可能出现溢出 |
| "一个文件更快" | 只在初期快，后续每次修改更慢 |
| "后期再拆分" | 后期永远不会拆分 |
| "组件样式写在页面里方便" | 组件修改要改 N 个页面 |
