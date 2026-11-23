"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Reveal } from "@/components/motion/reveal";
import { t } from "@/lib/i18n";
import { enquirySchema, type EnquiryInput, type EnquiryResponse } from "@/lib/schemas";
import { SITE } from "@/lib/site";

type SubmitState = "idle" | "sending" | "sent" | "error";

const FIELD_CLASS =
  "w-full border-b hairline bg-transparent py-3 text-fg placeholder:text-muted focus:border-accent focus:outline-none";

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export function Enquiry() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorText, setErrorText] = useState("");
  const today = todayUtc();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      checkIn: today,
      checkOut: "",
      guests: 2,
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: EnquiryInput) => {
    setSubmitState("sending");
    setErrorText("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await response.json()) as EnquiryResponse;

      if (payload.ok) {
        setSubmitState("sent");
        reset({ name: "", email: "", checkIn: today, checkOut: "", guests: 2, message: "", website: "" });
        return;
      }

      setSubmitState("error");
      if (payload.code === "not_configured") {
        setErrorText(t.enquiry.errorNotConfigured);
      } else if (payload.code === "rate_limited") {
        setErrorText(t.enquiry.errorRateLimit);
      } else {
        setErrorText(t.enquiry.errorServer);
      }
    } catch {
      setSubmitState("error");
      setErrorText(t.enquiry.errorServer);
    }
  };

  return (
    <section id="enquire" className="border-t hairline bg-bg py-[var(--spacing-section)] text-fg">
      <div className="gutter grid items-start gap-12 md:grid-cols-12">
        <Reveal kind="rise" className="md:col-span-5">
          <h2 className="display text-[length:var(--text-huge)]">{t.enquiry.title}</h2>

          <div className="mt-10 border-t hairline pt-8">
            <p className="eyebrow">{t.enquiry.listings}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={SITE.listings.airbnb}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-fg px-6 py-3 text-small tracking-[0.16em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg active:scale-95"
              >
                {t.footer.airbnb}
                <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={SITE.listings.agoda}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-fg px-6 py-3 text-small tracking-[0.16em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg active:scale-95"
              >
                {t.footer.agoda}
                <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={SITE.listings.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-fg px-6 py-3 text-small tracking-[0.16em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg active:scale-95"
              >
                {t.footer.booking}
                <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="mt-10 border-t hairline pt-8">
            <p className="eyebrow">{t.enquiry.directContact}</p>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {SITE.contacts.map((person) => (
                <li key={person.email} className="space-y-1">
                  <p className="eyebrow">{person.role}</p>
                  <p className="display text-[length:var(--text-lead)] leading-tight text-fg">{person.name}</p>
                  <p className="text-small">
                    <a
                      href={`https://wa.me/${person.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg underline underline-offset-4"
                    >
                      {person.phone}
                    </a>
                  </p>
                  <p className="text-small">
                    <a href={`mailto:${person.email}`} className="text-muted underline underline-offset-4 hover:text-fg">
                      {person.email}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal kind="slide-right" delay={0.08} className="md:col-span-6 md:col-start-7">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6">
            <input type="text" tabIndex={-1} aria-hidden="true" autoComplete="off" className="hidden" {...register("website")} />

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="enquiry-name" className="eyebrow block">
                  {t.enquiry.name}
                </label>
                <input id="enquiry-name" type="text" autoComplete="name" className={FIELD_CLASS} {...register("name")} />
                {errors.name ? (
                  <p role="alert" className="mt-2 text-small text-alert">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="enquiry-email" className="eyebrow block">
                  {t.enquiry.email}
                </label>
                <input id="enquiry-email" type="email" autoComplete="email" className={FIELD_CLASS} {...register("email")} />
                {errors.email ? (
                  <p role="alert" className="mt-2 text-small text-alert">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="enquiry-checkin" className="eyebrow block">
                  {t.enquiry.checkIn}
                </label>
                <input id="enquiry-checkin" type="date" min={today} className={FIELD_CLASS} {...register("checkIn")} />
                {errors.checkIn ? (
                  <p role="alert" className="mt-2 text-small text-alert">
                    {errors.checkIn.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="enquiry-checkout" className="eyebrow block">
                  {t.enquiry.checkOut}
                </label>
                <input id="enquiry-checkout" type="date" min={today} className={FIELD_CLASS} {...register("checkOut")} />
                {errors.checkOut ? (
                  <p role="alert" className="mt-2 text-small text-alert">
                    {errors.checkOut.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="enquiry-guests" className="eyebrow block">
                  {t.enquiry.guests}
                </label>
                <input id="enquiry-guests" type="number" min={1} max={20} className={FIELD_CLASS} {...register("guests")} />
                {errors.guests ? (
                  <p role="alert" className="mt-2 text-small text-alert">
                    {errors.guests.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="enquiry-message" className="eyebrow block">
                {t.enquiry.message}
              </label>
              <textarea id="enquiry-message" rows={3} className={FIELD_CLASS} {...register("message")} />
              {errors.message ? (
                <p role="alert" className="mt-2 text-small text-alert">
                  {errors.message.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                type="submit"
                disabled={submitState === "sending"}
                className="border border-accent bg-accent px-7 py-3.5 text-small font-semibold tracking-[0.16em] uppercase text-bg transition-colors duration-300 hover:border-fg hover:bg-fg focus-visible:border-fg focus-visible:bg-fg active:scale-95 disabled:opacity-50"
              >
                {submitState === "sending" ? t.enquiry.sending : t.enquiry.submit}
              </button>

              {submitState === "sent" ? (
                <p role="status" className="eyebrow">
                  {t.enquiry.success}
                </p>
              ) : null}

              {submitState === "error" ? (
                <p role="alert" className="text-small text-alert">
                  {errorText}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
