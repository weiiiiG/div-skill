---
name: div-skill
description: Use when building CSS layouts for web pages — dashboards, landing pages, admin panels, settings forms, or any multi-container page structure. Triggers: creating CSS layout from scratch, reviewing CSS for overflow/overlap issues, splitting CSS into page/component files, or ensuring responsive layouts without fixed pixel sizing. Solves container nesting chaos and monolithic CSS bloat.
---

# div-skill

> **Div**ine **Skill** of CSS — 解决两层的布局问题：**容器化**解决页面元素的布局，**代码拆分**解决 CSS 文件的"布局"。
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
| 1 | 无固定 px（含 grid track） | `flex: 0 0 auto; min-height: 44px` / `grid-template-columns: clamp(200px,20vw,320px) 1fr` | `height: 56px` / `grid-template-columns: 240px 1fr` |
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

## 三、项目初始化与存量改造 · Init & Refactor

> 两个使用场景：**初始化新项目**时按规范创建结构，**改造存量项目**时先评估缺陷再修复。

### 3.1 初始化新项目

从头创建一个遵循 div-skill 规范的项目结构：

```
① 创建根容器
   └── index.html 或 App.jsx/App.vue 设置 height:100vh; width:100vw; overflow:hidden
   └── 确定 CSS 预处理器（Sass/Less/PostCSS/Tailwind）

② 创建目录结构
   └── Vanilla HTML: pages/ + components/，HTML 用 <link> 引用各文件
   └── React: src/components/ComponentName/ComponentName.jsx + .scss
   └── Vue:   src/components/ComponentName/ComponentName.vue + .scss

③ 编写组件
   └── 每个组件遵循 外层→内层→子容器 三层结构
   └── 外层：背景/边框/定位（无 display:flex/grid）
   └── 内层：display:flex/grid + gap + height:100%
   └── 子容器：overflow 控制 + text-overflow:ellipsis

④ 引入页面
   └── HTML 或 App 根组件加载各 CSS 文件
   └── 确认无 margin 做间距，无固定 px 做布局
```

### 3.2 存量项目评估流程

拿到已有代码后，按以下顺序检查：

```
① 审查 HTML 结构
   └── 找到所有容器元素（div/section/main/aside/header/footer）
   └── 检查是否有三层结构（外层→内层→子容器）
   └── 标记缺失层级的容器

② 审查 CSS 问题
   └── 搜索 height/width 固定 px → 标记为需替换
   └── 搜索 grid-template-columns 固定 px → 标记为需替换
   └── 搜索 margin-bottom/margin-top/margin-left → 标记为需替换为 gap
   └── 搜索 outer 容器上的 display:flex/grid → 标记为需拆分为 inner
   └── 检查 inner 容器是否有 gap → 标记缺失 gap 的
   └── 搜索 overflow:hidden → 标记缺失的卡片/面板

③ 审查代码拆分
   └── CSS 是否全部在一个文件中？→ 需要拆分
   └── 组件样式是否散落在页面 CSS 中？→ 需要提取
   └── 是否有全局设计变量？→ 可提取为 shared tokens
```

### 3.3 评估清单

```
□ 根容器有 height:100vh; width:100vw; overflow:hidden?
□ 每个区块是三层结构（outer/inner/child）?
□ 有固定 px 的 layout 尺寸?（height/width/grid-template）
□ 有 margin 在 flex/grid 子项上?（含图标间距）
□ outer 容器有 display:flex/grid/float?
□ inner 容器缺少 display+gap?（padding 单独不够）
□ 缺少 min-width:0 / min-height:0?
□ 卡片/面板缺少 overflow:hidden?
□ 文本缺少 text-overflow:ellipsis?
□ 全部 CSS 在单个文件中?
□ 组件样式混在页面 CSS 中?
```

### 3.4 重构流程

按顺序执行，每一步完成后进入下一步：

```
Step 1: 容器化 — 修复三层结构
   ├── 根容器：添加 height:100vh + width:100vw + overflow:hidden
   ├── 拆分容器：没有 inner 的加 inner，没有 outer 的加 outer
   └── 删除 outer 上的 display:flex/grid，放到 inner 上

Step 2: 容器化 — 修复尺寸
   ├── 将 layout 固定 px 替换为 flex:0 0 auto + min-height
   ├── 将 grid track 固定 px 替换为 clamp()
   └── 将固定宽度替换为 clamp() 或 1fr

Step 3: 容器化 — 修复间距
   ├── 将所有 margin-bottom/top/left/right 替换为父容器 gap
   └── 在每个 inner 容器上添加 display:flex/grid + gap

Step 4: 容器化 — 修复保护
   ├── 在所有 flex/grid 子项加 min-width:0 + min-height:0
   ├── 在卡片/面板加 overflow:hidden
   ├── 在文本加 text-overflow:ellipsis + overflow:hidden + white-space:nowrap
   └── 表格加 table-layout:fixed

Step 5: 代码拆分
   ├── 识别组件：导航栏、侧边栏、卡片、表格等
   ├── 为每个组件创建 components/ComponentName.css
   ├── 将组件样式从原文件移到对应组件 CSS 文件
   ├── 创建 pages/pagename.css 放页面布局样式
   ├── 更新 HTML：删除原 <style> 或原 CSS 引用
   └── 在 HTML 中添加各文件的 <link>
```

