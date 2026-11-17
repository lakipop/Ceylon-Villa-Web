import { Reveal } from "@/components/motion/reveal";
import { SPACE_IMAGES } from "@/lib/site";
import { t } from "@/lib/i18n";
import { ArchImage } from "./arch-image";

export function Spaces() {
  return (
    <section id="spaces" className="bg-bg py-[var(--spacing-section)] text-fg">
      <div className="gutter">
        <Reveal kind="mask">
          <h2 className="display text-[length:var(--text-giant)]">{t.spaces.title}</h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 md:mt-16 md:grid-cols-12 md:gap-10">
          <ArchImage
            image={SPACE_IMAGES.exterior}
            shape="frame"
            sizes="(min-width: 768px) 46vw, 100vw"
            className="md:col-span-5"
          />
          <ArchImage
            image={SPACE_IMAGES.living}
            shape="frame"
            sizes="(min-width: 768px) 54vw, 100vw"
            delay={0.08}
            className="md:col-span-7"
          />

          <ArchImage
            image={SPACE_IMAGES.kitchen}
            shape="frame"
            sizes="(min-width: 768px) 48vw, 100vw"
            className="md:col-span-6"
          />
          <ArchImage
            image={SPACE_IMAGES.upstairs}
            shape="frame"
            sizes="(min-width: 768px) 48vw, 100vw"
            delay={0.08}
            className="md:col-span-6"
          />

          <ArchImage
            image={SPACE_IMAGES.bedroomOne}
            sizes="(min-width: 768px) 30vw, 100vw"
            className="md:col-span-4"
          />
          <ArchImage
            image={SPACE_IMAGES.bedroomCurtains}
            sizes="(min-width: 768px) 30vw, 100vw"
            delay={0.08}
            className="md:col-span-4"
          />
          <ArchImage
            image={SPACE_IMAGES.bedroomTwin}
            sizes="(min-width: 768px) 30vw, 100vw"
            delay={0.14}
            className="md:col-span-4"
          />

          <ArchImage
            image={SPACE_IMAGES.lounge}
            shape="frame"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="md:col-span-6"
          />
          <ArchImage
            image={SPACE_IMAGES.bathroom}
            sizes="(min-width: 768px) 24vw, 100vw"
            delay={0.08}
            className="md:col-span-3"
          />
          <ArchImage
            image={SPACE_IMAGES.balcony}
            sizes="(min-width: 768px) 24vw, 100vw"
            delay={0.14}
            className="md:col-span-3"
          />
        </div>

        <div className="mt-16 border-t hairline pt-10 md:mt-20">
          <p className="eyebrow">{t.spaces.amenitiesTitle}</p>
          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {t.spaces.amenities.map((item) => (
              <li
                key={item}
                className="display border-b hairline py-4 text-[length:var(--text-lead)] leading-tight text-fg"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
