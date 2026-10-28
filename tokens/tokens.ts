// Graphite — design tokens for JS/TS, React, React Native/Expo.
// Mirror of tokens.css — keep in sync. Numbers are px / dp.
// Font: Figtree (expo-google-fonts/figtree or Google Fonts).

export const palette = {
  light: {
    bg: '#E8E9ED',
    surface: '#F6F7F9',
    press: '#ECEDF0',
    track: '#D3D6DC',
    line: '#E0E1E5',
    ring: '#AEB1B9',
    ink: '#2F333C',
    ink2: '#63666F',
    ink3: '#9C9EA4',
    onInk: '#F6F7F9',
    danger: '#C4322B',
  },
  dark: {
    bg: '#0F0F11',
    surface: '#1B1C1F',
    press: '#232427',
    track: '#2C2E32',
    line: '#252629',
    ring: '#4B4D53',
    ink: '#E2E4EB',
    ink2: '#96989F',
    ink3: '#5B5D63',
    onInk: '#0F0F11',
    danger: '#FF6B61',
  },
} as const;

export type ColorScheme = keyof typeof palette;
export type Colors = { [K in keyof typeof palette.light]: string };

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 32, 7: 48, 8: 64, 9: 96 } as const;

export const radius = { sm: 8, md: 14, lg: 22, xl: 34, full: 999 } as const;

// fontFamily per weight for React Native (Figtree_500Medium etc. from @expo-google-fonts/figtree).
// letterSpacing in px (em × fontSize).
export const type = {
  caption:  { fontSize: 12, lineHeight: 16, fontWeight: '500', letterSpacing: 0 },
  footnote: { fontSize: 13, lineHeight: 18, fontWeight: '500', letterSpacing: 0 },
  body:     { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: 0 },
  rowTitle: { fontSize: 16, lineHeight: 22, fontWeight: '500', letterSpacing: 0 },
  headline: { fontSize: 18, lineHeight: 24, fontWeight: '600', letterSpacing: 0 },
  stat:     { fontSize: 34, lineHeight: 38, fontWeight: '700', letterSpacing: -1.02 },
  title2:   { fontSize: 24, lineHeight: 30, fontWeight: '700', letterSpacing: -0.48 },
  title1:   { fontSize: 38, lineHeight: 42, fontWeight: '700', letterSpacing: -1.14 },
  display:  { fontSize: 56, lineHeight: 58, fontWeight: '700', letterSpacing: -2.24 },
} as const;

// "Spring" feel. Use springs for anything that moves; timing curves only for color/opacity/exits.
// Reanimated: withSpring(v, motion.spring.default). SwiftUI: .spring(response: 0.32, dampingFraction: 0.77).
export const motion = {
  spring: {
    default: { stiffness: 380, damping: 30, mass: 1 }, // everything that moves (~470ms, 1.6% overshoot)
    fast:    { stiffness: 520, damping: 34, mass: 1 }, // liquid tabs leading edge
    slow:    { stiffness: 260, damping: 26, mass: 1 }, // liquid tabs trailing edge
  },
  duration: { fast: 120, base: 220, spring: 470 },
  easing: { out: [0.2, 0, 0, 1], in: [0.4, 0, 1, 1] },
  pressScale: 0.96,
  pushBack: { scale: 0.92, translateY: 14, radius: 26, brightness: 0.75 },
  blur: 8, // px, blur swap
} as const;

export const layout = {
  widthRead: 640,
  widthApp: 1120,
  gutter: { mobile: 20, tablet: 24, desktop: 32 },
  islandGap: 12,
  tap: 44,
} as const;

export const theme = (scheme: ColorScheme) => ({
  colors: palette[scheme],
  space,
  radius,
  type,
  motion,
  layout,
});
