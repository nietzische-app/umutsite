/**
 * =====================================================================
 *  UMUT CREATIVE — Site İçeriği (Tek Kaynak)
 * ---------------------------------------------------------------------
 *  Sitedeki tüm metinler, hizmetler, projeler ve iletişim bilgileri
 *  bu dosyadan yönetilir. Bileşenlere dokunmadan içerik güncelleyebilirsiniz.
 *
 *  ⚠️  YAYINA ALMADAN ÖNCE: `site.url` (alan adı), `site.address` ve
 *      `site.socials` içindeki Instagram dışı linkler hâlâ örnek değerlerdir.
 * =====================================================================
 */

export const site = {
  name: "Umut Creative",
  legalName: "Umut Creative Studio",
  tagline: "We create what people remember.",
  taglineTr: "Fikirden içeriğe, kusursuz deneyim.",
  description:
    "Umut Creative Studio; markalar için sosyal medya yönetimi, içerik üretimi, video prodüksiyon ve tasarım hizmetleri sunan İstanbul merkezli yaratıcı stüdyodur.",

  // ⚠️ `url` alanını gerçek alan adıyla değiştirin (canonical + sitemap için)
  url: "https://umutcreativestudio.com",
  email: "umutcreativestudio@gmail.com",
  phoneDisplay: "+90 537 431 49 91",
  phoneRaw: "+905374314991", // tel: ve WhatsApp linkleri için, boşluksuz
  address: {
    district: "Kadıköy",
    city: "İstanbul",
    country: "Türkiye",
    full: "Kadıköy, İstanbul / Türkiye",
  },
  hours: "Pazartesi – Cumartesi · 09:00 – 19:00",

  instagramHandle: "@umutcreativestudio",

  socials: {
    instagram: "https://www.instagram.com/umutcreativestudio/",
    behance: "https://behance.net/",
    youtube: "https://youtube.com/",
    linkedin: "https://linkedin.com/",
  },

  /**
   * İletişim formu gönderim adresi.
   * Formspree'den ücretsiz bir form açıp ID'yi .env.local içine yazın:
   *   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   * Boş bırakılırsa form, mesajı WhatsApp üzerinden göndermeye yönlendirir.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",

  /** Google Maps embed sorgusu (adresi değiştirmek yeterli) */
  mapsQuery: "Kadıköy, İstanbul",
} as const;

export const nav = [
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Portföy", href: "#portfoy" },
  { label: "Süreç", href: "#surec" },
  { label: "Referanslar", href: "#referanslar" },
  { label: "İletişim", href: "#iletisim" },
] as const;

/* --------------------------------------------------------------------- */
/*  HERO                                                                  */
/* --------------------------------------------------------------------- */
export const hero = {
  eyebrow: "İstanbul · Yaratıcı Stüdyo",
  /** Satır satır giriş animasyonu için parçalanmış başlık */
  headline: [
    { text: "Markanızı", accent: false },
    { text: "birlikte", accent: false },
    { text: "büyütelim.", accent: true },
  ],
  sub: "Tasarım + İçerik + Strateji. Markanızın dijitaldeki en iyi versiyonunu kurgular, üretir ve büyütürüz.",
  /** Hero altındaki dönen kelime */
  rotating: ["içerik üretimi", "video prodüksiyon", "sosyal medya", "marka tasarımı"],
  primaryCta: { label: "Projelerimizi İnceleyin", href: "#portfoy" },
  secondaryCta: { label: "İletişime Geçin", href: "#iletisim" },

  /**
   * Hero'nun arkasında dönen tam ekran video.
   * Güçlü bulanıklık ve koyu katman altında, kendi çekiminizden türeyen
   * organik bir renk akışına dönüşür. Başka bir çekimle değiştirmek için
   * `public/showreel/` içindeki dosyalardan birinin yolunu yazın;
   * boş bırakılırsa yalnızca CSS renk süzülmeleri (Aurora) kalır.
   */
  backgroundVideo: "/showreel/reel-01.mp4",
};

