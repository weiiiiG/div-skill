# Landing Page Example · 着陆页示例

[ENGLISH](#english) · [中文](#中文)

---

## ENGLISH

### Prompt Given to AI

Full-viewport landing page with top nav, hero section, 3 feature cards. DivSkill rules: root fullscreen, three-layer every section, no fixed px, no margin on flex children, outer never has display:flex, overflow:hidden on cards, text-overflow:ellipsis.

### Without SKILL

| Violation | Typical Output |
|---|---|
| Fixed nav height | `.nav { height: 60px; }` |
| Margin for spacing | `.hero-buttons { margin-top: 24px; }` |
| Outer with flex | Bg containers with `display:flex` |
| No overflow | Cards may overflow |
| Single file | All in one `<style>` |

### With SKILL

| Fix | Code |
|---|---|
| Three-layer sections | `section-outer → section-inner → children` |
| Root fullscreen | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | `flex:0 0 auto; min-height:44px` |
| Zero margin | All via gap |
| Outer bg only | Bg on outer, flex+gap on inner |

---

## 中文

### 给 AI 的提示词

全屏着陆页：顶部导航、Hero区、3张特性卡片。DivSkill 规则：全屏根容器、每部分三层结构、无固定 px、无 margin、外层不做 flex、卡片 overflow:hidden、文本 text-overflow:ellipsis。

### 未使用 SKILL

| 违规 | 常见输出 |
|---|---|
| 固定 nav 高度 | `.nav { height: 60px; }` |
| margin 做间距 | `.hero-buttons { margin-top: 24px; }` |
| 外层混用 flex | 有背景的容器直接 display:flex |
| 卡片无 overflow | 内容可能溢出 |
| 单文件 | 所有在 `<style>` |

### 使用 SKILL

| 修复 | 代码 |
|---|---|
| 三层结构 | `section-outer → section-inner → children` |
| 根全屏 | `height:100vh; width:100vw; overflow:hidden` |
| nav 无 px | `flex:0 0 auto; min-height:44px` |
| 零 margin | 全部 gap |
| 外层纯背景 | 背景在外层，flex+gap 在内层 |
