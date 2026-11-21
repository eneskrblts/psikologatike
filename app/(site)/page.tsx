import Link from "next/link";
import Image from "next/image";
import { approach, faqs, services, site, stats } from "@/lib/site";
import { images } from "@/lib/images";
import { getPublishedArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { FaqList } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";

export default async function HomePage() {
  const latest = (await getPublishedArticles()).slice(0, 3);

  return (
    <>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 -top-32 h-[26rem] w-[26rem] rounded-full bg-mint/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-24 h-[22rem] w-[22rem] rounded-full bg-clay-2/40 blur-3xl" />

        <div className="container-page relative grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          <div className="animate-fade-up">
            <span className="eyebrow">
              {site.role} · Kadıköy &amp; Online
            </span>

            <h1 className="mt-6 text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]">
              Zihninizdeki sessizliği{" "}
              <span className="italic text-sage">birlikte</span> anlayalım.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Merhaba, ben {site.name}. On iki yıldır; kaygı, tükenmişlik, ilişki zorlukları ve yaşam
              geçişlerinde insanlara eşlik ediyorum. Yargısız, bilimsel temelli ve size ait bir
              hızda ilerleyen bir alan sunuyorum.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/iletisim" className="btn btn-primary">
                Randevu Al
              </Link>
              <Link href="/makaleler" className="btn btn-ghost">
                Makaleleri İncele
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ink-2">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Yüz yüze &amp; online görüşme
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Tam gizlilik
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" /> İlk görüşme 50 dk
              </span>
            </div>
          </div>

          {/* Görsel kompozisyon */}
          <div className="relative mx-auto w-full max-w-md animate-fade-up lg:max-w-none [animation-delay:150ms]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-ink/10 shadow-[0_40px_80px_-50px_rgba(22,35,30,0.9)]">
              <Image
                src={images.therapyRoom}
                alt="Sıcak ve sakin terapi odası"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-display text-2xl text-cream">{site.name}</p>
                <p className="mt-1 text-sm text-cream/75">{site.role}</p>
                <p className="mt-2 text-sm text-cream/60">
                  Terapi, kendinize anlattığınız hikâyeyi değiştirmekle başlar.
                </p>
              </div>

              <div className="absolute left-5 top-6 rounded-2xl bg-cream/95 px-4 py-3 text-ink shadow-lg backdrop-blur">
                <p className="font-display text-xl leading-none text-sage">{stats[0].value}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-wider text-ink-3">
                  {stats[0].label}
                </p>
              </div>

              <div className="animate-float absolute -right-4 top-1/3 rounded-2xl bg-cream/95 px-4 py-3 text-ink shadow-xl backdrop-blur">
                <p className="font-display text-xl leading-none text-clay">{stats[3].value}</p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-wider text-ink-3">
                  {stats[3].label}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ SAYAÇLAR ---------------------------- */}
      <section className="border-y border-ink/10 bg-shell">
        <div className="container-page grid grid-cols-2 gap-y-8 py-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center">
              <p className="font-display text-4xl text-sage sm:text-5xl">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ink-3">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------ HİZMETLER --------------------------- */}
      <Section>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Çalışma Alanları"
            title="Size eşlik edebileceğim alanlar"
            description="Her danışan farklı bir hikâyeyle gelir. Aşağıdaki başlıklar, en sık birlikte çalıştığımız alanlardır."
          />
          <Reveal>
            <Link href="/hizmetler" className="btn btn-ghost">
              Tüm hizmetler →
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 70} className="h-full">
              <article className="card card-hover flex h-full flex-col p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint font-display text-lg text-sage">
                  {service.icon}
                </span>
                <h3 className="mt-5 text-xl">{service.title}</h3>
                <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-ink-2">
                  {service.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2 border-t border-ink/8 pt-5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full bg-shell px-3 py-1 text-[0.72rem] text-ink-2"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------ YAKLAŞIM ---------------------------- */}
      <section className="bg-ink text-cream">
        <div className="container-page py-20 sm:py-24">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow !text-clay-2">Süreç Nasıl İşliyor</span>
              <h2 className="mt-4 text-[2rem] leading-tight text-cream sm:text-[2.6rem]">
                Üç adımda, sizin hızınızda bir dönüşüm
              </h2>
              <p className="mt-4 leading-relaxed text-cream/70">
                Terapi bir “tedavi ediliyor” hissi değil; kendinizi anladığınız, güvenli bir
                yolculuktur.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {approach.map((item, i) => (
              <Reveal key={item.step} delay={i * 120}>
                <div className="border-t border-cream/20 pt-6">
                  <span className="font-display text-5xl text-clay-2/70">{item.step}</span>
                  <h3 className="mt-4 text-2xl text-cream">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/65">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ GALERİ ----------------------------- */}
      <section className="container-page py-4">
        <div className="grid gap-4 sm:grid-cols-[1.45fr_1fr]">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
              <Image
                src={images.officeDetail}
                alt="Muayenehane detayı"
                fill
                sizes="(min-width: 640px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] sm:h-full sm:aspect-auto">
              <Image
                src={images.readingCorner}
                alt="Terapi odasında dinlenme köşesi"
                fill
                sizes="(min-width: 640px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ HAKKIMDA ---------------------------- */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[5/6] overflow-hidden rounded-[2.5rem]">
                <Image
                  src={images.readingCorner}
                  alt="Terapi odasında dinlenme köşesi"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 max-w-[15rem] rounded-2xl border border-ink/10 bg-white p-5 shadow-xl sm:-right-8">
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink-3">
                  Ruhsal Sağlıklı Olmak
                </p>
                <p className="mt-2 font-display text-[1.05rem] leading-snug text-ink">
                  “Hissettiğiniz şeyi adlandırdığınızda, onun esiri olmaktan çıkarsınız.”
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Hakkımda"
              title="Bilimsel temelli, insani bir yaklaşım"
            />
            <p className="mt-5 leading-relaxed text-ink-2">
              Hacettepe Üniversitesi Psikoloji mezunu, Klinik Psikoloji yüksek lisanslıyım. Şema
              Terapi ve Duygu Odaklı Terapi (EFT) eğitimlerimi tamamladım; çalışmalarımı bilişsel
              davranışçı temele, gerektiğinde şema ve sistemik yaklaşımlarla genişletiyorum.
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">
              Seanslarda hazır reçeteler yerine, sizin hikâyenize uygun bir çerçeve kurmaya inanırım.
              Amaç; yalnızca belirtileri azaltmak değil, kendinizle kurduğunuz ilişkiyi kalıcı
              biçimde dönüştürmek.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Klinik Psikoloji Yüksek Lisans",
                "Şema Terapi (Level 2)",
                "Duygu Odaklı Çift Terapisi (EFT)",
                "EMDR Uygulayıcı Eğitimi",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-ink-2"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/hakkimda" className="btn btn-primary mt-8">
              Detaylı tanışma
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------ MAKALELER --------------------------- */}
      <section className="border-t border-ink/10 bg-shell">
        <Section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Blog"
              title="Son makaleler"
              description="Terapi odasının dışına taşınan notlar: duygu düzenleme, ilişki dinamikleri ve günlük hayatta uygulanabilir alışkanlıklar."
            />
            <Reveal>
              <Link href="/makaleler" className="btn btn-ghost">
                Tüm makaleler →
              </Link>
            </Reveal>
          </div>

          {latest.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {latest.map((article, i) => (
                <Reveal key={article.id} delay={i * 90} className="h-full">
                  <ArticleCard article={article} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="card mt-12 p-10 text-center text-ink-2">
              Henüz yayımlanmış makale yok. Yönetim panelinden ilk yazınızı ekleyebilirsiniz.
            </div>
          )}
        </Section>
      </section>

      {/* -------------------------------- SSS ------------------------------- */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Sık Sorulanlar"
            title="Merak edilenler"
            description="Aklınızdaki soru burada yoksa, iletişim formundan çekinmeden yazabilirsiniz."
          />
          <Reveal delay={100}>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------- CTA ------------------------------- */}
      <section className="container-page pb-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-sage px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-clay/30" />

            <div className="relative">
              <span className="eyebrow !text-cream/70">İlk Adım</span>
              <h2 className="mx-auto mt-5 max-w-2xl text-[2rem] leading-tight text-cream sm:text-[2.7rem]">
                Konuşmaya başlamak için hazır hissetmenizi beklemeyin.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-cream/75">
                15 dakikalık ücretsiz ön görüşmede birbirimizi tanır, size uygun planı birlikte
                çıkarırız.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/iletisim"
                  className="btn bg-cream text-ink hover:bg-white"
                >
                  Randevu talebi gönder
                </Link>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="btn border border-cream/40 text-cream hover:bg-cream/10"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
