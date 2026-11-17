"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { MEDIA } from "@/lib/site";
import { t } from "@/lib/i18n";

type FilmState = "idle" | "loading" | "playing" | "paused" | "error";

const CONTROL =
  "flex h-12 w-12 items-center justify-center border border-fg text-fg transition-colors duration-300 hover:bg-fg hover:text-bg focus-visible:bg-fg focus-visible:text-bg active:scale-95";

export function Film() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<FilmState>("idle");
  const [muted, setMuted] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setState("loading");
      void video.play().catch(() => setState("error"));
    } else {
      video.pause();
    }
  };

  const retry = () => {
    const video = videoRef.current;
    if (!video) return;
    setState("loading");
    video.load();
    void video.play().catch(() => setState("error"));
  };

  const playing = state === "playing";

  return (
    <section id="film" className="border-t hairline bg-surface py-[var(--spacing-section)] text-fg">
      <div className="gutter">
        <Reveal kind="slide-left">
          <h2 className="display text-[length:var(--text-huge)]">{t.film.title}</h2>
        </Reveal>

        <Reveal kind="scale" className="relative mt-10">
          <video
            ref={videoRef}
            className="aspect-[848/432] w-full bg-fg/10 object-cover"
            src={MEDIA.film}
            poster={MEDIA.filmPoster}
            muted={muted}
            playsInline
            preload="none"
            aria-label={t.film.label}
            onPlaying={() => setState("playing")}
            onPause={() => setState("paused")}
            onWaiting={() => setState("loading")}
            onError={() => setState("error")}
            onClick={toggle}
          />

          {state === "loading" ? (
            <p role="status" className="eyebrow absolute inset-0 flex items-center justify-center bg-scrim/40 text-media-fg">
              {t.film.loading}
            </p>
          ) : null}

          {state === "error" ? (
            <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-scrim/80 text-media-fg">
              <p>{t.film.error}</p>
              <button
                type="button"
                onClick={retry}
                className="border border-media-fg px-6 py-3 text-small tracking-[0.16em] uppercase transition-colors duration-300 hover:bg-media-fg hover:text-fg"
              >
                {t.film.retry}
              </button>
            </div>
          ) : null}
        </Reveal>

        <div className="mt-5 flex gap-3">
          <button type="button" onClick={toggle} className={CONTROL} aria-label={playing ? t.film.pause : t.film.play}>
            {playing ? <Pause aria-hidden="true" size={20} /> : <Play aria-hidden="true" size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            className={CONTROL}
            aria-pressed={muted}
            aria-label={muted ? t.film.unmute : t.film.mute}
          >
            {muted ? <VolumeX aria-hidden="true" size={20} /> : <Volume2 aria-hidden="true" size={20} />}
          </button>
        </div>
      </div>
    </section>
  );
}
