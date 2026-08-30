"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/content";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Portföy kartının kapak medyası.
 *
 * Video kapaklar sessizdir ve duran karesiyle (poster) başlar.
 *
 * Önemli: fare olayları videonun kendisine bağlanamaz — kartta videonun
 * üzerinde `absolute inset-0` ile duran gradyan ve etiket katmanları var,
 * imleç hiçbir zaman video elementine ulaşmıyor. Bu yüzden dinleyiciler
 * kartın kök öğesine (`article`) bağlanır:
 *   - fareli cihazlarda kartın üzerine gelince oynar, çıkınca durur
 *   - dokunmatikte kart ekranın ortasına gelince oynar
 *   - her iki durumda karta dokunmak/tıklamak oynat-durdur yapar
 */
export function ProjectCover({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const card = video.closest("article");
    if (!card) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;

    const play = () => {
      if (reduce) return;
      void video.play().catch(() => {});
    };
    const pause = () => {
      video.pause();
      video.currentTime = 0.1;
    };
    const toggle = () => (video.paused ? play() : pause());

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    // Tıklama/dokunma her cihazda çalışır
    card.addEventListener("click", toggle);

    let observer: IntersectionObserver | undefined;
    if (canHover) {
      card.addEventListener("mouseenter", play);
      card.addEventListener("mouseleave", pause);
    } else if (!reduce) {
      // Dokunmatik: kart ekranın büyük bölümünü kapladığında oynat
      observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? play() : pause()),
        { threshold: 0.6 },
      );
      observer.observe(card);
    }

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      card.removeEventListener("click", toggle);
      card.removeEventListener("mouseenter", play);
      card.removeEventListener("mouseleave", pause);
      observer?.disconnect();
    };
  }, []);

  if (!project.media) {
    return <ProjectVisual category={project.category} index={project.index} />;
  }

  if (project.media.type === "video") {
    return (
      <>
        <video
          ref={videoRef}
          src={`${project.media.src}#t=0.1`}
          poster={project.media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label={`${project.title} — ${project.client}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Oynatma göstergesi — video oynarken kaybolur */}
        <span
          data-playing={playing || undefined}
          className="glass text-sand absolute top-4 right-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 data-[playing]:scale-90 data-[playing]:opacity-0"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 h-3 w-3 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </>
    );
  }

  return (
    <Image
      src={project.media.src}
      alt={`${project.title} — ${project.client}`}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );
}
