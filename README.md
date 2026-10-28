# 🧭 Claude Pusulası

## Nasıl kullanılır?

1. **Hedefini yaz.** Örneğin: `logomu döndüren bir animasyon`, `staj için CV`, `türev konusunu öğren`.
   Ya da hazır konulardan birine tıkla.
2. **"Yolu göster"e bas.** Pusula sana 3 adım gösterir:
   - **Bunu kullan:** Hangi Claude özelliği veya skill'i işini görür.
   - **Bunu bağla:** İşine yarayacak uygulama bağlantıları (Canva, Notion, Gmail…). Bu adım isteğe bağlı.
   - **Claude'a bunu yaz:** Hazır bir prompt şablonu.
3. **Sarı yerleri doldur.** `[köşeli parantez]` içindeki yerlere kendi bilgilerini yaz.
4. **Kopyala ve Claude'a yapıştır.** Bu kadar.

> 💡 Sayfa claude.ai içinde açılırsa bir de **"Benim için doldur"** butonu çıkar. Boşlukları Claude senin hedefine göre kendisi doldurur.

### Şu an desteklenen konular

Animasyon · Sunum · Web sitesi / uygulama · Excel / tablo · Belge / CV / rapor · E-posta · Poster / logo / tasarım · Seslendirme · Araştırma · Ders çalışma · Kod / hata çözme · Online mağaza · Not / görev düzeni · Roblox oyunu

---

## Claude'u daha iyi kullanmak için püf noktaları

Pusulayı kullanmasan bile bu kurallar her prompt'u daha iyi yapar.

### 1. Ne istediğini net söyle
❌ `bana sunum yap`
✅ `Lise öğrencilerine yenilenebilir enerjiyi anlatan 8 slaytlık bir sunum yap. Her slaytta en fazla 3 madde olsun.`

Konu, kime yönelik olduğu, uzunluk ve format. Bu dördünü yazarsan sonuç bir anda düzelir.

### 2. Bir örnek göster
Ne istediğini anlatmak zorsa örnek ver: *"Şu tarzda yaz: …"* ya da beğendiğin bir şeyin ekran görüntüsünü ekle. Claude örnekten çok hızlı öğrenir.

### 3. Dosyanı doğrudan ekle
PDF, Excel, Word, resim… Ataş simgesiyle yükle ve *"bunu özetle"*, *"bu tablodaki hatayı bul"* de. Metni kopyala-yapıştır yapmana gerek yok.

### 4. Önce taslak iste, sonra düzelt
Tek seferde mükemmel sonuç beklemek yerine *"önce kısa bir taslak yap"* de. Sonra *"daha kısa olsun"*, *"renkleri koyulaştır"*, *"3. maddeyi değiştir"* gibi adım adım düzelt. Her seferinde baştan anlatmana gerek yok, Claude konuşmayı hatırlar.

### 5. Eksik bilgi varsa sana sormasını iste
Prompt'un sonuna *"Eksik bilgi varsa önce bana sor"* yaz. Claude yanlış tahmin yapmak yerine soru sorar.

### 6. Rol ver
*"Bir İK uzmanı gibi CV'mi incele"* ya da *"Bir matematik öğretmeni gibi adım adım anlat"*. Rol vermek cevabın tonunu ve derinliğini değiştirir.

### 7. Format belirt
Tablo mu, madde listesi mi, kod mu, e-posta mı? Söylersen tam istediğin şekilde gelir. Örneğin: *"Cevabı karşılaştırma tablosu olarak ver."*

### 8. Uygulamalarını bağla
Ayarlardaki bağlantılar (connector) bölümünden Gmail, Google Drive, Notion, Canva gibi uygulamaları bağlarsan Claude doğrudan oradaki bilgilerle çalışır. Örneğin *"gelen kutumdaki staj mailine cevap taslağı hazırla"* diyebilirsin. Önemli işlemlerden (mail göndermek gibi) önce Claude sana sorar.

### 9. Skill'leri aç
Skill'ler Claude'a belirli bir işi nasıl iyi yapacağını öğreten paketlerdir (Excel, PowerPoint, GIF, p5.js animasyonu…). Ayarlardan açabilirsin. Açık olanları Claude gerektiğinde kendisi kullanır.

### 10. Güncel bilgi için arama yaptır
Haberler, fiyatlar, sınav tarihleri gibi değişen bilgiler için *"internette ara ve kaynak göster"* de. Kaynaklı cevap her zaman daha güvenilirdir.

### 11. Uzun konuşmaları böl
Konu değiştiğinde yeni sohbet aç. Tek bir sohbette 10 farklı iş yapmak yerine her işe ayrı sohbet daha temiz sonuç verir.

### 12. Kontrol et
Claude çok iyi ama hatasız değil. Önemli bilgileri (tarihler, sayılar, kod) mutlaka kontrol et. *"Bu cevabı tekrar kontrol et, hata var mı?"* demek de işe yarar.

---

## Kendi bilgisayarında çalıştırma

Hiçbir kurulum gerekmez. Tek bir HTML dosyası:

```bash
git clone https://github.com/MustafaCanDere/claude-pusulasi.git
cd claude-pusulasi
# index.html dosyasına çift tıkla, tarayıcıda açılır
```

## Yeni konu ekleme (katkı)

Tüm konular `index.html` içindeki `CATALOG` listesinde. Yeni bir konu eklemek için listeye şu yapıda bir öğe ekle:

```js
{
  id: "video",                        // benzersiz kısa ad
  label: "Video düzenleme",           // ekranda görünen ad
  keys: ["video", "kurgu", "montaj"], // kullanıcı bunlardan birini yazarsa bu konu seçilir
  why: "Bu konuda Claude'un ne yapabildiğinin kısa açıklaması.",
  use: [["Araç adı", "Ne işe yaradığı"]],
  connect: [["Uygulama adı", "Neden bağlanmalı"]],
  prompt: "Hazır prompt. Doldurulacak yerleri [köşeli parantez] içine yaz."
}
```

Sonra bir Pull Request aç. Türkçe katkılar çok makbule geçer 🙌

## Lisans

[MIT](LICENSE). İstediğin gibi kullan, değiştir, paylaş.

---

*Claude Pusulası, Anthropic'in resmi bir ürünü değildir. Topluluk tarafından yapılmış bir yardımcı araçtır.*
