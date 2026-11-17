import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { COAST_IMAGES } from "@/lib/site";
import { getMessage, t } from "@/lib/i18n";

export function Coast() {
  return (
    <section id="coast" className="border-t hairline bg-bg py-[var(--spacing-section)] text-fg">
      <div className="gutter">
        <Reveal kind="rise">
          <h2 className="display text-[length:var(--text-huge)]">{t.coast.title}</h2>
        </Reveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COAST_IMAGES.map((image, index) => {
            const label = getMessage(image.labelKey);
            return (
              <li key={image.src}>
                <Reveal kind="rise" delay={index * 0.05}>
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <Image
                        src={image.src}
                        alt={label}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <figcaption className="eyebrow mt-3">{label}</figcaption>
                  </figure>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
