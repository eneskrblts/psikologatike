import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin-ext", "latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin-ext", "latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Psikolog ve Aile Danışmanı Atike Nur Karabulut — bireysel terapi, çift ve aile görüşmeleri, online psikolojik destek. Kadıköy'de yüz yüze, her yerde online görüşme.",
  keywords: [
    "psikolog",
    "aile danışmanı",
    "istanbul psikolog",
    "kadıköy psikolog",
    "online terapi",
    "aile danışmanlığı",
    "kaygı tedavisi",
    "çift terapisi",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.baseUrl,
    siteName: site.name,
    title: `${site.name} · ${site.role}`,
    description:
      "Bilimsel temelli, yargısız ve güvenli bir alanda psikolojik destek. Yüz yüze ve online görüşme.",
    images: [
      {
        url: "/images/terapi-odasi.jpg",
        width: 1400,
        height: 1750,
        alt: "Terapi odası",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.role}`,
    description:
      "Bilimsel temelli, yargısız ve güvenli bir alanda psikolojik destek. Yüz yüze ve online görüşme.",
    images: ["/images/terapi-odasi.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
