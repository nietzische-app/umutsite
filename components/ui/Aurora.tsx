/**
 * Sayfanın tamamının arkasında yavaşça dalgalanan renk süzülmeleri.
 *
 * Tasarım notu: bulanıklık (`filter: blur`) yerine yumuşak duraklı radyal
 * gradyanlar kullanılıyor — görsel sonuç aynı, ancak GPU maliyeti çok daha
 * düşük ve mobilde takılma yapmıyor. Katmanlar yalnızca `transform` ile
 * hareket ettiği için her kare compositor'da kalıyor.
 *
 * Katmanlar `mix-blend-screen` ile birleşir: üst üste geldiklerinde renkler
 * birbirini soğurmak yerine aydınlanır, böylece gerçek bir ışık karışımı hissi
 * oluşur.
 *
 * Hareket hassasiyeti olan kullanıcılarda animasyon durur (globals.css),
 * gradyanlar sabit bir kompozisyon olarak kalır.
 */
export function Aurora() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="bg-ink absolute inset-0" />

      <div className="absolute inset-0 mix-blend-screen">
        {/* Şampanya ana süzülme — sol üstten sağa salınır */}
        <div
          className="animate-aurora-a absolute top-[-30%] left-[-20%] h-[100vh] w-[100vh] rounded-full opacity-90"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(220,197,161,0.55) 0%, rgba(212,180,133,0.24) 32%, transparent 64%)",
          }}
        />

        {/* Derin altın — sağ üst, ters yönde */}
        <div
          className="animate-aurora-b absolute top-[-10%] right-[-25%] h-[92vh] w-[92vh] rounded-full opacity-85"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(198,152,92,0.50) 0%, rgba(185,159,120,0.20) 36%, transparent 66%)",
          }}
        />

        {/* Soğuk karşıt ton — kompozisyonun tek renge düşmesini engeller */}
        <div
          className="animate-aurora-c absolute bottom-[-25%] left-[10%] h-[88vh] w-[88vh] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(96,138,178,0.42) 0%, rgba(120,150,180,0.16) 38%, transparent 68%)",
          }}
        />

        {/* Sıcak vurgu — sayfanın alt yarısını canlandırır */}
        <div
          className="animate-aurora-d absolute right-[5%] bottom-[-35%] h-[85vh] w-[85vh] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(236,204,158,0.44) 0%, rgba(232,216,189,0.16) 34%, transparent 66%)",
          }}
        />
      </div>

      {/* Kenarları koyulaştıran vinyet — metin kontrastını korur */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 90% at 50% 42%, transparent 42%, rgba(13,13,13,0.42) 100%)",
        }}
      />

      {/* İnce film greni — dijital gradyan bantlaşmasını kırar */}
      <div className="grain-layer absolute inset-0 opacity-[0.06]" />
    </div>
  );
}
