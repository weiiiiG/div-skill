---
name: div-skill
description: "Use when: (1) building any page layout from scratch; (2) existing CSS has overflow, overlap, or viewport fill issues; (3) all styles dumped in one file needing split into pages/ and components/; (4) refactoring legacy project with disorganized structure. Triggers: elements overflowing, fixed px breaking on resize, margin-based spacing bugs, monolithic CSS, React/Vue project with no file organization."
---

# div-skill

> 解决两层的布局问题：**容器化**解决页面元素的布局，**代码拆分**解决 CSS 文件的"布局"。

---

## 一、容器层级架构 · Container Hierarchy

### 三层结构（必须遵守）

```
外层容器          (宽高、背景、边框、定位、装饰伪元素)
  └── 内层容器     (flex/grid 划分空间、height:100%、padding/gap)
      ├── 子容器 A  (overflow 约束、display:flex 对齐内容，无 margin)
      ├── 子容器 B
      └── 子容器 C
```

| 层级 | 职责 | 禁止 |
|---|---|---|
| **外层容器** | 宽高、背景、边框、`position`、装饰 | `display:flex/grid`/`float` 做内部划分、`padding`/`gap` |
| **内层容器** | `display:grid/flex`、`height:100%`、`padding/gap` | 背景色、边框、装饰 |
| **子容器** | `overflow:hidden`、`display:flex` 对齐 | `padding`/`gap`、`margin` |

> 外层不可有 `display:flex/grid` 或 `float`，这些属于内层容器。外层可有 `flex:0 0 auto` 控制自身在父级中的位置，允许。

### 硬性规则

```css
.root { display: flex; flex-direction: column; height: 100vh; width: 100vw; overflow: hidden; }
```

| # | 规则 | 正确做法 | 错误做法 |
|---|---|---|---|
| 1 | 无固定 px（含 grid track） | `min-height`、`clamp()`、`1fr` | `height:56px`、`grid-template-columns:240px 1fr` |
| 2 | 子项间距 | 父容器 `gap` | 子项 `margin-*` |
| 3 | 外层不做布局 | 外层纯背景，内层 flex/grid | outer 上写 `display:flex`/`padding` |
| 4 | 内层必有 display+gap | `display:flex/grid + gap` | 只有 `padding` |
| 5 | 防溢出 | `min-width:0` 在 flex 子项、`overflow:hidden` 在卡片 | 省略 |
| 6 | 表格 | `table-layout:fixed` | `table-layout:auto` |
| 7 | 文本溢出 | `text-overflow:ellipsis; overflow:hidden; white-space:nowrap` | 省略 |
| 8 | 绝对定位 | 显式 `z-index`，仅用于装饰/弹层 | 用于布局排列 |

### 溢出保护

```
.root { overflow: hidden; } → .card { overflow: hidden; } → .panel { overflow-y: auto; } → .text { text-overflow: ellipsis; ... }
```

### 示例：导航栏

```html
<header class="navbar">               <!-- 外层：背景 -->
  <div class="navbar-body">           <!-- 内层：flex -->
    <div class="nav-left">Logo</div>   <!-- 子容器 -->
    <div class="nav-right">Avatar</div><!-- 子容器 -->
  </div>
</header>
```
```css
.navbar { flex:0 0 auto; background:#1a1a2e; }
.navbar-body { display:flex; align-items:center; justify-content:space-between; height:100%; padding:0 16px; }
.nav-left, .nav-right { display:flex; align-items:center; gap:8px; overflow:hidden; }
```

### 示例：卡片

```html
<section class="card"><div class="card-body">
  <div class="card-title">标题</div><div class="card-value">值</div><div class="card-change">变化</div>
</div></section>
```
```css
.card { border-radius:8px; overflow:hidden; background:#fff; }
.card-body { display:flex; flex-direction:column; padding:16px; gap:8px; }
.card-title, .card-value, .card-change { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
```

---

## 二、代码拆分规范 · Code Splitting

按**页面 (Page)** 和**组件 (Component)** 拆分 CSS 文件，每个模块只写在自己的文件里。

```
project/
├── index.html
├── pages/                  dashboard.css, settings.css（一个页面一个文件）
└── components/             NavBar.css, Sidebar.css, Card.css（一个组件一个文件）
```

