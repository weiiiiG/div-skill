# Settings Page Example — Vanilla HTML/CSS

> Demonstrates DivSkill container hierarchy with forms, modals, and z-index overlays.

## Prompt Given to AI

```
Settings/profile page with:
- Nav bar + two-column layout (sidebar + form)
- Form: inputs, textarea, toggle switches, save button
- Modal overlay (centered, backdrop, z-index)

Follow DivSkill rules:
- Three-layer structure everywhere
- Root: height:100vh; width:100vw; overflow:hidden
- NO fixed px, NO margin on children
- Outer never has display:flex/grid/float
- Absolute positioned elements: explicit z-index only for overlays
```

## Without SKILL

| Violation | Typical Output |
|---|---|
| Fixed nav | `.header { height: 56px; }` |
| Fixed sidebar | `.sidebar { width: 220px; }` |
| Margin on form elements | `.form-group { margin-bottom: 16px; }` |
| Outer with display:flex | Form wrapper with background also does layout |
| No z-index on modal | Modal overlay missing explicit `z-index`, may stack incorrectly |
| Missing min-width:0 | Sidebar text overflows when viewport narrows |
| Monolithic | All CSS in one block |

## With SKILL (Result)

| Fix | Code |
|---|---|
| Three-layer nav | `.nav → .nav-outer(background) → .nav-inner(flex+gap)` |
| Root fullscreen | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | Nav min-height, sidebar `clamp()` |
| Zero margin | All form spacing via parent `gap` |
| Modal z-index | `.modal-overlay { position:fixed; z-index:1000; }` |
| Card overflow | Form panel has `overflow: hidden` |
| Text overflow | Labels and button text have ellipsis |

## File

```
index.html  — Single HTML with embedded CSS, form + modal pattern
```
