<div>

<h1>Settings Page Example · 设置页示例</h1>

<p align="center"><a href="#en">ENGLISH</a> · <a href="#zh">中文</a></p>

<div id="zh">
<h2>中文</h2>
<h3>给 AI 的提示词</h3>
<pre>
设置页面，包含：
- 导航栏 + 双栏布局（侧栏 + 表单）
- 表单：输入框、文本域、开关、保存按钮
- 模态弹层（居中 + 遮罩 + z-index）

遵循 DivSkill 规则：三层结构、全屏根容器、无固定 px、无 margin、外层不做 flex、绝对定位元素加 z-index。
</pre>

<h3>未使用 SKILL</h3>
<table>
<tr><th>违规</th><th>常见输出</th></tr>
<tr><td>固定 px</td><td><code>.header { height: 56px; }</code>、<code>.sidebar { width: 220px; }</code></td></tr>
<tr><td>margin 在表单</td><td><code>.form-group { margin-bottom: 16px; }</code></td></tr>
<tr><td>外层 flex</td><td>表单容器有背景 + display:flex</td></tr>
<tr><td>无 z-index</td><td>模态框层级错误</td></tr>
</table>

<h3>使用 SKILL</h3>
<table>
<tr><th>修复</th><th>代码</th></tr>
<tr><td>nav 三层</td><td><code>.nav → .nav-outer(背景) → .nav-inner(flex+gap)</code></td></tr>
<tr><td>全屏根</td><td><code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>无固定 px</td><td>nav min-height、sidebar clamp()</td></tr>
<tr><td>零 margin</td><td>全部 gap</td></tr>
<tr><td>modal z-index</td><td><code>.modal-overlay { position:fixed; z-index:1000; }</code></td></tr>
</table>
</div>

<div id="en">
<h2>ENGLISH</h2>
<h3>Prompt Given to AI</h3>
<pre>
Settings page with nav bar, two-column layout (sidebar + form), form inputs, toggle switches, modal overlay.
DivSkill rules: three-layer structure, fullscreen root, no fixed px, no margin, outer no flex, z-index for overlays.
</pre>

<h3>Without SKILL</h3>
<table>
<tr><th>Violation</th><th>Typical Output</th></tr>
<tr><td>Fixed px</td><td><code>.header { height: 56px; }</code>, <code>.sidebar { width: 220px; }</code></td></tr>
<tr><td>Margin in forms</td><td><code>.form-group { margin-bottom: 16px; }</code></td></tr>
<tr><td>Outer flex</td><td>Form wrapper with bg + display:flex</td></tr>
<tr><td>No z-index</td><td>Modal stacking incorrect</td></tr>
</table>

<h3>With SKILL</h3>
<table>
<tr><th>Fix</th><th>Code</th></tr>
<tr><td>Three-layer nav</td><td><code>.nav → .nav-outer(bg) → .nav-inner(flex+gap)</code></td></tr>
<tr><td>Fullscreen root</td><td><code>height:100vh; width:100vw; overflow:hidden</code></td></tr>
<tr><td>No fixed px</td><td>Nav min-height, sidebar clamp()</td></tr>
<tr><td>Zero margin</td><td>All via gap</td></tr>
<tr><td>Modal z-index</td><td><code>.modal-overlay { position:fixed; z-index:1000; }</code></td></tr>
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
