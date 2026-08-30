# Umut Creative — Kurumsal Web Sitesi

**Umut Creative Studio** için geliştirilmiş, koyu temalı, tek sayfalık (SPA) kurumsal ajans sitesi.
Marka kimliği (`brand-assets/`) baz alınmıştır: `#0D0D0D` zemin, `#DCC5A1` şampanya vurgu, Sora + Inter tipografi.

---

## Teknoloji

| Katman | Seçim |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Stil | Tailwind CSS v4 (CSS-first `@theme` token'ları) |
| Animasyon | Framer Motion 12 |
| İkonlar | lucide-react |
| Form | Formspree (statik) — WhatsApp yedeği ile |
| Çıktı | **Statik export** (`out/`) — her yere yüklenir |

Ana sayfa toplam **~168 kB** ilk yükleme JS'i ile geliyor; tüm içerik sunucuda önceden render ediliyor (SEO).

---

## Kurulum

```bash
npm install
cp .env.example .env.local   # opsiyonel: form endpoint'i
npm run dev                  # http://localhost:3000
```

## Yayına alma

```bash
npm run build     # out/ klasörünü üretir
npm run serve:out # out/ klasörünü lokalde test eder
```

`out/` klasörünü olduğu gibi yükleyebileceğiniz yerler:

- **Vercel / Netlify** — repoyu bağlayın, ayar gerekmez
- **GitHub Pages** — `out/` klasörünü `gh-pages` dalına gönderin
- **cPanel / FTP** — `out/` içindekileri `public_html`'e kopyalayın

> Sunucu tarafı bir özellik (API route, ISR) eklerseniz `next.config.ts` içindeki
> `output: "export"` satırını kaldırın.

---

## İçeriği düzenleme

Sitedeki **tüm metinler tek dosyadadır**: [`lib/content.ts`](lib/content.ts).
Bileşenlere dokunmadan hizmet, proje, yorum ve iletişim bilgilerini değiştirebilirsiniz.

### ⚠️ Yayına almadan önce mutlaka değiştirin

`lib/content.ts` → `site` nesnesi:

| Alan | Şu anki değer | Yapılacak |
| --- | --- | --- |
| `url` | `https://umutcreative.com` | Gerçek alan adı (SEO/canonical için kritik) |
| `email` | `merhaba@umutcreative.com` | Gerçek e-posta |
| `phoneDisplay` / `phoneRaw` | örnek numara | Gerçek numara (`phoneRaw` boşluksuz, `+90...`) |
| `address` / `mapsQuery` | Kadıköy, İstanbul | Gerçek adres |
| `socials` | Instagram dışı linkler boş şablon | Gerçek profil linkleri |

Ayrıca:

- **`testimonials`** — örnek yorumlardır. Gerçek müşteri geri bildirimleriyle (ve izinleriyle) değiştirin.
- **`clientLogos`** — sektör etiketleri yazılıdır; gerçek marka adlarıyla değiştirin.
- **`projects`** — proje metinleri örnektir; gerçek iş sonuçlarınızı yazın.
- **`featuredPackage`** — kampanya fiyatı marka görselinden alınmıştır, güncelliğini kontrol edin.

### Portföy görselleri

Projeler şu an marka paletinden türeyen soyut kapak görselleriyle geliyor (ek dosya boyutu yok).
Gerçek fotoğrafları eklemek için:

1. Görselleri `public/portfolio/` klasörüne koyun (önerilen oran **4:5**, ör. 1200×1500).
2. `lib/content.ts` içindeki ilgili projeye `image: "/portfolio/dosya-adi.jpg"` satırını ekleyin.

---

## İletişim formu

Form varsayılan olarak **WhatsApp'a yönlendirir**. E-posta ile almak için:

1. [formspree.io](https://formspree.io) üzerinde ücretsiz bir form açın.
2. `.env.local` dosyasına ekleyin:
   ```
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   ```

Formda gizli bir bot tuzağı (honeypot) alanı bulunur; spam gönderiler sessizce elenir.

---

## Dosya yapısı

```
app/
  layout.tsx        # fontlar, SEO metadata, JSON-LD (ProfessionalService)
  page.tsx          # bölümlerin sırası
  globals.css       # tasarım token'ları (@theme) + yardımcı sınıflar
  sitemap.ts        # /sitemap.xml
  robots.ts         # /robots.txt
  not-found.tsx     # 404

components/
  sections/         # Header, Hero, About, Services, Portfolio, Process,
                    # Package, Testimonials, Contact, Footer, WhatsAppButton
  ui/               # Reveal, Counter, Marquee, SectionHeading,
                    # ProjectVisual, MapEmbed, Logo

lib/content.ts      # ⭐ tüm site içeriği
public/brand/       # logo (PNG) + favicon
brand-assets/       # orijinal kurumsal kimlik görselleri (referans)
```

---

## Erişilebilirlik & performans notları

- Tüm animasyonlar `prefers-reduced-motion` ayarına saygı duyar.
- Klavye ile gezinti için "İçeriğe geç" bağlantısı ve görünür odak halkaları vardır.
- Google Maps yalnızca kullanıcı tıkladığında yüklenir (performans + KVKK).
- Fontlar `next/font` ile self-host edilir; harici font isteği yapılmaz.
