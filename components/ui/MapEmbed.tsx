"use client";

import { useState } from "react";
import { MapPin, Play } from "lucide-react";
import { site } from "@/lib/content";

/**
 * Google Maps'i yalnızca kullanıcı istediğinde yükler.
 * Böylece sayfa açılışında üçüncü taraf istek yapılmaz (performans + KVKK)
 * ve harita yüklenemediğinde beyaz bir kutu görünmez.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`${site.name} konum haritası`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=14&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 grayscale-100 contrast-125 transition-all duration-700 hover:grayscale-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group bg-surface/50 absolute inset-0 flex flex-col items-center justify-center gap-4 transition-colors duration-300"
      aria-label="Google Haritalar'ı yükle"
    >
      {/* Soyut şehir ızgarası */}
      <span
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,242,242,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(242,242,242,0.7) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(circle at 50% 50%, #000 15%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, #000 15%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <span className="border-sand/40 bg-ink text-sand relative inline-flex h-12 w-12 items-center justify-center rounded-full border">
        <MapPin size={18} />
      </span>

      <span className="relative text-center">
        <span className="text-bone block text-sm font-medium">
          {site.address.full}
        </span>
        <span className="text-muted-2 group-hover:text-sand mt-1.5 inline-flex items-center gap-1.5 text-xs transition-colors">
          <Play size={10} className="fill-current" />
          Haritayı göster
        </span>
      </span>
    </button>
  );
}