### 3.5 重构示例

**重构前（典型问题代码）：**
```html
<style>
  .header { height: 56px; background: #1e293b; display: flex; align-items: center; padding: 0 20px; }
  .header-title { font-size: 18px; font-weight: 700; color: #fff; margin-right: 16px; }
  .sidebar { width: 240px; background: #fff; padding: 16px; }
  .main { padding: 24px; }
  .card { background: #fff; padding: 20px; border-radius: 8px; }
  .card-title { font-size: 16px; margin-bottom: 8px; }
  .card-desc { font-size: 14px; color: #666; margin-top: 4px; }
</style>
```

**重构过程：**

| 问题 | 定位 | 修复方式 |
|---|---|---|
| `height: 56px` | header | `flex: 0 0 auto; min-height: 44px` |
| `display: flex + padding` 在 header | outer 混用 | 拆为 `.header-outer(背景)` + `.header-inner(flex+padding)` |
| `margin-right: 16px` | header-title | header-inner 加 `gap: 16px`，删除 margin |
| `width: 240px` | sidebar | `flex: 0 0 clamp(200px, 20vw, 280px)` |
| `margin-bottom: 8px` | card-title | card-body 加 `gap: 8px`，删除 margin |
| `margin-top: 4px` | card-desc | card-body 已用 gap，删除 margin |
| 全部 CSS 在一个 `<style>` | 无拆分 | 拆为 `components/NavBar.css` + `components/Sidebar.css` + `components/Card.css` + `pages/home.css` |

**重构后：**
```css
/* components/NavBar.css */
.header-outer { background: #1e293b; }
.header-inner { display: flex; align-items: center; height: 100%; padding: 0 20px; gap: 16px; }
.header-title { font-size: 18px; font-weight: 700; color: #fff; }

/* components/Sidebar.css */
.sidebar { flex: 0 0 clamp(200px, 20vw, 280px); }
.sidebar-inner { display: flex; flex-direction: column; height: 100%; padding: 16px; gap: 12px; }

/* components/Card.css */
.card { overflow: hidden; }
.card-body { display: flex; flex-direction: column; padding: 20px; gap: 8px; }
.card-title, .card-desc { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

---

## 四、React 集成 · React Integration

> 容器层级和代码拆分在 React 中的映射。规则不变，表达方式适配 React 组件模型。

### 4.1 容器层级在 JSX 中

三层结构在 React 组件中同样适用，通过 JSX 的嵌套 div 实现：

```jsx
// Card.jsx — 三层结构
function Card({ title, value, change }) {
  return (
    <article className="card">           {/* 外层：背景 + 圆角 + overflow */}
      <div className="card-body">        {/* 内层：flex 列 + gap + padding */}
        <span className="card-title">{title}</span>  {/* 子容器 */}
        <span className="card-value">{value}</span>  {/* 子容器 */}
        <span className="card-change">{change}</span>{/* 子容器 */}
      </div>
    </article>
  );
}
```

```scss
/* Card.scss — 对应三层结构 */
.card { overflow: hidden; border-radius: 8px; }               /* 外层 */
.card-body { display: flex; flex-direction: column; gap: 8px; padding: 16px; }  /* 内层 */
.card-title, .card-value, .card-change { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }  /* 子容器 */
```

### 4.2 代码拆分方式

React 的组件化天然支持代码拆分，每个组件目录包含组件文件 + 独立 CSS 文件：

```
src/
├── App.jsx
├── App.scss                           # 页面布局（根容器、grid 划分）
└── components/
    ├── NavBar/
    │   ├── NavBar.jsx                 # 组件逻辑
    │   └── NavBar.scss                # 组件样式，JSX 中 import
    ├── Sidebar/   Sidebar.jsx + Sidebar.scss
    ├── Card/      Card.jsx + Card.scss
    └── DataTable/ DataTable.jsx + DataTable.scss
```

**方式 — CSS 文件独立（默认 Sass）：**
```jsx
import './NavBar.scss';

