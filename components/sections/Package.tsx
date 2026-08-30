import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  Clapperboard,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { featuredPackage } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

const icons: Record<
  (typeof featuredPackage.features)[number]["icon"],
  LucideIcon
> = {
  camera: Camera,
  film: Clapperboard,
  sparkles: Sparkles,
  calendar: CalendarDays,
  send: Send,
};

export function Package() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="card-surface relative overflow-hidden rounded-3xl p-8 sm:p-12">
            {/* Dekoratif ışık */}
            <div
              className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(220,197,161,0.20) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* --- Sol: kapsam --- */}
              <div className="lg:col-span-7">
                <span className="eyebrow">{featuredPackage.eyebrow}</span>
                <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
                  {featuredPackage.title}
                </h2>
                <p className="text-muted mt-4 max-w-lg leading-relaxed">
                  {featuredPackage.desc}
                </p>

                <StaggerGroup className="mt-8 space-y-3">
                  {featuredPackage.features.map((feature) => {
                    const Icon = icons[feature.icon];
                    return (
                      <StaggerItem key={feature.label}>
                        <div className="group flex items-center gap-4">
                          <span className="border-surface-2 bg-ink text-sand group-hover:border-sand/50 group-hover:bg-sand/10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-400">
                            <Icon size={17} strokeWidth={1.6} />
                          </span>
                          <p className="text-bone text-sm leading-snug sm:text-base">
                            {feature.label}
                          </p>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </StaggerGroup>
              </div>

              {/* --- Sağ: fiyat kartı --- */}
              <div className="lg:col-span-5">
                <div className="glow-sand bg-ink/75 rounded-2xl p-7 backdrop-blur-sm">
                  <p className="text-muted-2 text-sm line-through">
                    {featuredPackage.priceOld}
                  </p>
                  <p className="font-display text-sand mt-1 text-4xl font-semibold sm:text-5xl">
                    {featuredPackage.priceNew}
                  </p>

                  {/* Paketin iki ana kapsamı */}
                  <div className="border-surface-2 mt-6 space-y-2 border-t pt-6">
                    {featuredPackage.highlights.map((highlight) => (
                      <p
                        key={highlight}
                        className="border-sand/30 bg-sand/[0.07] text-bone rounded-lg border px-3 py-2 text-center text-xs font-medium tracking-[0.08em] uppercase"
                      >
                        {highlight}
                      </p>
                    ))}
                  </div>

                  <a
                    href={featuredPackage.cta.href}
                    className="group bg-sand text-ink hover:bg-sand-soft relative mt-7 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_32px_-8px_rgba(220,197,161,0.6)]"
                  >
                    <span
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/35 opacity-0 group-hover:animate-sheen group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    {featuredPackage.cta.label}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>

                  <p className="text-muted-2 mt-4 text-center text-[0.7rem] leading-relaxed">
                    {featuredPackage.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
