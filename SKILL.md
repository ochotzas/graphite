---
name: graphite
description: Olger Chotza's personal design system "Graphite" — graphite-toned, calm, Apple-simple, with soft color only for meaning. Use for ANY UI or visual work in any stack (web, React, Tailwind, React Native/Expo, SwiftUI, HTML artifacts, emails, slides) — building or editing screens, components, layouts, styling, colors, typography, spacing, icons, motion, empty states, or UI copy, and unslopping AI-looking UI. Load before writing UI code, and run its checklist before calling UI work done.
license: Apache-2.0
metadata:
  version: "2.1.0"
  author: Olger Chotza
  url: https://ochotzas.com
---

# Design System — "Graphite"

Graphite first. The interface is one cool graphite hue — light islands on a soft grey
table, dark ink for everything that matters. **Ink carries emphasis; color only carries meaning**,
and when it appears it's soft — the same lightness and low chroma as the graphite around it.
Feels calm and Apple-simple, but recognizably mine through the graphite palette,
the islands, and Figtree set big and tight.

## The 7 rules

1. **Graphite first, soft color for meaning.** Chrome, text and surfaces are graphite. Color comes only from the soft tokens and always means something: `accent` for links, focus and today/current markers; `success` / `warning` / `danger` (and `accent` for info) for status; `cat-*` only for labels people pick and chart series. No gradients, no brand colors on chrome; a screen stays mostly grey.
2. **Ink is the emphasis.** Primary buttons, selected states, checks, progress — all solid `ink`. Never a colored button (a solid `danger` confirm is the one exception). Emphasis comes from contrast, not color.
3. **Content lives on islands.** Group related content in `surface` islands (radius 22) sitting on the `bg` table. Rows inside an island are split by `line` dividers. Never nest islands, never add shadows to them.
4. **One job per screen.** Exactly one ink-filled primary button. Everything else is a secondary (`surface`) or plain button.
5. **Type does the hierarchy.** Big tight Figtree 700 titles, 500 for row titles, 400 for reading. Max 3 sizes per screen. Secondary info goes to `ink-2`, done/disabled to `ink-3`.
6. **Round and soft.** Capsule buttons, circular checks, rounded islands, pill progress. No sharp corners, no hard borders around islands.
7. **Everything moves on one spring.** iOS-like (stiffness 620, damping 44) — snappy, physical, no visible settle. Gestures hand their release velocity to the spring and every animation can be grabbed mid-flight. Signature effects: push back, drag and fling to dismiss, rolling numbers, blur swap, collapsing title, swipe to delete, shake on error, liquid tabs, zoom open, photo fly-in, armed swipe, lift to reorder, morphing button. Motion only on state change; respect reduced motion.

## Files — read what you need

| File | Read when |
|---|---|
| `tokens/tokens.css` | Web/CSS/Tailwind — import or copy. Never invent values. |
| `tokens/tokens.ts` | JS/TS, React Native, Expo — same tokens typed. |
| `foundations.md` | Color, type, spacing, radius, layout, icons — full specs. |
| `components.md` | Islands, rows, buttons, checks, inputs, progress, nav, sheets, states. |
| `motion.md` | Any animation, transition, gesture — specs for the spring, gesture physics + 13 signature effects. |
| `examples/motion.html` | Working code for every motion effect. Copy from here. |
| `voice.md` | Any UI text. |
| `stacks.md` | Tailwind, React Native, SwiftUI mapping (SwiftUI: native components first). |
| `fonts/` | Figtree TTFs for native apps (iOS, macOS, Android). |
| `anti-patterns.md` | **Always skim** — what agents typically get wrong. |
| `unslop.md` | Cleaning up an existing AI-looking screen: audit list + fix passes. |
| `examples/showcase.html` | Reference implementation. Copy patterns from here. |
| `examples/desktop.html` | Desktop shell: sidebar, main chart, ranked list, table, chips. |
| `examples/unslop.html` | Before/after dashboard: stat rows, one main chart, the unslop passes. |
| `checklist.md` | **Run before declaring UI work finished.** |

## Workflow

1. Read this file + `anti-patterns.md`; read others as needed.
2. Tokens only. If something's missing, use the nearest token — don't add new ones without asking.
3. Build the simplest version that does the job.
4. Run `checklist.md`, fix misses, report the result in one line.
5. If the project already has its own design system, follow the project and mention conflicts.
6. Restyling an existing screen that looks AI-made? Run `unslop.md` first.
