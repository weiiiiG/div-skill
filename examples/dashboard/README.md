# Dashboard Example · 仪表盘示例

[ENGLISH](#english) · [中文](#中文)

---

## ENGLISH

### Prompt (same for both)

```
Build a full-viewport admin dashboard with top nav bar, left sidebar, main content area
with 3 stat cards and a data table.
```

### Without SKILL

The agent produces a single HTML file with all CSS in `<style>`. Typical violations:

| Violation | Example Code |
|---|---|
| Fixed px nav | `.header { height: 56px; }` |
| Fixed px sidebar | `.sidebar { width: 240px; }` |
| Margin on children | `.card-label { margin-bottom: 4px; }` |
| Outer/inner mixed | `.navbar { background; display:flex; padding }` |
| No overflow hidden | Cards lack `overflow: hidden` |
| No min-width:0 | Flex children don't shrink |
| No text-overflow | Text clips without ellipsis |
| No table-layout | `table-layout: auto` |

### With SKILL

The agent generates properly split files with zero violations:

| Fix | Code |
|---|---|
| Three-layer | `.card(outer) → .card-body(inner) → children` |
| Root fullscreen | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | `flex:0 0 auto; min-height:44px` |
| Responsive sidebar | `width: clamp(200px, 20vw, 280px)` |
| Zero margin | All spacing via parent `gap` |
| Outer pure bg | Background on outer, flex on inner |
| Cards protected | `overflow: hidden` |
| Table fixed | `table-layout: fixed` |

### Files

```
components/NavBar.css      — NavBar
components/Sidebar.css     — Sidebar (clamp width)
components/Card.css         — StatCard (gap, overflow)
components/DataTable.css    — DataTable (fixed layout)
pages/dashboard.css         — Page layout (root grid)
index.html                  — Links each CSS file
```

---

## 中文

### 提示词（使用前后相同）

```
构建一个全屏管理后台：顶部导航栏、左侧边栏、主内容区含 3 个统计卡片和数据表格。
```

### 未使用 SKILL

agent 生成单个 HTML 文件，所有 CSS 在 `<style>` 中。典型违规：

| 违规 | 示例代码 |
|---|---|
| 固定 px 导航 | `.header { height: 56px; }` |
| 固定 px 侧栏 | `.sidebar { width: 240px; }` |
| margin 做间距 | `.card-label { margin-bottom: 4px; }` |
| 外层/内层混用 | `.navbar { background; display:flex; padding }` |
| 无 overflow hidden | 卡片内容溢出 |
| 无 min-width:0 | flex 子项不收缩 |
| 无 text-overflow | 文本截断无省略号 |
| 无固定表格 | `table-layout: auto` |

### 使用 SKILL

agent 生成拆分文件，零违规：

| 修复 | 代码 |
|---|---|
| 三层结构 | `.card(外层) → .card-body(内层) → 子容器` |
| 根全屏 | `height:100vh; width:100vw; overflow:hidden` |
| 无固定 px | `flex:0 0 auto; min-height:44px` |
| 侧栏响应式 | `width: clamp(200px, 20vw, 280px)` |
| 零 margin | 全部父容器 `gap` |
| 外层纯背景 | 背景在外层，flex 在内层 |
| 卡片保护 | `overflow: hidden` |
| 表格固定 | `table-layout: fixed` |

### 文件结构

```
components/NavBar.css      — 导航栏
components/Sidebar.css     — 侧边栏（clamp 宽度）
components/Card.css        — 统计卡片（gap、overflow）
components/DataTable.css   — 数据表格（固定布局）
pages/dashboard.css        — 页面布局（根容器）
index.html                 — 分别引用各 CSS 文件
```
