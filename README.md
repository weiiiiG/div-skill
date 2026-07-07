<div>

<h1>div-skill</h1>

<blockquote><b>Div</b>ine <b>Skill</b> of CSS — solves layout at two levels: <b>containerization</b> for page element layout, <b>code splitting</b> for CSS file organization.<br><br>解决两层的布局问题：<b>容器化</b>解决页面元素的布局，<b>代码拆分</b>解决 CSS 文件的"布局"。</blockquote>

<hr>

<p align="center"><a href="#en">ENGLISH</a> · <a href="#zh">中文</a></p>

<div id="zh">
<h2>中文</h2>
<h3>痛点</h3>
<p>前端 CSS 的两个常见问题：</p>
<ol>
<li><b>容器混乱</b> — 元素溢出、重叠、撑不满视口</li>
<li><b>CSS 巨石</b> — 全部样式塞在一个 <code>&lt;style&gt;</code> 块中，无法维护</li>
</ol>
<h3>解决方案</h3>
<h4>1. 容器层级架构</h4>
<p>三层嵌套模式：</p>
<pre>
外层容器      (宽高、背景、边框 — 无 flex/grid，无 padding/gap)
  └── 内层容器 (flex/grid 布局、height:100%、padding、gap)
      └── 子容器 (溢出控制、内容对齐 — 无 margin)
</pre>
<table>
<tr><th>#</th><th>规则</th></tr>
<tr><td>1</td><td>根容器：<code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>2</td><td>无固定 px 布局（含 grid track）— 用 <code>min-height</code>、<code>clamp()</code>、<code>1fr</code></td></tr>
<tr><td>3</td><td>子项无 margin — 所有间距用父容器 <code>gap</code>（图标也一样）</td></tr>
<tr><td>4</td><td>外层容器不能用 <code>display:flex/grid</code>、<code>padding/gap</code>、<code>float</code></td></tr>
<tr><td>5</td><td>内层容器必须有 <code>display:flex/grid + gap</code> — 只有 padding 算违规</td></tr>
<tr><td>6</td><td>所有 flex/grid 子项加 <code>min-width:0</code> / <code>min-height:0</code></td></tr>
<tr><td>7</td><td>卡片 <code>overflow:hidden</code>，表格 <code>table-layout:fixed</code></td></tr>
<tr><td>8</td><td>文本溢出加 <code>text-overflow:ellipsis</code></td></tr>
<tr><td>9</td><td>绝对定位元素加显式 <code>z-index</code>，仅用于装饰</td></tr>
</table>
<h4>2. 代码拆分</h4>
<p>按页面和组件拆分 CSS：</p>
<pre>
project/
├── index.html
├── pages/                  # 一个页面一个 CSS 文件
│   ├── dashboard.css
│   └── settings.css
└── components/             # 一个组件一个 CSS 文件
    ├── NavBar.css
    ├── Sidebar.css
    ├── Card.css
    └── DataTable.css
</pre>
<ul>
<li>一个页面一个 CSS 文件，一个组件一个 CSS 文件</li>
<li>组件样式只能写在 <code>components/组件名.css</code> 中</li>
<li>页面布局只能写在 <code>pages/页面名.css</code> 中</li>
<li>HTML 直接 <code>&lt;link&gt;</code> 引用各文件（无聚合入口）</li>
</ul>
<h3>示例</h3>
<table>
<tr><th>示例</th><th>类型</th><th>特性</th></tr>
<tr><td><a href="examples/dashboard/">Dashboard</a></td><td>HTML/CSS</td><td>原生：导航、侧栏、统计卡片、数据表</td></tr>
<tr><td><a href="examples/landing-page/">Landing Page</a></td><td>HTML/CSS</td><td>原生：Hero + 特性卡片</td></tr>
<tr><td><a href="examples/settings-page/">Settings Page</a></td><td>HTML/CSS</td><td>原生：表单 + 模态框弹层</td></tr>
<tr><td><a href="examples/react-dashboard/">React Dashboard</a></td><td>React</td><td>CSS Modules：4 个组件，样式与组件共置</td></tr>
<tr><td><a href="examples/vue-dashboard/">Vue Dashboard</a></td><td>Vue 3</td><td>SFC + scoped：4 个组件</td></tr>
</table>
<h3>规范文档</h3>
<p>见 <a href="SKILL.md">SKILL.md</a>。</p>
<h3>许可</h3>
<p>MIT</p>
</div>

