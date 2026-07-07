# React Dashboard Example

> Demonstrates DivSkill rules applied to a React project with CSS Modules.

## Prompt Given to AI

```
Build a React dashboard app following DivSkill rules:
- Three-layer: Outer(bg) → Inner(flex+gap) → Child(overflow, no margin)
- Root: fixed fullscreen, NO fixed px on layout
- ZERO margin on flex/grid children (icons too)
- Outer: NO display:flex/grid
- Inner: MUST have display+gap
- Cards: overflow:hidden, table: table-layout:fixed
- Each component: own dir with .jsx + .module.css
- Component styles ONLY in .module.css
- Components: NavBar, Sidebar, StatCard, DataTable
```

## Without SKILL

In a typical React project without DivSkill, agents produce React code with the same CSS violations as vanilla HTML:

| Violation | Typical React Output |
|---|---|
| Fixed px in CSS Modules | `NavBar.module.css` with `.navbar { height: 60px; }` |
| Margin on children | `StatCard.module.css` with `.value { margin-bottom: 8px; }` |
| Flex on outer | Component root element with background + `display: flex` |
| No min-width:0 | Sidebar items overflow in flex layout |
| No overflow hidden | Cards content spills |
| Inline styles | `<div style={{ marginLeft: 'auto' }}>` for spacing |

The file structure is right (CSS Modules), but the CSS inside still violates rules.

## With SKILL (Result)

| Fix | React Code |
|---|---|
| No fixed px | `flex: 0 0 auto; min-height: 56px` instead of `height: 60px` |
| Three-layer JSX | `<article className={styles.card}> → <div className={styles['card-body']}> → children` |
| Zero margin | All spacing via `gap` on parent; `margin-left: auto` replaced with spacer or `flex:1` |
| Outer bg only | Outer class: `background + border` only. Inner class: `display: flex + gap` |
| min-width:0 | Every flex child gets `min-width: 0` |
| overflow:hidden | `StatCard.module.css` has `overflow: hidden` |
| table-layout:fixed | `DataTable.module.css` sets `table-layout: fixed` |
| Ellipsis | All text-bearing elements get `text-overflow: ellipsis` |

## File Structure

```
src/
├── index.jsx                          # Entry
├── index.css                          # Reset only
├── App.jsx + App.module.css           # Root layout (grid)
└── components/
    ├── NavBar/     NavBar.jsx + NavBar.module.css
    ├── Sidebar/    Sidebar.jsx + Sidebar.module.css
    ├── StatCard/   StatCard.jsx + StatCard.module.css
    └── DataTable/  DataTable.jsx + DataTable.module.css
```

## Run

```bash
cd examples/react-dashboard
npm install
npm run dev
```
