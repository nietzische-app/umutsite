"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp, Instagram, Linkedin, Youtube } from "lucide-react";
import { nav, services, site } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Bülten servisi (Mailchimp, Brevo vb.) bağlandığında burayı değiştirin.
    setSubscribed(true);
    e.currentTarget.reset();
  }

  const socials = [
    { icon: Instagram, href: site.socials.instagram, label: "Instagram" },
    { icon: Youtube, href: site.socials.youtube, label: "YouTube" },
    { icon: Linkedin, href: site.socials.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="border-surface-2 relative border-t pt-16 pb-8">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Marka */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="text-muted mt-5 max-w-xs text-sm leading-relaxed">
              {site.description}
            </p>
            <p className="font-display text-bone mt-6 text-sm tracking-[0.14em] uppercase">
              We create what people
              <span className="text-sand"> remember.</span>
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-surface-2 text-muted hover:border-sand hover:text-sand inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Hızlı linkler */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-bone text-xs font-semibold tracking-[0.2em] uppercase">
              Menü
            </h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted hover:text-sand text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmetler */}
          <div className="lg:col-span-3">
            <h3 className="text-bone text-xs font-semibold tracking-[0.2em] uppercase">
              Hizmetler
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#hizmetler"
                    className="text-muted hover:text-sand text-sm transition-colors duration-300"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bülten */}
          <div className="lg:col-span-3">
            <h3 className="text-bone text-xs font-semibold tracking-[0.2em] uppercase">
              Bülten
            </h3>
            <p className="text-muted mt-5 text-sm leading-relaxed">
              Aylık içerik fikirleri ve dijital pazarlama ipuçları — spam yok.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5">
              <div className="border-surface-2 bg-ink focus-within:border-sand flex items-center gap-2 rounded-full border p-1.5 transition-colors duration-300">
                <label htmlFor="newsletter" className="sr-only">
                  E-posta adresiniz
                </label>
                <input
                  id="newsletter"
                  type="email"
                  name="email"
                  required
                  placeholder="E-posta adresiniz"
                  className="text-bone placeholder:text-muted-2 min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-sand text-ink hover:bg-sand-soft shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300"
                >
                  Katıl
                </button>
              </div>
            </form>

            {subscribed && (
              <p className="text-sand mt-3 text-xs" role="status">
                Teşekkürler! Kaydınız alındı.
              </p>
            )}
          </div>
        </div>

        {/* Alt bar */}
        <div className="border-surface-2 mt-14 flex flex-col items-center justify-between gap-4 border-t pt-7 sm:flex-row">
          <p className="text-muted-2 text-xs">
            © {year} {site.legalName}. Tüm hakları saklıdır.
          </p>

          <div className="text-muted-2 flex items-center gap-6 text-xs">
            <a href="#iletisim" className="hover:text-sand transition-colors">
              Gizlilik Politikası
            </a>
            <a
              href="#top"
              className="hover:text-sand inline-flex items-center gap-1.5 transition-colors"
            >
              Yukarı <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
