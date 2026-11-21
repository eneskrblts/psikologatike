export type ArticleStatus = "draft" | "published";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: ArticleStatus;
  publishedAt: string;
  updatedAt: string;
  /** Markdown gövde */
  content: string;
  /** Opsiyonel kapak görseli (public içindeki yol) */
  cover?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  createdAt: string;
}
