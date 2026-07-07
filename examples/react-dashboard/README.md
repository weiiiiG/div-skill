# React Dashboard Example · React 仪表盘示例

[ENGLISH](#english) · [中文](#中文)

---

## ENGLISH

### Prompt Given to AI

Build a React + Sass dashboard. DivSkill rules: three-layer, root fullscreen, no fixed px, zero margin on flex children, outer no display:flex, inner must have display+gap, cards overflow:hidden, table table-layout:fixed. Each component: own dir with Component.jsx + Component.scss. Component styles only in .scss file.

### Without SKILL

| Violation | In React |
|---|---|
| Fixed px | `.navbar { height: 60px; }` in SCSS |
| Margin on children | `.value { margin-bottom: 8px; }` |
| Outer flex | Component root with bg + display:flex |
| No min-width:0 | Flex children overflow |
| Inline styles | `<div style={{ marginLeft: 'auto' }}>` |

### With SKILL

| Fix | Code |
|---|---|
| No fixed px | `flex:0 0 auto; min-height:56px` |
| JSX three-layer | `<article className="card"> → <div className="card-body"> → children` |
| Zero margin | All gap, margin-left:auto → flex:1 |
| Outer bg only | Outer class: background. Inner class: flex+gap |
| Card overflow | `overflow: hidden` |
| Table fixed | `table-layout: fixed` |

### File Structure

```
src/
├── main.jsx
├── App.jsx + App.scss
└── components/
    ├── NavBar/     NavBar.jsx + NavBar.scss
    ├── Sidebar/    Sidebar.jsx + Sidebar.scss
    ├── StatCard/   StatCard.jsx + StatCard.scss
    └── DataTable/  DataTable.jsx + DataTable.scss
```

### Run

```
cd examples/react-dashboard
npm install
npm run dev
```

---

## 中文

### 给 AI 的提示词

用 React + Sass 构建仪表盘。DivSkill 规则：三层结构、根全屏、无固定 px、零 margin、外层不用 display:flex、内层必须有 display+gap、卡片 overflow:hidden、表格 table-layout:fixed。每个组件独立目录，Component.jsx + Component.scss，样式只写在 .scss 中。

### 未使用 SKILL

| 违规 | React 中的表现 |
|---|---|
| 固定 px | `.navbar { height: 60px; }` 在 SCSS 中 |
| margin 在子项 | `.value { margin-bottom: 8px; }` |
| 外层 flex | 组件根元素有背景 + display:flex |
| 无 min-width:0 | flex 子项溢出 |
| 内联样式 | `<div style={{ marginLeft: 'auto' }}>` |

### 使用 SKILL

| 修复 | 代码 |
|---|---|
| 无固定 px | `flex:0 0 auto; min-height:56px` |
| JSX 三层 | `<article className="card"> → <div className="card-body"> → children` |
| 零 margin | 全部 gap，margin-left:auto 换 flex:1 |
| 外层纯背景 | 外层 class 只有 background，内层 class 有 flex+gap |
| 卡片 overflow | `overflow: hidden` |
| 表格固定 | `table-layout: fixed` |

### 文件结构

```
src/
├── main.jsx
├── App.jsx + App.scss              # 根布局
└── components/
    ├── NavBar/     NavBar.jsx + NavBar.scss
    ├── Sidebar/    Sidebar.jsx + Sidebar.scss
    ├── StatCard/   StatCard.jsx + StatCard.scss
    └── DataTable/  DataTable.jsx + DataTable.scss
```

### 运行

```
cd examples/react-dashboard
npm install
npm run dev
```