<div id="en">
<h2>ENGLISH</h2>
<h3>The Problem</h3>
<p>Two common pains in frontend CSS:</p>
<ol>
<li><b>Container chaos</b> — elements overflow, overlap, or don't fill the viewport</li>
<li><b>Monolithic CSS</b> — all styles in one <code>&lt;style&gt;</code> block, impossible to maintain</li>
</ol>
<h3>The Solution</h3>
<h4>1. Container Hierarchy</h4>
<p>A three-layer nesting pattern:</p>
<pre>
Outer Container      (width/height, background, border — NO flex/grid, NO padding/gap)
  └── Inner Container (flex/grid layout, height:100%, padding, gap)
      └── Child Container(s) (overflow control, content alignment — NO margin)
</pre>
<table>
<tr><th>#</th><th>Rule</th></tr>
<tr><td>1</td><td>Root: <code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>2</td><td>No fixed px on layout — use <code>min-height</code>, <code>clamp()</code>, <code>1fr</code> (including grid tracks)</td></tr>
<tr><td>3</td><td>No margin on flex/grid children — all spacing via parent <code>gap</code> (icons too)</td></tr>
<tr><td>4</td><td>Outer container NEVER has <code>display:flex/grid</code>, <code>padding/gap</code>, or <code>float</code></td></tr>
<tr><td>5</td><td>Inner container MUST have <code>display:flex/grid + gap</code> — padding alone is a violation</td></tr>
<tr><td>6</td><td><code>min-width:0</code> / <code>min-height:0</code> on all flex/grid children</td></tr>
<tr><td>7</td><td><code>overflow:hidden</code> on cards, <code>table-layout:fixed</code> on tables</td></tr>
<tr><td>8</td><td><code>text-overflow:ellipsis</code> on overflowing text</td></tr>
<tr><td>9</td><td>Absolutely positioned elements: explicit <code>z-index</code>, decoration only</td></tr>
</table>
<h4>2. Code Splitting</h4>
<p>Split CSS by page and component:</p>
<pre>
project/
├── index.html
├── pages/                  # One CSS file per page
│   ├── dashboard.css
│   └── settings.css
└── components/             # One CSS file per component
    ├── NavBar.css
    ├── Sidebar.css
    ├── Card.css
    └── DataTable.css
</pre>
<ul>
<li>One CSS file per page, one per component</li>
<li>Component styles go ONLY in <code>components/ComponentName.css</code></li>
<li>Page layout goes ONLY in <code>pages/pagename.css</code></li>
<li>HTML <code>&lt;link&gt;</code>s each file directly (no aggregator)</li>
</ul>
<h3>Examples</h3>
<table>
<tr><th>Example</th><th>Type</th><th>Features</th></tr>
<tr><td><a href="examples/dashboard/">Dashboard</a></td><td>HTML/CSS</td><td>Vanilla: nav, sidebar, stat cards, data table</td></tr>
<tr><td><a href="examples/landing-page/">Landing Page</a></td><td>HTML/CSS</td><td>Vanilla: hero + feature cards</td></tr>
<tr><td><a href="examples/settings-page/">Settings Page</a></td><td>HTML/CSS</td><td>Vanilla: form + modal overlay</td></tr>
<tr><td><a href="examples/react-dashboard/">React Dashboard</a></td><td>React</td><td>Sass: 4 components with co-located .scss</td></tr>
<tr><td><a href="examples/vue-dashboard/">Vue Dashboard</a></td><td>Vue 3</td><td>Sass: separate .vue + .scss, no style blocks</td></tr>
</table>
<h3>Specification</h3>
<p>See <a href="SKILL.md">SKILL.md</a>.</p>
<h3>License</h3>
<p>MIT</p>
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
