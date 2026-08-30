"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { hero, site } from "@/lib/content";
import { HeroVideoBackdrop } from "@/components/ui/HeroVideoBackdrop";

export function Hero() {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  /* Alt satırdaki kelimeyi döndür */
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % hero.rotating.length),
      2600,
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* ---------- Arka plan katmanları ----------
           Renk süzülmeleri global <Aurora /> katmanından gelir; burada
           yalnızca hero'ya özel ızgara ve gren var. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* Markanın kendi çekiminden türeyen renk akışı */}
        <HeroVideoBackdrop />

        {/* İnce dikey ızgara */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(242,242,242,0.6) 1px, transparent 1px)",
            backgroundSize: "clamp(80px, 12vw, 160px) 100%",
            maskImage: "linear-gradient(to bottom, #000 0%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 85%)",
          }}
        />
        {/* Film greni */}
        <div className="grain-layer absolute inset-0 opacity-[0.04]" />
      </div>

      <div className="container-x relative w-full">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* ---------- Sol: metin ---------- */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="border-sand/20 bg-sand/[0.06] inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-sand absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" />
                <span className="bg-sand relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              <span className="text-sand text-[0.7rem] font-medium tracking-[0.2em] uppercase">
                {hero.eyebrow}
              </span>
            </motion.div>

            {/* Satır satır açılan başlık */}
            <h1 className="mt-7 text-[clamp(2.6rem,8vw,5.25rem)] leading-[0.98] font-semibold">
              {hero.headline.map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-1">
                  <motion.span
                    className={`block ${line.accent ? "text-sand" : "text-bone"}`}
                    initial={{ y: reduce ? 0 : "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.85,
                      delay: reduce ? 0 : 0.12 + i * 0.11,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-muted mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
            >
              {hero.sub}
            </motion.p>

            {/* Dönen hizmet kelimesi */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-muted-2 mt-5 flex h-6 items-center gap-2 text-sm"
            >
              <span>Uzmanlığımız:</span>
              <span className="relative inline-block h-6 min-w-[11rem] overflow-hidden">
                {/* Çapraz geçiş: kelimeler üst üste binerek değişir,
                    böylece geçiş anında boşluk oluşmaz. */}
                <AnimatePresence initial={false}>
                  <motion.span
                    key={hero.rotating[wordIndex]}
                    initial={{ y: reduce ? 0 : 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: reduce ? 0 : -18, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sand absolute inset-0 font-medium"
                  >
                    {hero.rotating[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Butonlar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href={hero.primaryCta.href}
                className="group bg-sand text-ink hover:bg-sand-soft inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_40px_-8px_rgba(220,197,161,0.6)]"
              >
                {hero.primaryCta.label}
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href={hero.secondaryCta.href}
                className="group border-surface-2 text-bone hover:border-sand hover:text-sand inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-sm font-semibold transition-colors duration-300"
              >
                <Play size={14} className="fill-current" />
                {hero.secondaryCta.label}
              </a>
            </motion.div>
          </div>

          {/* ---------- Sağ: marka kartı ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass relative mx-auto max-w-sm rounded-[1.75rem] p-8 lg:ml-auto">
              <div
                className="bg-sand/25 absolute -top-px right-10 left-10 h-px"
                aria-hidden="true"
              />

              {/* Dairesel logo rozeti */}
              <div className="border-surface-2 bg-ink mx-auto flex h-32 w-32 flex-col items-center justify-center rounded-full border">
                <span className="font-display text-bone text-2xl font-semibold tracking-[0.14em]">
                  UMUT
                </span>
                <span className="text-sand mt-1.5 text-[0.42rem] tracking-[0.36em]">
                  CREATIVE STUDIO
                </span>
                <span className="bg-sand/70 mt-2 h-px w-6" />
              </div>

              <p className="font-display text-bone mt-8 text-center text-lg leading-snug">
                We create what people
                <span className="text-sand"> remember.</span>
              </p>

              <div className="border-surface-2 mt-8 grid grid-cols-3 gap-2 border-t pt-6 text-center">
                {[
                  ["İçerik", "Üretimi"],
                  ["Tasarım", "& Kimlik"],
                  ["Strateji", "& Reklam"],
                ].map(([a, b]) => (
                  <div key={a}>
                    <p className="text-bone text-xs font-medium">{a}</p>
                    <p className="text-muted-2 mt-0.5 text-[0.65rem]">{b}</p>
                  </div>
                ))}
              </div>

              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-sand mt-6 block text-center text-xs tracking-[0.2em] transition-colors"
              >
                {site.instagramHandle}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Kaydırma göstergesi */}
        <motion.a
          href="#hakkimizda"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-muted-2 hover:text-sand mt-16 hidden items-center gap-3 text-[0.7rem] tracking-[0.25em] uppercase transition-colors lg:inline-flex"
        >
          <motion.span
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={14} />
          </motion.span>
          Aşağı kaydırın
        </motion.a>
      </div>
    </section>
  );
}
