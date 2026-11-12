# Changelog

Graphite by Olger Chotza — https://ochotzas.com

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
