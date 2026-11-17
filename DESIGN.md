# Design System - Ceylon Villa

## Concept
Editorial hospitality showcase for Ceylon Villa, Matara (6 rooms, SLTDA Deluxe licensed). Inspired by the scroll-driven bento collapse and typographic rhythm of `evasion-ecommerce`, adapted to **Palette 1 (Soft Alabaster & Ceylon Gold)**.

## Color Tokens (`src/app/globals.css`)
100% global tokens defined once in `@theme`:
- `--color-bg`: `#faf8f4` (Soft Alabaster ground)
- `--color-surface`: `#f2ede4` (Warm Linen raised surface)
- `--color-fg`: `#181614` (Deep Espresso Charcoal text)
- `--color-muted`: `#5c574f` (Warm Stone secondary text)
- `--color-accent`: `#9a7218` (Burnished Ceylon Gold, AA contrast on light)
- `--color-accent-bright`: `#d4a942`
- `--color-border`: `#e4ddd0` (Subtle Sand hairline)
- `--color-alert`: `#a3281a`
- `--color-media-fg`: `#faf8f4` (text over video scrim)
- `--color-scrim`: `#181614` (video gradient overlay)

## Typography
- Display: `Cormorant Garamond` (`--font-cormorant`), loaded via `next/font/google` with `display: "swap"`.
- Body & UI: `Manrope` (`--font-manrope`), loaded via `next/font/google`.
- Normal-screen fluid `clamp()` scales (`--text-giant`, `--text-huge`, `--text-title`, `--text-lead`, `--text-body`, `--text-small`) with `.gutter` max-width `82rem`.

## Motion & Signature Interaction
- Dial: Editorial.
- Sticky video-to-bento collapse (`Hero`, `165svh`) with side coastal frames.
- Reliable scroll-triggered `ArchImage` reveals (`amount: "some"`, opacity + scale + subtle parallax drift).
- Simple 3-column `Coast` editorial grid, `SmoothScroll` via Lenis with `prefers-reduced-motion` support.