| # | 规则 |
|---|---|
| 1 | 一个页面一个 CSS 文件（`pages/`），一个组件一个 CSS 文件（`components/`） |
| 2 | 组件样式不进页面 CSS，页面布局不进组件 CSS |
| 3 | HTML 直接用 `<link>` 引用各文件 |

```html
<link rel="stylesheet" href="components/NavBar.css">
<link rel="stylesheet" href="pages/dashboard.css">
```

---

## 三、项目初始化与存量改造 · Init & Refactor

### 初始化新项目

```
① 根容器 → height:100vh; width:100vw; overflow:hidden
② 创建目录 → React: layout/pages/components/hooks/routes/stores/api/utils/types
               Vue:  layout/pages/components/composables/router/stores/api/utils/types
               HTML: pages/ + components/
③ 编写组件 → 每组件遵循 外层→内层→子容器 三层结构
④ 引入页面 → HTML 或 App 根组件加载各 CSS/SCSS 文件
```

### 存量项目评估流程

```
① HTML 结构审查：有外层→内层→子容器三层？标记缺失层级
② CSS 审查：搜索 height/width/grid-template 固定 px → 标记
   margin-bottom/margin-top/margin-left → 标记为需替换为 gap
   outer 容器上的 display:flex/grid → 需拆分为 inner
③ 项目结构审查：CSS 是否集中？组件/页面样式混合？→ 需要拆分
   hooks/composables 是否分离？API 调用集中？→ 需要拆分
   类型 inline？工具函数散落？→ 需要提取
```

### 文件归类决策

```
组件是导航/侧栏/页脚？ → layout/（所有页面共用）
组件是路由对应页面？   → pages/
组件可多处复用？       → components/
仅单页使用？           → pages/页面名/components/

逻辑涉及框架状态/副作用？ → hooks/ 或 composables/
纯函数无框架依赖？        → utils/

调用后端 API？  → api/
跨组件共享状态？ → stores/
类型定义？       → types/
应用级常量？     → constants/
```

### 重构流程

```
Step 1 容器化 → 根容器 + 拆分三层结构 + 删除 outer 上的 flex/grid
Step 2 修复尺寸 → 固定 px 替换为 min-height/clamp()/1fr
Step 3 修复间距 → margin 替换为父容器 gap
Step 4 修复保护 → 加 min-width:0 / overflow:hidden / text-overflow / table-layout:fixed
Step 5 代码拆分 → 组件提取到 components/、页面布局到 pages/
```

---

## 四、React 集成 · React Integration

```jsx
// Card.jsx — 三层结构
function Card({ title, value, change }) {
  return (
    <article className="card">           {/* 外层 */}
      <div className="card-body">        {/* 内层 */}
        <span className="card-title">{title}</span>  {/* 子容器 */}
        <span className="card-value">{value}</span>
        <span className="card-change">{change}</span>
      </div>
    </article>
  );
}
```
```scss
/* Card.scss */
.card { overflow:hidden; border-radius:8px; }
.card-body { display:flex; flex-direction:column; gap:8px; padding:16px; }
.card-title, .card-value, .card-change { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
```

### 代码拆分

```
src/
├── layout/         AppShell, NavBar, Sidebar（应用框架）
├── pages/          Dashboard, Settings（页面级）
├── components/     Card, DataTable（共享组件）
├── hooks/          useAuth, useFetch（自定义 hooks）
├── routes/         路由 + 守卫
├── stores/         状态管理（Zustand / Context）
├── api/            请求层
├── utils/          工具函数
├── types/          TypeScript 类型
├── constants/      常量配置
├── assets/         静态资源
├── styles/         全局变量
└── __tests__/      测试
```

| 项目使用 | 扩展名 | 引入 |
|---|---|---|
| Sass/SCSS | `*.scss` | `import './NavBar.scss'` |
| Less | `*.less` | `import './NavBar.less'` |
| CSS Modules | `*.module.css` | `import styles from './NavBar.module.css'` |
| Tailwind | `*.css` | 类名写 JSX，三层结构不变 |

| div-skill 规则 | React 中的体现 |
|---|---|
| 外层无 flex | JSX 外层只有 className+background，flex 在内层 |
| 零 margin | 父容器 gap，子组件无 margin |
| 代码拆分 | layout/pages/components/hooks/routes/stores/api/utils |
| 页面布局 | App.scss 定义根容器 |
| 文本溢出 | 组件 .scss 中写 ellipsis |

---

## 五、Vue 集成 · Vue Integration

