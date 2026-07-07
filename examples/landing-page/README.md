# Landing Page Example — Vanilla HTML/CSS

> Demonstrates DivSkill container hierarchy with decorative backgrounds and hero section.

## Prompt Given to AI

```
Full-viewport landing page with:
- Top nav: logo + menu + CTA
- Hero: headline + subtext + buttons
- Feature cards row: 3 cards with icon/title/description

Follow DivSkill rules exactly:
- Root: height:100vh; width:100vw; overflow:hidden
- Three-layer for every section
- NO fixed px on layout, NO margin on flex children
- Outer never has display:flex
- overflow:hidden on cards, text-overflow:ellipsis on text
```

## Without SKILL

| Violation | Typical Output |
|---|---|
| Fixed nav height | `.nav { height: 60px; }` |
| Margin on button spacing | `.hero-buttons { margin-top: 24px; }` — should be parent gap |
| Outer container with flex | Section containers with background also do `display:flex` |
| No overflow on cards | Feature cards lack `overflow: hidden` |
| No min-width:0 | Text in flex children stretches parent on small screens |
| Single file | Everything in one `<style>` tag |

## With SKILL (Result)

| Fix | Code |
|---|---|
| Three-layer sections | `section-outer → section-inner → children` throughout |
| Root fullscreen | `height:100vh; width:100vw; overflow:hidden` |
| No fixed px | Nav: `flex:0 0 auto; min-height:44px` |
| Zero margin | All spacing via `gap` on inner containers |
| Outer bg only | Outer has background/gradient, inner has flex+gap |
| Card overflow | `overflow: hidden` on feature cards |
| Text overflow | `text-overflow: ellipsis` on headings and descriptions |

## File

```
index.html  — Single HTML with embedded CSS, three-layer structure throughout
```
