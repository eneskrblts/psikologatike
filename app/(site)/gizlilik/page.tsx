import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "KVKK ve Gizlilik",
  description: "Kişisel Verilerin Korunması aydınlatma metni ve gizlilik politikası.",
};

export default function PrivacyPage() {
  return (
    <section className="container-page max-w-3xl py-16 sm:py-24">
      <span className="eyebrow">Yasal Bilgilendirme</span>
      <h1 className="mt-5 text-[2.2rem] leading-tight sm:text-[2.8rem]">
        KVKK Aydınlatma Metni &amp; Gizlilik
      </h1>

      <div className="prose-site mt-8">
        <p>
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında; kişisel
          verilerinizin hangi amaçlarla işlendiği, hukuki sebepleri ve haklarınız hakkında sizleri
          bilgilendirmek amacıyla hazırlanmıştır.
        </p>

        <h2>1. Veri Sorumlusu</h2>
        <p>
          Veri sorumlusu sıfatıyla {site.name}; özel nitelikli kişisel verilerinizin gizliliğini ve
          güvenliğini sağlamakla yükümlüdür.
        </p>

        <h2>2. İşlenen Kişisel Veriler</h2>
        <ul>
          <li>Kimlik bilgileri (ad, soyad)</li>
          <li>İletişim bilgileri (e-posta, telefon)</li>
          <li>Müşteri işlem bilgileri (randevu kayıtları, görüşme notları)</li>
          <li>İşlem güvenliği bilgileri (IP adresi, tarayıcı bilgisi)</li>
        </ul>

        <h2>3. İşleme Amaçları</h2>
        <ul>
          <li>Randevu taleplerinizin yanıtlanması ve organizasyonu</li>
          <li>Hizmetlerimizin yürütülmesi ve iyileştirilmesi</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Haklarınızın tesisi, kullanılması ve korunması</li>
        </ul>

        <h2>4. Hukuki Sebep</h2>
        <p>
          Kişisel verileriniz; KVKK m.5/2-c (hukuki yükümlülüğün yerine getirilmesi), m.5/2-d
          (bir hakkın tesisi, kullanılması veya korunması) ve m.5/2-f (meşru menfaat) hükümlerine
          dayanılarak işlenmektedir. Açık rıza gerektiren hallerde ayrıca rızanız alınır.
        </p>

        <h2>5. Saklama Süresi</h2>
        <p>
          Görüşme kayıtları ve ilgili belgeler, mesleki mevzuat ve zamanaşımı süreleri gözetilerek
          en az süre boyunca saklanır; süre sonunda güvenli biçimde silinir.
        </p>

        <h2>6. Çerezler</h2>
        <p>
          Sitemiz yalnızca temel işlevler için zorunlu çerezler kullanır. Yönetim panelinde oturum
          yönetimi amacıyla httpOnly nitelikli bir çerez tanımlanır; bu çerez profil çıkarma veya
          reklam amacıyla kullanılmaz.
        </p>

        <h2>7. Haklarınız (KVKK m.11)</h2>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme</li>
          <li>Silinmesini veya yok edilmesini isteme</li>
          <li>İşlemenin münhasıran otomatik sistemlerle analizi sonucu aleyhinize bir sonuç doğmasına itiraz etme</li>
          <li>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>

        <h2>8. Başvuru Yöntemi</h2>
        <p>
          Haklarınıza ilişkin başvurularınızı yazılı olarak muayenehane adresine, ya da e-posta
          yoluyla iletebilirsiniz. Başvurular en geç 30 gün içinde sonuçlandırılır.
        </p>

        <hr />

        <p className="text-sm text-ink-3">
          Bu metin örnek amaçlıdır; yayın öncesinde bir hukuk uzmanı tarafından gözden
          geçirilmesi önerilir.
        </p>
      </div>
    </section>
  );
}
