import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Tüm bölümlerde ortak kullanılan başlık bloğu. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: string;
  /** Başlığın sonuna eklenen şampanya renkli vurgu parçası */
  accent?: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="bg-sand/60 h-px w-8" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl leading-[1.08] sm:text-4xl lg:text-5xl">
          {title}
          {accent && <span className="text-sand"> {accent}</span>}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.14}>
          <p className="text-muted mt-5 text-base leading-relaxed sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
