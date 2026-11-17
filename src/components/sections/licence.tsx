import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/site";
import { t } from "@/lib/i18n";

export function Licence() {
  const { licence } = SITE;
  const rows = [
    { label: t.licence.category, value: licence.category },
    { label: t.licence.licenceNo, value: licence.licenceNo },
    { label: t.licence.registrationNo, value: licence.registrationNo },
    { label: t.licence.rooms, value: String(SITE.rooms) },
    { label: t.licence.valid, value: `${licence.validFrom} ${t.licence.to} ${licence.validTo}` },
  ];

  return (
    <section id="licence" className="border-t hairline bg-surface py-[var(--spacing-section)] text-fg">
      <div className="gutter grid gap-10 md:grid-cols-12">
        <Reveal kind="rise" className="md:col-span-5">
          <h2 className="display text-[length:var(--text-huge)]">{t.licence.title}</h2>
          <p className="eyebrow mt-4">{t.licence.authority}</p>
        </Reveal>

        <Reveal kind="slide-right" delay={0.08} className="md:col-span-6 md:col-start-7">
          <dl>
            {rows.map((row) => (
              <div key={row.label} className="grid gap-2 border-b hairline py-5 sm:grid-cols-[11rem_1fr]">
                <dt className="eyebrow">{row.label}</dt>
                <dd className="display text-[length:var(--text-lead)] leading-tight text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
