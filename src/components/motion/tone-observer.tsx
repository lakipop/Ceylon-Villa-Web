"use client";

import { useEffect } from "react";

export type Tone = "ink" | "sea" | "bone";

const TONE_ATTRIBUTE = "data-tone-section";
/** The band of the viewport that decides which section is active. */
const ACTIVE_BAND = "-45% 0px -45% 0px";

/**
 * Scroll-linked color shift. Sections declare data-tone-section="ink|sea|bone";
 * the section crossing the middle of the viewport sets the tone on <body>.
 */
export function ToneObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(`[${TONE_ATTRIBUTE}]`);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const tone = (entry.target as HTMLElement).getAttribute(TONE_ATTRIBUTE);
          if (tone) document.body.dataset.tone = tone;
        }
      },
      { rootMargin: ACTIVE_BAND },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}
