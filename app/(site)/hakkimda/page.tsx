import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site, timeline } from "@/lib/site";
import { images } from "@/lib/images";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Psikolog ve Aile Danışmanı Atike Nur Karabulut — eğitim, sertifikalar ve terapi yaklaşımı. Şema terapi ve EFT eğitimi almış, bilimsel temelli bir yaklaşım.",
};

const credentials = [
  { label: "Eğitim", items: ["Hacettepe Üniversitesi · Psikoloji (Lisans)", "Klinik Psikoloji · Yüksek Lisans"] },
  { label: "Sertifikalar", items: ["Şema Terapi (Level 2)", "Duygu Odaklı Çift Terapisi (EFT)", "EMDR Uygulayıcı Eğitimi", "CBT Temel & İleri Düzey"] },
  { label: "Üyelikler", items: ["Türk Psikologlar Derneği", "EABCT (Avrupa Bilişsel ve Davranışçı Terapiler Derneği)"] },
];

export default function AboutPage() {
  return (
    <>
      {/* Üst */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-shell">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-clay-2/50 blur-3xl" />
        <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Hakkımda</span>
            <h1 className="mt-5 text-[2.4rem] leading-[1.1] sm:text-5xl">
              Eşlik etmek, birlikte <span className="italic text-sage">anlamak</span> demektir.
            </h1>
            <p className="mt-6 leading-relaxed text-ink-2">
              Merhaba, ben {site.name}. On iki yılı aşkın süredir yetişkinler, gençler ve çiftlerle
              çalışıyorum. Terapi odasında kurduğum alanın üç niteliği var: güvenli, yargısız ve
              meraklı.
            </p>
            <p className="mt-4 leading-relaxed text-ink-2">
              Hazır cevaplar yerine, sizin hayatınıza ait soruları birlikte bulmayı seçiyorum. Çünkü
              değişim; başınızdaki sesin ne dediğini değil, onunla nasıl konuştuğunuzu değiştirdiğinizde
              kalıcı olur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/iletisim" className="btn btn-primary">
                Randevu Al
              </Link>
              <Link href="/makaleler" className="btn btn-ghost">
                Yazılarımı oku
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem]">
                <Image
                  src={images.therapyRoom}
                  alt="Terapi odası"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
              </div>
              <div className="absolute -left-4 bottom-8 rounded-2xl bg-cream px-5 py-4 shadow-xl sm:-left-8">
                <p className="font-display text-3xl leading-none text-sage">12+</p>
                <p className="mt-1.5 text-[0.7rem] uppercase tracking-wider text-ink-3">
                  Yıllık klinik deneyim
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Yaklaşım */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Terapi Yaklaşımım" title="Nasıl çalışıyorum?" />
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                t: "Bilimsel temel",
                d: "Etkinliği kanıtlanmış yöntemleri (CBT, şema terapi, EFT) sizin hikâyenize göre uyarlarım.",
              },
              {
                t: "Yargısız alan",
                d: "Ne hissettiğinizin bir doğrusu yok. Merak ettiğim tek şey, sizin için neyin işe yaradığı.",
              },
              {
                t: "Şeffaf ilerleme",
                d: "Her 4 seansta birlikte bir değerlendirme yapar, hedefe yaklaşıp yaklaşmadığımızı görürüz.",
              },
              {
                t: "Günlük hayat",
                d: "Seans içindeki farkındalığı, hafta içinde uygulayabileceğiniz küçük ve somut adıtlara böleriz.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 80}>
                <div className="h-full rounded-3xl border border-ink/10 bg-white p-6">
                  <span className="h-8 w-8 rounded-lg bg-mint" />
                  <h3 className="mt-4 text-lg">{item.t}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-2">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Kariyer */}
      <section className="border-y border-ink/10 bg-shell">
        <Section>
          <SectionHeading eyebrow="Yolculuk" title="Eğitim ve deneyim" />
          <ol className="mt-12 space-y-0">
            {timeline.map((row, i) => (
              <Reveal key={row.year} delay={i * 70}>
                <li className="grid grid-cols-[4.5rem_1fr] items-baseline gap-6 border-b border-ink/10 py-6">
                  <span className="font-display text-2xl text-sage">{row.year}</span>
                  <span className="text-ink-2">{row.text}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </Section>
      </section>

      {/* Sertifikalar */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {credentials.map((group, i) => (
            <Reveal key={group.label} delay={i * 90} className="h-full">
              <div className="card h-full p-7">
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-3">
                  {group.label}
                </h3>
                <ul className="mt-5 space-y-3 text-[0.95rem] text-ink-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 rounded-[2rem] bg-mint/60 p-8 sm:p-10">
            <p className="max-w-3xl font-display text-xl leading-relaxed text-ink sm:text-2xl">
              “Terapi, hayatınızı değiştirmek zorunda olmadığınız; fakat yaşamak istediğiniz hayatı
              seçebildiğiniz bir yerdir.”
            </p>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-ink-3">{site.name}</p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
