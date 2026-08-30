import type { ProjectCategory } from "@/lib/content";

/**
 * Gerçek fotoğraf eklenmeden önce kullanılan kapak görseli.
 * Kategoriye göre deterministik bir duotone gradyan + ızgara dokusu üretir;
 * böylece portföy boş görünmez ve ek dosya boyutu getirmez.
 *
 * `public/portfolio/...` altına fotoğraf ekleyip `Project.image` alanını
 * doldurduğunuzda bu görsel otomatik olarak devre dışı kalır.
 */
const palettes: Record<
  ProjectCategory,
  { from: string; to: string; glow: string; label: string }
> = {
  video: {
    from: "#241d15",
    to: "#0f0f0f",
    glow: "rgba(220,197,161,0.34)",
    label: "Video",
  },
  sosyal: {
    from: "#1f1f22",
    to: "#0f0f0f",
    glow: "rgba(242,242,242,0.20)",
    label: "Sosyal Medya",
  },
  branding: {
    from: "#2c2317",
    to: "#111010",
    glow: "rgba(185,159,120,0.38)",
    label: "Branding",
  },
  web: {
    from: "#16202a",
    to: "#0f0f0f",
    glow: "rgba(160,190,215,0.22)",
    label: "Web",
  },
};

export function ProjectVisual({
  category,
  index,
}: {
  category: ProjectCategory;
  index: string;
}) {
  const { from, to, glow, label } = palettes[category];

  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(150deg, ${from} 0%, ${to} 72%)` }}
      aria-hidden="true"
    >
      {/* Yumuşak ışık kaynağı — stüdyo ışığı hissi */}
      <div
        className="animate-drift absolute -top-1/4 -right-1/5 h-[110%] w-[85%] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${glow} 0%, transparent 68%)`,
        }}
      />

      {/* Diyagonal ışık şeridi */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(115deg, transparent 38%, rgba(242,242,242,0.07) 47%, transparent 56%)",
        }}
      />

      {/* Kadraj ızgarası */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,242,242,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(242,242,242,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(circle at 60% 35%, #000 10%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at 60% 35%, #000 10%, transparent 72%)",
        }}
      />

      {/* Köşe kadraj işaretleri */}
      <span className="border-bone/20 absolute top-5 left-5 h-5 w-5 border-t border-l" />
      <span className="border-bone/20 absolute right-5 bottom-20 h-5 w-5 border-r border-b" />

      {/* Kategori etiketi */}
      <span className="text-bone/45 absolute top-5 right-5 text-[0.6rem] tracking-[0.24em] uppercase">
        {label}
      </span>

      {/* Filigran indeks */}
      <span className="font-display text-bone/[0.10] absolute bottom-8 left-6 text-[6.5rem] leading-none font-semibold select-none">
        {index}
      </span>
    </div>
  );
}
