# Vue Dashboard 示例

> 同一提示词，使用 div-skill 前后的代码对比。

## 提示词

```
用 Vue 3 构建仪表盘：NavBar（logo + 标题 + 头像）、Sidebar（导航链接）、
StatCard（标签 + 数值 + 变化）、DataTable（行 + 状态徽章）。使用 Sass + Vite。
```

## 使用前（无 SKILL）

```vue
<!-- App.vue -->
<template>
  <div class="app"><NavBar/><Sidebar/><main><DashboardView/></main></div>
</template>
<style>
.app { display: flex; }
main { flex: 1; padding: 24px; }
</style>

<!-- StatCard.vue -->
<style scoped>
.card { background: #fff; padding: 20px; border-radius: 8px; }
.label { font-size: 13px; color: #64748b; margin-bottom: 6px; }
.value { font-size: 24px; margin-bottom: 4px; }
</style>
```

**问题：** 固定 px 高度、margin 做间距、外层混用 flex+padding、无 overflow hidden、无 min-width:0、无 text-overflow、样式内嵌在 .vue 的 `<style scoped>` 中。

## 使用后（有 SKILL）

```scss
/* layout/NavBar.scss — 三层结构 */
.navbar-outer { background: #1e293b; }                                      /* 外层 */
.navbar-inner { display: flex; align-items: center; height: 100%; padding: 0 20px; gap: 16px; }  /* 内层 */
.navbar-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }                /* 子容器 */

/* components/StatCard.scss */
.stat-card-outer { overflow: hidden; border-radius: 8px; background: #fff; }                    /* 外层 */
.stat-card-inner { display: flex; flex-direction: column; padding: 20px; gap: 8px; }            /* 内层 */
.stat-card-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }             /* 子容器 */

/* App.scss */
.app { height: 100vh; width: 100vw; overflow: hidden; }
```

**修复：** 三层结构、`clamp()` 代替固定宽、`gap` 代替 margin、外层纯背景、样式与模板分离（.vue 不含 `<style>`，样式在独立 .scss）、完整目录结构（layout/pages/components/composables/router/stores/api/utils/types/constants）。
