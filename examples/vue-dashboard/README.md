<div>

<h1>Vue Dashboard Example · Vue 仪表盘示例</h1>

<p align="center"><a href="#en">ENGLISH</a> · <a href="#zh">中文</a></p>

<div id="zh">
<h2>中文</h2>
<h3>给 AI 的提示词</h3>
<pre>
用 Vue 3 + Sass 构建仪表盘，遵循 DivSkill 规则：
- 每个组件的 .scss 文件中使用三层结构：外层(背景) → 内层(flex+gap) → 子容器(overflow, 无 margin)
- 根容器 height:100vh; width:100vw; overflow:hidden
- 无固定 px 布局 — nav: flex:0 0 auto, sidebar: clamp()
- ZERO margin —— 所有间距用父容器 gap
- 外层不能用 display:flex/grid
- 内层必须有 display+gap
- 卡片 overflow:hidden、表格 table-layout:fixed
- .vue 文件不含 &lt;style&gt; 块，样式在独立的 .scss 文件中
- 每个组件目录：ComponentName.vue + ComponentName.scss
</pre>

<h3>未使用 SKILL</h3>
<table>
<tr><th>违规</th><th>Vue 中的表现</th></tr>
<tr><td>固定 px</td><td><code>.navbar { height: 60px; }</code> 在 scoped style 中</td></tr>
<tr><td>margin 在子项</td><td>App.vue 中 <code>margin-bottom: 24px</code></td></tr>
<tr><td>外层 flex</td><td>组件根元素有背景 + display:flex</td></tr>
<tr><td>无 overflow</td><td>卡片内容溢出</td></tr>
<tr><td>SFC 内嵌样式</td><td>所有样式在 .vue 的 &lt;style&gt; 中</td></tr>
</table>

<h3>使用 SKILL</h3>
<table>
<tr><th>修复</th><th>代码</th></tr>
<tr><td>三层结构</td><td><code>.card(外层) → .card-body(内层) → 子容器</code></td></tr>
<tr><td>全屏根</td><td><code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>无固定 px</td><td><code>flex:0 0 auto; min-height:56px</code></td></tr>
<tr><td>零 margin</td><td>全部 gap</td></tr>
<tr><td>样式分离</td><td>.vue 不含 &lt;style&gt;，样式在独立 .scss 中</td></tr>
<tr><td>卡片保护</td><td><code>overflow: hidden</code></td></tr>
<tr><td>表格固定</td><td><code>table-layout: fixed</code></td></tr>
</table>

<h3>文件结构</h3>
<pre>
src/
├── main.js
├── App.vue + App.scss             # 根布局（无 &lt;style&gt; 块）
└── components/
    ├── NavBar/     NavBar.vue + NavBar.scss
    ├── Sidebar/    Sidebar.vue + Sidebar.scss
    ├── StatCard/   StatCard.vue + StatCard.scss
    └── DataTable/  DataTable.vue + DataTable.scss
</pre>

<h3>运行</h3>
<pre>cd examples/vue-dashboard && npm install && npm run dev</pre>
</div>

<div id="en">
<h2>ENGLISH</h2>
<h3>Prompt Given to AI</h3>
<pre>
Build a Vue 3 + Sass dashboard following DivSkill rules:
- Three-layer in every .scss file: Outer(bg) → Inner(flex+gap) → Child(overflow, no margin)
- Root: height:100vh; width:100vw; overflow:hidden
- NO fixed px — nav: flex:0 0 auto, sidebar: clamp()
- ZERO margin on flex/grid children (icons too)
- Outer: NO display:flex/grid
- Inner: MUST have display+gap
- Cards: overflow:hidden, table: table-layout:fixed
- .vue files have NO &lt;style&gt; block — styles in separate .scss files
- Each component dir: ComponentName.vue + ComponentName.scss
</pre>

<h3>Without SKILL</h3>
<table>
<tr><th>Violation</th><th>In Vue</th></tr>
<tr><td>Fixed px</td><td><code>.navbar { height: 60px; }</code> in scoped style</td></tr>
<tr><td>Margin on children</td><td>App.vue <code>margin-bottom: 24px</code></td></tr>
<tr><td>Outer flex</td><td>Component root with bg + display:flex</td></tr>
<tr><td>No overflow</td><td>Card content spills</td></tr>
<tr><td>SFC embedded</td><td>All styles in .vue &lt;style&gt;</td></tr>
</table>

<h3>With SKILL</h3>
<table>
<tr><th>Fix</th><th>Code</th></tr>
<tr><td>Three-layer</td><td><code>.card(outer) → .card-body(inner) → children</code></td></tr>
<tr><td>Fullscreen root</td><td><code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>No fixed px</td><td><code>flex:0 0 auto; min-height:56px</code></td></tr>
<tr><td>Zero margin</td><td>All via gap</td></tr>
<tr><td>Style separation</td><td>.vue files have no &lt;style&gt;, styles in separate .scss</td></tr>
<tr><td>Card protected</td><td><code>overflow: hidden</code></td></tr>
<tr><td>Table fixed</td><td><code>table-layout: fixed</code></td></tr>
</table>

<h3>File Structure</h3>
<pre>
src/
├── main.js
├── App.vue + App.scss             # Root layout (no &lt;style&gt; block)
└── components/
    ├── NavBar/     NavBar.vue + NavBar.scss
    ├── Sidebar/    Sidebar.vue + Sidebar.scss
    ├── StatCard/   StatCard.vue + StatCard.scss
    └── DataTable/  DataTable.vue + DataTable.scss
</pre>

<h3>Run</h3>
<pre>cd examples/vue-dashboard && npm install && npm run dev</pre>
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