/* --------------------------------------------------------------------- */
/*  HAKKIMIZDA + İSTATİSTİKLER                                            */
/* --------------------------------------------------------------------- */
export const about = {
  eyebrow: "Hakkımızda",
  title: "Yeni fikirler. Yeni içerikler. Yeni sonuçlar.",
  paragraphs: [
    "Umut Creative Studio, markaların dijitalde sadece görünmesini değil — hatırlanmasını hedefleyen bir yaratıcı stüdyodur. Her işe stratejiyle başlar, üretimi kendi ekibimizle yapar, sonucu veriyle ölçeriz.",
    "Profesyonel çekim ekipmanı, kurgu ve tasarım altyapımızla; kafe ve restoranlardan butiklere, kişisel markalardan kurumsal şirketlere kadar geniş bir yelpazede içerik üretiyoruz.",
  ],
  quote: "İyi içerik tesadüf değil, stratejinin sonucudur.",
  pillars: [
    { title: "Strateji Önce", desc: "Her içerik bir hedefe hizmet eder; estetik tek başına yeterli değildir." },
    { title: "Uçtan Uca Üretim", desc: "Çekimden kurguya, tasarımdan yayına kadar tek elden ilerleriz." },
    { title: "Ölçülebilir Sonuç", desc: "Etkileşim, erişim ve dönüşümü raporlar, kurguyu buna göre güncelleriz." },
  ],
  /**
   * ⚠️ ÖRNEK DEĞERLERDİR — gerçek rakamlarla değiştirin.
   * Doğrulanmamış iş sonuçlarını sitede yayınlamak hem güven hem de
   * tüketiciyi yanıltıcı ticari uygulama açısından risklidir.
   */
  stats: [
    { value: 120, suffix: "+", label: "Tamamlanan Proje" },
    { value: 45, suffix: "+", label: "Mutlu Marka" },
    { value: 380, suffix: "K", label: "Üretilen İçerik Erişimi" },
    { value: 6, suffix: " Yıl", label: "Sektör Deneyimi" },
  ],
};

/* --------------------------------------------------------------------- */
/*  HİZMETLER                                                             */
/* --------------------------------------------------------------------- */
export type Service = {
  id: string;
  title: string;
  desc: string;
  icon: "share" | "code" | "trending" | "palette" | "video" | "camera";
  items: string[];
};

export const services: Service[] = [
  {
    id: "sosyal-medya",
    title: "Sosyal Medya Yönetimi",
    desc: "Markanızın dijitaldeki sesini kurgular, düzenli ve stratejik içerik akışıyla topluluğunuzu büyütürüz.",
    icon: "share",
    items: ["İçerik takvimi", "Topluluk yönetimi", "Aylık performans raporu"],
  },
  {
    id: "icerik-uretimi",
    title: "İçerik Üretimi & Reels",
    desc: "Akışta duraksatan, izlendiğinde hatırlanan kısa form videolar ve post serileri üretiriz.",
    icon: "video",
    items: ["Reels & TikTok kurgu", "Senaryo ve storyboard", "Yapay zekâ destekli üretim"],
  },
  {
    id: "video-fotograf",
    title: "Video Prodüksiyon & Fotoğraf",
    desc: "Profesyonel ekipman ve ışıkla mekân, ürün ve marka çekimleri; tanıtım filmleri.",
    icon: "camera",
    items: ["Mekân & ürün çekimi", "Tanıtım / reklam filmi", "Renk düzenleme (grading)"],
  },
  {
    id: "marka-kimligi",
    title: "Marka Kimliği & Grafik Tasarım",
    desc: "Logodan tipografiye, sosyal medya şablonlarından basılı materyale kadar tutarlı bir görsel dil.",
    icon: "palette",
    items: ["Logo & kimlik kiti", "Post / story şablonları", "Katalog ve menü tasarımı"],
  },
  {
    id: "web-tasarim",
    title: "Web Tasarım & Yazılım",
    desc: "Hızlı, mobil uyumlu ve SEO uyumlu kurumsal siteler ile e-ticaret altyapıları geliştiririz.",
    icon: "code",
    items: ["Kurumsal web sitesi", "E-ticaret & landing page", "Teknik SEO kurulumu"],
  },
  {
    id: "dijital-pazarlama",
    title: "Dijital Pazarlama & Reklam",
    desc: "Meta ve Google reklamlarını doğru hedef kitleye kurgular, bütçenizi sonuca çeviririz.",
    icon: "trending",
    items: ["Meta & Google Ads", "Hedef kitle kurgusu", "Dönüşüm takibi"],
  },
];

/* --------------------------------------------------------------------- */
/*  PORTFÖY                                                               */
/* --------------------------------------------------------------------- */
export const portfolioFilters = [
  { id: "all", label: "Tümü" },
  { id: "video", label: "Video" },
  { id: "sosyal", label: "Sosyal Medya" },
  { id: "branding", label: "Branding" },
  { id: "web", label: "Web" },
] as const;

export type ProjectCategory = Exclude<
  (typeof portfolioFilters)[number]["id"],
  "all"
>;

export type Project = {
  index: string;
  title: string;
  client: string;
  category: ProjectCategory;
  tags: string[];
  result: string;
  /**
   * Kartın kapak medyası. Video kapaklar masaüstünde fareyle üzerine
   * gelindiğinde sessizce oynar, mobilde kart ekranın ortasına geldiğinde.
   * `poster` videodan çıkarılmış duran karedir; video oynamadan önce ve
   * otomatik oynatmanın engellendiği durumlarda kart asla boş kalmaz.
   * Medya verilmezse marka paletinden türeyen soyut bir kapak kullanılır.
   */
  media?: { type: "image" | "video"; src: string; poster?: string };
};

