"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { getMessage } from "@/lib/i18n";
import type { GalleryImage } from "@/lib/site";
import { DURATION, EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";

const PARALLAX_SHIFT = 6;

interface ArchImageProps {
  readonly image: GalleryImage;
  readonly sizes: string;
  readonly shape?: "arch" | "frame";
  readonly delay?: number;
  readonly className?: string;
}

/**
 * Signature photo frame. Reveals reliably on scroll with opacity + gentle scale,
 * and drifts subtly on scroll without clipping or hiding tall elements.
 */
export function ArchImage({ image, sizes, shape = "arch", delay = 0, className }: ArchImageProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [`-${PARALLAX_SHIFT}%`, `${PARALLAX_SHIFT}%`]);
  const label = getMessage(image.labelKey);

  return (
    <figure ref={ref} className={className}>
      <motion.div
        className={`relative overflow-hidden bg-surface ${shape === "arch" ? "arch" : ""}`}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
        initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO, delay }}
      >
        <motion.div className="absolute -inset-[7%]" style={reduced ? undefined : { y: drift }}>
          <Image src={image.src} alt={label} fill sizes={sizes} className="object-cover" />
        </motion.div>
      </motion.div>
      <figcaption className="eyebrow mt-3">{label}</figcaption>
    </figure>
  );
}
