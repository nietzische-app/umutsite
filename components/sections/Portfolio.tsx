"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioFilters, projects, site } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";

export function Portfolio() {
  const [filter, setFilter] = useState<string>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section id="portfoy" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Portföy"
            title="Ürettiğimiz işlerden"
            accent="seçkiler."
            description="Kafe ve restoranlardan butiklere, kişisel markalardan kurumsal firmalara kadar farklı sektörlerde tamamladığımız projeler."
          />

          {/* Kategori filtreleri */}
          <Reveal delay={0.15} direction="left">
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Proje kategorileri"
            >
              {portfolioFilters.map((f) => {
                const isActive = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(f.id)}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      isActive
                        ? "text-ink"
                        : "border-surface-2 text-muted hover:text-bone border"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        className="bg-sand absolute inset-0 -z-10 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative font-medium">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Proje ızgarası */}
        <motion.div
          layout
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.index}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="border-surface-2 group relative overflow-hidden rounded-2xl border"
              >
                {/* Kapak */}
                <div className="relative aspect-4/5 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.client}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <ProjectVisual
                        category={project.category}
                        index={project.index}
                      />
                    </div>
                  )}

                  {/* Okunabilirlik için alt gradyan */}
                  <div
                    className="from-ink absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                    aria-hidden="true"
                  />

                  {/* Hover'da açılan detay katmanı */}
                  <div className="bg-ink/88 absolute inset-0 flex translate-y-3 flex-col justify-end p-6 opacity-0 backdrop-blur-[3px] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="eyebrow">{project.client}</p>
                    <h3 className="font-display text-bone mt-2 text-lg leading-snug font-semibold">
                      {project.title}
                    </h3>
                    <p className="text-sand mt-3 text-sm">{project.result}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border-surface-2 text-muted rounded-full border px-2.5 py-1 text-[0.65rem]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alt bilgi çubuğu */}
                <div className="bg-surface/50 flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="text-bone truncate text-sm font-medium">
                      {project.title}
                    </p>
                    <p className="text-muted-2 mt-0.5 truncate text-xs">
                      {project.client}
                    </p>
                  </div>
                  <span className="text-muted-2 group-hover:text-sand shrink-0 transition-colors duration-300">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <p className="text-muted-2 mt-12 text-center text-sm">
            Daha fazlası için{" "}
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand underline underline-offset-4 hover:no-underline"
            >
              Instagram sayfamızı
            </a>{" "}
            inceleyebilirsiniz.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
