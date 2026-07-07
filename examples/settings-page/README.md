# Settings Page Example · 设置页示例

[ENGLISH](#english) · [中文](#中文)

---

## ENGLISH

### Prompt Given to AI

Settings page with nav bar, two-column layout (sidebar + form), form inputs, toggle switches, modal overlay. DivSkill rules: three-layer structure, fullscreen root, no fixed px, no margin, outer no flex, z-index for overlays.

### Without SKILL

| Violation | Typical Output |
|---|---|
| Fixed px | `.header { height: 56px; }`, `.sidebar { width: 220px; }` |
| Margin in forms | `.form-group { margin-bottom: 16px; }` |
| Outer flex | Form wrapper with bg + display:flex |
| No z-index | Modal stacking incorrect |

### With SKILL

| Fix | Code |
|---|---|
| Three-layer nav | `.nav → .nav-outer(bg) → .nav-inner(flex+gap)` |
| Fullscreen root | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | Nav min-height, sidebar clamp() |
| Zero margin | All via gap |
| Modal z-index | `.modal-overlay { position:fixed; z-index:1000; }` |

---

## 中文

### 给 AI 的提示词

设置页面：导航栏、双栏布局（侧栏+表单）、表单输入框、开关、模态弹层。DivSkill 规则：三层结构、全屏根容器、无固定 px、无 margin、外层不做 flex、绝对定位元素加 z-index。

### 未使用 SKILL

| 违规 | 常见输出 |
|---|---|
| 固定 px | `.header { height: 56px; }`、`.sidebar { width: 220px; }` |
| margin 在表单 | `.form-group { margin-bottom: 16px; }` |
| 外层 flex | 表单容器有背景 + display:flex |
| 无 z-index | 模态框层级错误 |

### 使用 SKILL

| 修复 | 代码 |
|---|---|
| nav 三层 | `.nav → .nav-outer(背景) → .nav-inner(flex+gap)` |
| 全屏根 | `height:100vh; width:100vw; overflow:hidden` |
| 无固定 px | nav min-height、sidebar clamp() |
| 零 margin | 全部 gap |
| modal z-index | `.modal-overlay { position:fixed; z-index:1000; }` |
