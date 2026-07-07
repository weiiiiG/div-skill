# 重构示例

> 展示如何使用 div-skill 对一个包含交互状态（计数器、导航、通知徽章）的页面进行重构，
> 在保持功能逻辑不变的情况下完成容器化和代码拆分。

## 改前

`before.html` — 单个文件，所有 HTML/CSS/JS 混合在一起。

**页面功能：**
- 计数器（点击 +1，数字递增，通知徽章同步更新，状态文字变化）
- 侧边栏导航（点击切换页面，激活项高亮）
- 三个页面：Dashboard（含计数器）、Settings、About

**布局问题：** 固定 px 导航/侧栏、margin 做间距、外层混用 flex+padding、无 overflow hidden、无 min-width:0。

**交互依赖：**
- JS 通过 `getElementById` 引用 `#count`、`#badge`、`#status-text`、`#increment`
- 导航通过 `data-page` 属性和 `#page-{name}` id 模式切换
- 这些 ID 和属性在重构中**绝对不能改变**

## 改后

| 文件 | 说明 |
|---|---|
| `index.html` | HTML 结构，添加三层容器包装，JS 零改动 |
| `pages/home.css` | 页面布局（根容器、flex 布局） |
| `components/NavBar.css` | 导航栏（外层背景 → 内层 flex+gap → 子容器） |
| `components/Sidebar.css` | 侧边栏（clamp 宽度 → flex 列 → 导航项） |
| `components/Card.css` | 卡片（overflow hidden → flex 列+gap → 内容） |

### 关键变更

| 改前 | 改后 |
|---|---|
| `.nav { height:56px; display:flex; padding }` | outer 仅背景，inner 做 flex+gap+padding |
| `.side { width:220px; padding:20px }` | `clamp(200px,20vw,280px)`，inner 做 padding+gap |
| `.card { margin-bottom:16px }` | 父容器 `main-inner { gap:16px }` |
| 单文件 `<style>` | 4 个独立 CSS 文件，按组件/页面拆分 |
| 无 overflow hidden | 卡片加 `overflow:hidden`，flex 子项加 `min-width:0` |
| 无 text-overflow | 导航项加 `text-overflow:ellipsis` |

### 验证

重构后 JS 代码零改动，所有功能正常：
- [x] 计数器 +1 按钮工作
- [x] 通知徽章同步更新
- [x] 状态文字随计数变化
- [x] 侧边栏导航切换页面
- [x] 所有 element ID 保持不变
