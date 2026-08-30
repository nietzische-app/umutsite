"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { VolumeX } from "lucide-react";
import { showreel, type ShowreelItem } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Gerçek işlerin aktığı tam genişlikte medya şeridi.
 *
 * Performans / erişilebilirlik notları:
 * - Videolar **sessiz** (muted) ve döngüsel oynar; ses kontrolü yoktur.
 * - Yalnızca şerit ekranda görünürken oynatılır, dışına çıkınca durdurulur.
 * - `prefers-reduced-motion` açıksa kayma ve otomatik oynatma devre dışı kalır.
 * - İçerik dikişsiz döngü için iki kez basılır; kopya `aria-hidden` işaretlidir.
 */
export function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const videos = () =>
      Array.from(node.querySelectorAll<HTMLVideoElement>("video"));

    const observer = new IntersectionObserver(
      ([entry]) => {
        for (const video of videos()) {
          if (entry.isIntersecting) {
            // Otomatik oynatma engellenirse sessizce yoksay (ilk kare görünür kalır)
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    // Sekme arka plana alındığında da durdur
    const onVisibility = () => {
      if (document.hidden) videos().forEach((v) => v.pause());
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vitrin"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24"
    >
      <div className="container-x">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="bg-sand/60 h-px w-8" />
                <span className="eyebrow">Vitrin</span>
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl">
                Kameranın arkasından{" "}
                <span className="text-sand">akışa.</span>
              </h2>
            </div>

            <p className="text-muted-2 flex items-center gap-2 text-xs">
              <VolumeX size={14} />
              Videolar sessiz oynar
            </p>
          </div>
        </Reveal>
      </div>

      {/* Akan şerit */}
      <div className="edge-fade group relative mt-10 overflow-hidden">
        <div className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused] sm:gap-5">
          <MediaTrack />
          <MediaTrack clone />
        </div>
      </div>
    </section>
  );
}

function MediaTrack({ clone = false }: { clone?: boolean }) {
  return (
    <div
      className="flex shrink-0 gap-4 sm:gap-5"
      aria-hidden={clone ? "true" : undefined}
    >
      {showreel.map((item, i) => (
        <MediaCard key={`${clone ? "c" : "o"}-${item.src}-${i}`} item={item} />
      ))}
    </div>
  );
}

function MediaCard({ item }: { item: ShowreelItem }) {
  return (
    <figure
      className="card-surface group/card relative h-[clamp(15rem,34vh,24rem)] shrink-0 overflow-hidden rounded-2xl"
      style={{ aspectRatio: item.ratio }}
    >
      {item.type === "video" ? (
        <video
          src={`${item.src}#t=0.1`}
          poster={item.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          disablePictureInPicture
          aria-label={item.label}
          className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
      ) : (
        <Image
          src={item.src}
          alt={item.label}
          fill
          sizes="(max-width: 640px) 60vw, 30vw"
          className="object-cover transition-transform duration-700 group-hover/card:scale-105"
        />
      )}

      {/* Etiket için okunabilirlik gradyanı */}
      <div
        className="from-ink/85 pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent"
        aria-hidden="true"
      />

      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-4 pb-3.5">
        <span className="text-bone text-[0.7rem] font-medium tracking-[0.1em] uppercase">
          {item.label}
        </span>
        {item.type === "video" && (
          <span
            className="text-muted-2 shrink-0"
            title="Sessiz oynatılıyor"
            aria-hidden="true"
          >
            <VolumeX size={13} />
          </span>
        )}
      </figcaption>
    </figure>
  );
}
