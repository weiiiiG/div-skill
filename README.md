# div-skill

> **Div**ine **Skill** of CSS Layout — Containerize elements with three-layer structure, split code by page and component.

---

<div align="center">

[🇬🇧 English](#en) · [🇨🇳 中文](#zh)

</div>

---

<details open>
<summary><strong>🇬🇧 English</strong></summary>

<br>

### The Problem

Two common pains in frontend CSS:

1. **Container chaos** — elements overflow, overlap, or don't fill the viewport
2. **Monolithic CSS** — all styles in one `<style>` block, impossible to maintain

### The Solution

#### 1. Container Hierarchy

A three-layer nesting pattern:

```
Outer Container      (width/height, background, border — NO flex/grid, NO padding/gap)
  └── Inner Container (flex/grid layout, height:100%, padding, gap)
      └── Child Container(s) (overflow control, content alignment — NO margin)
```

**Rules:**

| # | Rule |
|---|---|
| 1 | Root: `height:100vh; width:100vw; overflow:hidden` |
| 2 | No fixed px on layout — use `min-height`, `clamp()`, `1fr` (including grid tracks) |
| 3 | No margin on flex/grid children — all spacing via parent `gap` (icons too) |
| 4 | Outer container NEVER has `display:flex/grid`, `padding/gap`, or `float` |
| 5 | Inner container MUST have `display:flex/grid + gap` — padding alone is a violation |
| 6 | `min-width:0` / `min-height:0` on all flex/grid children |
| 7 | `overflow:hidden` on cards, `table-layout:fixed` on tables |
| 8 | `text-overflow:ellipsis` on overflowing text |
| 9 | Absolutely positioned elements: explicit `z-index`, decoration only |

#### 2. Code Splitting

Split CSS by page and component:

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
- Page layout goes ONLY in `pages/pagename.css`
- HTML `<link>`s each file directly (no aggregator)

### Examples

| Example | Type | Features |
|---|---|---|
| [Dashboard](examples/dashboard/) | Multi-file | Nav, sidebar, stat cards, data table |
| [Landing Page](examples/landing-page/) | Single HTML | Hero + feature cards |
| [Settings Page](examples/settings-page/) | Single HTML | Form + modal overlay |

### Specification

See [SKILL.md](./SKILL.md).

### License

MIT

</details>

<details>
<summary><strong>🇨🇳 中文</strong></summary>

<br>

### 痛点

前端 CSS 的两个常见问题：

1. **容器混乱** — 元素溢出、重叠、撑不满视口
2. **CSS 巨石** — 全部样式塞在一个 `<style>` 块中，无法维护

### 解决方案

#### 1. 容器层级架构

三层嵌套模式：

```
外层容器      (宽高、背景、边框 — 无 flex/grid，无 padding/gap)
  └── 内层容器 (flex/grid 布局、height:100%、padding、gap)
      └── 子容器 (溢出控制、内容对齐 — 无 margin)
```

**规则：**

| # | 规则 |
|---|---|
| 1 | 根容器：`height:100vh; width:100vw; overflow:hidden` |
| 2 | 无固定 px 布局（含 grid track）— 用 `min-height`、`clamp()`、`1fr` |
| 3 | 子项无 margin — 所有间距用父容器 `gap`（图标也一样） |
| 4 | 外层容器不能用 `display:flex/grid`、`padding/gap`、`float` |
| 5 | 内层容器必须有 `display:flex/grid + gap` — 只有 padding 算违规 |
| 6 | 所有 flex/grid 子项加 `min-width:0` / `min-height:0` |
| 7 | 卡片 `overflow:hidden`，表格 `table-layout:fixed` |
| 8 | 文本溢出加 `text-overflow:ellipsis` |
| 9 | 绝对定位元素加显式 `z-index`，仅用于装饰 |

#### 2. 代码拆分

按页面和组件拆分 CSS：

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
- 页面布局只能写在 `pages/页面名.css` 中
- HTML 直接 `<link>` 引用各文件（无聚合入口）

### 示例

| 示例 | 类型 | 特性 |
|---|---|---|
| [Dashboard](examples/dashboard/) | 多文件 | 导航、侧栏、统计卡片、数据表 |
| [Landing Page](examples/landing-page/) | 单 HTML | Hero + 特性卡片 |
| [Settings Page](examples/settings-page/) | 单 HTML | 表单 + 模态框弹层 |

### 规范文档

见 [SKILL.md](./SKILL.md)。

### 许可

MIT

</details>
