# Settings Page 示例

> 同一提示词，使用 div-skill 前后的代码对比。

## 提示词

```
设置页面：顶部导航、双栏布局（侧栏 + 表单）、表单输入框/文本域/开关、保存按钮、模态弹层。
```

## 使用前（无 SKILL）

```css
.header { height: 56px; background: #fff; display: flex; align-items: center; padding: 0 20px; }
.sidebar { width: 220px; background: #f8fafc; padding: 20px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 6px; }
.modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); }
```

**问题：** 固定 px、margin 做表单间距、外层混用 flex 和 padding、缺少 z-index 导致模态框层级错误。

## 使用后（有 SKILL）

```css
/* 三层结构 */
.header-outer { background: #fff; border-bottom: 1px solid #e2e8f0; }
.header-inner { display: flex; align-items: center; justify-content: space-between; height: 100%; padding: 0 20px; }
.sidebar { flex: 0 0 clamp(200px, 20vw, 280px); }
.sidebar-inner { display: flex; flex-direction: column; height: 100%; padding: 20px; gap: 8px; }
.form-body { display: flex; flex-direction: column; gap: 16px; }
.modal-overlay { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; }
```

**修复：** 三层结构、`clamp()` 代替固定宽、`gap` 代替 margin、外层纯背景、显式 `z-index:1000`、`min-width:0`、`overflow:hidden`。
