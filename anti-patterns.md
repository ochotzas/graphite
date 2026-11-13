# Anti-patterns — never do these

These are default habits that break Graphite or make UI look generic/AI-made.

| ❌ Don't | ✅ Do instead |
|---|---|
| Colored buttons, colored selected states, a brand color on chrome | Ink for every emphasis; color only for meaning |
| Saturated or invented colors (`#3B82F6`, `green-500`) | The soft tokens: `accent`, `success`, `warning`, `danger`, `cat-*` |
| Colored text on a tint (green words on a green fill) | `ink` text on the tint; color on the icon or dot |
| Color with no meaning (rainbow icons, a hue per card) | Ink and grey; color only for status, links, focus, now, or a category |
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
| Loud status pills/badges (solid fills, white text) | Soft chip: `*-tint` fill, ink text, colored dot |
| Green/blue success toasts | Ink toast capsule; banners use the soft tint |
| 3-up grid of feature cards with emoji icons | A list island, or one strong statement |
| Icons on titles, island labels and plain content rows | Icons in navigation, icon buttons, known actions, settings rows, menus, banners (`foundations.md` › Icons) |
| Text-only tab bar, sidebar or toolbar; icon button without a label | An icon on every nav item; `aria-label` on every icon-only button |
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
| Glass cards, glowing pills, colored drop shadows | Plain `surface`; counts as `ink-2` text |
| `PRO`, `New ✨`, `Beta 🚀` badges, ✨ for anything AI | Remove, or one quiet text label |
| Greeting titles ("Welcome back, Sam! 👋") | The page or period as the title |
| Arbitrary values (`mt-[13px]`, `h-[31px]`) | Steps on the 4pt scale |
| Mixed number formats (`$48,210` next to `$124,860.40`) | One format, tabular numbers |
| Sparklines or mini bars stuffed into every stat card | Label, number, change with its reference |
| Row of equal cards each with the same chart | One main chart, compact stats around it |
| Rainbow or glowing chart bars | `ink` for what matters, `ring`/`track` for the rest |
| Logo as a gradient tile with a sparkle | Product name in Figtree, flat ink mark |
| Blobs, orbs, robots, glowing brains as visuals | The real product, built in code with plausible data |
| Unsourced social proof ("Loved by 10,000+ teams") | Ask if real; quiet and specific, or remove |
| `animate-pulse` / `ping` on things that aren't live, `transition-all` | Static; transition named properties only |
| A dragged sheet or row that ignores how fast it was let go, or snaps back on a fixed curve | Release velocity goes to the spring; a flick commits |
| Animations that block input until they finish, or restart from their start on a new tap | Interruptible: retarget from the current value and velocity |
| Hard stop at a drag limit | Rubber-band past it (√ resistance) |
