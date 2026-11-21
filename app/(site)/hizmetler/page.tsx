import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services, site } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Bireysel terapi, çift terapisi, çocuk & ergen, aile terapisi, online görüşme ve kurumsal danışmanlık.",
};

const process = [
  {
    t: "Ön görüşme",
    d: "15 dakikalık ücretsiz telefonda tanışma. Uygun olduğumuzu anlar, uygun olmadığını dürüstçe söylerim.",
  },
  {
    t: "İlk seans",
    d: "50 dakikalık değerlendirme görüşmesi. Hikâyeniz, hedefiniz ve önerdiğim çerçeve paylaşılır.",
  },
  {
    t: "Düzenli seanslar",
    d: "Haftada bir 50 dk. İlerlemeyi 4 seansta bir birlikte değerlendirir, gerektiğinde planı değiştiririz.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 bg-shell">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-mint blur-3xl" />
        <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <span className="eyebrow">Hizmetler</span>
            <h1 className="mt-5 max-w-3xl text-[2.4rem] leading-[1.1] sm:text-5xl">
              İhtiyacınıza göre şekillenen{" "}
              <span className="italic text-sage">esnek</span> bir çerçeve.
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-2">
              Tüm görüşmeler {site.hours} saatleri arasında, Kadıköy&apos;deki muayenehanemde veya
              güvenli görüntülü görüşme platformu üzerinden yapılır.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-40px_rgba(22,35,30,0.55)]">
              <Image
                src={images.readingCorner}
                alt="Terapi odasından bir köşe"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 70} className="h-full">
              <article className="card card-hover flex h-full flex-col p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint font-display text-lg text-sage">
                    {service.icon}
                  </span>
                  <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-3">
                    Çalışma alanı
                  </span>
                </div>
                <h2 className="mt-5 text-2xl">{service.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-ink-2">{service.summary}</p>
                <ul className="mt-6 grid gap-2.5 border-t border-ink/8 pt-5">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-ink-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Süreç */}
      <section className="border-y border-ink/10 bg-ink text-cream">
        <div className="container-page py-20 sm:py-24">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow !text-clay-2">Nasıl Başlıyor</span>
              <h2 className="mt-4 text-[2rem] leading-tight text-cream sm:text-[2.6rem]">
                İlk adımdan itibaren net bir süreç
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {process.map((step, i) => (
              <Reveal key={step.t} delay={i * 110}>
                <div className="rounded-3xl border border-cream/15 bg-cream/5 p-7">
                  <span className="font-display text-4xl text-clay-2/80">0{i + 1}</span>
                  <h3 className="mt-4 text-xl text-cream">{step.t}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-cream/65">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/iletisim" className="btn bg-cream text-ink hover:bg-white">
                Randevu Al
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-cream/40 text-cream hover:bg-cream/10"
              >
                WhatsApp&apos;tan yaz
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Ücretlendirme"
          title="Şeffaf ve konuşulabilir"
          description="Güncel seans ücretleri için lütfen telefonla bilgi alın. Kurumsal paket ve paket seans seçenekleri mevcuttur."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { t: "Yüz Yüze Seans", d: "Kadıköy muayenehanesi", hint: "50 dakika" },
            { t: "Online Görüşme", d: "Güvenli görüntülü platform", hint: "50 dakika" },
            { t: "Ön Görüşme", d: "Tanışma ve yönlendirme", hint: "15 dakika · ücretsiz" },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 80} className="h-full">
              <div className="card h-full p-7">
                <h3 className="text-xl">{item.t}</h3>
                <p className="mt-2 text-sm text-ink-2">{item.d}</p>
                <p className="mt-5 rounded-full bg-shell px-4 py-2 text-xs uppercase tracking-wider text-sage inline-flex">
                  {item.hint}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
