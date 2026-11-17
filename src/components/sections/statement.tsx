"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";
import { t } from "@/lib/i18n";

const COUNT_SECONDS = 1.4;

function RoomCounter({ target }: { readonly target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: "some" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, target, {
      duration: COUNT_SECONDS,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, target]);

  return (
    <span ref={ref} aria-label={`${target} ${t.statement.rooms}`}>
      <span aria-hidden="true">{value}</span>
    </span>
  );
}

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wordX = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y hairline bg-surface py-[var(--spacing-section)]"
    >
      <motion.p
        aria-hidden="true"
        className="display pointer-events-none absolute top-[12%] left-0 whitespace-nowrap text-[length:var(--text-huge)] text-fg opacity-[0.07]"
        style={reduced ? undefined : { x: wordX }}
      >
        {SITE.address.line}, {SITE.address.city}, {SITE.address.country}
      </motion.p>

      <div className="gutter relative grid items-end gap-10 md:grid-cols-12">
        <Reveal kind="rise" className="md:col-span-8">
          <h2 className="display text-[length:var(--text-huge)] text-fg">{t.statement.lead}</h2>
        </Reveal>

        <Reveal kind="slide-right" delay={0.1} className="md:col-span-4 md:text-right">
          <p className="display text-[length:var(--text-giant)] leading-[0.85] text-accent">
            <RoomCounter target={SITE.rooms} />
          </p>
          <p className="eyebrow mt-3">{t.statement.rooms}</p>
        </Reveal>
      </div>
    </section>
  );
}
