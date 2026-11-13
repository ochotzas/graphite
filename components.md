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
.island-list { overflow: hidden; }
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
- **Row gestures:** swipe left reveals Delete (motion.md §6) or runs one action with a full swipe (Armed swipe, §11); long-press or the grip lifts the row to reorder (§12). Each also exists as a button or menu item. Opening a row with a thumbnail flies the photo into the sheet (§10).

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
- Focus: `box-shadow: 0 0 0 2px var(--accent)`. Invalid: same ring in `danger`.
- Label above (footnote, `ink-2`), 8px gap. Helper below (footnote `ink-2`); error replaces helper in `danger`, border `danger`.
- Placeholder `ink-3`.
- Search: 44px, `surface` fill, radius `md`, search icon `ink-3`.
- Switch: 51×31, off = `track`, on = `ink`, thumb `surface` (light) with a soft shadow.
- Segmented control: capsule, `track` background, selected = a `surface` **liquid indicator** pill that slides/stretches between segments (motion.md §8), label 600. Max 4 segments.
- **Select:** looks like an input (52, radius `md`), value in `ink`, trailing chevron-down `ink-3`. Opens a menu anchored under it, as wide as the field; the chosen item has a trailing check. In a settings row: trailing value `ink-2` + up-down chevrons, opens the same menu. Native: SwiftUI `Picker` (`.menu`), `@expo/ui` Picker.
- **Slider:** track 6 tall, radius full, `track`; fill `ink`; thumb 28 circle, `surface` with the switch's soft shadow. Value in a trailing footnote, tabular. Snaps to steps with a light haptic. Native `Slider` tinted ink.
- **Stepper:** capsule on `track` (on a `surface`): [− 36] value [+ 36], value body/500 tabular, min-width 32, centered. The button at a bound turns `ink-3` and is disabled. Value changes with the count-change motion.
- **Date picker:** month grid in a popover (≥ 640px) or a sheet (mobile; on iOS use the native graphical `DatePicker`). Header: month + year as headline, prev/next icon buttons. Weekdays as caption `ink-2` ("Mo", "Tu"). Days are 40 circles, body tabular. **Today: `accent` text, 600.** Selected: `ink` fill, `on-ink` text. Range: ends are ink circles, days between sit on a `track` band. Unavailable days `ink-3`. Week start follows the locale or the user's setting.

## Navigation

- **Mobile:** tab bar on `surface` with top `line`, 3–5 items, icon 24 + caption. Active = filled glyph + `ink` on a soft `bg` **liquid indicator** pill that slides between tabs; inactive = outline + `ink-2`.
- **Tab change:** indicator slides (liquid), the content and header line Blur-swap (motion.md §4), scroll resets to top. Tapping the active tab scrolls to top. Never a hard cut.
- **Header row:** date/context in footnote `ink-2` left, 34px ink avatar or icon button right. Big title1 below.
- **Desktop:** left sidebar on `bg` (no island), items 40px, radius `md`, active item = `surface` fill + `ink` 600; inactive `ink-2`.
- Back: plain button, chevron + previous title.

## Menus, popovers, tooltips

- **Menu:** a floating `surface` panel, radius `md` (14), padding 6, width 200–280, `shadow-float`. Items 40 tall, padding 0 10, radius `sm` (8, concentric), body 16/400 `ink`, leading 20 icon `ink-2` (on every item or none). Hover/keyboard highlight = `press` fill. Chosen item: trailing check `ink`. Groups split by a 1px `line` with 6px around it. Destructive items last, in their own group, `danger` text and icon.
- **Opens from its trigger:** `scale(0.96) → 1` + fade on the spring, `transform-origin` at the trigger's corner; closes with a 120ms `--ease-in` fade. Flips above when there's no room below. Never wider than the screen minus the gutter.
- **Context menu:** the same panel, from right-click (web) or long-press (touch, with a light haptic). On iOS use the native `.contextMenu` / `Menu`.
- **Keyboard:** ↑↓ move, Enter picks, Escape closes, typing jumps to the first match; focus returns to the trigger. `role="menu"` / `menuitem`.
- **Popover:** the same panel with padding 16 and radius `lg`, for small content tied to a control (a date picker, a short filter form). Anything longer than a few fields → a sheet.
- **Tooltip:** only for icon-only buttons and truncated text, never on touch, hidden while its button's menu is open. `ink` fill, `on-ink` footnote 13/500, radius `sm`, padding 6 10, no arrow, 8px from the target. Shows after 500ms hover or immediately on keyboard focus; fades in `--dur-fast`.

