# Unslop — turning AI-looking UI into Graphite

Use this when a screen already exists and looks vibecoded: purple gradients, glows, emoji labels, shouty copy, uneven spacing. The goal is to keep the product (features, content, order of sections) and make every size, color, word and image deliberate, in Graphite.

Adapted from [unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0. Changed to fit Graphite: where unslop and Graphite disagree, Graphite wins (see the end of this file).

See `examples/unslop.html` for a before/after of a dashboard with the audit and every pass.

## Run it

1. **Look at the screen.** Find the files that render it. If you can run it or open it in a browser, take a screenshot, so you judge what people see and not only the code.
2. **Audit.** Go through the signs below and list every one you find, one line each, with where it lives.
3. **Decide how much to change.**
   - **Heavy slop** — many signs across color, type, icons and copy: run every pass.
   - **Light slop** — mostly designed, a few signs left: fix only what the audit found. Bigger ideas go into the report as suggestions.
   - **No slop** — say so and suggest two or three small refinements at most, with exact values. Never change a good screen just to make it different.
4. **Confirm before a heavy rewrite.** Show the audit and the plan, and ask before editing, unless the user already said to just do it.
5. **Fix in passes, in order.** Finish a pass across the whole screen before starting the next: spacing → color → icons → copy → type → layout → details → visuals → motion. Spacing goes first because everything reads differently once the rhythm is right. Copy goes before type and layout because the headline's length decides its size. Visuals and motion go last.
6. **Check.** Run `checklist.md`, render again and compare with the audit list. Anything still on it gets fixed.
7. **Report** a few lines per pass about what changed, plus any claims you removed or need confirmed.

## Signs of slop → the Graphite fix

### Surfaces and color
- Hue gradients on backgrounds, cards, buttons or the active nav item → flat `bg` / `surface`, `ink` for the one primary
- Gradient text in headings, numbers or the logo → solid `ink`
- Colored glows, colored shadows, `drop-shadow` on emoji → remove; depth comes from `surface` on `bg`
- Radial color washes, blurred blobs, orbs, nebulas behind content → remove
- Neon or colored borders → no border on islands; `line` for dividers, `ring` for inputs
- Glass cards with a white inner highlight → plain `surface` island
- Five near-identical tints for text → `ink`, `ink-2`, `ink-3`
- Everything highlighted so nothing stands out → one ink primary per screen
- Saturated green/amber/blue status colors → the soft `success` / `warning` / `accent` tokens on an icon or dot, ink text

### Type
- Headings at 800–900 → Graphite weights (700 titles, 600 headlines, 500 rows, 400 reading)
- `UPPERCASE TRACKED LABELS` → sentence-case caption in `ink-2`
- Too many sizes and weights → max 3 sizes from the tokens
- Mixed number formats (`$48,210` next to `$124,860.40`, `07`) → one format, `tabular-nums`
- Negative letter spacing on small text → none; tight tracking is for title sizes only
- Italic for emphasis → size, weight or `ink-2`
- Inter or a system font nobody chose → Figtree

### Icons
- Emoji as icons, in labels, in counts (`18 👤`) → Lucide 1.75 / SF Symbols, or nothing
- ✨ for anything AI → remove, or a plain icon only where it explains something
- Icons in many sizes and colors → one size, one stroke, colored by their text role
- Icons nudged off the column → same icon box width in every row
- An icon on every title and row → only where it adds meaning

### Spacing
- Arbitrary values like `mt-[13px]`, `h-[31px]` → the 4pt token scale (a 2px nudge inside a small control is fine)
- Rows in one list with different heights or gaps → one height, one gap
- Groups closer to their neighbours than to their own items → smaller gaps inside a group, bigger between groups
- Uneven padding in sibling islands → one padding

### Copy
- Greeting titles like `Welcome back, Sam! 👋` → the page or period as the title (`October 2026`)
- Exclamation marks, `!!` → a plain statement
- Changes without a reference (`+12%!!`) → `+12% vs last month`
- Wordy placeholders (`Search anything...`) → `Search`
- Hype words, `AI-powered` on everything → what the thing actually does (`voice.md`)
- Trailing periods on labels, buttons and titles → none
- Fake-looking data (`$123,456`, `[X]`, `Lorem`) → plausible numbers and names
- Unverifiable claims (`Loved by 10,000+ teams`, `10x faster`, five stars without a source) → ask if real; make it quiet and specific, or remove it

### Components
- Glowing pills for counts, plans, status, shortcuts → plain `ink-2` text, or a keycap for shortcuts
- `PRO`, `New ✨`, `Beta 🚀` badges → remove, or one quiet text label
- Sparklines, tallies or mini bars stuffed into every stat card → label, big number, change with its reference
- Equal cards side by side with the same chart in each → one main chart, compact stats around it, varied widths
- Rainbow, glowing or pill-shaped chart bars, uppercase day labels → `ink` for the series that matters, `ring`/`track` for the rest, sentence-case labels in `ink-2`
- Logo as a gradient tile with a sparkle → the product name in Figtree, plus a flat ink mark if there is one

### Landing pages
- A `✨ Introducing X 2.0` pill above the headline → remove, or a quiet text link if it's real news
- A headline that fits any product (`Supercharge your workflow with AI`) → what this product does for whom, in its own nouns
- Three or more buttons, or avatars and chips stacked under them → one ink primary, at most one secondary
- Feature cards with an emoji, a bold title and a vague line → a list island, or one strong statement
- Glossy 3D blobs, robots, glowing brains, circuit lines as the visual → the real product: a preview built in code with plausible data
- Text or fake buttons baked into an image → real text in the page
- A visual on every section → one visual where it helps, usually only the hero

### Motion
- `animate-pulse` / `animate-ping` on things that aren't live, shimmer, breathing glows, floating loops, parallax → static
- `transition-all`, `hover:scale` and hover lift on cards → a `press` fill on hover, push back on press
- Everything flying in on load → nothing, or one short fade for the main content
- Animating width, height, top, left or large blurs → transform and opacity (the Blur swap is the one sanctioned blur)

## Template check

A clean screen that could belong to any product is the next template. After the passes, swap the product name for another product's. If the screen still fits, push harder on the copy (its own nouns, real facts from the page) and on showing the real product instead of generic boxes. Graphite keeps the look fixed, so the product's character comes from its words and its content.

## Do not

- Rename the product, change what it does, reorder its sections or invent features, claims or data.
- Replace removed decoration with new decoration (glass, grain, noise, neon, bento grids).
- Pull in a brand accent color. In Graphite, ink carries emphasis and `accent` is reserved for links, focus and now; a real brand color can live in the logo and photos only. If the project has its own design system, follow the project and mention it.

## Where Graphite overrides unslop

Unslop picks a new palette, accent, typeface and radii per product, avoids 700 headings and pills, and bans springs with overshoot. Graphite keeps one fixed look: ink emphasis with soft, meaningful color only, Figtree 700 titles, capsule buttons and radius-22 islands, and the one spring from `motion.md`. Apply unslop's audit and passes, never its palette, type or motion values.

---

Part of the audit is adapted from unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), https://github.com/heydamir/unslop, licensed CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Keep this credit in copies and adaptations.
