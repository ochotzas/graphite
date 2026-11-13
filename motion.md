# Motion — "Spring"

The iOS feel: snappy, physical, with a settle you can't see (~0.3% overshoot, done in ~320ms). Nothing floats, nothing bounces for show. Gestures hand their speed to the spring, so a flick keeps moving and a grab stops it dead.
Working reference for every effect below: **`examples/motion.html`** — copy from it.

## The base rules
- **Anything that moves uses the spring:** stiffness 620, damping 44, mass 1. CSS: `var(--dur-spring) var(--spring)` (320ms). Reanimated: `withSpring(v, motion.spring.default)`. SwiftUI: `.spring(response: 0.25, dampingFraction: 0.88)`. JS physics: `spring()` in `examples/motion.html`.
- **Color/opacity-only changes** use `--dur-base` + `--ease-out`. Exits that leave the screen use `--ease-in`, ~70% of enter time.
- Animate only `transform`, `opacity`, `filter`. Animate layout (height) only for list insert/remove.
- **Interruptible:** a new tap/gesture retargets from the current position and velocity (see Physics and gestures).
- **Reduced motion:** replace movement with an opacity crossfade (`--dur-base`); keep the blur off; no shake (show the error only).
- Never: page-load stagger, hover lift, looping decoration, parallax.

## Physics and gestures

The CSS curve covers taps and state changes. Anything a finger drags runs on real spring physics (`spring()` in `examples/motion.html`, Reanimated `withSpring`, SwiftUI springs), because only physics can start from a speed.

- **Release velocity goes to the spring.** Track the pointer over the last ~90ms; on release, pass that speed as the spring's start velocity (px/s, or progress/s when the spring drives a 0–1 progress: `velocity ÷ distance`). A flick carries on; a slow release eases out. Reanimated: `withSpring(to, { ...motion.spring.default, velocity })`. SwiftUI: in `onEnded`, pass `value.velocity` (÷ remaining distance) as `initialVelocity` of `.interpolatingSpring(mass: 1, stiffness: 620, damping: 44, initialVelocity:)`; a spring that is retargeted mid-flight keeps its velocity on its own.
- **Interruptible.** Grabbing something that is still moving stops it where it is, and the finger takes over from there. A new target while a spring runs restarts from the current value and current velocity, never from the old start or end. Never wait for an animation to finish before accepting input.
- **Rubber-banding.** Past a limit, movement follows `limit + √(overshoot) × f` instead of 1:1: f = 4 for a sheet pulled up, 5 for a swipe past its end, 3 for a reorder past the first or last slot. Release springs back from there.
- **Fling thresholds.** A release commits when it is past the distance threshold *or* faster than the speed threshold in that direction: sheet down 700 px/s, edge-swipe back 500 px/s, row swipe 900 px/s. A fast flick the wrong way cancels even past the distance threshold.
- **Direction lock.** A touch starts undecided. After 8px it locks to horizontal (swipe) if `|dx| > 1.2 × |dy|`, otherwise it is a scroll and the gesture lets go. Long-press timers cancel on any move over 8px.
- **Reduced motion.** Dragging still tracks the finger 1:1 (the user is moving it). On release, jump or fade to the end state instead of springing; skip the lift scale and fly-in ghosts.

## Everyday interactions (always on)

| Interaction | Spec |
|---|---|
| **Press** | `scale(var(--press-scale))` 0.96 in 90ms; release springs back. Buttons, rows, cards. |
| **Check** | Circle fills (`--dur-base`); check mark pops `scale(0.6) → 1` with spring; row text → `ink-3`. Light haptic on native. |
| **Progress** | Segment fills `scaleX(0 → 1)`, origin left, spring. |
| **Count change** | Old and new number share one clipped slot and move together: going up, the old one rises out (`translateY(-70%)`, fade, `blur(3px)`, 55% of the spring time, `--ease-out`) while the new one rises in from `70%` on the spring; going down, both move the other way. Rapid taps retarget from where the outgoing number is. Steppers, counts, badges. Rolling numbers for big stats. SwiftUI: `.contentTransition(.numericText(value:))`. |
| **Toast** | Slides up from below + fade, spring. Auto-hides after 2.5s with `--ease-in`. |
| **Sheet / dialog** | Mobile: `translateY(105%) → 0` spring + **Push back**, dismiss by dragging down (§2). ≥ 640px: centered dialog, `translate(-50%,-46%) scale(0.96) → center, scale 1` spring + fade. Scrim fades with a 6px backdrop blur. |
| **Tab change** | Liquid indicator slides; content + header Blur-swap (out 160ms `--ease-in`, in on the spring); scroll resets to top. |
| **Scroll edges** | Content fades + blurs into the top/bottom edge of every scroll area (components.md › Scroll-edge fade). Edges appear/disappear with `--dur-base`. |
| **Hover (web)** | Whole row/item fills with `press` in `--dur-fast`. No lift, no scale. |
| **List insert/remove** | Height + opacity, spring; neighbors follow. |