function NavBar() {
  return (
    <header className="navbar">            {/* 外层 */}
      <div className="navbar-inner">       {/* 内层 */}
        <span className="navbar-title">App</span>  {/* 子容器 */}
      </div>
    </header>
  );
}
```

```scss
/* NavBar.scss — 三层结构 + 零 margin */
.navbar { flex: 0 0 auto; background: #1e293b; }
.navbar-inner { display: flex; align-items: center; height: 100%; padding: 0 20px; gap: 16px; }
.navbar-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

**CSS 预处理器支持：**

| 项目使用 | 文件扩展名 | 引入方式 |
|---|---|---|
| Sass/SCSS | `*.scss` | `import './NavBar.scss'` |
| Less | `*.less` | `import './NavBar.less'` |
| Stylus | `*.styl` | `import './NavBar.styl'` |
| PostCSS | `*.css` | `import './NavBar.css'` |
| CSS Modules | `*.module.css` | `import styles from './NavBar.module.css'` |
| Tailwind | `*.css` | 类名写于 JSX，三层结构不变 |

> 规则不变，仅文件扩展名和引用方式不同。无论使用哪种 CSS，容器层级的三层结构和零 margin 规则同样适用。
      <div className={styles['navbar-inner']}>
        <span className={styles['navbar-title']}>App</span>
      </div>
    </header>
  );
}
```

```css
/* NavBar.module.css — 三层结构 + 零 margin */
.navbar { flex: 0 0 auto; background: #1e293b; }
.navbar-inner { display: flex; align-items: center; height: 100%; padding: 0 20px; gap: 16px; }
.navbar-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

**方式 B — 全局 CSS（传统引入）：**
```jsx
import './NavBar.css';
```

```
src/components/NavBar/NavBar.css     /* 全局 CSS，类名需 BEM */
src/components/NavBar/NavBar.jsx
```

### 4.3 React 中的规则映射

| div-skill 规则 | React 中的体现 |
|---|---|
| 外层无 display:flex | JSX 外层 `<div>` 只有 className + background，内层再加 flex |
| 零 margin 在子项 | JSX 中 gap 写在父容器 style/className 上，子组件不设 margin-bottom |
| 代码拆分 | 每个组件目录：`Component.jsx` + `Component.module.css` |
| 页面布局 | `App.module.css` 定义根容器 + grid layout |
| 文本溢出 | CSS Module 中写 `text-overflow: ellipsis` |

### 4.4 React 评估清单

- [ ] 每个组件目录有对应的 CSS 文件（`.module.css` 或同名 `.css`）
- [ ] JSX 结构遵循外层→内层→子容器三层
- [ ] CSS Module 中无 `margin-bottom`/`margin-top` 在 flex 子项上
- [ ] `App.module.css` 有 `height:100vh; width:100vw; overflow:hidden`
- [ ] 组件 CSS 中无固定 `px` 高度/宽度

---

## 五、Vue 集成 · Vue Integration

> 容器层级和代码拆分在 Vue 中的映射。Vue 组件使用独立 CSS 文件（不依赖 SFC 的 `<style>` 块），样式与模板分离。

### 5.1 容器层级在 Vue 模板中

```vue
<!-- Card.vue — 仅模板 + 逻辑，无 <style> -->
<template>
  <article class="card">              <!-- 外层：背景 + 圆角 + overflow -->
    <div class="card-body">           <!-- 内层：flex 列 + gap + padding -->
      <span class="card-title">{{ title }}</span>   <!-- 子容器 -->
      <span class="card-value">{{ value }}</span>   <!-- 子容器 -->
      <span class="card-change">{{ change }}</span>  <!-- 子容器 -->
    </div>
  </article>
</template>

<script setup>
defineProps(['title', 'value', 'change'])
</script>

<style src="./Card.scss" scoped></style>
<!-- 或通过 js import：import './Card.scss' -->
```

```scss
/* Card.scss — 对应三层结构 */
.card { overflow: hidden; border-radius: 8px; background: #fff; }
.card-body { display: flex; flex-direction: column; gap: 8px; padding: 16px; }
.card-title, .card-value, .card-change { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

### 5.2 代码拆分方式

Vue 组件使用独立 CSS 文件，与模板分离：

```
src/
├── App.vue
├── App.scss                           # 页面布局（根容器）
└── components/
    ├── NavBar/
    │   ├── NavBar.vue                 # 模板 + 逻辑
    │   └── NavBar.scss                # 组件样式（默认 Sass）
    ├── Sidebar/   Sidebar.vue + Sidebar.scss
    ├── Card/      Card.vue + Card.scss
    └── DataTable/ DataTable.vue + DataTable.scss
```

**引用方式：**
```vue
<!-- NavBar.vue — 仅模板，样式在外部文件 -->
<template>
  <header class="navbar">
    <div class="navbar-inner">
      <span class="navbar-title">{{ title }}</span>
    </div>
  </header>
</template>

<script setup>
defineProps(['title'])
import './NavBar.scss'     /* 或通过 <style src> 引入 */
</script>

<style src="./NavBar.scss" scoped></style>
```

```scss
/* NavBar.scss — 三层结构 + 零 margin */
.navbar { flex: 0 0 auto; background: #1e293b; }
.navbar-inner { display: flex; align-items: center; height: 100%; padding: 0 20px; gap: 16px; }
.navbar-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

**CSS 预处理器支持：**

| 项目使用 | 文件扩展名 | 引入方式 |
|---|---|---|
| Sass/SCSS | `*.scss` | `import './NavBar.scss'` 或 `<style src>` |
| Less | `*.less` | `import './NavBar.less'` |
| PostCSS | `*.css` | `import './NavBar.css'` |
| Tailwind | `*.css` | 类名写于 template，三层结构不变 |

> 无论使用哪种 CSS 预处理器，容器层级的三层结构和零 margin 规则同样适用。

### 5.3 Vue 中的规则映射

| div-skill 规则 | Vue 中的体现 |
|---|---|
| 外层无 display:flex | `<template>` 中外层元素只设背景，内层设 flex |
| 零 margin 在子项 | `*.scss` 中用 gap 代替子项 margin |
| 代码拆分 | 每个组件目录：`Component.vue` + `Component.scss` |
| 页面布局 | `App.vue` + `App.scss` 定义根容器 + 整体布局 |
| 样式与模板分离 | `.vue` 文件不含 `<style>`，样式在独立 `*.scss` 中 |

### 5.4 Vue 评估清单

- [ ] 每个组件目录：`Component.vue` + `Component.scss`
- [ ] `.vue` 文件不含 `<style>` 块（样式在独立文件）
- [ ] `<template>` 结构遵循外层→内层→子容器三层
- [ ] `*.scss` 中无 `margin-bottom`/`margin-top` 在 flex 子项上
- [ ] `App.scss` 有 `height:100vh; width:100vw; overflow:hidden`
- [ ] 组件样式中无固定 `px` 高度/宽度

---

## 六、反例对照 · Anti-Patterns

| 反例 | 问题 | 正确做法 |
|---|---|---|
| `height: 56px` | 固定 px，不可缩放 | `flex: 0 0 auto; min-height: 44px` |
| `grid-template-columns: 240px 1fr` | grid track 固定 px | `grid-template-columns: clamp(200px,20vw,320px) 1fr` |
| `margin-bottom: 24px` 在子项上 | 间距溢出父容器 | 父容器 `gap: 24px` |
| 图标用 `margin-left: 8px` | 图标也是 flex 子项，margin 违规 | 父容器加 `gap` |
| 子项无 `min-width: 0` | flex 子项不收缩，内容溢出 | 子项 `min-width: 0` |
| 外层容器写 `display:flex` | 混合外层/内层职责 | 拆为外层(背景) + 内层(flex) |
| 全部 CSS 在 `<style>` 中 | 无法复用、维护困难 | 拆分为 pages/ + components/ 文件 |
| 页面 CSS 中写组件样式 | 组件修改需改 N 个页面 | 组件样式放 components/ |
| 组件 CSS 中写页面布局 | 组件和页面耦合 | 页面布局放 pages/ |

---

## 七、速查清单 · Checklist

- [ ] 根容器 `height: 100vh; width: 100vw; overflow: hidden`
- [ ] 每个区块：外层 → 内层 → 子容器 三层结构
- [ ] 外层无 `display:flex/grid`，无 `padding/gap`，无 `float`
- [ ] 内层有 `display:flex/grid` + `gap`（padding 单独不够）
- [ ] 无固定 `px` 定高度/宽度（含 grid track 尺寸，装饰性元素除外）
- [ ] 无 `margin` 做 flex/grid 子项间距（包括图标）
- [ ] 所有 flex/grid 子项有 `min-width: 0` / `min-height: 0`
- [ ] 文本溢出有 `text-overflow: ellipsis` + `overflow: hidden` + `white-space: nowrap`
- [ ] `table-layout: fixed`
- [ ] 卡片级容器有 `overflow: hidden`
- [ ] 一个页面一个 CSS 文件（`pages/`）
- [ ] 一个组件一个 CSS 文件（`components/`）
- [ ] 组件样式不进页面 CSS，页面布局不进组件 CSS

---

## 八、常见违规借口 · Rationalizations

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
