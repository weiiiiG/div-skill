# DivSkill

<p align="center">
  <a href="#en">🇬🇧 English</a> · <a href="#zh">🇨🇳 中文</a>
</p>

---

<h2 align="center" id="en">DivSkill — CSS Containerization & Code Splitting</h2>

<p align="center">
  <b>Div</b>ine <b>Skill</b> of CSS Layout — Containerize elements with a three-layer structure, split code by page and component.
</p>

---

### The Problem

Two common pains in frontend CSS:

1. **Container chaos** — elements overflow, overlap, or don't fill the viewport; fixed `px` values break on different screen sizes
2. **Monolithic CSS** — all styles dumped into one `<style>` block or one CSS file, impossible to maintain as the project grows

### The Solution

DivSkill solves both with two simple specifications:

#### 1. Container Hierarchy Architecture

A three-layer nesting pattern that eliminates overflow and fills the viewport:

```
Outer Container      (width/height, background, border — NO flex/grid, NO padding/gap)
  └── Inner Container (flex/grid layout, height:100%, padding, gap)
      └── Child Container(s) (overflow control, content alignment — NO margin)
```

**The iron rules:**

| Rule | Description |
|---|---|
| Root | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | Use `flex:0 0 auto + min-height`, `clamp()`, `1fr` |
| No margin on children | All spacing via `gap` on parent (including icons) |
| Outer never does layout | No `display:flex/grid`, no `padding/gap`, no `float` on outer containers |
| Inner always has flex+gap | `padding` alone is NOT enough — must have `display:flex/grid` |
| Shrink protection | `min-width:0` / `min-height:0` on all flex/grid children |
| Overflow protection | 4 layers: root → card → panel → text |
| Table fixed layout | `table-layout:fixed` |
| Absolute positioning | Explicit `z-index`, decoration only, not for layout |

**Example — Card component:**
```html
<section class="card">                <!-- Outer: background, border-radius (NO flex) -->
  <div class="card-body">            <!-- Inner: flex column + padding + gap -->
    <div class="card-title">Title</div>  <!-- Child: overflow control, NO margin -->
    <div class="card-value">Value</div>  <!-- Child -->
  </div>
</section>
```
```css
.card { border-radius: 8px; overflow: hidden; background: #fff; }          /* Outer */
.card-body { display: flex; flex-direction: column; padding: 16px; gap: 8px; } /* Inner */
.card-title, .card-value { overflow: hidden; text-overflow: ellipsis; }      /* Children */
```

#### 2. Code Splitting by Page & Component

Split CSS by **page** and **component** — each module writes only to its own file:

```
project/
├── index.html
├── pages/                  # One CSS file per page
│   ├── dashboard.css
│   └── settings.css
└── components/             # One CSS file per component
    ├── NavBar.css
    ├── Sidebar.css
    ├── Card.css
    └── DataTable.css
```

**Rules:**
- One CSS file per page, one per component
- Component styles go ONLY in `components/ComponentName.css`
- Page layout styles go ONLY in `pages/pagename.css`
- Never write component styles inside page CSS, or vice versa
- HTML directly links what it needs (`<link href="components/NavBar.css">`)

---

### Quick Start

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="components/NavBar.css">
  <link rel="stylesheet" href="components/Card.css">
  <link rel="stylesheet" href="pages/dashboard.css">
</head>
<body>
  <!-- Three-layer root -->
  <div class="app">            <!-- Outer: viewport fill -->
    <div class="app-inner">   <!-- Inner: flex column -->
      <header class="navbar"> <!-- Container positioned by parent -->
        <div class="navbar-outer">   <!-- Outer: background -->
          <div class="navbar-inner"> <!-- Inner: flex row -->
            <span>Logo</span>
          </div>
        </div>
      </header>
      <main class="content">  <!-- flex:1 fills remaining space -->
        <div class="content-outer">
          <div class="content-inner">
            <h1>Dashboard</h1>
          </div>
        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

---

### Why DivSkill?

| Before ❌ | After ✅ |
|---|---|
| `.header { height: 56px; }` — breaks when zoomed | `.header { flex: 0 0 auto; min-height: 44px; }` |
| `.card-label { margin-bottom: 4px; }` — spacing not controlled by parent | Parent `gap: 8px`, children have no margin |
| All CSS in one `<style>` block — impossible to maintain | Split into `pages/` and `components/` files |
| `.sidebar { width: 240px; }` — overflows on small screens | `.sidebar { flex: 0 0 clamp(200px, 20vw, 320px); }` |

---

### Examples

| Example | Type | Features |
|---|---|---|
| [Dashboard](examples/dashboard/) | Multi-file | Nav, sidebar, stat cards, data table. Demonstrates both containerization + code splitting. |
| [Landing Page](examples/landing-page/) | Single HTML | Hero + feature cards. Containerization with decorative backgrounds. |
| [Settings Page](examples/settings-page/) | Single HTML | Form + modal. Layout + z-index overlay pattern. |

---

### Specification

See [SKILL.md](./SKILL.md) for the full spec (bilingual).

---

<br>
<hr>
<br>

<h2 align="center" id="zh">DivSkill — 元素的容器化与代码拆分</h2>

<p align="center">
  <b>Div</b>ine <b>Skill</b> 的 CSS 布局之道 — 用三层结构容器化元素，按页面和组件拆分代码。
