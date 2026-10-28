# Using the tokens per stack

Source of truth: `tokens/tokens.css` and `tokens/tokens.ts`. **Copy the file into the project** (e.g. `src/styles/tokens.css`, `theme/tokens.ts`); don't retype values.

Always load **Figtree** (400, 500, 600, 700).

## Plain HTML / CSS
```html
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
```
Copy `tokens.css`, use `var(--token)`, copy component CSS from `examples/showcase.html`.

## Tailwind (v4)
```css
@import "tailwindcss";
@import "./tokens.css";

@theme inline {
  --color-*: initial;            /* remove Tailwind's default palette entirely */
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-press: var(--press);
  --color-track: var(--track);
  --color-line: var(--line);
  --color-ring: var(--ring);
  --color-ink: var(--ink);
  --color-ink-2: var(--ink-2);
  --color-ink-3: var(--ink-3);
  --color-on-ink: var(--on-ink);
  --color-danger: var(--danger);
  --color-transparent: transparent;
  --radius-sm: 8px; --radius-md: 14px; --radius-lg: 22px; --radius-xl: 34px;
  --font-sans: var(--font);
}
```
Usage: `bg-bg text-ink`, island `bg-surface rounded-lg px-4 py-1`, primary `bg-ink text-on-ink rounded-full h-[54px] font-semibold`.
Removing the default palette (`--color-*: initial`) makes off-system colors impossible — keep it.
Tailwind v3: same mapping under `theme.colors` (not `extend`) in `tailwind.config`.

## React / Next.js
Global tokens.css + Figtree (`next/font/google` → `Figtree`, set as `--font`). Build primitives first — `Island`, `Row`, `Check`, `Button`, `Progress`, `Input`, `Sheet` — then compose screens only from them.

## React Native / Expo
```ts
// theme/useTheme.ts
import { useColorScheme } from 'react-native';
import { theme } from './tokens';
export const useTheme = () => theme(useColorScheme() === 'dark' ? 'dark' : 'light');
```
- Fonts: `@expo-google-fonts/figtree` (`Figtree_400Regular`, `_500Medium`, `_600SemiBold`, `_700Bold`). In RN set `fontFamily` per weight instead of `fontWeight`.
- Dividers: `StyleSheet.hairlineWidth` is fine but 1px `line` matches web.
- Native controls (`Switch`, tabs, sheets) tinted with `ink`. Light haptic on check and primary button.
- Scroll-edge fade: `MaskedView` (@react-native-masked-view/masked-view) with an `expo-linear-gradient` mask on the ScrollView, plus an `expo-blur` `BlurView` strip at each edge (intensity ~20) shown only when scrollable that way.
- Press: Reanimated scale `motion.pressScale` (0.96) with `withSpring(…, motion.spring.default)`. All motion specs: `motion.md`.

## SwiftUI

**Native first.** Use Apple's components and style them with the tokens — never build look-alikes:
`NavigationStack` with large titles, `.toolbar` items, `TabView`, `.sheet`, `List`, `Form`, `.searchable`, `.swipeActions`, `.confirmationDialog`, `Menu`, `Toggle`. On iOS 26 these get Liquid Glass for free; don't recreate the web liquid tab indicator, the native tab bar already is one.
- Never present a sheet from a sheet. Push inside it with a `NavigationStack` instead.
- Screen title = navigation large title (it already collapses on scroll, which is the "collapsing title" effect).

**Colors.** Asset catalog color sets named after the tokens (`bg`, `surface`, `press`, `track`, `line`, `ring`, `ink`, `ink2`, `ink3`, `onInk`, `danger`) with light/dark values from `tokens.ts`. `.tint(Color("ink"))` at the root.

**Font.** Ready-made files in `fonts/` (Figtree 400/500/600/700, OFL license — ship `OFL.txt` along).
1. Drag the four `.ttf` files into the app target (check "Copy items if needed" and the target).
2. Info.plist → `Fonts provided by application` (`UIAppFonts`) → add each file name, e.g. `Figtree-Bold.ttf`.
3. Use the PostScript names `Figtree-Regular`, `Figtree-Medium`, `Figtree-SemiBold`, `Figtree-Bold` and scale with Dynamic Type:

```swift
extension Font {
    static let title1 = Font.custom("Figtree-Bold", size: 38, relativeTo: .largeTitle)
    static let stat = Font.custom("Figtree-Bold", size: 34, relativeTo: .largeTitle)
    static let title2 = Font.custom("Figtree-Bold", size: 24, relativeTo: .title2)
    static let headline = Font.custom("Figtree-SemiBold", size: 18, relativeTo: .headline)
    static let body = Font.custom("Figtree-Regular", size: 16, relativeTo: .body)
    static let rowTitle = Font.custom("Figtree-Medium", size: 16, relativeTo: .body)
    static let footnote = Font.custom("Figtree-Medium", size: 13, relativeTo: .footnote)
    static let caption = Font.custom("Figtree-Medium", size: 12, relativeTo: .caption)
}
```
Tight tracking: `.tracking(-1.1)` on title1, `-1` on stat, `-0.5` on title2. Large navigation titles: set the Figtree Bold font through `UINavigationBarAppearance.largeTitleTextAttributes` once at launch.

**Shapes and lists.**
- Islands: `RoundedRectangle(cornerRadius: 22, style: .continuous).fill(Color("surface"))`; screen background `Color("bg")`.
- `List` with `.listStyle(.insetGrouped)` is already an island list — add `.scrollContentBackground(.hidden)` + `bg`.
- Primary button: `.buttonStyle(.borderedProminent)` + `.buttonBorderShape(.capsule)` + `.controlSize(.large)`, tinted `ink`. On iOS 26 `.glassProminent` is fine for toolbar actions.

**Edges and sheets.**
- Scroll-edge fade: iOS 26 `.scrollEdgeEffectStyle(.soft, for: .all)`; earlier iOS: `.mask` with a `LinearGradient` at the edges.
- Sheets: `.sheet` + `.presentationDetents` on iPhone, `.presentationSizing(.form)` on iPad & Mac.

**Motion.** `.spring(response: 0.32, dampingFraction: 0.77)` (= stiffness 380 / damping 30, see `motion.md`). Honor `@Environment(\.accessibilityReduceMotion)`. Light `.sensoryFeedback(.impact(weight: .light), trigger:)` on check and primary button.

## Other (emails, slides, docs)
Same palette and Figtree, grey `bg` with light islands, one ink button. Slides: title1/display sizes, one idea per slide.
