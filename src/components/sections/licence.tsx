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
    <section id="licence" className="border-t hairline bg-surface py-12 text-fg">
      <div className="gutter grid items-start gap-8 md:grid-cols-12">
        <Reveal kind="rise" className="md:col-span-4">
          <p className="eyebrow">{t.licence.title}</p>
          <p className="display mt-2 text-[length:var(--text-lead)] leading-snug text-fg">{t.licence.authority}</p>
        </Reveal>

        <Reveal kind="slide-right" delay={0.08} className="md:col-span-8">
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((row) => (
              <div key={row.label} className="border-b hairline pb-3">
                <dt className="eyebrow">{row.label}</dt>
                <dd className="mt-1 text-small font-medium text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
