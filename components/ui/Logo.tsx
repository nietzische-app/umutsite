import Link from "next/link";

/**
 * Marka kimliğindeki yatay logo versiyonu (wordmark).
 * Dairesel rozet versiyonu favicon ve OG görselinde kullanılır.
 */
export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="#top"
      aria-label="Umut Creative — ana sayfa"
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span
        className="font-display text-bone text-[1.35rem] font-semibold tracking-[0.16em] transition-colors duration-300 group-hover:text-sand sm:text-2xl"
        style={{ fontFeatureSettings: '"ss01"' }}
      >
        UMUT
      </span>
      {!compact && (
        <span className="text-sand mt-[3px] text-[0.5rem] font-medium tracking-[0.42em] sm:text-[0.55rem]">
          CREATIVE STUDIO
        </span>
      )}
    </Link>
  );
}
