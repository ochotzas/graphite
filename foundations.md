# Foundations

All values live in `tokens/`. This file explains how to use them.

## Color — graphite first

The neutrals are one hue (cool graphite, OKLCH h≈270, very low chroma) at different lightness steps. That restraint *is* the identity. On top sit a few **soft colors** at the same lightness and low chroma, so they feel like part of the graphite, not stickers on it. Color always means something; it never decorates.

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
| `danger` | Error text, invalid input border, destructive button label |

### Soft colors

| Token | Use for |
|---|---|
| `accent` | Inline text links, keyboard focus ring and input focus, today/current markers (today in a date picker, the "now" line), info icons |
| `accent-tint` | Text selection, info banner fill |
| `success` | Status icon or dot for done/healthy/synced, positive change in a chart |
| `warning` | Status icon or dot for "needs attention" (expiring, low storage) |
| `danger` | Errors and destructive actions (as above) |
| `*-tint` | Banner and status-chip fills behind ink text |
| `cat-slate` … `cat-lilac` | Colors people pick for their own things (list, tag, calendar, project), and chart series. `cat-*-tint` for chip and avatar fills |

**Rules**
- **Ink is the emphasis.** Primary buttons, checks, selected tabs and segments, progress, the main chart series — all `ink`. Never a colored button; the solid `danger` confirm is the one exception.
- **Color only means something.** Status, a link, focus, "now", or a category the person chose. If the color has no meaning, it's ink or grey.
- **Text on a tint stays `ink`.** The status color goes on the icon or dot, not the words. Status colors can be text on `bg`/`surface` (they pass AA) — e.g. "+12%" in `success` — but use that sparingly.
- **A screen stays mostly grey.** Ink and graphite everywhere, color on a few small things (icons, dots, chips, one chart).
- Categories: six, in a fixed order (slate, sage, sand, clay, rose, lilac). Shown as a dot, a chip (`cat-*-tint` fill, ink text, `cat-*` dot) or a chart mark. Never as a row or island background.
- Images and user content (photos, avatars) bring their own color — let them.
- Never: gradients, glows, colored shadows, colored borders around islands, a brand color on chrome.
- Dark mode is required. Same hues, lighter colors and darker tints (`tokens.css` has both).
- `ink`, `ink-2`, `accent`, `success`, `warning` and `danger` pass WCAG AA on `bg` and `surface`. `ink-3` doesn't — never for essential text. `cat-*` colors pass 3:1 for marks and dots, not for text.

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
- Desktop: center a column (max `--width-read` for focused flows), or a sidebar + content of islands in a grid (max `--width-app`). Sidebar 240–260 on `bg`, content fills the rest; below 900px the sidebar becomes a row of nav items (web) or a tab bar (apps). Example: `examples/desktop.html`.
- Every layout works at 360px with no horizontal scroll. Touch targets ≥ 44px.

## Accessibility

- Contrast: essential text uses `ink`, `ink-2` or a status color on `bg`/`surface` (all AA). Text on tints is `ink`.
- **Increase contrast** (`prefers-contrast: more`, iOS Increase Contrast): `ink-2` → `ink`, `line` → `ring`. Built into `tokens.css`; on iOS use `@Environment(\.colorSchemeContrast)`.
- **Reduce transparency** (`prefers-reduced-transparency`, iOS Reduce Transparency): drop every `backdrop-filter` blur (scrim, collapsing bar, scroll-edge fade) and use the solid color instead.
- **Reduce motion:** see `motion.md`.
- Text scales: web uses rem-friendly sizes and never blocks zoom; native supports Dynamic Type (`stacks.md`).
- Every icon-only control has a label; every chart has a text summary; color never carries meaning alone (add an icon, a word or a label).
- Touch targets ≥ 44px; visible keyboard focus (`accent` ring) on everything interactive.

## Charts

- **One main chart per screen**, in its own island, clearly the biggest data thing. Anything else that shows data is smaller and different in kind: a ranked list with thin bars, a short table, a single number.
- **Pick the form for the data.** Trend → line. Comparison → bars. Share of a whole → one stacked bar or a ranked list with bars. Progress to a goal → progress bar. No pies, donuts, 3D, gauges or radar charts.
- **Color.** One series: `ink` for what matters (the current period, the tracked line), `track` for the rest. Several series: `cat-*` in the fixed order, at most four, and the leading one may be `ink`. `success` / `danger` only when the color means up/down or good/bad. Never a hue per bar in one series.
- **Marks.** Lines 2px, round joins, no dots except the last or hovered point (6px `ink` with a 2px `surface` ring). Bars radius `sm` (4 when thinner than 16), at least 8 wide, gaps about half a bar. An area under a line may be its color at 8% — flat, never a gradient.
- **Axes.** No axis lines or ticks. 3–5 horizontal gridlines in `line`. Labels footnote `ink-2`, tabular, sentence case ("Oct", "Week 42"), abbreviated on axes ("$48k"), full in the tooltip.
- **Labels over legends.** Name a line at its end, or the one highlighted bar. A legend only for 3+ series: dots and names in a footnote row above the chart.
- **Hover and touch.** A 1px `ring` guide line and a floating `surface` panel (menu style) with the value. On touch, press and drag to scrub, with a selection haptic per step.
- **States.** Loading: `track` skeleton bars. Empty: "No data yet" with what will fill it.
- **Accessible.** An `aria-label` / accessibility label that states the takeaway, or a table next to it. Never rely on color alone — label series directly.
- Native: Swift Charts with `foregroundStyle` from the tokens; web: plain SVG or a small library restyled with the tokens. Working example: `examples/desktop.html`.

## Icons

- Line icons, 1.75px stroke, rounded caps/joins, sizes 20 and 24. Lucide (`strokeWidth={1.75}`) or SF Symbols. One set per product.
- Color: `ink` or `ink-2` (`ink-3` for chevrons and placeholders). Status icons take their status color (`success`, `warning`, `danger`, `accent` for info). Active tab: filled glyph in `ink`.

**Where icons go** — use one in each of these:

| Place | Icon |
|---|---|
| Tab bar, sidebar, toolbar | Always, 24 (tab bar) / 20 (sidebar, toolbar) |
| Icon-only buttons | Always, with an `aria-label` / accessibility label |
| Buttons for a well-known action | Leading 20: Add (plus), Share, Search, Filter, Download, Delete. Not on Save, Continue, Done |
| Settings-style rows (navigate to a setting or a place) | Leading 20–24, `ink-2`, one column |
| Menu and context-menu items | Leading 20 on every item, or on none |
| Search fields | Leading search icon, `ink-3` |
| Banners and inline messages | Leading status icon in the status color |
| Empty states | 40, `ink-3` |
| Rows that navigate | Trailing chevron, `ink-3` |

**Where they don't:** screen titles, island titles and group labels, plain content rows (tasks, messages, transactions — the content is the point), body text, and stat numbers. If one row in a list has a leading icon, every row in that list does.
