# Vue Dashboard Example · Vue 仪表盘示例

[ENGLISH](#english) · [中文](#中文)

---

## ENGLISH

### Prompt (same for both)

```
Build a Vue 3 dashboard with: NavBar (logo + title + avatar), Sidebar (nav links),
StatCard (label + value + change), DataTable (rows with status badges).
Use Sass for styling, Vite for build. Separate .vue and .scss files.
```

### Without SKILL

| Violation | Example Code |
|---|---|
| Fixed px | `.navbar { height: 60px; }` in scoped style |
| Margin on children | App.vue `margin-bottom: 24px` |
| Outer flex | Component root with bg + display:flex |
| No overflow | Card content spills |
| SFC embedded | All styles in .vue `<style>` block |

### With SKILL

| Fix | Code |
|---|---|
| Three-layer | `.card(outer) → .card-body(inner) → children` |
| Root fullscreen | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | `flex:0 0 auto; min-height:56px` |
| Zero margin | All spacing via `gap` |
| Style separation | .vue files have no `<style>`, styles in separate .scss |
| Cards/table | `overflow:hidden` + `table-layout:fixed` |

### File Structure

```
src/
├── layout/
│   ├── AppShell.vue + AppShell.scss    # Root layout, router-view
│   ├── NavBar.vue + NavBar.scss        # Navigation bar
│   └── Sidebar.vue + Sidebar.scss      # Sidebar navigation
├── pages/
│   └── Dashboard.vue + Dashboard.scss  # Dashboard page
├── components/
│   ├── Card.vue + Card.scss            # Shared stat card
│   └── DataTable.vue + DataTable.scss  # Shared data table
├── router/
│   └── index.js                        # Vue Router config
├── stores/
│   └── dashboard.js                    # Pinia store
├── App.vue + App.scss                  # Root container
├── main.js
└── index.css

### Run

```
cd examples/vue-dashboard
npm install
npm run dev
```

---

## 中文

### 提示词（使用前后相同）

```
用 Vue 3 构建仪表盘：NavBar（logo + 标题 + 头像）、Sidebar（导航链接）、
StatCard（标签 + 数值 + 变化）、DataTable（行 + 状态徽章）。
使用 Sass + Vite。.vue 和 .scss 分文件。
```

### 未使用 SKILL

| 违规 | 示例代码 |
|---|---|
| 固定 px | `.navbar { height: 60px; }` 在 scoped 中 |
| 子项 margin | App.vue 中 `margin-bottom: 24px` |
| 外层 flex | 组件根元素有背景 + display:flex |
| 无 overflow | 卡片内容溢出 |
| SFC 内嵌 | 所有样式在 .vue 的 `<style>` 中 |

### 使用 SKILL

| 修复 | 代码 |
|---|---|
| 三层结构 | `.card(外层) → .card-body(内层) → 子容器` |
| 根全屏 | `height:100vh; width:100vw; overflow:hidden` |
| 无固定 px | `flex:0 0 auto; min-height:56px` |
| 零 margin | 全部 `gap` |
| 样式分离 | .vue 不含 `<style>`，样式在独立 .scss |
| 卡片/表格 | `overflow:hidden` + `table-layout:fixed` |

### 文件结构

```
src/
├── layout/
│   ├── AppShell.vue + AppShell.scss    # 根布局，router-view
│   ├── NavBar.vue + NavBar.scss        # 导航栏
│   └── Sidebar.vue + Sidebar.scss      # 侧边栏
├── pages/
│   └── Dashboard.vue + Dashboard.scss  # Dashboard 页面
├── components/
│   ├── Card.vue + Card.scss            # 共享卡片组件
│   └── DataTable.vue + DataTable.scss  # 共享表格组件
├── composables/
│   └── useAuth.js                      # 组合式函数
├── router/
│   └── index.js                        # Vue Router 配置
├── stores/
│   └── dashboard.js                    # Pinia 状态管理
├── api/
│   └── users.js                        # API 请求层
├── utils/
│   └── format.js                       # 工具函数
├── types/
│   └── index.ts                        # TypeScript 类型
├── constants/
│   └── index.js                        # 常量配置
├── styles/
│   └── _variables.scss                 # 全局样式变量
├── App.vue + App.scss                  # 根容器
├── main.js
└── index.css                           # 全局 reset
```

### 运行

```
cd examples/vue-dashboard
npm install
npm run dev
```
