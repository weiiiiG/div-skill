# Vue Dashboard Example · Vue 仪表盘示例

[ENGLISH](#english) · [中文](#中文)

---

## ENGLISH

### Prompt Given to AI

Build a Vue 3 + Sass dashboard. DivSkill rules: three-layer in every .scss, root fullscreen, no fixed px, zero margin on flex children, outer no display:flex, inner must have display+gap, cards overflow:hidden, table table-layout:fixed. Vue files have NO `<style>` block — styles in separate .scss. Each component dir: ComponentName.vue + ComponentName.scss.

### Without SKILL

| Violation | In Vue |
|---|---|
| Fixed px | `.navbar { height: 60px; }` in scoped style |
| Margin on children | App.vue `margin-bottom: 24px` |
| Outer flex | Component root with bg + display:flex |
| No overflow | Card content spills |
| SFC embedded | All styles in .vue `<style>` |

### With SKILL

| Fix | Code |
|---|---|
| Three-layer | `.card(outer) → .card-body(inner) → children` |
| Fullscreen root | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | `flex:0 0 auto; min-height:56px` |
| Zero margin | All via gap |
| Style separation | .vue files have no `<style>`, styles in separate .scss |
| Card protected | `overflow: hidden` |
| Table fixed | `table-layout: fixed` |

### File Structure

```
src/
├── main.js
├── App.vue + App.scss             # Root layout (no <style> block)
└── components/
    ├── NavBar/     NavBar.vue + NavBar.scss
    ├── Sidebar/    Sidebar.vue + Sidebar.scss
    ├── StatCard/   StatCard.vue + StatCard.scss
    └── DataTable/  DataTable.vue + DataTable.scss
```

### Run

```
cd examples/vue-dashboard
npm install
npm run dev
```

---

## 中文

### 给 AI 的提示词

用 Vue 3 + Sass 构建仪表盘。DivSkill 规则：每个 .scss 中三层结构、根全屏、无固定 px、零 margin、外层不用 display:flex、内层必须有 display+gap、卡片 overflow:hidden、表格 table-layout:fixed。.vue 不含 `<style>`，样式在独立 .scss。每个组件目录：ComponentName.vue + ComponentName.scss。

### 未使用 SKILL

| 违规 | Vue 中的表现 |
|---|---|
| 固定 px | `.navbar { height: 60px; }` 在 scoped style 中 |
| margin 在子项 | App.vue 中 `margin-bottom: 24px` |
| 外层 flex | 组件根元素有背景 + display:flex |
| 无 overflow | 卡片内容溢出 |
| SFC 内嵌样式 | 所有样式在 .vue 的 `<style>` 中 |

### 使用 SKILL

| 修复 | 代码 |
|---|---|
| 三层结构 | `.card(外层) → .card-body(内层) → 子容器` |
| 全屏根 | `height:100vh; width:100vw; overflow:hidden` |
| 无固定 px | `flex:0 0 auto; min-height:56px` |
| 零 margin | 全部 gap |
| 样式分离 | .vue 不含 `<style>`，样式在独立 .scss 中 |
| 卡片保护 | `overflow: hidden` |
| 表格固定 | `table-layout: fixed` |

### 文件结构

```
src/
├── main.js
├── App.vue + App.scss             # 根布局（无 <style> 块）
└── components/
    ├── NavBar/     NavBar.vue + NavBar.scss
    ├── Sidebar/    Sidebar.vue + Sidebar.scss
    ├── StatCard/   StatCard.vue + StatCard.scss
    └── DataTable/  DataTable.vue + DataTable.scss
```

### 运行

```
cd examples/vue-dashboard
npm install
npm run dev
```
