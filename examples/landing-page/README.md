# Landing Page Example · 着陆页示例

[ENGLISH](#english) · [中文](#中文)

---

## ENGLISH

### Prompt (same for both)

```
Full-viewport landing page with top nav (logo + CTA), hero section (headline + subtext + buttons),
and 3 feature cards (icon, title, description).
```

### Without SKILL

| Violation | Example Code |
|---|---|
| Fixed nav height | `.nav { height: 60px; }` |
| Margin for spacing | `.hero-buttons { margin-top: 24px; }` |
| Outer with flex | Section bg containers also do `display:flex` |
| No overflow | Feature cards may overflow |
| Single file | All CSS in one `<style>` block |

### With SKILL

| Fix | Code |
|---|---|
| Three-layer sections | `section-outer → section-inner → children` |
| Root fullscreen | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | `flex:0 0 auto; min-height:44px` |
| Zero margin | All spacing via `gap` |
| Outer pure bg | Background on outer, flex+gap on inner |

---

## 中文

### 提示词（使用前后相同）

```
全屏着陆页：顶部导航（logo + CTA）、Hero 区（标题 + 副文本 + 按钮）、3 张特性卡片（图标、标题、描述）。
```

### 未使用 SKILL

| 违规 | 示例代码 |
|---|---|
| 固定 nav 高度 | `.nav { height: 60px; }` |
| margin 做间距 | `.hero-buttons { margin-top: 24px; }` |
| 外层混用 flex | 有背景的容器直接 display:flex |
| 卡片无 overflow | 内容可能溢出 |
| 单文件 | 所有在 `<style>` |

### 使用 SKILL

| 修复 | 代码 |
|---|---|
| 三层结构 | `section-outer → section-inner → 子容器` |
| 根全屏 | `height:100vh; width:100vw; overflow:hidden` |
| 无固定 px | `flex:0 0 auto; min-height:44px` |
| 零 margin | 全部 `gap` |
| 外层纯背景 | 背景在外层，flex+gap 在内层 |
