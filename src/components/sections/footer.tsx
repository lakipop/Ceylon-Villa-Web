import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { t } from "@/lib/i18n";
import { MEDIA, SITE } from "@/lib/site";

const MAPS_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE.whatsapp;
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}`;

export function Footer() {
  return (
    <>
      <footer className="border-t hairline bg-surface py-14 text-fg md:py-20">
        <div className="gutter grid gap-10 md:grid-cols-12">
          <div className="flex items-center gap-4 md:col-span-4">
            <div className="h-14 w-14 overflow-hidden rounded-full border hairline">
              <Image src={MEDIA.logo} alt={SITE.name} width={112} height={112} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="display text-[length:var(--text-lead)] leading-none text-fg">{SITE.name}</p>
              <p className="eyebrow mt-2">{SITE.licence.licenceNo}</p>
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">{t.footer.address}</p>
            <address className="mt-3 not-italic text-muted">
              <p>{SITE.address.line}</p>
              <p>
                {SITE.address.city}, {SITE.address.country}
              </p>
              {MAPS_URL ? (
                <p className="mt-3">
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="eyebrow underline underline-offset-4">
                    Google Maps
                  </a>
                </p>
              ) : null}
              {CONTACT_EMAIL ? (
                <p className="mt-2">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-fg underline underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              ) : null}
              <p className="mt-2">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg underline underline-offset-4"
                >
                  {t.footer.whatsapp} {WHATSAPP_NUMBER}
                </a>
              </p>
            </address>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">{t.footer.listings}</p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a href={SITE.listings.agoda} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-4">
                  {t.footer.agoda}
                </a>
              </li>
              <li>
                <a href={SITE.listings.booking} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-4">
                  {t.footer.booking}
                </a>
              </li>
            </ul>
            <p className="eyebrow mt-8">
              {t.footer.rights} {new Date().getUTCFullYear()}
            </p>
          </div>
        </div>
      </footer>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.footer.whatsapp} ${WHATSAPP_NUMBER}`}
        className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2.5 border border-fg bg-bg/90 px-4 py-3 text-small tracking-[0.16em] uppercase text-fg backdrop-blur-md transition-colors duration-300 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg active:scale-95"
      >
        <MessageCircle aria-hidden="true" size={16} className="text-accent" />
        <span>{t.footer.whatsapp}</span>
      </a>
    </>
  );
}
