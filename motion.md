# Motion — "Spring"

The iOS feel: quick, physical, with a barely-there settle (~1.6% overshoot). Nothing floats, nothing bounces for show.
Working reference for every effect below: **`examples/motion.html`** — copy from it.

## The base rules
- **Anything that moves uses the spring.** CSS: `var(--dur-spring) var(--spring)`. Reanimated: `withSpring(v, motion.spring.default)`. SwiftUI: `.spring(response: 0.32, dampingFraction: 0.77)`.
- **Color/opacity-only changes** use `--dur-base` + `--ease-out`. Exits that leave the screen use `--ease-in`, ~70% of enter time.
- Animate only `transform`, `opacity`, `filter`. Animate layout (height) only for list insert/remove.
- **Interruptible:** a new tap/gesture retargets from the current position (cancel running animations, start from computed value).
- **Reduced motion:** replace movement with an opacity crossfade (`--dur-base`); keep the blur off; no shake (show the error only).
- Never: page-load stagger, hover lift, looping decoration, parallax.

## Everyday interactions (always on)

| Interaction | Spec |
|---|---|
| **Press** | `scale(var(--press-scale))` 0.96 in 90ms; release springs back. Buttons, rows, cards. |
| **Check** | Circle fills (`--dur-base`); check mark pops `scale(0.6) → 1` with spring; row text → `ink-3`. Light haptic on native. |
| **Progress** | Segment fills `scaleX(0 → 1)`, origin left, spring. |
| **Count change** | New number slides in from below (up) / above (down), 60% of its height, spring. Or use Rolling numbers for big stats. |
| **Toast** | Slides up from below + fade, spring. Auto-hides after 2.5s with `--ease-in`. |
| **Sheet / dialog** | Mobile: `translateY(105%) → 0` spring + **Push back**. ≥ 640px: centered dialog, `translate(-50%,-46%) scale(0.96) → center, scale 1` spring + fade. Scrim fades with a 6px backdrop blur. |
| **Tab change** | Liquid indicator slides; content + header Blur-swap (out 160ms `--ease-in`, in on the spring); scroll resets to top. |
| **Scroll edges** | Content fades + blurs into the top/bottom edge of every scroll area (components.md › Scroll-edge fade). Edges appear/disappear with `--dur-base`. |
| **Hover (web)** | Whole row/item fills with `press` in `--dur-fast`. No lift, no scale. |
| **List insert/remove** | Height + opacity, spring; neighbors follow. |

## Signature effects

### 1 · Push back
When a sheet/modal opens, the screen behind recedes like an iOS card stack.
- Behind layer: `translateY(14px) scale(0.92)`, radius → 26, `brightness(0.75)`, transform-origin top center. The area behind it is black.
- Sheet top sits ~40px from the top; spring for both, in sync.
- Native: iOS `.sheet` already does this on iPhone — use the native sheet. Web/RN: implement as above.

### 3 · Rolling numbers
Big stats (stat/display sizes) roll each digit like a mechanical counter.
- Each digit is a column 0–9 clipped to one line height; move it with `translateY(-digit × lineHeight)`, spring.
- Stagger digits right → left by 25ms. Leading zeros collapse width to 0 and fade.
- Tabular numbers required. Use for stats and totals only — not for every number in a list.
- SwiftUI: `.contentTransition(.numericText())`.

### 4 · Blur swap
When a title or label changes in place (switching tab, date, filter), it melts through blur instead of cutting.
- Out: opacity 1→0, `blur(0→8px)`, `translateY(-4px) scale(0.98)`, 180ms `--ease-in`.
- In: opacity 0→1, `blur(8px→0)`, from `translateY(6px) scale(0.98)`, spring.
- Secondary line follows 50ms later. Titles and short labels only — never paragraphs.
- SwiftUI: `.contentTransition(.interpolate)` / blur transition.

### 5 · Collapsing title
Screens with a scrollable list have a big title1 that scrolls away into a compact bar.
- Big title fades `1 → 0` over the first 34px of scroll.
- Past 34px the nav bar gets `bg` at 78% + `backdrop-filter: blur(20px) saturate(180%)` + 1px `line` bottom; the small centered title (17/600) fades in and rises 6px → 0 with the spring.
- Overscroll at the top scales the big title up slightly (max 1.15, origin left).
- Native: iOS large titles do this — use `navigationBarTitleDisplayMode(.large)` / native-stack `headerLargeTitle`.

### 6 · Swipe to delete
List rows in islands can be swiped left to reveal a `danger` Delete action.
- Drag follows the finger 1:1 to −90px, then rubber-bands at 0.6×. Dragging right resists at 0.25×.
- Release: past 55% of width → delete (slide out with `--ease-in` 220ms, then collapse height with spring). Past −45px → snap open at −90px. Otherwise spring back to 0.
- Tapping the revealed action deletes. Always offer Undo via toast.

### 7 · Shake on error
A rejected input (wrong password, invalid code) shakes "no".
- `translateX: 0, −12, 11, −9, 7, −4, 2, 0` over 480ms, `cubic-bezier(0.3, 0, 0.3, 1)`.
- At the same time: `danger` focus ring + error text fades in below. Error haptic on native.
- Only for submit-time rejection, never while typing.

### 8 · Liquid tabs
Segmented controls and tab pills: the selection indicator stretches as it travels.
- Indicator is an `ink` pill positioned by `left` and `right`.
- Moving right: `right` edge uses the **fast** spring, `left` edge the **slow** spring (reverse when moving left), so it leads, stretches, and catches up.
- The newly selected label turns `on-ink`; the screen title updates with Blur swap.
- Native: SwiftUI `matchedGeometryEffect` with two springs, or Reanimated with separate shared values per edge.
