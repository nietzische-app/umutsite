import type { NextConfig } from "next";

/**
 * Statik export: `npm run build` sonrası `out/` klasörü oluşur.
 * Vercel, Netlify, GitHub Pages veya klasik cPanel/FTP hostinge doğrudan atılabilir.
 * Sunucu tarafı gerektiren bir özellik eklenirse (API route, ISR) `output` satırını kaldırın.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
