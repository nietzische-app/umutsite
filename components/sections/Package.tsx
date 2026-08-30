import { ArrowUpRight, Check } from "lucide-react";
import { featuredPackage } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

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
              <div className="lg:col-span-7">
                <span className="eyebrow">{featuredPackage.eyebrow}</span>
                <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
                  {featuredPackage.title}
                </h2>
                <p className="text-muted mt-4 max-w-lg leading-relaxed">
                  {featuredPackage.desc}
                </p>

                <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                  {featuredPackage.includes.map((item) => (
                    <li
                      key={item.label}
                      className="border-surface-2 border-l pl-4"
                    >
                      <p className="font-display text-bone text-3xl font-semibold">
                        {item.count}
                      </p>
                      <p className="text-muted-2 mt-1.5 text-xs leading-snug">
                        {item.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fiyat kartı */}
              <div className="lg:col-span-5">
                <div className="glow-sand bg-ink/75 rounded-2xl p-7 backdrop-blur-sm">
                  <p className="text-muted-2 text-sm line-through">
                    {featuredPackage.priceOld}
                  </p>
                  <p className="font-display text-sand mt-1 text-4xl font-semibold sm:text-5xl">
                    {featuredPackage.priceNew}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Marka analizi ve içerik yönü",
                      "Revizyon hakkı dahil",
                      "Yayına hazır dosya teslimi",
                    ].map((line) => (
                      <li
                        key={line}
                        className="text-muted flex items-start gap-2.5 text-sm"
                      >
                        <Check
                          size={15}
                          className="text-sand mt-0.5 shrink-0"
                          strokeWidth={2.4}
                        />
                        {line}
                      </li>
                    ))}
                  </ul>

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
