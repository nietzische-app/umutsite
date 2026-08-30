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

- **Vercel** — repoyu bağlayın; build ayarları `vercel.json` ile sabitlenmiştir
  (aşağıya bakın)
- **Netlify** — build komutu `npm run build`, publish dizini `out`
- **GitHub Pages** — `out/` klasörünü `gh-pages` dalına gönderin
- **cPanel / FTP** — `out/` içindekileri `public_html`'e kopyalayın

### Vercel notu

Proje kökündeki [`vercel.json`](vercel.json) build ayarlarını depoya sabitler:

```json
{ "framework": null, "buildCommand": "npm run build", "outputDirectory": "out" }
```

Bu dosya **Vercel panelindeki proje ayarlarını geçersiz kılar**. Repo ilk kez
Vercel'e bağlandığında içinde henüz uygulama yoksa, Vercel "Framework: Other"
ve boş bir çıktı dizini kaydeder; sonradan uygulama eklense bile bu ayar
kendiliğinden düzelmez ve site kökü `404: NOT_FOUND` döner. `vercel.json`
tam olarak bu durumu önler.

Site tamamen statik export olduğu için `framework` bilerek `null` bırakılmıştır;
sunucu tarafı özellik (API route, ISR, middleware) eklenirse hem
`next.config.ts` içindeki `output: "export"` hem de buradaki
`framework` / `outputDirectory` satırları kaldırılmalıdır.

> Sunucu tarafı bir özellik (API route, ISR) eklerseniz `next.config.ts` içindeki
> `output: "export"` satırını kaldırın.

---

## Görsel dil

- **Renk süzülmeleri (Aurora).** Sayfanın tamamının arkasında, `fixed` bir
  katmanda dört adet radyal gradyan `mix-blend-screen` ile birbirine karışarak
  yavaşça salınır ([`components/ui/Aurora.tsx`](components/ui/Aurora.tsx)).
  Bulanıklık filtresi yerine yumuşak duraklı gradyanlar kullanılır: aynı görüntü,
  çok daha düşük GPU maliyeti.
- **Hero arka plan videosu.** Markanın kendi çekimi güçlü bulanıklık ve koyu
  katman altında organik bir renk akışına dönüşür
  ([`components/ui/HeroVideoBackdrop.tsx`](components/ui/HeroVideoBackdrop.tsx)).
  `lib/content.ts` → `hero.backgroundVideo` ile değiştirilir; boş bırakılırsa
  yalnızca Aurora kalır.
- **Açık bölüm.** "Süreç" bölümü bilinçli olarak `#F2F2F2` zemindedir. Sayfa
  boyunca süren koyu ritmi kırar; kimlik kitinde de koyu ve açık kompozisyonlar
  birlikte kullanılıyor. Sabit başlık bu yüzden yeterince opaktır (`header-glass`),
  altından açık bölüm geçerken de beyaz metin okunur kalır.

---

## İçeriği düzenleme

Sitedeki **tüm metinler tek dosyadadır**: [`lib/content.ts`](lib/content.ts).
Bileşenlere dokunmadan hizmet, proje, yorum ve iletişim bilgilerini değiştirebilirsiniz.

### ⚠️ Yayına almadan önce mutlaka değiştirin

`lib/content.ts` → `site` nesnesi:

| Alan | Durum |
| --- | --- |
| `email` — `umutcreativestudio@gmail.com` | ✅ gerçek |
| `phoneDisplay` / `phoneRaw` — `+90 537 431 49 91` | ✅ gerçek |
| `socials.instagram` — `instagram.com/umutcreativestudio` | ✅ gerçek |
| `url` — `https://umutcreativestudio.com` | ⚠️ **alan adınızla değiştirin** (canonical + sitemap için kritik) |
| `address` / `mapsQuery` — Kadıköy, İstanbul | ⚠️ gerçek adresle değiştirin |
| `socials.youtube` / `linkedin` / `behance` | ⚠️ boş şablon linkler |

Ayrıca:

