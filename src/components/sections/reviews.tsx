import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { t } from "@/lib/i18n";

const REVIEW_URL = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? "";

export function Reviews() {
  return (
    <section className="bg-surface pb-[var(--spacing-section)] text-fg">
      <div className="gutter flex flex-col items-start justify-between gap-6 border-t hairline pt-10 md:flex-row md:items-end">
        <Reveal kind="mask">
          <h2 className="display text-[length:var(--text-title)]">{t.reviews.title}</h2>
        </Reveal>

        {REVIEW_URL ? (
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-fg px-7 py-3.5 text-small tracking-[0.16em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg active:scale-95"
          >
            {t.reviews.cta}
            <ArrowUpRight
              aria-hidden="true"
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        ) : (
          <p role="status" className="eyebrow">
            {t.reviews.missing}
          </p>
        )}
      </div>
    </section>
  );
}
