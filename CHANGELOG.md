# Changelog

Graphite by Olger Chotza — https://ochotzas.com

## 2.2.0 — 2026-11-24
Navigation, arrivals and waiting states join the motion system; chips, the date picker and selectors are reworked.
- New signature effect: Push and pop. Paths decide push, pop, tab or swap; phones slide like a navigation stack (old page at −28%, 70% opacity), wide screens swap the detail pane, edge swipe back with velocity.
- Everyday: new row in place (blur in + marker pop), menu and popover opening, and waiting indicators (spinner, sweep, skeleton) with exact timings and reduced-motion versions.
- Lift to reorder: the moved row shows a fading highlight after keyboard or menu moves.
- Chips reworked, Apple style. Filter chips are buttons: 32-tall capsules, body text, `ink` when selected, 44 hit area. Tags are labels: 22-tall tinted capsules whose text takes the color, no dots; optional status icon; removable tags with a filled ×. New `cat-*-text` tokens keep category text at ≥ 4.5:1 on its tint.
- Date picker reworked: 7 equal columns that never overflow (days shrink up to 44), plain chevron arrows, month slides in its direction, chosen date in words with a Today button, arrow-key navigation across months.
- Selectors: searchable select (combobox), multi-select with removable tags, pop-up button, rich menu with sections, subtitles, submenu and toggle items, time picker with snapping wheels, option list. Which-selector guide in `components.md`; working page `examples/selectors.html`.
- `examples/motion.html`: demos for Push and pop and for arrivals and waiting.
- Zoom open reworked to the iOS feel: the card itself grows into its page on `transform`, its image growing into the header; no card copy on top, no title swap, and the list behind stays still with a light dim.
- Photo fly-in: one spring drives the screen, sheet and flying image together; the image moves with transform and a crop (works for real photos without stretching); the dimmed screen uses a black layer instead of a brightness filter.
- Lift to reorder: the island keeps its rounded corners (rows are see-through, only the lifted row gets a fill); the list reorders only after both drop springs settle (a row no longer stays offset after a drop), and grabbing another row mid-drop finishes the first drop at once.

## 2.1.0 — 2026-11-13
- Snappier spring: stiffness 620, damping 44 (was 380 / 30). ~0.3% overshoot, settles in ~350ms. SwiftUI `.spring(response: 0.25, dampingFraction: 0.88)`.
- Liquid tab edges keep the default's damping ratio: fast 837 / 51 (~310ms), slow 434 / 37 (~420ms).
- Physics and gestures in `motion.md`: release velocity goes to the spring, everything is interruptible, √ rubber-banding, fling thresholds, direction lock.
- New signature effects: Zoom open, Photo fly-in, Armed swipe, Lift to reorder, Morphing button. Drag to dismiss now flings with velocity.
- `examples/motion.html`: a velocity-aware `spring()` and `velocityTracker()`, demos for every new effect, sheet drag and liquid tabs on physics.
- Checklist, anti-patterns, components and stacks updated for velocity and interruptible gestures.

## 2.0.0 — 2026-11-12
- Soft color: `accent` (links, focus, now), `success` / `warning` / `danger` with tints, and six category colors, all at graphite's lightness and low chroma. Ink stays the emphasis; color only carries meaning.
- `danger` softened to match (`#AB413A` light, `#F2897E` dark).
- Focus rings and text selection use `accent`.
- New components: menu, context menu, popover, tooltip, select, slider, stepper, date picker, chips (neutral, category, filter, status), count badge, banners, inline links. All in the showcase.
- Charts section in foundations: one main chart, form per data, ink-first color, axes, labels, hover/scrub, states.
- `examples/desktop.html`: sidebar shell with a line chart, ranked list, table and category/status chips.
- Smoother count change: the old number rolls out while the new one rolls in, interruptible (stepper, counts).
- Haptics map for native (iOS `sensoryFeedback`, `expo-haptics`).
- Accessibility: dialog focus handling and inert background (showcase implements it), increased contrast in the tokens, reduced transparency.
- Icons: a list of where icons go (navigation, icon buttons, known actions, settings rows, menus, banners, empty states) and where they don't.
- Drag to dismiss for every bottom sheet (motion §2); liquid tab and list-island specs made consistent.
- `unslop.md`: audit and fix passes for AI-looking UI, adapted from unslop by Damir Sokolovsky (CC BY 4.0).
- `examples/unslop.html`: before/after invoicing dashboard showing the audit and passes.
- More anti-patterns, voice rules and checklist items for common AI-UI tells, plus a template check.

## 1.0.0 — 2026-10-28
- Graphite: monotone graphite palette, islands, Figtree, no accent color.
- Spring motion system with 7 signature effects.
- Scroll-edge fade, liquid tabs, full-row hover, desktop dialog.
- Figtree font files bundled for native apps.
- SwiftUI guide: native components first, font setup, Dynamic Type.
- Claude Code plugin and marketplace (`/plugin install graphite --marketplace ochotzas/graphite`).
- npm package from GitHub (`npm install github:ochotzas/graphite#v1.0.0`).
- Apache 2.0 license.
