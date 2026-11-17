"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

export type RevealKind = "rise" | "mask" | "slide-left" | "slide-right" | "scale";

const VARIANTS: Record<RevealKind, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 48 },
    shown: { opacity: 1, y: 0 },
  },
  mask: {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    shown: { clipPath: "inset(0% 0% 0% 0%)" },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -80 },
    shown: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 80 },
    shown: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    shown: { opacity: 1, scale: 1 },
  },
};

interface RevealProps {
  readonly kind?: RevealKind;
  readonly delay?: number;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Reveal({ kind = "rise", delay = 0, className, children }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={VARIANTS[kind]}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT_ONCE}
      transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
