# Dashboard 示例

> 同一提示词，使用 div-skill 前后的代码对比。

## 提示词

```
构建一个全屏管理后台：顶部导航栏、左侧边栏、主内容区含 3 个统计卡片和数据表格。
```

## 使用前（无 SKILL）

agent 生成单个 HTML 文件，所有 CSS 在 `<style>` 中：

```css
.header { height: 56px; background: #1e293b; display: flex; align-items: center; padding: 0 20px; }
.sidebar { width: 240px; background: #fff; padding: 20px; }
.sidebar a { display: block; padding: 10px 0; margin-bottom: 4px; }
.card { background: #fff; padding: 20px; border-radius: 8px; }
.card-label { margin-bottom: 4px; }
```

**问题：** 固定 px 高度/宽度、margin 做间距、外层混用 flex+padding、无 overflow hidden、无 min-width:0、无 text-overflow、无 table-layout:fixed、全部代码在一个文件。

## 使用后（有 SKILL）

agent 生成拆分文件，零违规：

```css
/* components/NavBar.css */
.navbar { flex: 0 0 auto; background: #1e293b; }
.navbar-body { display: flex; align-items: center; justify-content: space-between; height: 100%; padding: 0 20px; }

/* components/Sidebar.css */
.sidebar { flex: 0 0 clamp(200px, 20vw, 280px); }
.sidebar-outer { height: 100%; background: #1e293b; }
.sidebar-inner { display: flex; flex-direction: column; height: 100%; padding: 16px; gap: 4px; }

/* components/Card.css */
.stat-card { overflow: hidden; border-radius: 8px; background: #fff; }
.stat-card-body { display: flex; flex-direction: column; padding: 20px; gap: 8px; }
```

**修复：** 三层结构（外层→内层→子容器）、`clamp()` 代替固定宽度、`gap` 代替 margin、外层纯背景、`overflow:hidden`、`min-width:0`、`text-overflow:ellipsis`、`table-layout:fixed`、代码拆分到 components/ + pages/。
