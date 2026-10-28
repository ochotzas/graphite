# Foundations

All values live in `tokens/`. This file explains how to use them.

## Color — monotone graphite

One hue (cool graphite, OKLCH h≈270, very low chroma) at different lightness steps. That restraint *is* the identity.

| Token | Use for |
|---|---|
| `bg` | The page / "table". Everything sits on it. |
| `surface` | Islands: grouped lists, cards, sheets, inputs, secondary buttons |
| `press` | Hover/pressed row inside an island |
| `track` | Progress track, switch off, skeleton blocks |
| `line` | Dividers between rows inside an island |
| `ring` | Empty check circles, input borders, radio outlines |
| `ink` | Text, icons, primary button fill, selected/checked fills, progress fill, avatar fill |
| `ink-2` | Secondary text: dates, times, meta, helper text, inactive tabs |
| `ink-3` | Done/completed items, disabled, placeholders |
| `on-ink` | Text/icons on an ink fill |
| `danger` | Error text, invalid input border, destructive button label. Nothing else. |

**Rules**
- No other colors. Success = an ink check. Info = plain text. Warnings = ink text with an icon; only true errors use `danger`.
- Images and user content (photos, avatars) are the only things that bring extra color — let them.
- Charts: `ink` for the main series, `ring`/`track` for comparison. Use pattern or labels, not hue, to separate more series.
- Dark mode is required. It's the same hue, inverted: near-black table, dark islands, light ink.
- `ink` and `ink-2` pass WCAG AA on both `bg` and `surface`. `ink-3` doesn't — never for essential text.

## Typography — Figtree

One family: **Figtree** (Google Fonts, free). Fallback: system UI.

| Style | Size/LH | Weight | Use |
|---|---|---|---|
| display | 56/58, −0.04em | 700 | Marketing hero only |
| title1 | 38/42, −0.03em | 700 | Screen title ("Today") |
| stat | 34/38, −0.03em | 700 | Big numbers in a stat island |
| title2 | 24/30, −0.02em | 700 | Section title on long pages |
| headline | 18/24 | 600 | Island title |
| body | 16/24 | 400 / 500 | 400 for reading, 500 for row titles |
| footnote | 13/18 | 500 | Dates, times, meta, helper text (`ink-2`) |
| caption | 12/16 | 500 | Group labels above islands, tab labels (`ink-2`) |

**Rules**
- Max 3 sizes per screen.
- Titles are **left-aligned, big and tight**: this is part of the look.
- Hierarchy: size → weight → `ink-2`. Never color, never italics, never uppercase.
- Sentence case for everything, including group labels.
- Numbers that change or align: `font-variant-numeric: tabular-nums`.
- Completed items: switch to `ink-3`. No strikethrough.

## Spacing — 4pt grid

| Gap | Token | Where |
|---|---|---|
| 8 | `space-2` | icon ↔ label, number ↔ unit |
| 12 | `space-3` | between stacked islands, check ↔ row text, row vertical padding |
| 16 | `space-4` | island inner padding (lists), row horizontal padding |
| 18–24 | `space-5` | stat/card island padding, title → first island |
| 32–48 | `space-6/7` | between sections |
| 20/24/32 | `--gutter` | screen side padding (mobile/tablet/desktop) |

Proximity rule: space inside a group must be clearly smaller than between groups.

## Radius

| Token | Use |
|---|---|
| `radius-sm` 8 | Thumbnails in rows, tags |
| `radius-md` 14 | Inputs, segmented control, small tiles |
| `radius-lg` 22 | **Islands** — the signature container |
| `radius-xl` 34 | Sheets, modals, device-like frames |
| `radius-full` | Buttons, checks, avatars, switches, progress bars |

Concentric rule: inner radius = outer radius − padding.
iOS/SwiftUI: always `.continuous` corners.

## Elevation

Flat. Islands have **no shadow and no border** — the `surface` vs `bg` contrast does the work.
Only floating layers (menus, popovers, toasts, sheets) get `shadow-float`. Scrim behind modals: `--scrim`.

## Layout

- Mobile-first, single column of islands on the `bg` table.
- Screen = header row (date/meta left, avatar or action right) → big title1 → islands stacked with 12px gaps → primary button at the bottom.
- Desktop: center a column (max `--width-read` for focused flows), or a sidebar + content of islands in a grid (max `--width-app`).
- Every layout works at 360px with no horizontal scroll. Touch targets ≥ 44px.

## Icons

- Line icons, 1.75px stroke, rounded caps/joins, sizes 20 and 24. Lucide (`strokeWidth={1.75}`) or SF Symbols.
- Color: `ink` or `ink-2`. Active tab: filled glyph in `ink`.
- Use icons only where they add meaning — not on every row.
