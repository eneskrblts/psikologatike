export const site = {
  /** İsim — buradan değiştirin */
  name: "Atike Nur Karabulut",
  shortName: "Atike Nur Karabulut",
  initials: "AK",
  role: "Psikolog / Aile Danışmanı",
  tagline: "Zihninizdeki sessizliği birlikte anlayalım.",

  /** İletişim bilgileri — buradan değiştirin */
  phone: "+90 532 000 00 00",
  phoneHref: "+905320000000",
  email: "merhaba@atikenurkarabulut.com",
  address: "Bağdat Caddesi No: 120, Kat 3 / Kadıköy — İstanbul",
  hours: "Pazartesi – Cuma · 09:00 – 19:00",
  instagram: "https://www.instagram.com/",
  whatsapp: "https://wa.me/905320000000",

  /** metadataBase için — kendi alan adınızı yazın */
  baseUrl: "https://atikenurkarabulut.com",

  /** Yönetim paneli varsayılan şifresi (ADMIN_PASSWORD ortam değişkeni ile ezilebilir) */
  defaultAdminPassword: "psikolog2026",
};

/** Derleme anındaki yıl (prerender sırasında `new Date()` çağırmamak için sabit) */
export const currentYear = new Date().getFullYear();

export type Service = {
  title: string;
  summary: string;
  points: string[];
  icon: string;
};

export const services: Service[] = [
  {
    title: "Bireysel Terapi",
    summary:
      "Kaygı, depresyon, öz güven ve yaşam geçişlerinde kendinizle kurduğunuz ilişkiyi yeniden anlamak için düzenli görüşmeler.",
    points: ["Haftada 1 seans · 50 dk", "Bilişsel davranışçı ve şema terapi", "Yüz yüze / online"],
    icon: "01",
  },
  {
    title: "Çift Terapisi",
    summary:
      "İletişim döngülerini kırmak, çatışmayı onarıcı bir yakınlaşmaya dönüştürmek isteyen çiftler için.",
    points: ["EFT yaklaşımı", "Gottman yöntemleri", "8–12 seans önerilir"],
    icon: "02",
  },
  {
    title: "Çocuk & Ergen",
    summary:
      "Okul uyumu, sınav kaygısı, aile içi değişimler ve duygusal zorluklarda çocuğunuzun dünyasına kulak veriyoruz.",
    points: ["Oyun terapisi", "Aile görüşmeleri dahil", "Öğretmen iş birliği"],
    icon: "03",
  },
  {
    title: "Online Görüşme",
    summary:
      "Şehir dışında ya da yurt dışında olsanız da kendi alanınızda, kesintisiz terapi deneyimi.",
    points: ["Güvenli görüntülü görüşme", "Aynı saat garantisi", "Kayıt yok, gizli"],
    icon: "04",
  },
  {
    title: "Aile Terapisi",
    summary:
      "Rol değişimleri, kuşaklar arası çatışma ve yeni bir düzene geçiş dönemlerinde aileyi bir bütün olarak ele alıyoruz.",
    points: ["Sistemik yaklaşım", "Çok oturumlu plan", "Yaş uygundur"],
    icon: "05",
  },
  {
    title: "Kurumsal Danışmanlık",
    summary:
      "Ekip tükenmişliği, stres yönetimi ve çalışan iyi oluşu için atölye ve birebir görüşmeler.",
    points: ["Atölye & sunum", "Birebir destek hattı", "Ölçülebilir çıktı"],
    icon: "06",
  },
];

export const approach = [
  {
    step: "01",
    title: "Tanışma",
    text: "İlk görüşmede hikâyenizi, beklentinizi ve bugüne kadar denediğiniz yolları dinliyorum. Birlikte net bir hedef çiziyoruz.",
  },
  {
    step: "02",
    title: "Anlama",
    text: "Duygularınızın altında yatan örüntüleri, tekrar eden iç sesleri ve ihtiyaçları adım adım görünür kılıyoruz.",
  },
  {
    step: "03",
    title: "Dönüşüm",
    text: "Günlük hayatta uygulanabilir küçük adımlarla yeni bir denge kuruyor, ilerlemeyi sizin hızınıza göre ölçüyoruz.",
  },
];

export const stats = [
  { value: "12+", label: "Yıllık deneyim" },
  { value: "500+", label: "Danışan görüşmesi" },
  { value: "40+", label: "Yayınlanmış makale" },
  { value: "%96", label: "Memnuniyet oranı" },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Terapiye ilk adımda ne beklemeliyim?",
    a: "İlk seans genellikle tanışma seansıdır. Hikâyenizi, beklentinizi ve hedefinizi konuşuruz; herhangi bir hazırlık yapmanıza gerek yok. Seans sonunda birlikte bir yol haritası belirleriz.",
  },
  {
    q: "Kaç seans sürer, ne zaman sonuç alırım?",
    a: "Süre kişiye ve hedefe göre değişir. Basit bir uyum problemi 4–6 seansta çözülebilirken, daha köklü örüntülerde 3–6 aylık bir süreç öneriyorum. İlk 4 seansonra birlikte ilerleme değerlendirmesi yapıyoruz.",
  },
  {
    q: "Görüşmeler gizli mi kalıyor?",
    a: "Evet. Tüm görüşmeler mesleki etik kuralları ve KVKK kapsamında tam gizlilik ilkesiyle yürütülür. Yasal zorunluluk halleri dışında hiçbir bilgi üçüncü kişilerle paylaşılmaz.",
  },
  {
    q: "Online terapi yüz yüze kadar etkili mi?",
    a: "Araştırmalar, çoğu durumda online terapinin yüz yüze görüşme kadar etkili olduğunu gösteriyor. Önemli olan düzenlilik ve güvenli bir ortam; ikisini de sağladığınızda sonuçlar benzer oluyor.",
  },
  {
    q: "Randevumu iptal edebilir miyim?",
    a: "Randevunuzdan en az 24 saat önce haber verdiğinizde ücretsiz erteleme yapabiliyoruz. Daha kısa sürede yapılan iptaller seans hakkı olarak işlenir.",
  },
];

export const timeline = [
  { year: "2012", text: "Hacettepe Üniversitesi Psikoloji Bölümü'nden mezun oldum." },
  { year: "2014", text: "Klinik Psikoloji yüksek lisansını tamamladım." },
  { year: "2016", text: "Şema Terapi ve EFT eğitimlerini tamamladım." },
  { year: "2019", text: "Kendi muayenehanemi Kadıköy'de açtım." },
  { year: "2023", text: "Online görüşme altyapısını kurarak yurt dışına açıldım." },
];
