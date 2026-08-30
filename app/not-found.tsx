import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Aradığınız sayfa bulunamadı.</h1>
      <p className="text-muted mt-4 max-w-md">
        Bağlantı taşınmış veya kaldırılmış olabilir. Ana sayfadan devam edebilirsiniz.
      </p>
      <Link
        href="/"
        className="bg-sand text-ink hover:bg-sand-soft mt-8 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
      >
        Ana sayfaya dön
      </Link>
    </main>
  );
}
