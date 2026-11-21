import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import { site, faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim ve Randevu",
  description:
    "Randevu talebi, soru ve iş birliği için iletişim bilgileri. Kadıköy'de yüz yüze, her yerde online görüşme.",
};

const cards = [
  { label: "Telefon", value: site.phone, href: `tel:${site.phoneHref}`, note: "Pzt–Cum 09:00–19:00" },
  { label: "E-posta", value: site.email, href: `mailto:${site.email}`, note: "24 saat içinde dönüş" },
  { label: "WhatsApp", value: "Hızlı mesaj", href: site.whatsapp, note: "Randevu öncesi sorular için" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 bg-shell">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-mint blur-3xl" />
        <div className="container-page relative py-14 sm:py-20">
          <Reveal>
            <span className="eyebrow">İletişim</span>
            <h1 className="mt-5 max-w-3xl text-[2.4rem] leading-[1.1] sm:text-5xl">
              İlk adımı atmak için{" "}
              <span className="italic text-sage">buradayım</span>.
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-ink-2">
              Formu doldurun ya da doğrudan arayın. Mesajınıza en geç 24 saat içinde, uygun
              olduğunuz saatleri sorarak dönüş yaparım.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={80}>
            <div className="grid gap-4">
              {cards.map((card) => (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="card card-hover flex items-center justify-between gap-4 p-5"
                >
                  <span>
                    <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-ink-3">
                      {card.label}
                    </span>
                    <span className="mt-1 block font-display text-lg text-ink">{card.value}</span>
                    <span className="mt-0.5 block text-xs text-ink-3">{card.note}</span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-mint text-sage">
                    →
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="card overflow-hidden">
              <div className="relative h-52">
                <Image
                  src={images.officeDetail}
                  alt="Muayenehane"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <p className="font-display text-xl">Muayenehane</p>
                  <p className="mt-1 text-sm text-cream/75">Kadıköy · İstanbul</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-ink-2">{site.address}</p>
                <p className="mt-3 text-sm text-ink-3">{site.hours}</p>
                <p className="mt-4 rounded-xl bg-shell px-4 py-3 text-xs leading-relaxed text-ink-2">
                  Not: Acil bir kriz durumunda 112’yi arayın veya en yakın acil servise başvurun.
                  Bu form acil yardım hizmeti değildir.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-shell">
        <section className="container-page grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">Randevu Öncesi</span>
            <h2 className="mt-4 text-[2rem] leading-tight">Sık sorulanlar</h2>
          </Reveal>
          <Reveal delay={100}>
            <FaqList items={faqs.slice(0, 4)} />
          </Reveal>
        </section>
      </section>
    </>
  );
}
