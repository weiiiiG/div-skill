# React Dashboard 示例

> 同一提示词，使用 div-skill 前后的代码对比。

## 提示词

```
用 React 构建仪表盘：NavBar（logo + 标题 + 头像）、Sidebar（导航链接）、
StatCard（标签 + 数值 + 变化）、DataTable（行 + 状态徽章）。使用 Sass + Vite。
```

## 使用前（无 SKILL）

```scss
/* NavBar.scss */
.navbar { height: 60px; background: #1e293b; display: flex; align-items: center; padding: 0 20px; }

/* StatCard.scss */
.stat-card { background: #fff; padding: 20px; border-radius: 8px; }
.stat-card .value { font-size: 24px; margin-bottom: 8px; }

/* App.scss */
.app { display: flex; }
.main { flex: 1; padding: 24px; }
```

**问题：** 固定 px 高度、margin 做间距、外层直接写 flex+padding、无 min-width:0、无 overflow hidden、无 text-overflow、无 table-layout:fixed。

## 使用后（有 SKILL）

```scss
/* components/NavBar.scss — 三层结构 */
.navbar-outer { background: #1e293b; }                                      /* 外层 */
.navbar-inner { display: flex; align-items: center; height: 100%; padding: 0 20px; gap: 16px; }  /* 内层 */
.navbar-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }                /* 子容器 */

/* components/StatCard.scss */
.stat-card-outer { overflow: hidden; border-radius: 8px; background: #fff; }                    /* 外层 */
.stat-card-inner { display: flex; flex-direction: column; padding: 20px; gap: 8px; }            /* 内层 */
.stat-card-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }             /* 子容器 */

/* App.scss — 根容器 */
.app { height: 100vh; width: 100vw; overflow: hidden; }
```

**修复：** 三层结构（外层→内层→子容器）、`min-height` 代替固定 px、`gap` 代替 margin、外层纯背景、完整目录结构（layout/pages/components/hooks/routes/stores/api/utils/types/constants）。
