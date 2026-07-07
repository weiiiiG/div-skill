# CSS File Organization

> Standardize CSS code file structure: organize by **Design Tokens → Base Styles → Component Styles → Page Styles** in layers, avoiding monolithic single-file approaches.

---

## Core Principles

### Layered Dependency (Required)

```
tokens/           Design tokens (colors, spacing, breakpoints)       ← referenced by all files
  └── base/       Base styles (reset, global typography)             ← may reference tokens
      └── components/  Component styles (NavBar, Card)               ← may reference tokens, NOT pages/
          └── pages/    Page styles (Dashboard, Settings)             ← may reference tokens + components
              └── main.css   Entry aggregator                         ← ONLY file loaded by HTML
```

**Dependency direction is one-way:** tokens → base → components → pages. Reverse references and circular dependencies are forbidden.

### Directory Structure

```
src/styles/
├── tokens/
│   ├── colors.css          # Color variables
│   ├── spacing.css         # Spacing variables
│   ├── typography.css      # Font variables
│   └── breakpoints.css     # Breakpoint variables
├── base/
│   ├── reset.css           # CSS reset / normalize
│   └── global.css          # body, html global styles
├── components/
│   ├── NavBar.css          # Navigation bar component
│   ├── Sidebar.css         # Sidebar component
│   ├── Card.css            # Card component
│   └── DataTable.css       # Data table component
├── pages/
│   ├── Dashboard.css       # Dashboard page
│   ├── Settings.css        # Settings page
│   └── Reports.css         # Reports page
└── main.css                # @import aggregator, HTML's sole reference
```

---

## Layer Responsibilities

### tokens/ — Design Tokens

```css
/* tokens/colors.css */
:root {
  --color-bg-primary: #f1f5f9;
  --color-bg-card: #ffffff;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
  --color-accent: #3b82f6;
}

/* tokens/spacing.css */
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

/* tokens/typography.css */
:root {
  --font-family-base: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-size-xs: 11px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 22px;
  --font-size-2xl: 28px;
}

/* tokens/breakpoints.css */
:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
}
```

**Rules:**
- Must use CSS custom properties (`--var-name`), never hardcoded values
- All colors, spacing, typography, shadows, border-radius values MUST reference tokens
- **Tokens must contain only pure design values** (colors, spacing, font sizes, breakpoints). Layout-related values (like `--sidebar-width`) belong in component CSS with `clamp()`.
- Token files must NOT contain selectors or layout code

### base/ — Base Styles

```css
/* base/reset.css */
*, *::before, *::after {
  margin: 0; padding: 0; box-sizing: border-box;
}

/* base/global.css */
html, body {
  height: 100%;
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
}
```

**Rules:**
- Only global reset and html/body base styles
- Component styles or page layout code strictly forbidden

### components/ — Component Styles

```css
/* components/NavBar.css */
.navbar-outer {
  flex: 0 0 auto;
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border);
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--spacing-md);
}
.navbar-left, .navbar-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}
```

**Rules:**
- One CSS file per component
- Must reference tokens via variables, never hardcode colors/spacing
- **Must NOT reference pages/ files**
- Must follow the Container Hierarchy Architecture three-layer structure

### pages/ — Page Styles

```css
/* pages/Dashboard.css */
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}
.dashboard-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}
```

**Rules:**
- One CSS file per page
- Contains only that page's specific layout and styles
- May reference tokens and components, but **must NOT reference other pages/ files**
- Component-level styles must be in components/, never in pages/

### main.css — Aggregator

```css
/* main.css — sole CSS file referenced by HTML */
@import url(./tokens/colors.css);
@import url(./tokens/spacing.css);
@import url(./tokens/typography.css);
@import url(./tokens/breakpoints.css);

@import url(./base/reset.css);
@import url(./base/global.css);

@import url(./components/NavBar.css);
@import url(./components/Sidebar.css);
@import url(./components/Card.css);
@import url(./components/DataTable.css);

@import url(./pages/Dashboard.css);
@import url(./pages/Settings.css);
@import url(./pages/Reports.css);
```

**Rules:**
- The ONLY file referenced by HTML via `<link>`
- Strict import order: tokens → base → components → pages
- Never bypass main.css by referencing sub-files directly in HTML

---

## Anti-Patterns

| Anti-pattern | Problem | Correct Approach |
|---|---|---|
| All CSS in `index.html` `<style>` | Not reusable, hard to maintain | Split into tokens/components/pages layered files |
| Component CSS referencing pages/ | Circular dependency, component-page coupling | Components know nothing about pages, reference only tokens |
| Page CSS containing component styles | Component styles scattered across N pages | Component styles in components/, page CSS does page layout only |
| Hardcoded color `#3b82f6` in components | Theme change requires global search-and-replace | Use `var(--color-accent)` |
| `@import url(../tokens/colors.css)` bypassing main.css | Duplicate loading, cascade order issues | Only main.css manages imports |
| Selectors/layout code in tokens/ files | Design token + layout code mixed | Tokens define only `:root` variables |
| Layout values in tokens (e.g. `--sidebar-width: 16rem`) | Layout decisions don't belong in pure design tokens | Layout size with `clamp()` in component CSS |
| One component spread across multiple CSS files | Scattered files, hard to find | One CSS file per component |

---

## Naming Conventions

### File Naming
- Component files: PascalCase (`NavBar.css`, `Sidebar.css`)
- Page files: PascalCase (`Dashboard.css`, `Settings.css`)
- Token files: kebab-case (`colors.css`, `spacing.css`)
- Base files: kebab-case (`reset.css`, `global.css`)

### CSS Class Naming (BEM variant)
- Component classes: kebab-case (`.component-name`)
- Elements: `.component-name__element`
- Modifiers: `.component-name--modifier`
- Page-level: `.page-name` (e.g. `.dashboard`, `.settings`)

---

## Checklist

- [ ] File structure: tokens/ → base/ → components/ → pages/ → main.css
- [ ] HTML references only `main.css`, never sub-files
- [ ] Tokens use CSS custom properties (`--var-name`), components/pages reference `var(--...)`
- [ ] No hardcoded color/spacing/typography values
- [ ] One CSS file per component, one per page
- [ ] Component styles don't reference page files
- [ ] Page styles don't contain component-level styles
- [ ] Token files contain no selectors or layout code
- [ ] Class naming consistent (kebab-case + BEM)
- [ ] Components follow Container Hierarchy Architecture three-layer structure
- [ ] No `margin-bottom`/`margin-top` on flex/grid children (use `gap`)

---

## Common Rationalizations

| Excuse | Why It's Wrong |
|---|---|
| "One file is faster, PM needs it now" | One file is only faster initially; every subsequent modification is slower |
| "It's just a demo" | Demos evolve into production code; structure should be correct from the start |
| "Small projects don't need this" | File splitting is about maintainability, not project size |
| "I'll split it later" | Later never comes; tech debt accumulates |
| "Convenient to reference pages from components" | Once a component depends on a page, it can no longer be reused independently |
| "Direct @import is simpler, skip main.css" | Skipping main.css causes loading order issues and duplicate imports |
| "Layout values in tokens are convenient" | Layout values are component decisions, not design decisions; express with `clamp()` in component CSS |
| "Mixing component and page CSS is easier to find" | Causes component changes to require editing N pages, violating DRY |
