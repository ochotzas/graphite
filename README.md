# Graphite

A monotone, calm, Apple-simple design system, packaged as an agent skill.
By Olger Chotza — [ochotzas.com](https://ochotzas.com)

One cool graphite hue. Light islands on a soft grey table, dark ink for everything that matters, Figtree set big and tight, and one spring for all motion. There is no accent color: **ink is the accent.**

Coding agents load `SKILL.md` automatically for any UI work, follow its rules and tokens, and run its checklist before they call the work done. It covers web, Tailwind, React, React Native/Expo, SwiftUI, emails and slides.

## Install

### Claude Code (plugin)
Inside Claude Code:
```
/plugin install graphite --marketplace ochotzas/graphite
```
On versions before 2.1.275, run `/plugin marketplace add ochotzas/graphite` first, then `/plugin install graphite@ochotzas`. Updates arrive through `/plugin`.

### Claude Code (plain skill)
```sh
git clone https://github.com/ochotzas/graphite ~/.claude/skills/graphite
```
The skill is picked up on the next session. To update: `git -C ~/.claude/skills/graphite pull`.

To make it mandatory in a project, add this to the project's `CLAUDE.md`:
```
For all UI work, use the graphite skill and run its checklist before finishing.
```

### Other agents
`SKILL.md` follows the open [Agent Skills](https://agentskills.io) format. Clone the repo into your agent's skills folder as `graphite`, or, if your agent has no skill support, add this to the project's `AGENTS.md` (or rules file):
```
For all UI work, read <path-to-graphite>/SKILL.md and follow it, including its checklist.
```

### Just the tokens
Install from GitHub, pinned to a release:
```sh
npm install github:ochotzas/graphite#v1.0.0
```
Then `@import "@ochotzas/graphite/tokens.css";` in CSS, or `import { theme } from "@ochotzas/graphite/tokens";` in TS. Or copy `tokens/tokens.css` / `tokens/tokens.ts` into your project. `stacks.md` shows the setup for each stack.

## Preview
Live at [ochotzas.com/skills/graphite](https://ochotzas.com/skills/graphite), with the components and motion demos.

## What's inside

| Path | Contents |
|---|---|
| `SKILL.md` | Entry point: the 7 rules and which file to read when |
| `tokens/` | Colors, type, spacing, radius, motion as CSS and TypeScript |
| `foundations.md` | Color, type, spacing, radius, layout, icons |
| `components.md` | Islands, rows, buttons, checks, inputs, navigation, sheets, states |
| `motion.md` | The spring and 7 signature effects |
| `stacks.md` | Setup for Tailwind, React, React Native/Expo, SwiftUI |
| `voice.md` | How UI text is written |
| `anti-patterns.md` | What agents typically get wrong |
| `checklist.md` | The review run before UI work is finished |
| `examples/` | Reference implementations to copy from |
| `fonts/` | Figtree TTFs for native apps |
| `.claude-plugin/` | Claude Code plugin and marketplace manifests |
| `package.json` | Lets projects install it from GitHub with npm |

## Contributing
Changes to a value go in both `tokens/tokens.css` and `tokens/tokens.ts`. Mistakes agents keep making go in `anti-patterns.md`. Keep `SKILL.md` short.

## Versioning
The version is in three places — the `SKILL.md` header (`metadata.version`), `.claude-plugin/plugin.json` and `package.json` — bump all three together and tag the commit `vX.Y.Z`. History is in `CHANGELOG.md`. Patch for wording fixes, minor for new rules or components, major when existing screens would need to change.

## License
Apache 2.0, © 2026 Olger Chotza ([ochotzas.com](https://ochotzas.com)). See `LICENSE` and `NOTICE`.
The Figtree fonts in `fonts/` are © The Figtree Project Authors, under the SIL Open Font License (`fonts/OFL.txt`).
