# div-skill

> div-skill — a frontend container and code organization specification:
> * **Container Hierarchy:** a three-layer pattern (outer→inner→child) that fills the viewport, prevents overflow, and eliminates margin-based spacing bugs.
> * **Code Splitting:** split code by page and component (JS, CSS, templates together), each page/component owns its own files — no more monolithic blobs.
>
> 一套前端容器与布局规范，包含两个核心：
> * **容器层级架构**：外层→内层→子容器三层结构，撑满视口、杜绝溢出、消灭 margin 间距 bug。
> * **代码拆分**：按页面和组件拆分前端代码（JS、CSS、模板一起拆分），每个页面/组件拥有自己的文件。

---

- [中文](#中文) · [ENGLISH](#english)

---

## 中文

### 痛点

前端布局与代码组织的两个常见问题：

1. **容器混乱** — 元素溢出、重叠、撑不满视口；固定 px 在不同屏幕下错位
2. **代码巨石** — 全部 HTML/CSS/JS 混在一个文件中，项目越大越难维护；组件没有独立文件，修改牵一发动全身

### 使用场景

| 场景 | 说明 |
|---|---|
| **新建页面** | 从零开始构建仪表盘、后台、着陆页、设置页 —— 直接按三层结构组织容器、按页面/组件拆分代码 |
| **存量项目改造** | 已有代码布局混乱、溢出频发、CSS 集中在一个文件 —— 先评估缺陷再逐步容器化和拆分。参考[重构示例](examples/refactoring/) |
| **React 项目** | 组件缺少统一布局规范、样式散落、目录结构混乱 —— 按 layout/pages/components/hooks/routes/stores/api 分层 |
| **Vue 项目** | 模板中容器嵌套混乱、样式内嵌在 SFC、缺少文件组织 —— 分离 .vue 和 .scss、按 composables/router/stores 分层 |
| **团队规范** | 多人协作时 CSS 风格不统一、review 成本高 —— 用速查清单统一约束，新人上手即遵循规范 |

> div-skill **只解决布局和代码组织问题**（容器结构 + 页面/组件代码拆分）。页面功能（数据请求、交互逻辑、业务状态等）需要另行实现。

### 重构安全承诺

对已有项目做容器化和代码拆分时，div-skill 遵循**只动结构、不动功能**的原则：

1. **改前摸底** — 先读取项目代码，理清目录结构、数据流、状态联动、路由和依赖关系。截图记录当前页面视觉效果（颜色、字体、布局），作为改后对比依据
2. **只改布局** — 只添加/调整容器层级、拆分代码文件、替换固定 px 为响应式单位（`clamp`/`fr`/`%`）、替换 margin 为 `gap`。**不修改** JavaScript 逻辑、API 调用、状态管理、组件 props、路由配置、颜色值、字体族、背景图路径
3. **保持库不变** — 不得擅自替换或移除项目正在使用的 UI 组件库（Ant Design、Element UI、Bootstrap、Tailwind、Material UI 等）
4. **宽度约束** — 子容器宽度不超过父容器，使用相对大小（`%`/`fr`/`clamp`），容器整体不需要横向滚动条即可完整显示
5. **改后验证** — 验证视觉效果一致、无溢出、交互功能、数据流、路由跳转、import 路径均正常后，才确认重构完成

> 参考[重构示例](examples/refactoring/)：一个带计数器、导航、通知徽章的页面，重构后 JS 代码零改动，所有交互功能保持不变。

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

按页面和组件拆分代码（JS + CSS + 模板一起拆分）：

```
project/
├── index.html
├── pages/                  # 一个页面一个目录
│   ├── dashboard.css
│   └── settings.css
└── components/             # 一个组件一个目录
    ├── NavBar.css
    ├── Sidebar.css
    ├── Card.css
    └── DataTable.css
```

**规则：**
- 一个页面一个目录，一个组件一个目录
- 组件代码（JS + CSS + 模板）只放在自己的目录中
- 页面布局代码只放在 `pages/` 目录中
- HTML 直接 `<link>` 引用各文件（无聚合入口）

### 示例

| 示例 | 类型 | 特性 |
|---|---|---|
| [Dashboard](examples/dashboard/) | HTML/CSS | 导航、侧栏、统计卡片、数据表 |
| [重构示例](examples/refactoring/) | HTML/CSS | 从单文件拆分，含计数器+导航+通知状态 |
| [React Dashboard](examples/react-dashboard/) | React + Sass | layout/pages/components/routes/stores/hooks/api |
| [Vue Dashboard](examples/vue-dashboard/) | Vue 3 + Sass | layout/pages/components/router/stores/composables/api |

### 规范文档

见 [SKILL.md](./SKILL.md)。

### 许可

MIT

---

## ENGLISH

### The Problem

Two common pains in frontend layout and code organization:

1. **Container chaos** — elements overflow, overlap, or don't fill the viewport; fixed px values break on different screen sizes
2. **Code monolith** — all HTML/CSS/JS mixed in one file; components lack their own files, making changes risky and maintenance painful

### Usage Scenarios

| Scenario | Description |
|---|---|
| **New project** | Build a dashboard, admin panel, landing page from scratch — use three-layer containers, split code by page/component |
| **Legacy refactor** | Existing code has layout issues, monolithic files — evaluate defects, containerize and split step by step. See [refactoring example](examples/refactoring/) |
| **React project** | Components lack layout rules, styles scattered, messy structure — organize into layout/pages/components/hooks/routes/stores/api |
| **Vue project** | Template nesting chaos, styles embedded in SFC — separate .vue and .scss, use composables/router/stores layers |
| **Team standard** | Multiple devs, inconsistent CSS, high review cost — use checklist for unified rules, new hires follow standard from day one |

> div-skill handles **layout and code organization only** (container structure + page/component code splitting). Functionality (data fetching, interaction logic, state management) needs separate implementation.

### Refactoring Safety Guarantee

When containerizing and splitting code for an existing project, div-skill follows a **structure-only, no-functional-change** principle:

1. **Assess first** — read the project, analyze directory structure, data flow, state linkage, routes, dependencies. Screenshot current visual state (colors, fonts, layout) for before/after comparison
2. **Layout only** — adjust containers, split code files, replace fixed px with responsive units (`clamp`/`fr`/`%`), replace margin with `gap`. **Do not change** JavaScript logic, API calls, state management, component props, route configs, color values, font families, or background image paths
3. **Preserve libraries** — do not replace or remove UI component libraries (Ant Design, Element UI, Bootstrap, Tailwind, Material UI, etc.)
4. **Width constraints** — child containers must not exceed parent width, use relative sizing (`%`/`fr`/`clamp`); no horizontal scrollbar needed to view full content
5. **Verify after** — confirm visual consistency, no overflow, interaction, data flow, routing, and import paths all work before considering the refactoring complete

> See the [refactoring example](examples/refactoring/): a page with counter, navigation, and notification badge — zero JS changes after refactoring, all interactions preserved.

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

Split code by page and component (JS + CSS + templates):

```
project/
├── index.html
├── pages/                  # One directory per page
│   ├── dashboard.css
│   └── settings.css
└── components/             # One directory per component
    ├── NavBar.css
    ├── Sidebar.css
    ├── Card.css
    └── DataTable.css
```

**Rules:**
- One directory per page, one directory per component
- Component code (JS + CSS + templates) goes in its own directory
- Page layout code goes in the `pages/` directory

### Examples

| Example | Type | Features |
|---|---|---|
| [Dashboard](examples/dashboard/) | HTML/CSS | Nav, sidebar, stat cards, data table |
| [Refactoring](examples/refactoring/) | HTML/CSS | Split from single file, counter+navigation+state |
| [React Dashboard](examples/react-dashboard/) | React + Sass | layout/pages/components/routes/stores/hooks/api |
| [Vue Dashboard](examples/vue-dashboard/) | Vue 3 + Sass | layout/pages/components/router/stores/composables/api |

### Specification

See [SKILL.md](./SKILL.md).

### License

MIT
