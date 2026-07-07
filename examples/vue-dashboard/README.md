# Vue Dashboard Example

> Demonstrates DivSkill rules applied to a Vue 3 project with SFC + `<style scoped>`.

## Prompt Given to AI

```
Build a Vue 3 dashboard app following DivSkill rules:
- Three-layer in every <style scoped>: Outer(bg) → Inner(flex+gap) → Child(overflow, no margin)
- Root: height:100vh; width:100vw; overflow:hidden
- NO fixed px on layout — nav: flex:0 0 auto, sidebar: clamp()
- ZERO margin on flex/grid children (icons too)
- Outer: NO display:flex/grid, NO padding/gap
- Inner: MUST have display+gap (padding alone violates)
- Cards: overflow:hidden, table: table-layout:fixed
- One .vue SFC per component with <style scoped>
- Components: NavBar, Sidebar, StatCard, DataTable
```

## Without SKILL

In a typical Vue project without DivSkill, agents produce `.vue` files with the same CSS violations as vanilla HTML:

| Violation | Typical Vue Output |
|---|---|
| Fixed px | `.navbar { height: 60px; }` in NavBar.vue |
| Margin on children | `App.vue` with `margin-bottom: 24px` between sections |
| Outer/inner mixed | Component root with background + `display: flex` |
| No min-width:0 | Flex children overflow in sidebar |
| No overflow hidden | Cards in StatCard.vue lack `overflow: hidden` |
| No ellipsis | Text clips without `text-overflow` |
| Non-scoped global | Component styles written without `scoped` or in global CSS |

The file structure is right (`.vue` SFCs), but the CSS inside still violates.

## With SKILL (Result)

| Fix | Vue Code |
|---|---|
| No fixed px | `flex: 0 0 auto; min-height: 56px` — responsive |
| Three-layer template | `<template>` with outer → inner → child nesting |
| Zero margin | All spacing via `gap` on parent containers |
| Outer bg only | `style scoped` has background on outer class, flex on inner |
| `<style scoped>` | Every component uses `scoped`, zero global CSS |
| Card overflow | `overflow: hidden` in StatCard.vue |
| Table fixed | `table-layout: fixed` in DataTable.vue |
| Ellipsis | Text elements get `text-overflow: ellipsis` |

## File Structure

```
src/
├── App.vue               # Root layout: root container + overall grid
│   <style scoped>        #   height:100vh; width:100vw; overflow:hidden
└── components/
    ├── NavBar.vue         # NavBar: flex:0 0 auto, outer→inner→children
    ├── Sidebar.vue        # Sidebar: clamp width, scrollable
    ├── StatCard.vue       # StatCard: overflow:hidden, gap, ellipsis
    └── DataTable.vue      # DataTable: table-layout:fixed, status badges
```

## Run

```bash
cd examples/vue-dashboard
npm install
npm run dev
```
