import type { ReactNode } from "react";

/**
 * Sonsuz akan bant. İçerik iki kez basılır ve -50% kaydırılır,
 * böylece dikişsiz bir döngü oluşur. Hover'da durur.
 */
export function Marquee({
  children,
  reverse = false,
  speed = "42s",
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: string;
}) {
  return (
    <div className="edge-fade group relative overflow-hidden">
      <div
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: speed,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
