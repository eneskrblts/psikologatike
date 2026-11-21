import type { Article } from "./types";

/** Kategoriye göre kapak görseli (public/images içindeki dosyalar) */
const CATEGORY_COVERS: Record<string, string> = {
  Kaygı: "/images/kategori-kaygi.jpg",
  Depresyon: "/images/kategori-depresyon.jpg",
  İlişkiler: "/images/kategori-iliskiler.jpg",
  "Çocuk & Ergen": "/images/kategori-cocuk.jpg",
  "Öz Bakım": "/images/kategori-ozbakim.jpg",
  "Terapi Notları": "/images/kategori-notlar.jpg",
  Genel: "/images/kategori-notlar.jpg",
};

/** Kategori tanınmadığında sırayla kullanılan yedek görseller */
const FALLBACK_COVERS = [
  "/images/kategori-notlar.jpg",
  "/images/kategori-kaygi.jpg",
  "/images/kategori-iliskiler.jpg",
  "/images/kategori-ozbakim.jpg",
  "/images/kategori-cocuk.jpg",
];

/** Makale için kapak görseli döndürür. `article.cover` varsa onu kullanır. */
export function articleCover(article: Article, index = 0): string {
  if (article.cover) return article.cover;
  const byCategory = CATEGORY_COVERS[article.category];
  if (byCategory) return byCategory;
  return FALLBACK_COVERS[index % FALLBACK_COVERS.length];
}

/** Statik sayfa görselleri */
export const images = {
  therapyRoom: "/images/terapi-odasi.jpg",
  readingCorner: "/images/calisma-kosesi.jpg",
  officeDetail: "/images/ofis-detay.jpg",
} as const;