- **`about.stats`** — "120+ proje", "45+ marka", "380K erişim", "6 yıl deneyim"
  rakamları **örnektir**. Doğrulanmamış iş sonuçlarını sitede yayınlamak hem
  güven hem de yanıltıcı ticari uygulama açısından risklidir; gerçek
  rakamlarla değiştirin ya da bu alanı kaldırın.
- **`testimonials`** — örnek yorumlardır. Gerçek müşteri geri bildirimleriyle (ve izinleriyle) değiştirin.
- **`clientLogos`** — sektör etiketleri yazılıdır; gerçek marka adlarıyla değiştirin.
- **`projects`** — proje metinleri örnektir; gerçek iş sonuçlarınızı yazın.
- **`featuredPackage`** — kampanya fiyatı marka görselinden alınmıştır, güncelliğini kontrol edin.

### Portföy görselleri

Projeler şu an marka paletinden türeyen soyut kapak görselleriyle geliyor (ek dosya boyutu yok).
Gerçek fotoğrafları eklemek için:

1. Görselleri `public/portfolio/` klasörüne koyun (önerilen oran **4:5**, ör. 1200×1500).
2. `lib/content.ts` içindeki ilgili projeye `image: "/portfolio/dosya-adi.jpg"` satırını ekleyin.

### Vitrin şeridi (akan medya)

Ana sayfadaki **Vitrin** bölümü, `public/showreel/` klasöründeki gerçek video ve
görselleri dikişsiz akan bir şeritte gösterir.

- Videolar **sessizdir** (`muted`), döngüseldir ve **yalnızca şerit ekranda
  görünürken** oynar; bölümden çıkınca veya sekme arka plana alınınca durur.
- Şeridin üzerine gelindiğinde akış durur.
- `prefers-reduced-motion` açıksa hem akış hem otomatik oynatma devre dışı kalır.

Yeni içerik eklemek için dosyayı `public/showreel/` içine koyun ve
`lib/content.ts` → `showreel` dizisine bir satır ekleyin:

```ts
{ type: "video", src: "/showreel/reel-04.mp4", label: "Etiket", ratio: "9/16" },
{ type: "image", src: "/showreel/post-05.jpg", label: "Etiket", ratio: "1/1"  },
```

Her videonun `public/showreel/posters/` altında bir **duran karesi** vardır.
Bu kare video yüklenene kadar (ve otomatik oynatmanın engellendiği
durumlarda) gösterilir; böylece hiçbir kart boş görünmez. Yeni video
eklerken posterini de üretin:

```bash
ffmpeg -ss 4 -i public/showreel/reel-04.mp4 -frames:v 1 -q:v 2 \
  public/showreel/posters/reel-04.jpg
```

> **Performans:** videolar 540×960 / CRF 30 ile yeniden kodlandı ve ses
> kanalı çıkarıldı (sitede zaten sessiz oynuyorlar). Toplam ~6 MB'tan
> ~3,5 MB'a indi. Yeni video eklerken aynı ayarı kullanın:
> `ffmpeg -i girdi.mp4 -an -vf scale=540:-2 -c:v libx264 -crf 30 -preset slow -movflags +faststart cikti.mp4`

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
  sections/         # Header, Hero, About, Services, Portfolio, Showreel,
                    # Process, Package, Testimonials, Contact, Footer,
                    # WhatsAppButton
  ui/               # Reveal, Counter, Marquee, SectionHeading,
                    # ProjectVisual, MapEmbed, Logo

lib/content.ts      # ⭐ tüm site içeriği
public/brand/       # logo (PNG) + favicon
public/showreel/    # vitrin şeridindeki videolar ve görseller
brand-assets/       # orijinal kurumsal kimlik görselleri (referans)
```

---

## Erişilebilirlik & performans notları

- Tüm animasyonlar `prefers-reduced-motion` ayarına saygı duyar.
- Klavye ile gezinti için "İçeriğe geç" bağlantısı ve görünür odak halkaları vardır.
- Google Maps yalnızca kullanıcı tıkladığında yüklenir (performans + KVKK).
- Vitrin videoları sessizdir ve ekran dışındayken durdurulur.
- Fontlar `next/font` ile self-host edilir; harici font isteği yapılmaz.