</p>

---

### 痛点

前端 CSS 的两个常见问题：

1. **容器混乱** — 元素溢出、重叠、撑不满视口；固定 `px` 值在不同屏幕尺寸下错位
2. **CSS 巨石** — 全部样式塞在一个 `<style>` 块或一个 CSS 文件中，项目越大越难维护

### 解决方案

DivSkill 通过两个简单的规范解决这两个问题：

#### 1. 容器层级架构

一种三层嵌套模式，杜绝溢出、填满视口：

```
外层容器      (宽高、背景、边框 — 无 flex/grid，无 padding/gap)
  └── 内层容器 (flex/grid 布局、height:100%、padding、gap)
      └── 子容器 (溢出控制、内容对齐 — 无 margin)
```

**铁律：**

| 规则 | 说明 |
|---|---|
| 根容器 | `height:100vh; width:100vw; overflow:hidden` |
| 无固定 px | 使用 `flex:0 0 auto + min-height`、`clamp()`、`1fr` |
| 子项无 margin | 所有间距通过父容器 `gap`（包括图标） |
| 外层不做布局 | 无 `display:flex/grid`、无 `padding/gap`、无 `float` |
| 内层必有 flex+gap | 只有 `padding` 不够 — 必须有 `display:flex/grid` |
| 收缩保护 | 所有 flex/grid 子项加 `min-width:0` / `min-height:0` |
| 溢出保护 | 4 层：根容器 → 卡片 → 面板 → 文本 |
| 表格固定布局 | `table-layout:fixed` |
| 绝对定位 | 显式 `z-index`，仅用于装饰，不可用于布局 |

**示例 — 卡片组件：**
```html
<section class="card">                <!-- 外层：背景、圆角（无 flex） -->
  <div class="card-body">            <!-- 内层：flex 列 + padding + gap -->
    <div class="card-title">标题</div>  <!-- 子容器：溢出控制，无 margin -->
    <div class="card-value">值</div>    <!-- 子容器 -->
  </div>
</section>
```
```css
.card { border-radius: 8px; overflow: hidden; background: #fff; }          /* 外层 */
.card-body { display: flex; flex-direction: column; padding: 16px; gap: 8px; } /* 内层 */
.card-title, .card-value { overflow: hidden; text-overflow: ellipsis; }      /* 子容器 */
```

#### 2. 按页面和组件拆分代码

按**页面**和**组件**拆分 CSS — 每个模块只写自己的文件：

```
project/
├── index.html
├── pages/                  # 一个页面一个 CSS 文件
│   ├── dashboard.css
│   └── settings.css
└── components/             # 一个组件一个 CSS 文件
    ├── NavBar.css
    ├── Sidebar.css
    ├── Card.css
    └── DataTable.css
```

**规则：**
- 一个页面一个 CSS 文件，一个组件一个 CSS 文件
- 组件样式只能写在 `components/组件名.css` 中
- 页面布局样式只能写在 `pages/页面名.css` 中
- 禁止在页面 CSS 中写组件样式，反之亦然
- HTML 直接引用需要的文件（`<link href="components/NavBar.css">`）

---

### 快速开始

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="components/NavBar.css">
  <link rel="stylesheet" href="components/Card.css">
  <link rel="stylesheet" href="pages/dashboard.css">
</head>
<body>
  <!-- 三层结构根容器 -->
  <div class="app">            <!-- 外层：撑满视口 -->
    <div class="app-inner">   <!-- 内层：flex 列 -->
      <header class="navbar"> <!-- 由父容器定位 -->
        <div class="navbar-outer">   <!-- 外层：背景 -->
          <div class="navbar-inner"> <!-- 内层：flex 行 -->
            <span>Logo</span>
          </div>
        </div>
      </header>
      <main class="content">  <!-- flex:1 撑满剩余空间 -->
        <div class="content-outer">
          <div class="content-inner">
            <h1>Dashboard</h1>
          </div>
        </div>
      </main>
    </div>
  </div>
</body>
</html>
```

---

### 为什么用 DivSkill？

| 使用前 ❌ | 使用后 ✅ |
|---|---|
| `.header { height: 56px; }` — 缩放时溢出 | `.header { flex: 0 0 auto; min-height: 44px; }` |
| `.card-label { margin-bottom: 4px; }` — 间距不受父容器控制 | 父容器 `gap: 8px`，子项无 margin |
| 所有 CSS 在一个 `<style>` 块 | 拆分到 `pages/` + `components/` |
| `.sidebar { width: 240px; }` — 小屏溢出 | `.sidebar { flex: 0 0 clamp(200px, 20vw, 320px); }` |

---

### 示例

| 示例 | 类型 | 特性 |
|---|---|---|
| [Dashboard](examples/dashboard/) | 多文件 | 导航、侧栏、统计卡片、数据表。展示容器化 + 代码拆分。 |
| [Landing Page](examples/landing-page/) | 单 HTML | Hero + 特性卡片。带装饰背景的容器化。 |
| [Settings Page](examples/settings-page/) | 单 HTML | 表单 + 模态框。布局 + z-index 弹层模式。 |

---

### 规范文档

完整规范见 [SKILL.md](./SKILL.md)（中英双语）。

---

### License · 许可

MIT
