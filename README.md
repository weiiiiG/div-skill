# DivSkill

> **Div**ine **Skill** of CSS Layout — A Container Hierarchy Architecture specification and CSS file organization standard for building robust, overflow-free, responsive page layouts.
>
> **Div**ine **Skill** 的 CSS 布局之道 — 一套容器层级架构规范和 CSS 文件组织标准，用于构建稳健、无溢出、响应式的页面布局。

---

## Overview · 概述

DivSkill defines two complementary specifications in a single [SKILL.md](SKILL.md) that together form a complete CSS architecture:

**DivSkill 在单个 [SKILL.md](SKILL.md) 中定义了两个互补的规范，共同构成完整的 CSS 架构：**

### 1. Container Hierarchy Architecture · 容器层级架构
A three-layer nested container pattern that ensures all containers fill the viewport, content never overflows, and elements never overlap when shrinking. From outside to inside: **Outer Container → Inner Container → Child Container**.

一种从外到内、层层递进的容器嵌套模式。确保所有容器撑满视口、内容不溢出、缩小时不重叠。由外到内：**外层容器 → 内层容器 → 子容器**。

### 2. CSS File Organization · CSS 文件组织
A layered file structure that prevents monolithic CSS files: **Design Tokens → Base Styles → Component Styles → Page Styles**, aggregated through a single entry point.

一种分层文件结构，避免将全部 CSS 塞进一个文件：**设计令牌 → 基础样式 → 组件样式 → 页面样式**，通过单一入口文件聚合。

---

## Core Principles · 核心原则

### Three-Layer Structure · 三层结构

```
Outer Container       (width/height, background, border, position, decoration)
  └── Inner Container  (flex/grid layout, padding/gap, height:100%)
      ├── Child A      (overflow control, content alignment)
      ├── Child B
      └── Child C
```

| Layer · 层级 | Responsibilities · 职责 | Forbidden · 禁止 |
|---|---|---|
| **Outer · 外层** | Width/height, background, border, `position`, decoration | `display:flex/grid`, `padding/gap`, `float` |
| **Inner · 内层** | `display:flex/grid`, `padding/gap`, `height:100%` | Background, border, decoration |
| **Child · 子容器** | `overflow:hidden`, content alignment with `display:flex` | `padding/gap`, `margin` |

### The Iron Rules · 铁律

1. **Root** — `height:100vh; width:100vw; overflow:hidden`
2. **No fixed px** — use `flex: 0 0 auto + min-height`, `clamp()`, `fr` units
3. **No margin on flex/grid children** — use `gap` on parent
4. **Every inner container MUST have `display:flex/grid + gap`** — `padding` alone is insufficient
5. **`min-width:0` / `min-height:0`** on all flex/grid children
6. **`overflow:hidden`** on cards/panels, **`table-layout:fixed`** on tables
7. **`text-overflow:ellipsis`** on overflowing text
8. **Explicit `z-index`** on absolutely positioned elements
9. **Outer containers: NO `display:flex/grid`, NO `padding/gap`, NO `float`**

---

## Quick Start · 快速开始

### Minimal Example · 最小示例

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Root: three-layer */
    .app { height: 100vh; width: 100vw; overflow: hidden; }           /* Outer */
    .app-inner { display: flex; flex-direction: column; height: 100%; } /* Inner */

    /* Nav: three-layer */
    .nav { flex: 0 0 auto; }                                 /* Child for positioning */
    .nav-outer { background: #1e293b; }                       /* Outer */
    .nav-inner { display: flex; align-items: center;
                 height: 100%; padding: 0 20px; gap: 16px; }  /* Inner */
    .nav-title { overflow: hidden; text-overflow: ellipsis;
                 white-space: nowrap; }                       /* Child */

    /* Content: fills remaining space */
    .content { flex: 1; min-height: 0; }                      /* Child */
    .content-outer { height: 100%; }                          /* Outer */
    .content-inner { display: flex; flex-direction: column;
                     height: 100%; padding: 24px; gap: 24px;
                     overflow-y: auto; }                      /* Inner */
  </style>
</head>
<body>
  <div class="app">         <!-- 外层 -->
    <div class="app-inner"> <!-- 内层 -->
      <header class="nav">  <!-- 子容器 -->
        <div class="nav-outer">   <!-- 外层 -->
          <div class="nav-inner"> <!-- 内层 -->
            <span class="nav-title" style="color:#fff">DivSkill</span>
          </div>
        </div>
      </header>
      <div class="content"> <!-- 子容器 -->
        <div class="content-outer">   <!-- 外层 -->
          <div class="content-inner"> <!-- 内层 -->
            <h1>Hello, DivSkill!</h1>
            <p>Content area fills the remaining space below the nav.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

### With File Organization · 使用文件组织

```
project/
├── index.html              # <link rel="stylesheet" href="src/styles/main.css">
└── src/styles/
    ├── main.css            # @import aggregator
    ├── tokens/             # CSS custom properties
    ├── base/               # Reset + global
    ├── components/         # One file per component
    └── pages/              # One file per page
```

---

## Examples · 示例

| Example · 示例 | Type · 类型 | Features · 特性 |
|---|---|---|
| [Dashboard](examples/dashboard/) | Multi-file | Full dashboard with nav, sidebar, cards, data table. Demonstrates both container hierarchy + file organization. |
| [Landing Page](examples/landing-page/) | Single HTML | Marketing page with hero section and feature cards. Demonstrates container hierarchy with decorative backgrounds. |
| [Settings Page](examples/settings-page/) | Single HTML | Settings form with modal dialog. Demonstrates form layout + modal overlay with z-index. |

---

## Why DivSkill? · 为什么用 DivSkill？

### Before · 使用前

```css
/* ❌ Everything in one file */
.header { height: 56px; }
.card { padding: 20px; }
.card-label { margin-bottom: 4px; }
.card-value { margin-top: 8px; }
/* What happens when text overflows? What about 1024px width? */
```

### After · 使用后

```css
/* ✅ Structured, maintainable, resilient */
/* Root fills viewport, cards hide overflow, gap replaces margin */
.app { height: 100vh; overflow: hidden; }
.card { overflow: hidden; }
.card-body { display: flex; flex-direction: column; gap: 8px; padding: 20px; }
```

**Benefits · 收益：**
- Zero overflow surprises across viewport sizes · 各尺寸视口无溢出
- Predictable three-layer debugging · 可预测的三层调试
- No margin-induced spacing bugs · 无 margin 引起的间距 bug
- Components are truly reusable · 组件真正可复用
- Design tokens enable one-stop theming · 设计令牌实现一站式主题化

---

## Specification · 规范文档

完整规范请阅读 [SKILL.md](SKILL.md)（中英双语）。

The full specification is in [SKILL.md](SKILL.md) (bilingual Chinese/English).

---

## License · 许可

MIT
