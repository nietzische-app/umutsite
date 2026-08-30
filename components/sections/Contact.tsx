"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  Clock,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { budgetOptions, serviceOptions, site } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-surface-2 bg-ink/60 px-4 py-3 text-sm text-bone placeholder:text-muted-2 transition-colors duration-300 focus:border-sand focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* Bot tuzağı — gizli alan doluysa sessizce çık */
    if (data.get("website")) return;

    /* Formspree ayarlanmadıysa mesajı WhatsApp üzerinden ilet */
    if (!site.formEndpoint) {
      const text = [
        `Ad Soyad: ${data.get("name")}`,
        `E-posta: ${data.get("email")}`,
        `Telefon: ${data.get("phone") || "-"}`,
        `Hizmet: ${data.get("service")}`,
        `Bütçe: ${data.get("budget") || "-"}`,
        "",
        `${data.get("message")}`,
      ].join("\n");
      window.open(
        `https://wa.me/${site.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer",
      );
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Gönderim başarısız");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(
        "Mesaj gönderilemedi. Lütfen tekrar deneyin veya doğrudan e-posta yazın.",
      );
    }
  }

  const details = [
    {
      icon: Mail,
      label: "E-posta",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: Phone,
      label: "Telefon",
      value: site.phoneDisplay,
      href: `tel:${site.phoneRaw}`,
    },
    {
      icon: MapPin,
      label: "Konum",
      value: site.address.full,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@umut.creative",
      href: site.socials.instagram,
    },
    { icon: Clock, label: "Çalışma Saatleri", value: site.hours },
  ];

  return (
    <section
      id="iletisim"
      className="bg-ink-2 relative scroll-mt-24 border-t border-white/5 py-24 sm:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="İletişim"
          title="Projenizi konuşalım,"
          accent="teklifinizi hazırlayalım."
          description="Formu doldurun, 1 iş günü içinde size özel bir teklifle dönelim. Dilerseniz doğrudan arayabilir ya da Instagram'dan yazabilirsiniz."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Form ---------- */}
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="border-surface-2 bg-surface/35 rounded-3xl border p-6 sm:p-8"
              noValidate={false}
            >
              {/* Bot tuzağı */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-muted mb-2 block text-xs">
                    Ad Soyad <span className="text-sand">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Adınız ve soyadınız"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-muted mb-2 block text-xs">
                    E-posta <span className="text-sand">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="ornek@sirket.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-muted mb-2 block text-xs">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+90 5xx xxx xx xx"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="text-muted mb-2 block text-xs"
                  >
                    Hizmet <span className="text-sand">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Seçiniz…
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option} className="bg-ink">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-muted mb-2 block text-xs">
                    Tahmini bütçe
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((option) => (
                      <label
                        key={option}
                        className="border-surface-2 text-muted has-checked:border-sand has-checked:bg-sand/10 has-checked:text-sand cursor-pointer rounded-full border px-4 py-2 text-xs transition-colors duration-300"
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={option}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="text-muted mb-2 block text-xs"
                  >
                    Mesajınız <span className="text-sand">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    minLength={10}
                    placeholder="Markanızdan ve ihtiyacınızdan kısaca bahsedin…"
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group bg-sand text-ink hover:bg-sand-soft inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_32px_-8px_rgba(220,197,161,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Gönderiliyor…
                    </>
                  ) : (
                    <>
                      Teklif İste
                      <Send
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>

                <p className="text-muted-2 text-[0.7rem] leading-relaxed">
                  Bilgileriniz yalnızca teklif hazırlamak için kullanılır,
                  üçüncü taraflarla paylaşılmaz.
                </p>
              </div>

              {/* Durum mesajları */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-sand/30 bg-sand/10 text-sand mt-5 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm"
                    role="status"
                  >
                    <Check size={16} strokeWidth={2.5} />
                    Mesajınız alındı. En kısa sürede size dönüş yapacağız.
                  </motion.p>
                )}

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                    role="alert"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/* ---------- İletişim bilgileri + harita ---------- */}
          <Reveal delay={0.12} direction="left" className="lg:col-span-5">
            <div className="flex h-full flex-col gap-5">
              <ul className="border-surface-2 bg-surface/35 divide-surface-2 divide-y rounded-3xl border">
                {details.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <span className="flex items-center gap-4 px-6 py-5">
                      <span className="border-surface-2 bg-ink text-sand inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
                        <Icon size={16} strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0">
                        <span className="text-muted-2 block text-[0.65rem] tracking-[0.18em] uppercase">
                          {label}
                        </span>
                        <span className="text-bone mt-0.5 block truncate text-sm">
                          {value}
                        </span>
                      </span>
                    </span>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="hover:bg-surface/60 block transition-colors duration-300"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Google Maps — tıklandığında yüklenir */}
              <div className="border-surface-2 relative min-h-64 flex-1 overflow-hidden rounded-3xl border">
                <MapEmbed />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