```vue
<!-- Card.vue — 仅模板，无 <style> 块 -->
<template>
  <article class="card">
    <div class="card-body">
      <span class="card-title">{{ title }}</span>
      <span class="card-value">{{ value }}</span>
      <span class="card-change">{{ change }}</span>
    </div>
  </article>
</template>
<style src="./Card.scss" scoped></style>
```
```scss
/* Card.scss */
.card { overflow:hidden; border-radius:8px; background:#fff; }
.card-body { display:flex; flex-direction:column; gap:8px; padding:16px; }
.card-title, .card-value, .card-change { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
```

### 代码拆分

```
src/
├── layout/         AppShell, NavBar, Sidebar
├── pages/          Dashboard, Settings
├── components/     Card, DataTable
├── composables/    useAuth, useFetch（组合式函数）
├── router/         路由 + 守卫
├── stores/         Pinia
├── api/            请求层
├── utils/          工具函数
├── types/          TypeScript 类型
├── constants/      常量配置
├── assets/         静态资源
├── styles/         全局变量
└── __tests__/      测试
```

> 支持 `<style src="./Comp.scss" scoped>` 或内联 `<style scoped>`，容器层级规则不变。

| div-skill 规则 | Vue 中的体现 |
|---|---|
| 外层无 flex | `<template>` 外层只有 bg，flex 在内层 |
| 零 margin | .scss 中用 gap，子项无 margin |
| 代码拆分 | 每组件 .vue + .scss，分目录 |
| 页面布局 | App.vue + App.scss 定义根容器 |
| 样式分离 | .vue 不含 `<style>`，样式在独立 .scss |

---

## 六、反例对照 · Anti-Patterns

| 反例 | 问题 | 正确做法 |
|---|---|---|
| `height: 56px` | 固定 px，不可缩放 | `flex:0 0 auto; min-height:44px` |
| `grid-template-columns: 240px 1fr` | grid track 固定 px | `clamp(200px,20vw,320px) 1fr` |
| 子项 `margin-bottom:*` | 间距溢出父容器 | 父容器 `gap` |
| 图标 `margin-left:*` | 图标也是 flex 子项 | 父容器 `gap` |
| 子项无 `min-width:0` | flex 不收缩，内容溢出 | `min-width:0` |
| 外层写 `display:flex`+`padding` | 混合职责 | 拆为外层(背景)+内层(flex) |
| 全部 CSS 在 `<style>` | 无法复用 | 拆分为 pages/ + components/ |
| 页面 CSS 中写组件样式 | 改组件需改 N 页面 | 组件样式放 components/ |
| 内层只有 `padding` 无 `display+gap` | 子项被迫用 margin | 内层必须 `flex/grid + gap` |

---

## 七、速查清单 · Checklist

- [ ] 根容器 `height:100vh; width:100vw; overflow:hidden`
- [ ] 每个区块：外层 → 内层 → 子容器 三层结构
- [ ] 外层无 `display:flex/grid`/`padding`/`gap`/`float`
- [ ] 内层有 `display:flex/grid + gap`（padding 不够）
- [ ] 无固定 px（含 grid track，装饰性除外）
- [ ] 无 `margin` 在 flex/grid 子项（含图标）
- [ ] flex 子项有 `min-width:0`/`min-height:0`
- [ ] 卡片 `overflow:hidden`，表格 `table-layout:fixed`
- [ ] 文本 `text-overflow:ellipsis`
- [ ] 一个页面一个 CSS 文件，一个组件一个 CSS 文件
- [ ] 组件样式不进页面 CSS，页面布局不进组件 CSS
- [ ] 完整项目结构：layout/pages/components/hooks(or composables)/routes/stores/api/utils/types/constants/assets/styles/__tests__

---

## 八、常见违规借口 · Rationalizations

| 借口 | 为什么是错的 |
|---|---|
| "nav 高度 56px 没问题" | 页面需适配不同字号/缩放 |
| "子容器加 padding 方便" | padding 属于内层，子容器只 overflow |
| "图标 margin-left 而已" | 图标也是 flex 子项，用父容器 gap |
| "min-width:0 不写也能跑" | 加长文本时溢出，排查困难 |
| "卡片内容少不用 overflow:hidden" | 未来内容更新后可能溢出 |
| "一个文件更快" | 只在初期快，后续每次修改更慢 |
| "后期再拆分" | 后期永远不会拆分 |
| "组件样式写页面里方便" | 组件修改要改 N 个页面 |