/**
 * Kapak medyaları `public/showreel/` ve `public/portfolio/` altındaki
 * gerçek dosyalardır. Yeni bir proje eklerken dosyayı bu klasörlerden
 * birine koyup `media` alanını doldurun.
 */
export const projects: Project[] = [
  {
    index: "01",
    title: "Mutfak & Şef Çekimi",
    client: "Restoran / Mangal",
    category: "video",
    tags: ["Mekân çekimi", "Reels", "Renk düzenleme"],
    result: "Mutfaktaki üretim sürecini markanın hikâyesine dönüştüren içerik serisi",
    media: {
      type: "video",
      src: "/showreel/reel-01.mp4",
      poster: "/showreel/posters/reel-01.jpg",
    },
  },
  {
    index: "02",
    title: "Ürün & Menü Fotoğrafçılığı",
    client: "Burger Restoranı",
    category: "video",
    tags: ["Ürün çekimi", "Işık kurulumu", "Food styling"],
    result: "Menüdeki her ürün için yayına hazır görsel ve kısa video seti",
    media: {
      type: "video",
      src: "/showreel/reel-02.mp4",
      poster: "/showreel/posters/reel-02.jpg",
    },
  },
  {
    index: "03",
    title: "Marka Tanıtım Filmi",
    client: "Umut Creative Studio",
    category: "video",
    tags: ["Tanıtım filmi", "Kurgu", "Seslendirme"],
    result: "Stüdyonun kendi hizmet yelpazesini anlatan tanıtım filmi",
    media: {
      type: "video",
      src: "/showreel/reel-03.mp4",
      poster: "/showreel/posters/reel-03.jpg",
    },
  },
  {
    index: "04",
    title: "Kampanya Görseli & Paket Tasarımı",
    client: "Umut Creative Studio",
    category: "sosyal",
    tags: ["Kampanya kurgusu", "Post tasarımı"],
    result: "Başlangıç paketini tek görselde anlatan kampanya iletişimi",
    media: { type: "image", src: "/showreel/post-01.jpg" },
  },
  {
    index: "05",
    title: "Hizmet Tanıtım Görseli",
    client: "Umut Creative Studio",
    category: "sosyal",
    tags: ["Post tasarımı", "İkonografi", "Yerleşim"],
    result: "Hizmetleri tek bakışta okunur kılan görsel düzen",
    media: { type: "image", src: "/showreel/post-02.jpg" },
  },
  {
    index: "06",
    title: "Marka Kimliği Kiti",
    client: "Umut Creative Studio",
    category: "branding",
    tags: ["Renk paleti", "Tipografi", "Logo versiyonları"],
    result: "Renk, tipografi ve logo kullanımını tek dokümanda toplayan kimlik seti",
    media: { type: "image", src: "/showreel/post-03.jpg" },
  },
  {
    index: "07",
    title: "Kurumsal Web Sitesi",
    client: "Umut Creative Studio",
    category: "web",
    tags: ["Next.js", "Teknik SEO", "Mobil uyum"],
    result: "Tamamı statik üretilen, mobil öncelikli kurumsal site",
    media: { type: "image", src: "/portfolio/web-umutcreative.jpg" },
  },
];

/* --------------------------------------------------------------------- */
/*  VİTRİN (Akan medya şeridi)                                            */
/* --------------------------------------------------------------------- */

/**
 * Ana sayfadaki akan şeritte gösterilen gerçek işler.
 * Videolar **sessiz** oynar ve yalnızca şerit ekranda görünürken çalışır.
 *
 * Yeni içerik eklemek için: dosyayı `public/showreel/` klasörüne koyun ve
 * aşağıya bir satır ekleyin. `ratio` kartın en-boy oranıdır
 * (dikey Reels için "9/16", kare gönderi için "1/1").
 */
export type ShowreelItem = {
  type: "video" | "image";
  src: string;
  /** Video için duran kare — yükleme sırasında kart boş kalmaz */
  poster?: string;
  label: string;
  ratio: string;
};

export const showreel: ShowreelItem[] = [
  { type: "video", src: "/showreel/reel-01.mp4", poster: "/showreel/posters/reel-01.jpg", label: "Mutfak Çekimi", ratio: "9/16" },
  { type: "image", src: "/showreel/post-01.jpg", label: "Kampanya Tasarımı", ratio: "1/1" },
  { type: "video", src: "/showreel/reel-02.mp4", poster: "/showreel/posters/reel-02.jpg", label: "Ürün Fotoğrafçılığı", ratio: "9/16" },
  { type: "image", src: "/showreel/post-02.jpg", label: "Hizmet Görseli", ratio: "1/1" },
  { type: "video", src: "/showreel/reel-03.mp4", poster: "/showreel/posters/reel-03.jpg", label: "Tanıtım Filmi", ratio: "9/16" },
  { type: "image", src: "/showreel/post-03.jpg", label: "Marka Kimliği", ratio: "1/1" },
];

