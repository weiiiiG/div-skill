# Landing Page 示例

> 同一提示词，使用 div-skill 前后的代码对比。

## 提示词

```
全屏着陆页：顶部导航（logo + CTA）、Hero 区（标题 + 副文本 + 按钮）、3 张特性卡片（图标、标题、描述）。
```

## 使用前（无 SKILL）

```css
.nav { height: 60px; background: #fff; display: flex; align-items: center; padding: 0 24px; }
.hero { min-height: calc(100vh - 60px); padding: 80px 24px; }
.hero-buttons { margin-top: 32px; }
.card { background: #fff; padding: 24px; border-radius: 8px; }
.card-title { margin-bottom: 8px; }
```

**问题：** 固定 px 高度、calc 减法硬编码、margin 做间距、外层混用 flex 和 padding、无 overflow hidden。

## 使用后（有 SKILL）

```css
/* 三层结构：外层背景 → 内层 flex+gap → 子容器 */
.hero-outer { background: linear-gradient(135deg, #0f172a, #1e293b); }
.hero-inner { display: flex; flex-direction: column; align-items: center; gap: 24px; padding: 80px 24px; height: 100%; }
.card-outer { overflow: hidden; border-radius: 8px; background: #fff; }
.card-inner { display: flex; flex-direction: column; gap: 8px; padding: 24px; }
```

**修复：** `min-height` 代替固定 px、`gap` 代替 margin、外层纯背景、`overflow:hidden`、`min-width:0`、`text-overflow:ellipsis`。
