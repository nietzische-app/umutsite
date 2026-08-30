"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/lib/content";

/**
 * Hero'nun arkasında dönen tam ekran video katmanı.
 *
 * Video güçlü şekilde bulanıklaştırılır ve koyulaştırılır; amaç görüntüyü
 * göstermek değil, markanın kendi çekiminden türeyen organik bir renk akışı
 * elde etmek. Bu sayede arka plan hem hareketli hem de markaya ait olur.
 *
 * - `prefers-reduced-motion` açıksa video hiç yüklenmez, Aurora katmanı kalır.
 * - Hero ekrandan çıkınca video durdurulur (pil ve CPU tasarrufu).
 */
export function HeroVideoBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else void video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!hero.backgroundVideo) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      <video
        ref={ref}
        src={hero.backgroundVideo}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        /* scale-125: bulanıklığın kenarlarda oluşturduğu şeffaf halkayı kırpar */
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-55 blur-[30px] saturate-[1.7] sm:blur-[46px]"
      />

      {/* Metin kontrastı: yalnızca metnin bulunduğu sol tarafı ve alt kenarı
          koyulaştırır. Sağ üst açık bırakılır ki hem video hem de arkadaki
          Aurora renkleri görünsün. */}
      <div className="from-ink/85 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
      <div className="from-ink absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
    </div>
  );
}
