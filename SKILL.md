---
name: graphite
description: Olger Chotza's personal design system "Graphite" — monotone, calm, Apple-simple. Use for ANY UI or visual work in any stack (web, React, Tailwind, React Native/Expo, SwiftUI, HTML artifacts, emails, slides) — building or editing screens, components, layouts, styling, colors, typography, spacing, icons, motion, empty states, or UI copy. Load before writing UI code, and run its checklist before calling UI work done.
license: Apache-2.0
metadata:
  version: "1.0.0"
  author: Olger Chotza
  url: https://ochotzas.com
---

# Design System — "Graphite"

Monotone. The whole interface is one cool graphite hue — light islands on a soft grey
table, dark ink for everything that matters. **No accent color: ink is the accent.**
Feels calm and Apple-simple, but recognizably mine through the monotone palette,
the islands, and Figtree set big and tight.

## The 7 rules

1. **One hue only.** Every color comes from the graphite tokens. The single exception is `danger` red for errors and destructive actions. No blue links, no green success, no brand gradients.
2. **Ink is the accent.** Primary buttons, selected states, checks, progress — all solid `ink`. Emphasis comes from *contrast*, never from a new color.
3. **Content lives on islands.** Group related content in `surface` islands (radius 22) sitting on the `bg` table. Rows inside an island are split by `line` dividers. Never nest islands, never add shadows to them.
4. **One job per screen.** Exactly one ink-filled primary button. Everything else is a secondary (`surface`) or plain button.
5. **Type does the hierarchy.** Big tight Figtree 700 titles, 500 for row titles, 400 for reading. Max 3 sizes per screen. Secondary info goes to `ink-2`, done/disabled to `ink-3`.
6. **Round and soft.** Capsule buttons, circular checks, rounded islands, pill progress. No sharp corners, no hard borders around islands.
7. **Everything moves on one spring.** iOS-like (stiffness 380, damping 30) — quick, physical, barely-there settle. Signature effects: push back, rolling numbers, blur swap, collapsing title, swipe to delete, shake on error, liquid tabs. Motion only on state change; respect reduced motion.

## Files — read what you need

| File | Read when |
|---|---|
| `tokens/tokens.css` | Web/CSS/Tailwind — import or copy. Never invent values. |
| `tokens/tokens.ts` | JS/TS, React Native, Expo — same tokens typed. |
| `foundations.md` | Color, type, spacing, radius, layout, icons — full specs. |
| `components.md` | Islands, rows, buttons, checks, inputs, progress, nav, sheets, states. |
| `motion.md` | Any animation, transition, gesture — specs for the spring + 7 signature effects. |
| `examples/motion.html` | Working code for every motion effect. Copy from here. |
| `voice.md` | Any UI text. |
| `stacks.md` | Tailwind, React Native, SwiftUI mapping (SwiftUI: native components first). |
| `fonts/` | Figtree TTFs for native apps (iOS, macOS, Android). |
| `anti-patterns.md` | **Always skim** — what agents typically get wrong. |
| `examples/showcase.html` | Reference implementation. Copy patterns from here. |
| `checklist.md` | **Run before declaring UI work finished.** |

## Workflow

1. Read this file + `anti-patterns.md`; read others as needed.
2. Tokens only. If something's missing, use the nearest token — don't add new ones without asking.
3. Build the simplest version that does the job.
4. Run `checklist.md`, fix misses, report the result in one line.
5. If the project already has its own design system, follow the project and mention conflicts.
