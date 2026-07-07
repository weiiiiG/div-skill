<div>

<h1>React Dashboard Example · React 仪表盘示例</h1>

<p align="center"><a href="#en">ENGLISH</a> · <a href="#zh">中文</a></p>

<div id="zh">
<h2>中文</h2>
<h3>给 AI 的提示词</h3>
<pre>
用 React + Sass 构建仪表盘，遵循 DivSkill 规则：
- 三层结构：外层(背景) → 内层(flex+gap) → 子容器(overflow, 无 margin)
- 根容器全屏固定，无固定 px 布局
- ZERO margin —— 所有间距用父容器 gap（图标也一样）
- 外层不能用 display:flex/grid
- 内层必须有 display+gap
- 卡片 overflow:hidden，表格 table-layout:fixed
- 每个组件：独立目录，Component.jsx + Component.scss
- 组件样式只在其 .scss 文件中
</pre>

<h3>未使用 SKILL</h3>
<table>
<tr><th>违规</th><th>React 中的表现</th></tr>
<tr><td>固定 px</td><td><code>.navbar { height: 60px; }</code> 在 SCSS 中</td></tr>
<tr><td>margin 在子项</td><td><code>.value { margin-bottom: 8px; }</code></td></tr>
<tr><td>外层 flex</td><td>组件根元素有背景 + display:flex</td></tr>
<tr><td>无 min-width:0</td><td>flex 子项溢出</td></tr>
<tr><td>内联样式</td><td><code>&lt;div style={{ marginLeft: 'auto' }}&gt;</code></td></tr>
</table>

<h3>使用 SKILL</h3>
<table>
<tr><th>修复</th><th>代码</th></tr>
<tr><td>无固定 px</td><td><code>flex:0 0 auto; min-height:56px</code></td></tr>
<tr><td>JSX 三层</td><td><code>&lt;article className="card"&gt; → &lt;div className="card-body"&gt; → children</code></td></tr>
<tr><td>零 margin</td><td>全部 gap，margin-left:auto 换 flex:1</td></tr>
<tr><td>外层纯背景</td><td>外层 class 只有 background，内层 class 有 flex+gap</td></tr>
<tr><td>卡片 overflow</td><td><code>overflow: hidden</code></td></tr>
<tr><td>表格固定</td><td><code>table-layout: fixed</code></td></tr>
</table>

<h3>文件结构</h3>
<pre>
src/
├── main.jsx
├── App.jsx + App.scss              # 根布局
└── components/
    ├── NavBar/     NavBar.jsx + NavBar.scss
    ├── Sidebar/    Sidebar.jsx + Sidebar.scss
    ├── StatCard/   StatCard.jsx + StatCard.scss
    └── DataTable/  DataTable.jsx + DataTable.scss
</pre>

<h3>运行</h3>
<pre>cd examples/react-dashboard && npm install && npm run dev</pre>
</div>

<div id="en">
<h2>ENGLISH</h2>
<h3>Prompt Given to AI</h3>
<pre>
Build a React + Sass dashboard following DivSkill rules:
- Three-layer: Outer(bg) → Inner(flex+gap) → Child(overflow, no margin)
- Root: fixed fullscreen, NO fixed px on layout
- ZERO margin on flex/grid children (icons too)
- Outer: NO display:flex/grid
- Inner: MUST have display+gap
- Cards: overflow:hidden, table: table-layout:fixed
- Each component: own dir, Component.jsx + Component.scss
- Component styles ONLY in .scss file
</pre>

<h3>Without SKILL</h3>
<table>
<tr><th>Violation</th><th>In React</th></tr>
<tr><td>Fixed px</td><td><code>.navbar { height: 60px; }</code> in SCSS</td></tr>
<tr><td>Margin on children</td><td><code>.value { margin-bottom: 8px; }</code></td></tr>
<tr><td>Outer flex</td><td>Component root with bg + display:flex</td></tr>
<tr><td>No min-width:0</td><td>Flex children overflow</td></tr>
<tr><td>Inline styles</td><td><code>&lt;div style={{ marginLeft: 'auto' }}&gt;</code></td></tr>
</table>

<h3>With SKILL</h3>
<table>
<tr><th>Fix</th><th>Code</th></tr>
<tr><td>No fixed px</td><td><code>flex:0 0 auto; min-height:56px</code></td></tr>
<tr><td>JSX three-layer</td><td><code>&lt;article className="card"&gt; → &lt;div className="card-body"&gt; → children</code></td></tr>
<tr><td>Zero margin</td><td>All gap, margin-left:auto → flex:1</td></tr>
<tr><td>Outer bg only</td><td>Outer class: background. Inner class: flex+gap</td></tr>
<tr><td>Card overflow</td><td><code>overflow: hidden</code></td></tr>
<tr><td>Table fixed</td><td><code>table-layout: fixed</code></td></tr>
</table>

<h3>File Structure</h3>
<pre>
src/
├── main.jsx
├── App.jsx + App.scss
└── components/
    ├── NavBar/     NavBar.jsx + NavBar.scss
    ├── Sidebar/    Sidebar.jsx + Sidebar.scss
    ├── StatCard/   StatCard.jsx + StatCard.scss
    └── DataTable/  DataTable.jsx + DataTable.scss
</pre>

<h3>Run</h3>
<pre>cd examples/react-dashboard && npm install && npm run dev</pre>
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
