/** Motion constants. Colors never appear here; durations and easings only. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.8,
  slow: 1.2,
} as const;

export const STAGGER = 0.08;
export const VIEWPORT_ONCE = { once: true, amount: "some" } as const;

export const HERO_SCROLL_VH = 1.65;
export const HERO_TEXT_FADE_END = 0.25;