/* --------------------------------------------------------------------- */
/*  SÜREÇ                                                                 */
/* --------------------------------------------------------------------- */
export const processSteps = [
  {
    step: "01",
    title: "Keşif & Strateji",
    desc: "Markanızı, rakiplerinizi ve hedef kitlenizi analiz eder; içerik yönünü birlikte belirleriz.",
  },
  {
    step: "02",
    title: "Konsept & Senaryo",
    desc: "Görsel dili, çekim planını ve içerik takvimini onayınıza sunarız.",
  },
  {
    step: "03",
    title: "Üretim",
    desc: "Çekim, kurgu ve tasarım aşamalarını kendi ekibimizle uçtan uca yürütürüz.",
  },
  {
    step: "04",
    title: "Yayın & Optimizasyon",
    desc: "İçerikleri yayınlar, performansı raporlar ve bir sonraki döngüyü veriye göre kurgularız.",
  },
];

/* --------------------------------------------------------------------- */
/*  PAKET / KAMPANYA                                                      */
/* --------------------------------------------------------------------- */
export const featuredPackage = {
  eyebrow: "Başlangıç Paketi",
  title: "Markanızı Birlikte Büyütelim",
  desc: "Dijitale hızlı ve güçlü bir giriş yapmak isteyen markalar için hazırlanmış tanıtım paketi.",
  includes: [
    { count: "10", label: "Instagram post tasarımı" },
    { count: "1", label: "Yapay zekâ videosu" },
    { count: "1", label: "Tanıtım / reklam videosu" },
  ],
  priceOld: "25.000 TL",
  priceNew: "10.000 TL",
  note: "Fiyatlar KDV hariçtir ve kampanya süresiyle sınırlıdır.",
  cta: { label: "Paketi Talep Et", href: "#iletisim" },
};

/* --------------------------------------------------------------------- */
/*  REFERANSLAR                                                           */
/* --------------------------------------------------------------------- */

/** Akan bantta gösterilen sektör/marka etiketleri. Gerçek marka adlarıyla değiştirin. */
export const clientLogos = [
  "KAHVE & CO",
  "STÜDYO BERBER",
  "ATÖLYE BUTİK",
  "LEZZET DURAĞI",
  "FORM FITNESS",
  "MİMARİ OFİS",
  "DENTAL KLİNİK",
  "OTO GALERİ",
];

/**
 * ⚠️ Örnek yorumlardır. Yayına almadan önce gerçek müşteri
 *    geri bildirimleriyle (ve izinleriyle) değiştirin.
 */
export const testimonials = [
  {
    quote:
      "Çekim gününden teslimata kadar her aşama planlıydı. İçerikler yayınlandıktan sonra sayfamıza gelen ilgi ilk kez ölçülebilir hâle geldi.",
    author: "Kafe İşletmecisi",
    meta: "Kadıköy, İstanbul",
  },
  {
    quote:
      "Reels serisi sayesinde randevu talepleri belirgin şekilde arttı. Ekip ne istediğimizi bizden önce anladı.",
    author: "Erkek Kuaförü Sahibi",
    meta: "Ataşehir, İstanbul",
  },
  {
    quote:
      "Marka kimliğimiz dağınıktı; tek bir görsel dile kavuştuk. Artık her yerde aynı markayı görüyoruz.",
    author: "Restoran Zinciri Müdürü",
    meta: "İstanbul",
  },
  {
    quote:
      "Sadece güzel görsel değil, sonuç odaklı bir yaklaşım. Aylık raporlar bizim için en değerli kısım oldu.",
    author: "E-ticaret Pazarlama Sorumlusu",
    meta: "Türkiye",
  },
];

/* --------------------------------------------------------------------- */
/*  İLETİŞİM FORMU                                                        */
/* --------------------------------------------------------------------- */
export const serviceOptions = [
  "Sosyal Medya Yönetimi",
  "İçerik Üretimi & Reels",
  "Video Prodüksiyon & Fotoğraf",
  "Marka Kimliği & Grafik Tasarım",
  "Web Tasarım & Yazılım",
  "Dijital Pazarlama & Reklam",
  "Diğer / Emin değilim",
];

export const budgetOptions = [
  "10.000 TL altı",
  "10.000 – 25.000 TL",
  "25.000 – 50.000 TL",
  "50.000 TL üzeri",
];
