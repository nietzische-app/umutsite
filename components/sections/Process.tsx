import { processSteps } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section
      id="surec"
      className="bg-ink-2 relative scroll-mt-24 border-y border-white/5 py-24 sm:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Çalışma Sürecimiz"
          title="Fikirden içeriğe,"
          accent="kusursuz deneyim."
          description="Her projede aynı dört adımı izleriz. Bu sayede süreç şeffaf kalır, teslim tarihleri kayar değil."
          align="center"
        />

        <StaggerGroup className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Adımları birbirine bağlayan çizgi (masaüstü) */}
          <div
            className="via-surface-2 absolute top-6 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent to-transparent lg:block"
            aria-hidden="true"
          />

          {processSteps.map((step) => (
            <StaggerItem key={step.step}>
              <div className="group relative">
                <span className="border-surface-2 bg-ink font-display text-sand group-hover:border-sand relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-400">
                  {step.step}
                </span>
                <h3 className="text-bone mt-6 text-base font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