## Haptics (native)

Feedback you feel confirms what happened; it never decorates. iOS: SwiftUI `.sensoryFeedback(…, trigger:)`. Expo: `expo-haptics`. Web: none (except `navigator.vibrate(10)` for a long-press on Android).

| Moment | iOS (`SensoryFeedback`) | Expo (`expo-haptics`) |
|---|---|---|
| Toggle, check, segmented/tab change, stepper, picker or slider step, chart scrub step | `.selection` | `selectionAsync()` |
| Long-press opens a context menu or lifts a row, swipe crosses the delete or commit threshold, sheet drag crosses the close threshold | `.impact(weight: .light)` | `impactAsync(Light)` |
| A lifted row passes a new slot | `.selection` | `selectionAsync()` |
| Something finished that took a moment (sent, saved, synced) | `.success` | `notificationAsync(Success)` |
| Confirm before a destructive action | `.warning` | `notificationAsync(Warning)` |
| Rejected input (with Shake on error) | `.error` | `notificationAsync(Error)` |

Never on scroll, on every keystroke, on screen load, or twice for one action. Native controls (Toggle, Picker, context menus) already play their own — don't add a second one.

## Signature effects

### 1 · Push back
When a sheet/modal opens, the screen behind recedes like an iOS card stack.
- Behind layer: `translateY(14px) scale(0.92)`, radius → 26, `brightness(0.75)`, transform-origin top center. The area behind it is black.
- Sheet top sits ~40px from the top; spring for both, in sync.
- Native: iOS `.sheet` already does this on iPhone — use the native sheet. Web/RN: implement as above.

### 2 · Drag and fling to dismiss
Every bottom sheet can be grabbed and pulled down to close, like iOS.
- Grab anywhere on the sheet except inputs and buttons; inside scrolling content, only once it's scrolled to the top.
- Down follows the finger 1:1. Up resists: offset `−√|dy| × 4`, so it barely moves.
- While dragging, everything tracks the finger with no transition: the scrim fades `1 → 0` and the Push back screen comes forward (scale `0.92 → 1`, `translateY 14 → 0`, radius `26 → 0`, brightness `0.75 → 1`) by the same progress (`offset ÷ sheet height`).
- Release: past ⅓ of the sheet's height, or a downward flick faster than 700 px/s → close. Otherwise spring back open. Either way the spring starts from where the sheet is, with the release velocity, so a hard flick shoots off and a gentle let-go eases.
- Grabbing a sheet that is still opening or closing stops it under the finger.
- The close button, a scrim tap and Escape still work. Reduced motion: dragging still tracks, the release fades instead of sliding.
- Centered dialogs (≥ 640px) don't drag.
- Native: iOS `.sheet` and React Navigation form sheets do this already; never block it (`interactiveDismissDisabled` only for unsaved input, with a confirm).

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
- Drag follows the finger 1:1 to −90px, then rubber-bands at 0.6×. Dragging right resists at 0.25×. Horizontal only after the direction lock.
- Release: past 55% of width → delete (slide out with `--ease-in` 220ms, then collapse height with spring). Past −45px → snap open at −90px. Otherwise spring back to 0, with the release velocity.
- Tapping the revealed action deletes. Always offer Undo via toast.

### 7 · Shake on error
A rejected input (wrong password, invalid code) shakes "no".
- `translateX: 0, −12, 11, −9, 7, −4, 2, 0` over 480ms, `cubic-bezier(0.3, 0, 0.3, 1)`.
- At the same time: `danger` focus ring + error text fades in below. Error haptic on native.
- Only for submit-time rejection, never while typing.

### 8 · Liquid tabs
Segmented controls and tab pills: the selection indicator stretches as it travels.
- Indicator is a pill positioned by `left` and `right`. Its color comes from the component: `surface` on a `track` segmented control, `bg` in the tab bar (components.md).
- Moving right: `right` edge uses the **fast** spring (837 / 51, ~280ms), `left` edge the **slow** spring (434 / 37, ~370ms) (reverse when moving left), so it leads, stretches, and catches up.
- Tapping again mid-move retargets both edges from where they are and how fast they move.
- The newly selected label turns `ink` 600; the screen title updates with Blur swap.
- Native: SwiftUI `matchedGeometryEffect` with two springs, or Reanimated with separate shared values per edge.

