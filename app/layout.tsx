import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

/* Marka kimliğindeki fontlar: başlıklarda Sora, gövdede Inter */
const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Dijital Tasarım, İçerik ve Strateji Ajansı`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "dijital ajans",
    "sosyal medya yönetimi",
    "içerik üretimi",
    "video prodüksiyon",
    "reels çekimi",
    "marka kimliği",
    "web tasarım",
    "İstanbul ajans",
    "Umut Creative",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.taglineTr}`,
    description: site.description,
    images: [
      {
        url: "/brand/umut-logo.png",
        width: 1024,
        height: 1024,
        alt: `${site.legalName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.taglineTr}`,
    description: site.description,
    images: ["/brand/umut-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/umut-logo-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/brand/umut-logo-512.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Google için yapılandırılmış veri (yerel işletme + hizmetler) */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/brand/umut-logo.png`,
  logo: `${site.url}/brand/umut-logo.png`,
  email: site.email,
  telephone: site.phoneRaw,
  slogan: site.tagline,
  priceRange: "₺₺",
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.district,
    addressRegion: site.address.city,
    addressCountry: "TR",
  },
  areaServed: { "@type": "Country", name: "Türkiye" },
  sameAs: [site.socials.instagram, site.socials.youtube, site.socials.linkedin],
  makesOffer: [
    "Sosyal Medya Yönetimi",
    "İçerik Üretimi",
    "Video Prodüksiyon",
    "Marka Kimliği Tasarımı",
    "Web Tasarım",
    "Dijital Pazarlama",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sora.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
