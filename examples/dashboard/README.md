<div>

<h1>Dashboard Example · 仪表盘示例</h1>

<p align="center"><a href="#en">ENGLISH</a> · <a href="#zh">中文</a></p>

<div id="zh">
<h2>中文</h2>
<h3>给 AI 的提示词</h3>
<pre>
构建一个全屏管理后台：
- 导航栏（logo + 标题 + 头像）
- 侧边栏（导航链接）
- 主内容：3 个统计卡片 + 数据表格

遵循 DivSkill 规则：
- 三层结构：外层(背景/边框) → 内层(flex/grid+padding+gap) → 子容器(overflow, 无 margin)
- 根容器：height:100vh; width:100vw; overflow:hidden
- 无固定 px 布局 — 用 flex:0 0 auto + min-height、clamp()、1fr
- 子项无 margin — 全部间距用父容器 gap
- 外层不能用 display:flex/grid
- 卡片 overflow:hidden、表格 table-layout:fixed
- 文本溢出 text-overflow:ellipsis
- 拆分为 components/ + pages/ 目录，HTML 分别 link 各文件
</pre>

<h3>未使用 SKILL 时的典型问题</h3>
<table>
<tr><th>违规</th><th>常见输出</th></tr>
<tr><td>固定 px 导航</td><td><code>.navbar { height: 56px; }</code></td></tr>
<tr><td>固定 px 侧栏</td><td><code>.sidebar { width: 240px; }</code></td></tr>
<tr><td>margin 做间距</td><td><code>.card-label { margin-bottom: 4px; }</code></td></tr>
<tr><td>外层混用 flex</td><td><code>.navbar { background; display:flex; padding }</code></td></tr>
<tr><td>无 overflow hidden</td><td>卡片内容溢出</td></tr>
<tr><td>无 min-width:0</td><td>flex 子项溢出</td></tr>
<tr><td>无 text-overflow</td><td>文本截断无省略号</td></tr>
<tr><td>CSS 巨石</td><td>全部在一个 <code>&lt;style&gt;</code> 中</td></tr>
</table>

<h3>使用 SKILL 后的效果</h3>
<table>
<tr><th>修复</th><th>代码</th></tr>
<tr><td>三层结构</td><td><code>.card(外层) → .card-body(内层) → .card-label(子容器)</code></td></tr>
<tr><td>根容器全屏</td><td><code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>nav 无固定 px</td><td><code>flex:0 0 auto; min-height:44px</code></td></tr>
<tr><td>侧栏响应式</td><td><code>width: clamp(200px, 20vw, 280px)</code></td></tr>
<tr><td>零 margin</td><td>全部间距用父容器 <code>gap</code></td></tr>
<tr><td>外层不做布局</td><td>背景在 <code>.navbar</code>，flex 在 <code>.navbar-body</code></td></tr>
<tr><td>卡片保护</td><td><code>overflow: hidden</code></td></tr>
<tr><td>表格固定</td><td><code>table-layout: fixed</code></td></tr>
</table>

<h3>文件结构</h3>
<pre>
components/NavBar.css      — 导航栏
components/Sidebar.css     — 侧边栏（clamp 宽度）
components/Card.css        — 统计卡片（gap、overflow hidden）
components/DataTable.css   — 数据表格（table-layout:fixed）
pages/dashboard.css        — 页面布局（根容器、主内容）
index.html                 — 分别 link 各 CSS 文件
</pre>
</div>

<div id="en">
<h2>ENGLISH</h2>
<h3>Prompt Given to AI</h3>
<pre>
Build a full-viewport admin dashboard with:
- Nav bar (logo + title + avatar)
- Sidebar (nav links)
- Main content: 3 stat cards + data table

Follow DivSkill rules:
- Three-layer: Outer(background/border) → Inner(flex/grid+padding+gap) → Child(overflow, no margin)
- Root: height:100vh; width:100vw; overflow:hidden
- NO fixed px on layout — use flex:0 0 auto + min-height, clamp(), 1fr
- NO margin on flex/grid children — all spacing via parent gap
- Outer NEVER has display:flex/grid
- Cards: overflow:hidden, table: table-layout:fixed
- Text: text-overflow:ellipsis
- Split into components/ + pages/ directories, HTML links each file
</pre>

<h3>Without SKILL</h3>
<table>
<tr><th>Violation</th><th>Typical Output</th></tr>
<tr><td>Fixed px nav</td><td><code>.navbar { height: 56px; }</code></td></tr>
<tr><td>Fixed px sidebar</td><td><code>.sidebar { width: 240px; }</code></td></tr>
<tr><td>Margin for spacing</td><td><code>.card-label { margin-bottom: 4px; }</code></td></tr>
<tr><td>Outer mixed with inner</td><td><code>.navbar { background; display:flex; padding }</code></td></tr>
<tr><td>No overflow hidden</td><td>Card content spills</td></tr>
<tr><td>No min-width:0</td><td>Flex children overflow</td></tr>
<tr><td>No text-overflow</td><td>Text clips without ellipsis</td></tr>
<tr><td>Monolithic CSS</td><td>All in one <code>&lt;style&gt;</code> block</td></tr>
</table>

<h3>With SKILL</h3>
<table>
<tr><th>Fix</th><th>Code</th></tr>
<tr><td>Three-layer</td><td><code>.card(outer) → .card-body(inner) → .card-label(child)</code></td></tr>
<tr><td>Root fullscreen</td><td><code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>No fixed px nav</td><td><code>flex:0 0 auto; min-height:44px</code></td></tr>
<tr><td>Responsive sidebar</td><td><code>width: clamp(200px, 20vw, 280px)</code></td></tr>
<tr><td>Zero margin</td><td>All spacing via parent <code>gap</code></td></tr>
<tr><td>Outer never flex</td><td>Bg on <code>.navbar</code>, flex on <code>.navbar-body</code></td></tr>
<tr><td>Cards protected</td><td><code>overflow: hidden</code></td></tr>
<tr><td>Table fixed</td><td><code>table-layout: fixed</code></td></tr>
</table>

<h3>Files</h3>
<pre>
components/NavBar.css      — NavBar component
components/Sidebar.css     — Sidebar (clamp width)
components/Card.css        — StatCard (gap, overflow)
components/DataTable.css   — DataTable (table-layout:fixed)
pages/dashboard.css        — Page layout (root, grid)
index.html                 — Links each CSS file directly
</pre>
</div>

<style>
#zh { display: none; }
#en { display: block; }
#zh:target { display: block; }
#zh:target ~ #en { display: none; }
#en:target { display: block; }
#en:target ~ #zh { display: none; }
</style>

</div>
