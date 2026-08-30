"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { clientLogos, testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step: number) => {
    setDir(step);
    setIndex((i) => (i + step + testimonials.length) % testimonials.length);
  }, []);

  /* Otomatik geçiş — hover/odak sırasında durur */
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [paused, reduce, go]);

  const current = testimonials[index];

  return (
    <section id="referanslar" className="relative scroll-mt-24 py-24 sm:py-32">
      {/* Müşteri logoları — akan bant */}
      <div className="border-surface-2 border-y py-7">
        <Marquee speed="38s">
          {clientLogos.map((name) => (
            <span
              key={name}
              className="font-display text-muted-2 hover:text-sand px-10 text-sm font-semibold tracking-[0.22em] whitespace-nowrap transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-x mt-20">
        <SectionHeading
          eyebrow="Referanslar"
          title="Birlikte çalıştığımız markalar"
          accent="ne diyor?"
          align="center"
        />

        {/* Yorum kaydırıcı */}
        <Reveal delay={0.12}>
          <div
            className="relative mx-auto mt-14 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            aria-roledescription="carousel"
            aria-label="Müşteri yorumları"
          >
            <div className="card-surface relative min-h-[19rem] overflow-hidden rounded-3xl p-8 sm:min-h-[16rem] sm:p-12">
              <Quote className="text-sand/30 mb-6" size={30} />

              <AnimatePresence mode="wait" custom={dir}>
                <motion.blockquote
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: reduce ? 0 : dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduce ? 0 : dir * -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-bone text-lg leading-relaxed sm:text-xl">
                    “{current.quote}”
                  </p>
                  <footer className="mt-7 flex items-center gap-3">
                    <span className="bg-sand/50 h-px w-8" />
                    <div>
                      <p className="text-bone text-sm font-semibold">
                        {current.author}
                      </p>
                      <p className="text-muted-2 text-xs">{current.meta}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Kontroller */}
            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Önceki yorum"
                className="border-surface-2 text-muted hover:border-sand hover:text-sand inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`${i + 1}. yoruma git`}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "bg-sand w-7"
                        : "bg-surface-2 hover:bg-muted-2 w-1.5"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Sonraki yorum"
                className="border-surface-2 text-muted hover:border-sand hover:text-sand inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
