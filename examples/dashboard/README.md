# Dashboard Example — Vanilla HTML/CSS

> Demonstrates DivSkill container hierarchy + code splitting in plain HTML/CSS.

## Prompt Given to AI

```
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
```

## Without SKILL (Baseline)

An AI given the same task without DivSkill guidance typically produces:

| Violation | Typical Output |
|---|---|
| Fixed px nav | `.navbar { height: 56px; }` |
| Fixed px sidebar | `.sidebar { width: 240px; }` |
| Margin for spacing | `.card-label { margin-bottom: 4px; }` + `.card-value { margin-top: 8px; }` |
| Outer mixed with inner | `.navbar { background: #fff; display: flex; padding: 0 20px; }` |
| No overflow hidden | Cards lack `overflow: hidden`, content spills |
| No min-width:0 | Long text overflows flex children |
| No text-overflow | Text clips without ellipsis |
| Monolithic CSS | All styles in one `<style>` block or one file |
| Components mixed | Component styles interleaved with page layout |
| No table-layout:fixed | Table columns sized by content, may overflow |

All 10+ violations, single file, not reusable.

## With SKILL (Result)

| Fix | Code |
|---|---|
| Three-layer each component | `.card(outer) → .card-body(inner) → .card-label/..(children)` |
| Root fullscreen | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px nav | `flex:0 0 auto; min-height:44px` |
| Responsive sidebar | `width: clamp(200px, 20vw, 280px)` |
| Zero margin | All spacing via `gap` on parent containers |
| Outer never flex | Background only on `.navbar`, flex on `.navbar-body`(inner) |
| Cards protected | `overflow: hidden` |
| Table fixed | `table-layout: fixed` |
| Text overflow | `text-overflow: ellipsis; white-space: nowrap` on all text |
| Code split | `components/NavBar.css`, `components/Sidebar.css`, etc. |
| Page layout separate | `pages/dashboard.css` |

## Files

```
components/NavBar.css      — NavBar: outer → inner → children
components/Sidebar.css     — Sidebar: outer → inner → children (clamp width)
components/Card.css         — StatCard: outer → inner → children (gap, overflow)
components/DataTable.css    — DataTable: table-layout:fixed, ellipsis
pages/dashboard.css         — Page layout: root grid, main content area
index.html                  — Links each CSS file directly
```
