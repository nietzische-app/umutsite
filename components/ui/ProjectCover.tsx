"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "@/lib/content";
import { ProjectVisual } from "./ProjectVisual";

/**
 * Portföy kartının kapak medyası.
 *
 * Video kapaklar sessizdir ve varsayılan olarak ilk karede durur
 * (`#t=0.1` fragmanı Safari dahil tüm tarayıcılarda ilk kareyi çizdirir).
 * Masaüstünde fareyle üzerine gelindiğinde oynar; dokunmatik cihazlarda
 * fare olayı olmadığı için kart ekranın büyük bölümünü kapladığında oynar.
 * Böylece ızgarada aynı anda onlarca video kod çözmek zorunda kalmayız.
 */
export function ProjectCover({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (canHover || reduce) return;

    // Dokunmatik: kart yeterince görünürse oynat, çıkınca durdur
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function play() {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void video.play().catch(() => {});
  }

  function stop() {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0.1;
  }

  if (!project.media) {
    return <ProjectVisual category={project.category} index={project.index} />;
  }

  if (project.media.type === "video") {
    return (
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
        onMouseEnter={play}
        onMouseLeave={stop}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
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
