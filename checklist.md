# Done checklist

Run before saying UI work is finished. Check against the actual code/screens, fix misses, report in one line (e.g. "Design checklist: 18/18 ✓", or list deliberate skips and why).

## Graphite identity
- [ ] Only graphite + soft color tokens; every color means something (status, link, focus, now, category)
- [ ] Text on tints is `ink`; buttons and selected states are ink, never colored
- [ ] Screen stays mostly grey; color only on small things (icons, dots, chips, one chart)
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

## Icons
- [ ] Icons where `foundations.md` › Icons lists them (nav, icon buttons, known actions, settings rows, menus, banners, empty states), not on titles or plain content rows
- [ ] One set, 1.75 stroke, aligned in one column; icon-only buttons have a label

## Components & states
- [ ] Inputs have labels above, `accent` focus ring, `danger` errors with fix-it text
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
- [ ] Dialogs and sheets: focus moves in, stays in, Escape closes, focus returns; background inert; close button present
- [ ] Reduced transparency drops blurs; increased contrast works (`foundations.md` › Accessibility)
- [ ] Native: haptics only at the moments in `motion.md` › Haptics

## No slop (`unslop.md`)
- [ ] No gradients, glows, glass, blobs, emoji, sparkles or hype badges left
- [ ] No greeting titles, exclamation marks, trailing periods on labels, or unverified claims
- [ ] Numbers in one format; changes say what they compare to
- [ ] No looping motion on things that aren't live; no `transition-all`; no animated layout properties

## Squint test
- [ ] Squint: is the one important thing the darkest/biggest thing? Can anything be removed?
- [ ] Template check: swap the product name for another product's. If it still fits, make the copy and content more specific.
