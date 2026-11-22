"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MEDIA } from "@/lib/site";
import { t } from "@/lib/i18n";
import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";

const LINKS = [
  { href: "#spaces", label: t.nav.spaces },
  { href: "#film", label: t.nav.film },
  { href: "#coast", label: t.nav.coast },
] as const;

const LINK_CLASS =
  "relative py-2 text-small tracking-[0.16em] uppercase text-nav-fg/90 transition-colors duration-300 hover:text-accent-bright after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent-bright after:transition-transform after:duration-500 hover:after:scale-x-100 focus-visible:after:scale-x-100";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 w-full max-w-full border-b border-nav-fg/15 bg-nav/95 text-nav-fg backdrop-blur-md">
        <div className="gutter flex items-center justify-between gap-4 py-3">
          <a href="#top" aria-label={t.nav.home} className="flex shrink-0 items-center gap-3">
            <span className="block h-10 w-10 shrink-0 overflow-hidden rounded-full border border-nav-fg/25">
              <Image src={MEDIA.logo} alt="" width={80} height={80} className="h-full w-full object-cover" priority />
            </span>
            <span className="display text-[length:var(--text-lead)] leading-none tracking-[0.04em] text-nav-fg">{t.hero.word}</span>
          </a>

          <nav aria-label={t.nav.primary} className="hidden items-center gap-4 lg:gap-8 md:flex">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className={LINK_CLASS}>
                {link.label}
              </a>
            ))}
            <a
              href="#enquire"
              className="shrink-0 border border-accent bg-accent px-3.5 py-2.5 text-small font-semibold tracking-[0.16em] uppercase text-bg transition-colors duration-300 hover:border-nav-fg hover:bg-nav-fg hover:text-nav focus-visible:bg-nav-fg focus-visible:text-nav active:scale-95 lg:px-5"
            >
              {t.nav.enquire}
            </a>
          </nav>

          <button
            type="button"
            className="shrink-0 p-2.5 text-nav-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label={t.nav.primary}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-center gap-6 overflow-y-auto bg-nav px-[var(--spacing-gutter)] text-nav-fg md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: DURATION.fast, ease: EASE_OUT_EXPO }}
          >
            {[...LINKS, { href: "#enquire", label: t.nav.enquire }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="display border-b border-nav-fg/15 pb-4 text-[length:var(--text-title)] text-nav-fg transition-transform duration-300 active:translate-x-2"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
