# Container Hierarchy Architecture

> A universal CSS layout specification: an outside-to-inside, layer-by-layer nested container pattern ensuring all containers fill the viewport, content never overflows, and elements never overlap when shrinking.

---

## Core Principles

### Three-Layer Structure (Required)

```
Outer Container      (Responsible for: width/height, background, border, positioning, decorative pseudo-elements)
  └── Inner Container (Responsible for: flex/grid space distribution, height:100%, padding/gap)
      ├── Child Container A  (Responsible for: overflow constraint, self-alignment)
      ├── Child Container B
      └── Child Container C
```

Each layer handles only its own responsibilities — no cross-layer duties.

| Layer | Responsibilities | Forbidden |
|---|---|---|
| **Outer Container** | Width/height, background, border, `position:relative`, `::before`/`::after` decoration | `display:flex/grid` for internal layout, `padding`/`gap` |
| **Inner Container** | `display:grid/flex` for space distribution, `height:100%`, `padding/gap` | Background color, border, decorative pseudo-elements |
| **Child Container** | `overflow:hidden` constraint, `display:flex` for content alignment | `padding`/`gap` (belongs to inner container), `margin` |

> ⚠️ **Self-positioning vs Internal layout:** Outer containers may use `flex: 0 0 auto` or `width/height` to control their position within a parent layout — this is allowed. But outer containers must NEVER use `display:flex/grid` to organize their own children — that forces the outer layer to handle both background/decoration AND internal layout, violating single responsibility. `display:flex/grid` always belongs to the inner container.

> ⚠️ **Float is also internal layout:** Using `float: left/right` on an outer container to arrange children is the same violation as using `display:flex`. Float controls child layout and must be delegated to the inner container. Correct approach: outer handles only background, inner uses `display:flex + gap` or `display:grid + gap` to arrange children.

### Viewport Fill

```css
/* Root container: must fill viewport + hide overflow */
.root {
  display: flex; flex-direction: column;
  height: 100vh; width: 100vw;
  overflow: hidden;
}
```

> ⚠️ Without `overflow: hidden` on the root, overflowing content triggers body scrollbars and breaks the full-screen layout.

---

## Space Allocation Rules

### No Fixed Pixel Sizing

```css
/* ❌ Wrong: fixed px */
.header { height: 56px; }       /* nav fixed height, overflows on shrink */
.sidebar { width: 240px; }      /* fixed width, too wide for small screens */

/* ✅ Correct: content-driven height + min-height protection */
.header { flex: 0 0 auto; min-height: 44px; }

/* ✅ Correct: relative proportions */
.main   { flex: 1; }            /* fill remaining space */
.grid   { flex: 1 1 0; }        /* equal division */
.aside  { flex: 0 0 300px; }    /* fixed width (OK for decorative elements) */

/* ✅ Correct: responsive fixed width with clamp */
.sidebar { flex: 0 0 clamp(200px, 20vw, 320px); }
```

| Scenario | Correct Approach |
|---|---|
| Fill remaining space | `flex: 1` or `flex: 1 1 0` |
| Equal multi-column | `grid-template-columns: 1fr 1fr 1fr` |
| Equal proportion | `flex: 1` / `flex: 2` |
| Content-driven height | `flex: 0 0 auto` + optional `min-height` |
| Responsive fixed width | `clamp(200px, 20vw, 320px)` |

### No Margin for Container Spacing

```css
/* ❌ Wrong: margin spacing */
.sidebar__section { margin-bottom: 24px; }    /* margin outside gap control */
.card__label { margin-bottom: 4px; }          /* child spacing should not be decided by children */

/* ✅ Correct: gap or padding */
.sidebar-groups { display: flex; flex-direction: column; gap: 24px; }
.card-body { display: flex; flex-direction: column; gap: 4px; }
.sidebar-groups > * { /* no margin */ }
.card-body > * { /* no margin */ }
```

> ⚠️ **Key trap: `padding` cannot replace `gap`.** The following looks OK but is a violation:
> ```css
> .card-body { padding: 20px; }           /* ❌ Only padding, no display:flex + gap */
> .card-value { margin-bottom: 8px; }     /* ❌ Forces margin for spacing */
> ```
> Correct approach: inner container must use `display:flex + gap`, even for simple cards:
> ```css
> .card-body { display: flex; flex-direction: column; gap: 8px; padding: 20px; }
> .card-value { /* no margin */ }
> ```

