import { processSteps } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

/**
 * Açık zeminli bölüm.
 *
 * Sayfa boyunca süren koyu ritmi bilinçli olarak kırar: kimlik kitinde de
 * koyu ve açık kompozisyonlar birlikte kullanılıyor. Bu bölümdeki renkler
 * token'lardan bağımsız olarak açık zemine göre verilmiştir.
 */
export function Process() {
  return (
    <section
      id="surec"
      className="section-light relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      {/* Üst ve alt kenarda koyu bölümlere yumuşak geçiş */}
      <div
        className="from-ink/25 pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent"
        aria-hidden="true"
      />
      <div
        className="from-ink/25 pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="bg-sand-deep/70 h-px w-8" />
              <span className="text-sand-deep font-sans text-[0.6875rem] font-semibold tracking-[0.28em] uppercase">
                Çalışma Sürecimiz
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="text-on-light mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">
              Fikirden içeriğe,{" "}
              <span className="text-sand-deep">kusursuz deneyim.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="text-on-light-muted mt-5 text-base leading-relaxed sm:text-lg">
              Her projede aynı dört adımı izleriz. Bu sayede süreç şeffaf kalır,
              teslim tarihleri kayar değil.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Adımları birbirine bağlayan çizgi (masaüstü) */}
          <div
            className="absolute top-6 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-black/15 to-transparent lg:block"
            aria-hidden="true"
          />

          {processSteps.map((step) => (
            <StaggerItem key={step.step}>
              <div className="group relative">
                <span className="bg-ink font-display text-sand relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-transform duration-400 group-hover:-translate-y-1">
                  {step.step}
                </span>
                <h3 className="text-on-light mt-6 text-base font-semibold">
                  {step.title}
                </h3>
                <p className="text-on-light-muted mt-3 text-sm leading-relaxed">
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
