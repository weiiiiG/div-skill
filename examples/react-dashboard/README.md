# React Dashboard Example · React 仪表盘示例

[ENGLISH](#english) · [中文](#zh)

---

## ENGLISH

### Prompt (same for both)

```
Build a React dashboard with: NavBar (logo + title + avatar), Sidebar (nav links),
StatCard (label + value + change), DataTable (rows with status badges).
Use Sass for styling, Vite for build.
```

### Without SKILL

| Violation | Example Code |
|---|---|
| Fixed px in SCSS | `.navbar { height: 60px; }` |
| Margin on children | `.value { margin-bottom: 8px; }` |
| Outer flex | Component root with bg + display:flex |
| No min-width:0 | Flex children overflow |
| Inline style spacing | `<div style={{ marginLeft: 'auto' }}>` |

### With SKILL

| Fix | Code |
|---|---|
| No fixed px | `flex:0 0 auto; min-height:56px` |
| JSX three-layer | `article.card → div.card-body → children` |
| Zero margin | All `gap`, `margin-left:auto` → `flex:1` |
| Outer pure bg | Background on outer class, flex+gap on inner |
| Cards/table | `overflow:hidden` + `table-layout:fixed` |

### File Structure

```
src/
├── layout/
│   ├── AppShell.jsx + AppShell.scss    # Root layout, router outlet
│   ├── NavBar.jsx + NavBar.scss        # Navigation bar
│   └── Sidebar.jsx + Sidebar.scss      # Sidebar navigation
├── pages/
│   └── Dashboard.jsx + Dashboard.scss  # Dashboard page
├── components/
│   ├── Card.jsx + Card.scss            # Shared stat card
│   └── DataTable.jsx + DataTable.scss  # Shared data table
├── routes/
│   └── index.jsx                       # Route definitions
├── stores/
│   └── useDashboardStore.js            # Zustand state
├── App.jsx + App.scss                  # Root container
├── main.jsx
└── index.css

### Run

```
cd examples/react-dashboard
npm install
npm run dev
```

---

<a id="zh"></a>

## 中文

### 提示词（使用前后相同）

```
用 React 构建仪表盘：NavBar（logo + 标题 + 头像）、Sidebar（导航链接）、
StatCard（标签 + 数值 + 变化）、DataTable（行 + 状态徽章）。使用 Sass + Vite。
```

### 未使用 SKILL

| 违规 | 示例代码 |
|---|---|
| SCSS 中固定 px | `.navbar { height: 60px; }` |
| 子项 margin | `.value { margin-bottom: 8px; }` |
| 外层 flex | 组件根元素有背景 + display:flex |
| 无 min-width:0 | flex 子项溢出 |
| 内联样式间距 | `<div style={{ marginLeft: 'auto' }}>` |

### 使用 SKILL

| 修复 | 代码 |
|---|---|
| 无固定 px | `flex:0 0 auto; min-height:56px` |
| JSX 三层 | `article.card → div.card-body → 子容器` |
| 零 margin | 全部 `gap`，`margin-left:auto` 换 `flex:1` |
| 外层纯背景 | 外层只有 background，内层 flex+gap |
| 卡片/表格保护 | `overflow:hidden` + `table-layout:fixed` |

### 文件结构

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

### 运行

```
cd examples/react-dashboard
npm install
npm run dev
```
