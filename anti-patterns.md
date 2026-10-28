# Anti-patterns — never do these

These are default habits that break Graphite or make UI look generic/AI-made.

| ❌ Don't | ✅ Do instead |
|---|---|
| Add an accent color (blue links, purple buttons, green success, orange badges) | Ink is the accent. Contrast, not color. |
| Gradients of any kind, gradient text, glows | Flat tokens |
| Default framework palettes (`gray-*`, `slate-*`, `zinc-*`, `blue-*`, `indigo-*`) | Graphite tokens only |
| Shadows or borders on islands/cards | `surface` on `bg` — contrast alone |
| Islands inside islands, cards inside cards | One level; rows + dividers inside |
| White (`#FFF`) page background with grey cards | Grey `bg` table with lighter `surface` islands |
| Square checkboxes, sharp-cornered buttons | Circular checks, capsule buttons |
| Strikethrough on completed items | Text turns `ink-3` |
| Uppercase tracked eyebrow labels | Sentence-case caption in `ink-2` |
| Small, timid screen titles | Big title1 (38/700, tight) left-aligned |
| Several filled primary buttons | One ink primary per screen |
| Colored status pills/badges | Plain `ink-2` text, or an ink dot/count |
| Green/blue success toasts and banners | Ink toast capsule |
| 3-up grid of feature cards with emoji icons | A list island, or one strong statement |
| Icons on every row/heading | Icons only where they add meaning |
| Using Inter / system font by default | Figtree |
| Bold everywhere / weight 800+ | 700 titles, 600 headlines, 500 row titles, 400 text |
| Centered text in content | Left-aligned; center only empty states |
| Placeholder as label | Label above the field |
| Hover lift / scale-up, page-load stagger, bounce | Motion only for state changes |
| Emoji as UI icons | Lucide 1.75 / SF Symbols |
| Hardcoded hex/px in components | Tokens |
| Light mode only | Dark mode via tokens, always |
| Filler copy ("Unlock", "Seamless", "Supercharge") | Plain words (`voice.md`) |
| Hard-cut content at the edge of a scroll area | Scroll-edge fade (blur + gradient) |
| Hover that highlights only part of a row (text box, padded inner area) | The whole row fills edge to edge |
| Bottom sheets on desktop / wide screens | Centered dialog ≥ 640px |
| Tab/content switch that just cuts | Liquid indicator + Blur swap |
