# Atike Nur Karabulut — Psikolog / Aile Danışmanı

Next.js 16 (App Router) + Tailwind v4 ile hazırlanmış, yönetici panelinden makale yayınlanabilen psikolog sitesi.

## Yerelde çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
```

Yerelde veriler `data/articles.json` ve `data/messages.json` dosyalarında tutulur.

Yönetici paneli: **http://localhost:3000/giris**
Varsayılan şifre: `psikolog2026` (yerelde `ADMIN_PASSWORD` ile değiştirilebilir)

> Yerelde test etmek için proje köküne `.env.local` oluşturup `ADMIN_PASSWORD=...` yazabilirsiniz.

## Netlify'a yayınlama

### Neden ek yapılandırma var?

Netlify'da dosya sistemi **salt-okunurdur** ve her istek yeni bir sunucusuz fonksiyonda çalışır. Bu yüzden makale/mesaj yazmaları dosyaya değil, **Netlify Blobs** (kalıcı anahtar-değer deposu) üzerinden yapılır. Yerelde ise otomatik olarak dosya sistemine düşer — kod değişikliği gerekmez.

- `lib/store.ts` → `NETLIFY` ortam değişkeni varsa Blobs, yoksa dosya.
- İlk çalıştırmada `data/articles.json` içindeki seed makaleler Blobs'a otomatik aktarılır.
- `next.config.ts` içindeki `outputFileTracingIncludes` bu seed dosyasını sunucusuz pakete dahil eder.

### 1. Zorunlu ortam değişkenleri

Netlify panelinde **Site configuration → Environment variables** bölümüne ekleyin:

| Değişken | Değer | Zorunlu |
|---|---|---|
| `ADMIN_PASSWORD` | Panel şifreniz | ✅ |
| `SESSION_SECRET` | `openssl rand -hex 32` çıktısı (en az 16 karakter) | ✅ |

`SESSION_SECRET` olmadan oturumlar deploy'lar arasında güvenli olmaz (uyarı loglanır).

### 2. Yayınlama — Git ile (önerilen)

```bash
git init
git add .
git commit -m "Psikolog sitesi"
```

Sonra:

1. GitHub/GitLab'da yeni bir depo açın ve push edin:
   ```bash
   git remote add origin <REPO_URL>
   git push -u origin main
   ```
2. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**
3. Depoyu seçin. Netlify Next.js ayarlarını otomatik algılar (`netlify.toml` mevcut).
4. **Environment variables** adımında yukarıdaki iki değişkeni girin.
5. **Deploy** → site yayına alınır.

Her `git push` sonrası otomatik yeniden yayınlanır.

### 3. Yayınlama — Netlify CLI ile (Git'siz)

```bash
npx netlify-cli login
npx netlify-cli init          # yeni site oluştur / mevcut siteye bağla
npx netlify-cli env:set ADMIN_PASSWORD "sifreniz"
npx netlify-cli env:set SESSION_SECRET "$(openssl rand -hex 32)"
npx netlify-cli deploy --build --prod
```

## İçerik yönetimi

- **Makaleler:** `/admin` → Yeni Makale → kaydet (taslak) veya yayınla
- **Mesajlar:** `/admin/mesajlar` → iletişim formundan gelenler
- **Site bilgileri:** `lib/site.ts` (isim, telefon, adres, hizmetler, SSS)
- **Görseller:** `public/images/` klasörü
- **Makale kapakları:** `lib/images.ts` içinde kategori → görsel eşlemesi

## Komutlar

```bash
npm run dev      # geliştirme sunucusu
npm run build    # üretim derlemesi
npm run start    # üretim sunucusu (yerelde)
npm run lint     # ESLint
```

## Önemli notlar

- `data/.session-secret` git'e eklenmez (`.gitignore`).
- Netlify'da yazma işlemleri Blobs'a gider; yerelde `data/*.json` dosyalarına.
- Görseller Unsplash ücretsiz lisanslıdır; kendi fotoğraflarınızla `public/images/` altında değiştirebilirsiniz.
