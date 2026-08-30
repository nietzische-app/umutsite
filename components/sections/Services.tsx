import {
  Camera,
  Code2,
  Palette,
  Share2,
  TrendingUp,
  Video,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { services, type Service } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

const icons: Record<Service["icon"], LucideIcon> = {
  share: Share2,
  code: Code2,
  trending: TrendingUp,
  palette: Palette,
  video: Video,
  camera: Camera,
};

export function Services() {
  return (
    <section
      id="hizmetler"
      className="bg-ink-2 relative scroll-mt-24 border-y border-white/5 py-24 sm:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Hizmetlerimiz"
          title="Markanız için uçtan uca"
          accent="üretim."
          description="Strateji, üretim ve dağıtımı tek çatı altında topluyoruz. İhtiyacınıza göre tek bir hizmeti ya da tam kapsamlı yönetimi seçebilirsiniz."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <StaggerItem key={service.id}>
                <article className="border-surface-2 bg-surface/35 hover:border-sand/35 group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-colors duration-400">
                  {/* Hover'da beliren yumuşak ışık */}
                  <div
                    className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(220,197,161,0.16) 0%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-start justify-between">
                    <span className="border-surface-2 bg-ink text-sand group-hover:border-sand/40 inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-400">
                      <Icon size={20} strokeWidth={1.6} />
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-2 group-hover:text-sand translate-y-1 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-bone relative mt-6 text-lg font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-muted relative mt-3 text-sm leading-relaxed">
                    {service.desc}
                  </p>

                  <ul className="border-surface-2 relative mt-6 space-y-2 border-t pt-5">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="text-muted-2 flex items-center gap-2.5 text-xs"
                      >
                        <span className="bg-sand/60 h-1 w-1 shrink-0 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
