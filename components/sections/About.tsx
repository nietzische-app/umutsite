import { Quote } from "lucide-react";
import { about } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="hakkimizda" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Sol: başlık ve metin */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={about.eyebrow} title={about.title} />

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-muted max-w-2xl leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <blockquote className="border-sand/40 mt-10 border-l-2 pl-6">
                <Quote className="text-sand/50 mb-3" size={20} />
                <p className="font-display text-bone text-xl leading-snug sm:text-2xl">
                  {about.quote}
                </p>
              </blockquote>
            </Reveal>
          </div>

          {/* Sağ: değer sütunları */}
          <StaggerGroup className="space-y-4 lg:col-span-5">
            {about.pillars.map((pillar, i) => (
              <StaggerItem key={pillar.title}>
                <div className="card-surface hover:border-sand/40 group rounded-2xl p-6 transition-all duration-400">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-sand/40 group-hover:text-sand/80 text-sm font-semibold transition-colors duration-400">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-bone text-base font-semibold">
                        {pillar.title}
                      </h3>
                      <p className="text-muted mt-2 text-sm leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        {/* İstatistik sayaçları */}
        <div className="border-surface-2 mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t pt-12 lg:grid-cols-4">
          {about.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.09}>
              <div>
                <p className="font-display text-bone text-4xl font-semibold sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-muted-2 mt-3 text-xs tracking-[0.16em] uppercase">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
