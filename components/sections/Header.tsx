"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  /* Sayfa kaydırıldığında blur'lu duruma geç */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Görünürdeki bölümü menüde işaretle */
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Mobil menü açıkken arka planı kilitle */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Esc ile kapat */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#hakkimizda"
        className="bg-sand text-ink sr-only rounded-full px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
      >
        İçeriğe geç
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "header-glass py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.95)]"
            : "border-b border-transparent py-5"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Logo />

          {/* Masaüstü menü */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === item.href
                    ? "text-bone"
                    : "text-bone/70 hover:text-bone"
                }`}
              >
                {item.label}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="bg-sand/15 border-sand/35 absolute inset-0 -z-10 rounded-full border"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#iletisim"
              className="bg-sand text-ink hover:bg-sand-soft group hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_28px_-6px_rgba(220,197,161,0.55)] sm:inline-flex"
            >
              Teklif Al
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              className="border-surface-2 text-bone hover:border-sand hover:text-sand inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobil menü */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-ink/97 fixed inset-0 z-40 backdrop-blur-xl lg:hidden"
          >
            <nav
              className="container-x flex h-full flex-col justify-center gap-1 pt-16"
              aria-label="Mobil menü"
            >
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  className="font-display text-bone hover:text-sand border-b border-white/5 py-5 text-3xl font-semibold tracking-tight transition-colors"
                >
                  <span className="text-sand/50 mr-4 text-sm font-normal tracking-widest">
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#iletisim"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="bg-sand text-ink mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold"
              >
                Teklif Al <ArrowUpRight size={17} />
              </motion.a>

              <motion.a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.58 }}
                className="text-muted hover:text-sand mt-6 text-center text-sm tracking-widest uppercase transition-colors"
              >
                {site.instagramHandle}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
