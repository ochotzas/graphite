# Components

Stack-agnostic specs. Working markup + CSS: `examples/showcase.html`. Other stacks: `stacks.md`.

## Island (signature container)

The basic building block. Grouped content on a `surface` with radius `lg` (22), sitting on `bg`.

- **List island:** no padding, `overflow: hidden`. The rows own their padding (13px 16px) so hover/press fills the row edge to edge, including the island's rounded corners.
- **Content island** (stat, card, form): padding 18–24 (`space-5`).
- Stack islands with `--island-gap` (12). Group label above an island: caption, `ink-2`, 8px gap.
- No shadow, no border, never nested. An island in an island = wrong; use rows or a divider instead.

```css
.island { background: var(--surface); border-radius: var(--radius-lg); }
.island-list { padding: 4px var(--space-4); }
.island-pad { padding: var(--space-5); }
```

## Scroll-edge fade

Any scrolling area — a screen between its header and bottom bar, or a fixed-height island — fades its content softly at the edges instead of hard-cutting it.
- An overlay at each edge, `--fade-size` (40px) tall: a gradient from the container's own background (`bg` on screens, `surface` in islands) to transparent, plus a `backdrop-filter: blur(var(--fade-blur))` layer masked from the edge inward. Content looks like it dissolves into the edge.
- Only show an edge when there is more content that way (top hidden at scrollTop 0, bottom hidden at the end); fade the edge in/out with `--dur-base`.
- Overscroll is contained (`overscroll-behavior: contain`) and scrollbars are hidden in small scroll areas.
- Code: `.fade-scroll` in `examples/showcase.html`.

## Rows

- Min-height 52, padding 13px 16px, gap 12. **The whole row is the hit area and the hover area** — never highlight just the text or a padded inner box.
- Layout: [leading: check / 24px icon / 36px avatar or thumb] → [title body/500, optional subtitle footnote/`ink-2`] → [trailing: footnote `ink-2` value, chevron `ink-3`, or switch].
- Divider between rows: 1px `line` as a `::before` on `row + row`, inset 16px from the left, flush right. Hide the dividers above and below a hovered row.
- Hover: background `press` (web only). Pressed: background `line`. `--dur-fast` color transition.
- Done / disabled row: title in `ink-3`.

## Check (circular)

The selection control for tasks, multi-select and lists.
- 24px circle, 1.5px `ring` border, empty.
- Checked: filled `ink`, white (`surface`) check glyph 12px, stroke 2.4. Animate with a quick spring scale 0.8→1.
- Radio = same circle, checked shows an inner `on-ink` dot instead of a check.

## Buttons

Capsules. Three variants:

| Variant | Look | Use |
|---|---|---|
| **Primary** | `ink` fill, `on-ink` text | The one main action per screen |
| **Secondary** | `surface` fill, `ink` text (on `bg`); `track` fill when placed on a `surface` | Other actions |
| **Plain** | No fill, `ink` text, weight 600 | Low emphasis, "Cancel", inline actions |
| Destructive | Secondary or plain with `danger` text | Delete, remove. Solid `danger` fill only in the confirm dialog |

- Height 54 (default, full-width bottom CTA on mobile) / 44 (inline) / 36 (compact). Radius full.
- Font: 17px weight 600 (default), 15px 600 (inline/compact).
- Press: scale `--press-scale` (0.96), spring back (see `motion.md`). No hover lift, no shadow.
- Disabled: 40% opacity. Loading: spinner replaces label, width stays.
- Icon-only: 44px circle, `surface` fill.
- Labels are verbs ("New task", "Save changes").

## Progress

- Segmented pill bar: height 8, radius full, `track` background, segments with 3px gaps, completed segments `ink`. Use segments when count ≤ 10; otherwise a continuous fill.
- Shown in a stat island with a big number: `stat` style number + footnote/`ink-2` label on the same baseline ("3 of 7 done").
- Spinner: 20px, ink-2 ring segment.

## Inputs

- Height 52, radius `md`, padding-x 16, **no border**. Fill = `surface` when placed on `bg`; `bg` when placed inside an island.
- Focus: `box-shadow: 0 0 0 2px var(--ink)`. Invalid: same ring in `danger`.
- Label above (footnote, `ink-2`), 8px gap. Helper below (footnote `ink-2`); error replaces helper in `danger`, border `danger`.
- Placeholder `ink-3`.
- Search: 44px, `surface` fill, radius `md`, search icon `ink-3`.
- Switch: 51×31, off = `track`, on = `ink`, thumb `surface` (light) with a soft shadow.
- Segmented control: capsule, `track` background, selected = a `surface` **liquid indicator** pill that slides/stretches between segments (motion.md §8), label 600. Max 4 segments.

## Navigation

- **Mobile:** tab bar on `surface` with top `line`, 3–5 items, icon 24 + caption. Active = filled glyph + `ink` on a soft `bg` **liquid indicator** pill that slides between tabs; inactive = outline + `ink-2`.
- **Tab change:** indicator slides (liquid), the content and header line Blur-swap (motion.md §4), scroll resets to top. Tapping the active tab scrolls to top. Never a hard cut.
- **Header row:** date/context in footnote `ink-2` left, 34px ink avatar or icon button right. Big title1 below.
- **Desktop:** left sidebar on `bg` (no island), items 40px, radius `md`, active item = `surface` fill + `ink` 600; inactive `ink-2`.
- Back: plain button, chevron + previous title.

## Sheets & modals

- **< 640px: bottom sheet.** Slides up with the spring, top corners `xl`, grabber, Push back behind it.
- **≥ 640px: centered dialog**, never a bottom sheet (it looks broken on wide screens). Width `min(440px, 100% − 48px)`, all corners `xl`, enters with `scale(0.96) → 1` + fade + 4% rise on the spring.
- Fill `bg` containing islands (or `surface` for a simple message). `shadow-float`. Scrim `--scrim` + `backdrop-filter: blur(6px)`.
- Grabber 36×5, `track`. Title headline, close via plain button.
- Primary action full-width ink capsule at the bottom.
- Confirm: title (headline), one sentence, buttons stacked: [destructive in `danger` fill] [Cancel plain].

## Feedback & states

- **Toast:** ink capsule, `on-ink` text 15/500, bottom center above the CTA, 2.5s. ("Saved", "Task deleted · Undo")
- **Inline message:** an island with an icon in `ink` and text. Error variant: icon + title in `danger`.
- **Empty state:** centered in an island or the screen: 40px line icon `ink-3`, headline, one footnote line `ink-2`, one button.
- **Loading:** skeleton rows — `track` blocks (circle + 2 bars) inside the island, subtle pulse (opacity 1 → 0.6).
- **Error:** what happened + what to do + "Try again" secondary button.

## Avatars, images

- Avatar: circle; fallback = `ink` fill, `on-ink` initial, 600 weight. Sizes 28 / 34 / 44 / 64.
- Photos: `object-fit: cover`, radius follows its container (concentric rule). Photos are the only colorful thing — that's fine.

## Data

- Stat island: big number (stat) + label (footnote `ink-2`) + optional progress.
- Tables: inside an island, header caption `ink-2`, `line` row dividers, no vertical lines, numbers right-aligned tabular.