If you find yourself writing `margin-bottom` or `margin-top` on a flex/grid child, immediately replace it with `gap` on the parent container.

**Exceptions:** `margin: 0 auto` for centering, negative margin adjustments (only for precise positioning of absolutely positioned elements, never for container spacing).

### Content Must Not Determine Container Size

```css
/* ❌ Wrong: content stretches container */
.container { display: flex; }
.long-text { white-space: nowrap; }  /* long text breaks parent */

/* ✅ Correct: container constrains content */
.parent { display: flex; min-width: 0; }
.child  { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

---

## Overflow & Overlap Prevention

### Four Layers of Overflow Protection

```css
/* Layer 1: root container hides overflow */
.root { overflow: hidden; }

/* Layer 2: card/panel hides overflow */
.card { overflow: hidden; }

/* Layer 3: inner container overflow + scroll */
.panel { overflow-y: auto; overflow-x: hidden; }

/* Layer 4: text element truncation */
.text  { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

> ⚠️ Every layer is mandatory. A card without `overflow: hidden` will let content spill out and disrupt the layout below.

### Protection When Viewport Shrinks

```css
/* All flex/grid children must allow shrinking */
.flex-item { min-width: 0; min-height: 0; }

/* Fixed-width elements use clamp for protection */
.sidebar { flex: 0 0 clamp(200px, 20vw, 320px); }

/* Tables use fixed layout */
table { table-layout: fixed; width: 100%; }
th, td { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

> ⚠️ `min-width: 0` is the most commonly missed rule. Flexbox children default to `min-width: auto`, meaning long content stretches the parent. Adding `min-width: 0` lets flex children actually shrink.

### Overlap Prevention

```css
/* Absolutely positioned elements must have explicit z-index */
.overlay  { position: absolute; z-index: 10; }
.modal    { position: fixed; z-index: 100; }
.tooltip  { position: absolute; z-index: 50; }

/* Absolutely positioned elements without z-index must NOT be used for layout */
/* ❌ Forbidden: using absolute for layout arrangement */
/* ✅ Allowed: using absolute for decoration (glow, badges) */
```

---

## Centering Reference

| Scenario | Implementation |
|---|---|
| Horizontal center (flex) | `parent: display:flex; justify-content:center` |
| Horizontal center (grid) | `parent: display:grid; justify-items:center` or `child: margin:0 auto` |
| Vertical center (flex) | `parent: display:flex; align-items:center` |
| Bi-directional center (flex) | `parent: display:flex; align-items:center; justify-content:center` |
| Bi-directional center (grid) | `parent: display:grid; place-items:center` |
| Text centering | `text-align: center` |
| Flex child self-centering | `child: align-self:center; margin:auto` |

---

## Complete Examples

### 5.1 Top Navigation Bar

```html
<header class="navbar">               <!-- Outer: background + border -->
  <div class="navbar-body">           <!-- Inner: grid three columns -->
    <div class="nav-left">Logo</div>   <!-- Child container -->
    <div class="nav-center">Title</div><!-- Child container -->
    <div class="nav-right">Status</div><!-- Child container -->
  </div>
</header>
```

```css
.navbar {                     // Outer: flex/position for parent layout context
  flex: 0 0 auto; position: relative;
  background: #1a1a2e; border-bottom: 1px solid rgba(255,255,255,.1);
}
.navbar-body {                // Inner
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch;
  height: 100%; padding: 0 16px;
}
.nav-left, .nav-center, .nav-right { // Child containers
  display: flex; align-items: center; overflow: hidden;
}
.nav-right { justify-content: flex-end; }
```

### 5.2 Card Panel

```html
<section class="card">                <!-- Outer: background + border-radius (no display:flex) -->
  <div class="card-body">            <!-- Inner: flex column + padding + gap -->
    <div class="card-header">Title</div>    <!-- Child container -->
    <div class="card-content">Content</div> <!-- Child container, flex:1 fills space -->
    <div class="card-footer">Footer</div>   <!-- Child container -->
  </div>
</section>
```

```css
.card {                                   /* Outer: decoration only */
  border-radius: 8px; overflow: hidden;
  background: #fff; border: 1px solid #e2e8f0;
}
.card-body {                              /* Inner: flex layout + spacing */
  display: flex; flex-direction: column;
  padding: 12px; gap: 8px;
}
.card-content {                           /* Child: overflow control */
  flex: 1; min-height: 0; overflow-y: auto;
}
.card-header, .card-footer {              /* Child: fixed size */
  flex: 0 0 auto;
}
```

### 5.3 Split Layout

```html
<div class="split">                   <!-- Outer -->
  <div class="split-body">           <!-- Inner -->
    <aside class="split-left">Sidebar</aside>  <!-- Child container -->
    <main class="split-right">Main</main>      <!-- Child container -->
  </div>
</div>
```

```css
.split { display: flex; flex-direction: column; flex: 1; }
.split-body {
  display: grid;
  grid-template-columns: clamp(200px, 20vw, 300px) 1fr;
  gap: 12px; flex: 1; min-height: 0;
}
.split-left, .split-right { overflow: hidden; }
```

---

## Anti-Pattern Reference

| Anti-pattern | Problem | Correct Approach |
|---|---|---|
| `height: 56px` | Fixed px, not scalable | `flex: 0 0 auto; min-height: 44px` |
| `width: 240px` | Fixed width, overflows on small screens | `clamp(200px, 20vw, 320px)` |
| `margin-bottom: 24px` on children | Spacing overflows parent container | Parent `gap: 24px` |
| `margin-bottom: 8px` on card children | Uncontrolled spacing | Card inner container `gap: 8px` |
| `position: absolute` for three-column layout | Not adaptive, z-index chaos | Parent `display: grid; grid-template-columns: 1fr 1fr 1fr` |
| Children without `min-width: 0` | Flex children won't shrink, overflow parent | Child `min-width: 0` |
| `table-layout: auto` | Column width determined by content, can break container | `table-layout: fixed` + explicit column widths |
| Card without `overflow: hidden` | Overflow content breaks layout below | Card `overflow: hidden` |
| Outer container with `display:flex` + `padding` | Mixed outer/inner responsibilities | Split into outer container(background) + inner container(flex+padding) |
| Card inner container with only `padding` (no `display:flex + gap`) | Children forced to use margin for spacing | Inner must have `display:flex + gap` |

---

## Checklist

- [ ] Root container: `height: 100vh; width: 100vw; overflow: hidden`
- [ ] Every block: Outer → Inner → Child three-layer structure
- [ ] No fixed `px` height/width (except decorative elements)
- [ ] No `margin` for container spacing (use `gap` / `padding`)
- [ ] All flex/grid children have `min-width: 0` / `min-height: 0`
- [ ] Text overflow: `text-overflow: ellipsis` + `overflow: hidden` + `white-space: nowrap`
- [ ] `table-layout: fixed` + explicit column widths
- [ ] Absolutely positioned elements have explicit `z-index`
- [ ] Cards/panels have `overflow: hidden`
- [ ] Font sizes use `clamp(min, vw, max)` or relative units

---

## Common Rationalizations

| Excuse | Why It's Wrong |
|---|---|
| "56px is fine for nav, that's what the design says" | Design is fixed size, pages need to adapt to different font sizes and zoom levels |
| "Margin is more intuitive" | Margin can't be controlled by the parent; gap manages spacing uniformly |
| "Card `margin-bottom` is just content spacing" | Still a violation — all flex/grid child spacing must be controlled by parent's gap |
| "`min-width: 0` works without it" | It works until long text is added and flex children overflow — hard to debug later |
| "Cards have little content, no need for overflow:hidden" | Current content is temporary; future content may overflow |
| "Just a small section" | Small sections also introduce overflow issues in the larger layout |
| "Not enough content for display:flex on card-body" | Without display:flex, children use default block flow with margin — which is forbidden. Always add display:flex + gap |
| "Padding on child container is more convenient" | Child containers should not have padding — that's the inner container's job. Create a proper inner layer. |
