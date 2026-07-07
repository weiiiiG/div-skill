<div>

<h1>Landing Page Example · 着陆页示例</h1>

<p align="center"><a href="#en">ENGLISH</a> · <a href="#zh">中文</a></p>

<div id="zh">
<h2>中文</h2>
<h3>给 AI 的提示词</h3>
<pre>
构建一个全屏着陆页：
- 顶部导航（logo + 菜单 + CTA）
- Hero 区（标题 + 副标题 + 按钮）
- 特性卡片行（3 张卡片，含图标/标题/描述）

遵循 DivSkill 规则：
- 根容器：height:100vh; width:100vw; overflow:hidden
- 每部分三层结构
- 无固定 px、无 margin
- 外层不做 flex
- 卡片 overflow:hidden、文本 text-overflow:ellipsis
</pre>

<h3>未使用 SKILL</h3>
<table>
<tr><th>违规</th><th>常见输出</th></tr>
<tr><td>固定 nav 高度</td><td><code>.nav { height: 60px; }</code></td></tr>
<tr><td>margin 做间距</td><td><code>.hero-buttons { margin-top: 24px; }</code></td></tr>
<tr><td>外层混用 flex</td><td>有背景的容器直接 <code>display:flex</code></td></tr>
<tr><td>卡片无 overflow</td><td>内容可能溢出</td></tr>
<tr><td>单文件</td><td>所有在 <code>&lt;style&gt;</code></td></tr>
</table>

<h3>使用 SKILL</h3>
<table>
<tr><th>修复</th><th>代码</th></tr>
<tr><td>三层结构</td><td><code>section-outer → section-inner → children</code></td></tr>
<tr><td>根全屏</td><td><code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>nav 无 px</td><td><code>flex:0 0 auto; min-height:44px</code></td></tr>
<tr><td>零 margin</td><td>全部 gap</td></tr>
<tr><td>外层纯背景</td><td>背景在外层，flex+gap 在内层</td></tr>
</table>
</div>

<div id="en">
<h2>ENGLISH</h2>
<h3>Prompt Given to AI</h3>
<pre>
Full-viewport landing page with:
- Top nav: logo + menu + CTA
- Hero: headline + subtext + buttons
- Feature cards row: 3 cards with icon/title/description

DivSkill rules:
- Root: height:100vh; width:100vw; overflow:hidden
- Three-layer for every section
- NO fixed px, NO margin on flex children
- Outer never has display:flex
- overflow:hidden on cards, text-overflow:ellipsis on text
</pre>

<h3>Without SKILL</h3>
<table>
<tr><th>Violation</th><th>Typical Output</th></tr>
<tr><td>Fixed nav height</td><td><code>.nav { height: 60px; }</code></td></tr>
<tr><td>Margin for spacing</td><td><code>.hero-buttons { margin-top: 24px; }</code></td></tr>
<tr><td>Outer with flex</td><td>Bg containers with <code>display:flex</code></td></tr>
<tr><td>No overflow</td><td>Cards may overflow</td></tr>
<tr><td>Single file</td><td>All in one <code>&lt;style&gt;</code></td></tr>
</table>

<h3>With SKILL</h3>
<table>
<tr><th>Fix</th><th>Code</th></tr>
<tr><td>Three-layer sections</td><td><code>section-outer → section-inner → children</code></td></tr>
<tr><td>Root fullscreen</td><td><code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>No fixed px</td><td><code>flex:0 0 auto; min-height:44px</code></td></tr>
<tr><td>Zero margin</td><td>All via gap</td></tr>
<tr><td>Outer bg only</td><td>Bg on outer, flex+gap on inner</td></tr>
</table>
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
