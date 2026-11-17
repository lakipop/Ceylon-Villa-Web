import Link from "next/link";
import { t } from "@/lib/i18n";

export default function NotFound() {
  return (
    <main className="gutter flex min-h-svh flex-col items-start justify-center gap-6 bg-bg text-fg">
      <h1 className="display text-[length:var(--text-giant)]">404</h1>
      <p className="display text-[length:var(--text-lead)]">{t.states.notFoundTitle}</p>
      <Link
        href="/"
        className="border border-fg px-6 py-3 text-small tracking-[0.16em] uppercase text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
      >
        {t.states.backHome}
      </Link>
    </main>
  );
}
