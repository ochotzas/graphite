# Done checklist

Run before saying UI work is finished. Check against the actual code/screens, fix misses, report in one line (e.g. "Design checklist: 18/18 ✓", or list deliberate skips and why).

## Graphite identity
- [ ] Only graphite tokens + `danger` (for errors/destructive only) — no other hue anywhere
- [ ] Exactly one ink-filled primary button per screen
- [ ] Content grouped in `surface` islands on the `bg` table; no nested islands; no island shadows/borders
- [ ] Capsule buttons, circular checks, radius 22 islands
- [ ] Figtree loaded; big tight left-aligned title1 on main screens

## Tokens
- [ ] No hardcoded colors/sizes/spacing/radii
- [ ] Spacing on the 4pt token scale; 12px between islands

## Type
- [ ] ≤ 3 sizes per screen; weights 400/500/600/700 used per spec
- [ ] Sentence case; no uppercase labels; no strikethrough for done
- [ ] Tabular numbers for changing/aligned numbers

## Components & states
- [ ] Inputs have labels above, ink focus, `danger` errors with fix-it text
- [ ] Empty, loading (skeleton) and error states exist for every data view
- [ ] Verb labels on buttons (`voice.md`)
- [ ] Scroll areas use the scroll-edge fade; no hard-cut edges
- [ ] Row hover/press fills the entire row
- [ ] Sheets become centered dialogs ≥ 640px
- [ ] Tab/segment changes use the liquid indicator + Blur swap

## Quality
- [ ] Dark mode checked
- [ ] 360px wide works, no horizontal scroll; touch targets ≥ 44px
- [ ] Visible keyboard focus; essential text uses `ink` / `ink-2` only
- [ ] Motion only on state change; reduced motion respected

## Squint test
- [ ] Squint: is the one important thing the darkest/biggest thing? Can anything be removed?
