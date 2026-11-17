"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MEDIA, COAST_IMAGES } from "@/lib/site";
import { getMessage, t } from "@/lib/i18n";
import {
  DURATION,
  EASE_OUT_EXPO,
  HERO_SCROLL_VH,
  HERO_TEXT_FADE_END,
  STAGGER,
} from "@/lib/motion";

const WIDE_QUERY = "(min-width: 768px)";
const SIDE_IMAGES = COAST_IMAGES.filter((_, idx) => idx === 1 || idx === 2 || idx === 3 || idx === 5);
const INSET_TOP = 12;
const INSET_BOTTOM = 12;
const INSET_X_WIDE = 27;
const INSET_X_NARROW = 6;
const RADIUS_PX = 20;

function useIsWide(): boolean {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(WIDE_QUERY);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return wide;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const wide = useIsWide();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const collapse = useTransform(scrollYProgress, [HERO_TEXT_FADE_END, 0.9], [0, 1], { clamp: true });
  const insetX = useTransform(collapse, [0, 1], [0, wide ? INSET_X_WIDE : INSET_X_NARROW]);
  const insetTop = useTransform(collapse, [0, 1], [0, INSET_TOP]);
  const insetBottom = useTransform(collapse, [0, 1], [0, INSET_BOTTOM]);
  const radius = useTransform(collapse, [0, 1], [0, RADIUS_PX]);
  const clipPath = useMotionTemplate`inset(${insetTop}% ${insetX}% ${insetBottom}% ${insetX}% round ${radius}px)`;

  const wordOpacity = useTransform(scrollYProgress, [0, HERO_TEXT_FADE_END], [1, 0]);
  const wordY = useTransform(scrollYProgress, [0, HERO_TEXT_FADE_END], ["0%", "-10%"]);
  const sideOpacity = useTransform(collapse, [0, 0.55], [0, 1]);
  const leftX = useTransform(collapse, [0, 1], ["-60%", "0%"]);
  const rightX = useTransform(collapse, [0, 1], ["60%", "0%"]);
  const placeOpacity = useTransform(collapse, [0.55, 1], [0, 1]);

  const letters = Array.from(t.hero.word);

  return (
    <section
      ref={sectionRef}
      id="top"
      style={{ height: `${HERO_SCROLL_VH * 100}svh` }}
      className="relative bg-bg pt-16"
    >
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
        <motion.div className="absolute inset-0" style={reduced ? undefined : { clipPath }}>
          <video
            className="h-full w-full object-cover"
            src={MEDIA.heroVideo}
            poster={MEDIA.heroPoster}
            autoPlay={!reduced}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t.hero.videoLabel}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-scrim/65 via-scrim/15 to-scrim/25" />
        </motion.div>

        {wide && !reduced ? (
          <>
            <SideColumn side="left" x={leftX} opacity={sideOpacity} />
            <SideColumn side="right" x={rightX} opacity={sideOpacity} />
          </>
        ) : null}

        <motion.h1
          aria-label={t.hero.word}
          className="display absolute inset-x-0 bottom-[7svh] whitespace-nowrap text-center text-[clamp(3rem,10vw,9.5rem)] text-media-fg"
          style={reduced ? undefined : { opacity: wordOpacity, y: wordY }}
        >
          <span aria-hidden="true" className="inline-flex overflow-hidden pb-[0.12em]">
            {letters.map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className="inline-block"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: DURATION.base,
                  ease: EASE_OUT_EXPO,
                  delay: 0.15 + index * (STAGGER * 0.6),
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          className="eyebrow absolute inset-x-0 bottom-4 text-center"
          style={reduced ? { opacity: 1 } : { opacity: placeOpacity }}
        >
          {t.hero.place}
        </motion.p>
      </div>
    </section>
  );
}

interface SideColumnProps {
  readonly side: "left" | "right";
  readonly x: ReturnType<typeof useTransform<number, string>>;
  readonly opacity: ReturnType<typeof useTransform<number, number>>;
}

function SideColumn({ side, x, opacity }: SideColumnProps) {
  const images = side === "left" ? SIDE_IMAGES.slice(0, 2) : SIDE_IMAGES.slice(2);
  return (
    <motion.div
      className={`absolute flex flex-col gap-3 ${side === "left" ? "left-[2vw]" : "right-[2vw]"}`}
      style={{
        width: "22vw",
        top: `${INSET_TOP}%`,
        bottom: `${INSET_BOTTOM}%`,
        x,
        opacity,
      }}
    >
      {images.map((image) => (
        <div key={image.src} className="relative flex-1 overflow-hidden rounded-[20px]">
          <Image
            src={image.src}
            alt={getMessage(image.labelKey)}
            fill
            sizes="22vw"
            className="object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}