## Sheets & modals

- **< 640px: bottom sheet.** Slides up with the spring, top corners `xl`, grabber, Push back behind it. **Always drag-to-dismiss** (motion.md §2): grab and pull down, it follows the finger and closes past ⅓ or on a flick faster than 700 px/s, carrying the flick's speed. Grabbing a sheet mid-animation stops it under the finger.
- **≥ 640px: centered dialog**, never a bottom sheet (it looks broken on wide screens). Width `min(440px, 100% − 48px)`, all corners `xl`, enters with `scale(0.96) → 1` + fade + 4% rise on the spring.
- Fill `bg` containing islands (or `surface` for a simple message). `shadow-float`. Scrim `--scrim` + `backdrop-filter: blur(6px)`.
- Grabber 36×5, `track`, centered 12px from the top. Title headline, close via icon button. Scrim tap and Escape also close.
- Primary action full-width ink capsule at the bottom.
- Confirm: title (headline), one sentence, buttons stacked: [destructive in `danger` fill] [Cancel plain].
- **Accessibility (web):** `role="dialog"` + `aria-modal="true"`, labelled by its title. On open, focus moves to the first field (or the title); Tab and Shift-Tab stay inside; Escape closes; on close, focus returns to the button that opened it. Everything behind is `inert` and the page doesn't scroll. A closed sheet is `inert` too, so nothing in it is reachable. The close button stays even though dragging works — dragging is never the only way. Native sheets do all of this already.

## Feedback & states

- **Toast:** ink capsule, `on-ink` text 15/500, bottom center above the CTA, 2.5s. ("Saved", "Task deleted · Undo")
- **Banner:** for a state that lasts (offline, trial ending, sync failed) — not for a one-off result (that's a toast). `*-tint` fill (`accent-tint` for info, `success-tint`, `warning-tint`, `danger-tint`), radius `md` inside an island or `lg` when it stands alone, padding 12 16. Leading 20 status icon in the status color; title body/500 and an optional line body/400, **both `ink`**. Optional action: plain button (`ink`, 600); optional close icon button. One banner per screen, at the top of what it's about.
- **Empty state:** centered in an island or the screen: 40px line icon `ink-3`, headline, one footnote line `ink-2`, one button.
- **Loading:** skeleton rows — `track` blocks (circle + 2 bars) inside the island, subtle pulse (opacity 1 → 0.6).
- **Error:** what happened + what to do + "Try again" secondary button.

## Links, tags, counts

- **Inline link** (inside a sentence): `accent` text, underline 1px at `text-underline-offset: 3px` in `accent` at 40% (`color-mix`); hover/press → full-opacity underline. Visited looks the same. Never the only way to do the screen's main action.
- **Standalone link-like actions** ("Forgot password?", "Show all"): plain buttons (`ink`, 600), not accent links.
- **Chip / tag:** 28 tall, radius full, padding 0 10, footnote 13/500 `ink`. Neutral: `track` fill (on `surface`) or `surface` (on `bg`). Category: `cat-*-tint` fill + 6px `cat-*` dot before the label. Removable: trailing 14 × icon `ink-2`, the whole chip stays tappable.
- **Filter chip** (toggles a filter): off = neutral chip; on = `ink` fill, `on-ink` text. Selection is ink, never a category color.
- **Status chip:** `*-tint` fill, `ink` text, 6px dot in the status color. One or two words ("Paid", "Overdue").
- **Count badge:** min 18 tall, radius full, padding 0 5, `ink` fill, `on-ink` 12/600 tabular; "99+" past 99. Sits on the top-right of a tab or toolbar icon, offset so it overlaps by a third. Use an 8px `ink` dot when the number doesn't matter. Counts in a row trailing: plain footnote `ink-2` number, no badge.

## Avatars, images

- Avatar: circle; fallback = `ink` fill, `on-ink` initial, 600 weight. Sizes 28 / 34 / 44 / 64. In a list of people or shared items, the fallback may use a `cat-*-tint` fill with an `ink` initial, picked from the name so it stays stable.
- Photos: `object-fit: cover`, radius follows its container (concentric rule). Photos are the only colorful thing — that's fine.

## Data

- Stat island: big number (stat) + label (footnote `ink-2`) + optional progress.
- Tables: inside an island, header caption `ink-2`, `line` row dividers, no vertical lines, numbers right-aligned tabular.
