"use client";

import { t } from "@/lib/i18n";

export default function ErrorBoundary({ reset }: { readonly error: Error; readonly reset: () => void }) {
  return (
    <main className="gutter flex min-h-svh flex-col items-start justify-center gap-6 bg-bg text-fg">
      <h1 className="display text-[length:var(--text-huge)]">{t.states.errorTitle}</h1>
      <p className="text-muted">{t.states.errorBody}</p>
      <button
        type="button"
        onClick={reset}
        className="border border-fg px-6 py-3 text-small tracking-[0.16em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
      >
        {t.states.retry}
      </button>
    </main>
  );
}
