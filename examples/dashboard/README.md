# Dashboard Example · 仪表盘示例

[ENGLISH](#english) · [中文](#中文)

---

## ENGLISH

### Prompt Given to AI

Build a full-viewport admin dashboard with nav bar, sidebar, 3 stat cards, and data table. Follow DivSkill rules: three-layer structure, no fixed px, no margin on children, outer never has display:flex, cards overflow:hidden, table table-layout:fixed, text text-overflow:ellipsis. Split into components/ + pages/ directories.

### Without SKILL

| Violation | Typical Output |
|---|---|
| Fixed px nav | `.navbar { height: 56px; }` |
| Fixed px sidebar | `.sidebar { width: 240px; }` |
| Margin for spacing | `.card-label { margin-bottom: 4px; }` |
| Outer mixed with inner | `.navbar { background; display:flex; padding }` |
| No overflow hidden | Card content spills |
| No min-width:0 | Flex children overflow |
| No text-overflow | Text clips without ellipsis |
| Monolithic CSS | All in one `<style>` block |

### With SKILL

| Fix | Code |
|---|---|
| Three-layer each component | `.card(outer) → .card-body(inner) → .card-label(child)` |
| Root fullscreen | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px nav | `flex:0 0 auto; min-height:44px` |
| Responsive sidebar | `width: clamp(200px, 20vw, 280px)` |
| Zero margin | All spacing via parent `gap` |
| Outer never flex | Bg on `.navbar`, flex on `.navbar-body` |
| Cards protected | `overflow: hidden` |
| Table fixed | `table-layout: fixed` |

### Files

```
components/NavBar.css      — NavBar component
components/Sidebar.css     — Sidebar (clamp width)
components/Card.css         — StatCard (gap, overflow)
components/DataTable.css    — DataTable (table-layout:fixed)
pages/dashboard.css         — Page layout (root, grid)
index.html                  — Links each CSS file directly
```

---

## 中文

### 给 AI 的提示词

构建全屏管理后台：导航栏、侧边栏、3个统计卡片、数据表格。遵循 DivSkill 规则：三层结构、无固定 px、无 margin、外层不做 flex、卡片 overflow:hidden、表格 table-layout:fixed、文本 text-overflow:ellipsis。拆分为 components/ + pages/ 目录。

### 未使用 SKILL

| 违规 | 常见输出 |
|---|---|
| 固定 px 导航 | `.navbar { height: 56px; }` |
| 固定 px 侧栏 | `.sidebar { width: 240px; }` |
| margin 做间距 | `.card-label { margin-bottom: 4px; }` |
| 外层混用 flex | `.navbar { background; display:flex; padding }` |
| 无 overflow hidden | 卡片内容溢出 |
| 无 min-width:0 | flex 子项溢出 |
| 无 text-overflow | 文本截断无省略号 |
| CSS 巨石 | 全部在一个 `<style>` 中 |

### 使用 SKILL 后

| 修复 | 代码 |
|---|---|
| 三层结构 | `.card(外层) → .card-body(内层) → .card-label(子容器)` |
| 根容器全屏 | `height:100vh; width:100vw; overflow:hidden` |
| nav 无固定 px | `flex:0 0 auto; min-height:44px` |
| 侧栏响应式 | `width: clamp(200px, 20vw, 280px)` |
| 零 margin | 全部间距用父容器 `gap` |
| 外层不做布局 | 背景在 `.navbar`，flex 在 `.navbar-body` |
| 卡片保护 | `overflow: hidden` |
| 表格固定 | `table-layout: fixed` |

### 文件结构

```
components/NavBar.css      — 导航栏
components/Sidebar.css     — 侧边栏（clamp 宽度）
components/Card.css        — 统计卡片（gap、overflow hidden）
components/DataTable.css   — 数据表格（table-layout:fixed）
pages/dashboard.css        — 页面布局（根容器、主内容）
index.html                 — 分别 link 各 CSS 文件
```