### 9 · Zoom open
A card opens into its screen: the card grows to fill the screen and its image flies up to become the header.
- The new screen is clipped to the card's rect (`clip-path: inset(… round 22px)`) and the clip opens to the full screen on the spring; radius 22 → 0. Its content fades in over the first third.
- The card's image is a ghost that moves and resizes from the card cover to the header image; both real images hide while it flies.
- The screen behind scales to 0.94 (origin top center), `brightness(0.82)`, radius 30.
- Back: the back button, or drag from the left edge (first 28px). Progress follows the finger (`1 − dx ÷ 90% of width`) and the card shrinks back into its place in the list. Release closes when under 60% progress or faster than 500 px/s to the right, with the release velocity; otherwise it reopens.
- Reduced motion: crossfade the screens (`--dur-base`), no ghost.
- Native: iOS 18+ `.navigationTransition(.zoom(sourceID:in:))` with `.matchedTransitionSource` on the card — it does the edge-swipe for free. Web/RN: implement as above.

### 10 · Photo fly-in
Opening an item from a list with a thumbnail: the thumbnail flies into the sheet's header image, and back on close.
- A ghost of the image moves from the thumbnail's rect to the header's rect on the same spring as the sheet; radius goes from the thumbnail's (`sm`) to the sheet's (`xl`). The real thumbnail and header image hide until it lands.
- The ghost reads the header's rect every frame, so it lands where the sliding sheet is.
- Close (button, scrim, Escape or drag): if the header is still in view, the image flies back to the thumbnail; if it has scrolled away, the thumbnail just reappears.
- No thumbnail or no photo → plain sheet, no fly-in.
- Reduced motion: no ghost; the sheet fades in with its image in place.
- Native: SwiftUI `.navigationTransition(.zoom(…))` on the sheet's content with `.matchedTransitionSource` on the thumbnail.

### 11 · Armed swipe
A full swipe on a row runs its one action (mark done, sold out, archive) without a second tap.
- Drag left follows the finger to 62% of the row's width, then rubber-bands (√, f = 5). Behind the row: the action's `*-tint` fill and a 32px disc in the status color with the icon.
- Past 38% of the width the action is **armed**: the disc springs from `scale(0.6)` to `1.12` and a light haptic plays once. Dragging back under the threshold disarms it (disc back to 0.6, no haptic).
- Release armed, or a left flick faster than 900 px/s → commit. The row springs back to 0 with the release velocity, and the action runs ~120ms later (row updates, toast with Undo).
- Not armed → spring back, nothing happens.
- Every swipe action also lives in the row's context menu or detail screen; swiping is never the only way.
- Reduced motion: the row tracks the finger; release jumps back to 0; the disc changes without the scale.
- Native: SwiftUI `.swipeActions(allowsFullSwipe: true)`; RN: Gesture Handler `Swipeable` with the same thresholds.

### 12 · Lift to reorder
Rows in a list can be picked up and moved.
- Touch: long-press 380ms lifts the row (light haptic); moving over 8px first cancels it. Mouse: grab the grip handle (6 dots, `ink-3`, trailing).
- Lifted: `scale(1.035)` on the spring, `shadow-float`, `surface` fill, radius `md`, above its neighbours. Dividers next to it hide.
- The row follows the finger 1:1. Each time it passes half a row, the neighbours slide one row up or down on the spring and a selection haptic plays. Past the first or last slot it rubber-bands (√, f = 3).
- Near the top or bottom 90px of the scroll area the list auto-scrolls (~7px a frame) and the row stays under the finger.
- Drop: the row springs into its slot with the release velocity while the scale springs back to 1; then the order is saved (toast with Undo when it matters).
- Keyboard: the grip is a button. Space or Enter lifts, ↑↓ move one slot, Space or Enter drops, Escape puts it back. Announce "Moved to position 3 of 6" in a live region.
- Reduced motion: no lift scale; neighbours and drop jump into place.
- Native: SwiftUI `List` + `.onMove` (or `.draggable` / `.dropDestination`); RN: a reorderable list on Reanimated with the same lift.

### 13 · Morphing button
A primary capsule that starts a job (publish, send, upload) turns into its own progress and result.
- Tap: the label blurs out (160ms `--ease-in`), the capsule's width springs down to a circle (width = height).
- A progress ring appears inside (`popin`: `scale(0.5) → 1` + fade, spring): 3px stroke in `on-ink`, its track at 25% opacity. Real progress when known; a turning segment when not.
- Done: success haptic, the ring is replaced by a check + one word ("Live", "Sent") that pop in, and the width springs out to fit them.
- After ~1s it returns to its resting state (or leaves, if the job made it unnecessary). On failure it springs back to the capsule with the error below it and Shake on error.
- The button is disabled while it works; `role="status"` announces the result.
- Reduced motion: no width change; the label crossfades "Publish" → "Publishing…" → "Published".
- Native: SwiftUI one `Button` whose label switches between `Text`, `ProgressView` and `Image(systemName: "checkmark")` inside `withAnimation(.spring(…))`, frame width animated.
