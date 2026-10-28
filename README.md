# 🧭 AI Pusulası

## Nasıl kullanılır?

1. **Yapay zekânı seç.** Claude, ChatGPT, Gemini, Grok, Codex ya da Antigravity.
2. **Hedefini yaz.** Örneğin: `logomu döndüren bir animasyon`, `staj için CV`, `türev konusunu öğren`.
   Ya da hazır konulardan birine tıkla.
3. **"Yolu göster"e bas.** Pusula sana 3 adım gösterir:
   - **Bunu kullan:** Seçtiğin yapay zekânın hangi özelliği işini görür (Canvas, Deep Research, skill'ler…).
   - **Bunu bağla:** İşine yarayacak uygulama bağlantıları (Canva, Gmail, Notion…). Bu adım isteğe bağlı.
   - **Bunu kopyalayıp yapıştır:** Hazır bir prompt şablonu.
4. **Sarı yerleri doldur.** `[köşeli parantez]` içindeki yerlere kendi bilgilerini yaz.
5. **Kopyala ve yapay zekâna yapıştır.** Bu kadar.
6. **Sonucu geliştir.** Her sonucun altında hazır takip istekleri var ("daha kısa yap", "Instagram boyutunda yap" gibi). Tıklayınca kopyalanır.

> 💡 Seçtiğin yapay zekâ o iş için uygun değilse (örneğin Codex ile sunum) Pusula sana uygun olanı önerir.
>
> 💡 **Linki paylaş** butonu, seçtiğin yapay zekâ ve konuyla birlikte link kopyalar (ör. `?ai=gemini&konu=sunum`).
>
> 💡 Sayfa claude.ai içinde açılırsa bir de **"Benim için doldur"** butonu çıkar ve boşlukları kendisi doldurur.

### Sitede neler var?

- **19 konu:** Animasyon · Video oluşturma · Sunum · Web sitesi / uygulama · Excel / tablo · Belge / CV / rapor · İş başvurusu / mülakat · E-posta · Poster / logo / görsel · Sosyal medya / YouTube · Seslendirme · Çeviri · Araştırma · Ders çalışma · Soru çözümü / ödev kontrolü · Kod / hata çözme · Online mağaza · Not / görev düzeni · Roblox oyunu
- **Karşılaştırma tablosu:** Seçtiğin iş için 6 yapay zekâyı yan yana gösterir: hangisi öne çıkıyor, hangisi yapabilir, hangisi uygun değil.
- **Ücretsiz / Plana bağlı etiketi:** Her özelliğin yanında. "Plana bağlı", ücretsiz sürümde sınırlı olabilir ya da ücretli plan gerekebilir demek.
- **Doldurulmuş örnek:** Boş şablonun yanında, iyi doldurulmuş bir örneği de görürsün.
- **Prompt kontrolü:** Kendi yazdığın prompt'u yapıştır; hedef kitle, uzunluk, format, ton gibi neyin eksik olduğunu puanla söyler.
- **Kaydettiklerim:** Beğendiğin prompt'ları kaydet; tarayıcında saklanır, sonra tekrar bulursun.
- **Türkçe / English:** Sağ üstten dili değiştir.
- **Topluluk prompt'ları:** Başkalarının paylaştığı, işe yarayan prompt'lar (aşağıda nasıl önereceğin anlatılıyor).

Codex ve Antigravity kod araçları olduğu için sadece kodla ilgili konularda (web, kod, animasyon, Roblox, tablo/arayüz) çıkar.

---

## 🧩 Chrome eklentisi

Pusula, ChatGPT, Claude, Gemini veya Grok sayfasındayken tarayıcının yanında panel olarak açılır. Hangi sitede olduğunu anlayıp o yapay zekâyı otomatik seçer ve **"Sohbete yapıştır"** butonuyla prompt'u doğrudan mesaj kutusuna yazar. Mesajı asla kendisi göndermez; göndermeden önce son kontrolü sen yaparsın.

**Kurulum (2 dakika):**
1. [`dist/ai-pusulasi-extension.zip`](dist/ai-pusulasi-extension.zip) dosyasını indir ve bir klasöre çıkar.
2. Chrome'da adres çubuğuna `chrome://extensions` yaz.
3. Sağ üstten **Geliştirici modu**'nu aç.
4. **Paketlenmemiş öğe yükle**'ye bas ve çıkardığın klasörü seç.
5. Araç çubuğundaki yapboz simgesinden AI Pusulası'nı sabitle. Simgeye tıklayınca panel açılır.

> Edge, Brave ve Opera gibi Chromium tabanlı tarayıcılarda da aynı şekilde çalışır.
>
> Sitelerin tasarımı değişirse yapıştırma bazen çalışmayabilir. O zaman "Prompt'u kopyala"yı kullan ve bize Issue açarak haber ver.

## 🧠 Claude skill'i

Skill'i Claude'a yüklersen, "bunu nasıl yaparım bilmiyorum" dediğin her işte Claude doğru özelliği ve skill'i kendisi seçer, prompt'u hazırlar ve işe başlar. Siteyi açmana gerek kalmaz.

**Kurulum:**
1. [`dist/ai-pusulasi-skill.zip`](dist/ai-pusulasi-skill.zip) dosyasını indir (çıkarma, zip olarak kalsın).
2. Claude'da **Ayarlar**'a gir ve skill'ler bölümünden yeni bir skill yükle; zip dosyasını seç.
3. Yeni bir sohbette dene: *"Okulumuzun robotik kulübü için bir şey yapmak istiyorum ama nereden başlayacağımı bilmiyorum."*

> Skill'lerin hangi planlarda açık olduğu değişebilir. Ayarlarında skill bölümü görünmüyorsa planın bunu desteklemiyor olabilir.

---

## Hangi yapay zekâ ne için iyi?

| İş | En rahat seçenekler |
|---|---|
| Sunum, belge, CV | Claude, ChatGPT, Gemini |
| Görsel / poster | ChatGPT, Gemini (Nano Banana), Grok Imagine |
| Video | Gemini (Veo), Grok Imagine, ChatGPT (Sora, varsa) |
| Sosyal medya | ChatGPT, Grok (X trendleri), Claude |
| Çeviri ve dil pratiği | Claude, Gemini (Live), ChatGPT (ses modu) |
| Mülakat provası | ChatGPT (ses modu), Gemini Live |
| Gündem, son dakika | Grok (X gönderilerini de tarar) |
| Uzun, kaynaklı araştırma | Claude Research, ChatGPT Deep Research, Gemini Deep Research |
| Ders çalışma | Hepsi; Gemini'de NotebookLM ile kendi notlarından çalışabilirsin |
| Küçük site / araç | Claude, ChatGPT Canvas, Gemini Canvas |
| Gerçek yazılım projesi | Claude Code, Codex, Antigravity |

---

## Her yapay zekâ için kısa kullanım rehberi

### Claude (Anthropic)
- **Başla:** claude.ai'ye gir, hedefini yaz. Dosyalarını ataş simgesiyle ekle.
- **Skill'ler:** Ayarlardan Excel, PowerPoint, GIF gibi skill'leri aç; Claude gerektiğinde kendisi kullanır.
- **Bağlantılar:** Gmail, Google Drive, Notion, Canva gibi uygulamaları bağlarsan doğrudan oradaki bilgilerle çalışır.
- **Projects:** Dosyalarını ve talimatlarını bir projede topla, her sohbette tekrar anlatma.
- **Kod için:** Büyük projelerde Claude Code'u kullan.

### ChatGPT (OpenAI)
- **Canvas:** Uzun yazı ve kodda Canvas'ı aç, metni tek yerde birlikte düzeltin.
- **Araştırma:** Güncel bilgi için web arama, uzun rapor için Deep Research.
- **Dosyalar:** Excel, PDF, resim yükle; "`.xlsx` / `.pptx` / `.docx` olarak ver" diyerek dosya indir.
- **Projects ve Tasks:** Projects ile işlerini topla, Tasks ile hatırlatıcı kur.
- **Apps ve bağlantılar:** Canva gibi uygulamaları ChatGPT içinden kullan.
- **Kod için:** Gerçek projelerde Codex'e geç.

### Gemini (Google)
- **Gems:** Sık yaptığın işler için kendi asistanını oluştur (ör. "YKS matematik koçu").
- **Canvas:** Site, oyun ve uygulama prototipi; belgeleri Google Dokümanlar'a aktarabilirsin.
- **Görsel ve video:** Nano Banana ile görsel üret ve düzenle; planında varsa Veo ile video.
- **Deep Research ve NotebookLM:** Kaynaklı raporlar ve kendi notlarından çalışma.
- **Google uygulamaları:** Gmail, Takvim, Drive bağlantısıyla kendi verinle çalışır.
- **Kod için:** Gerçek projelerde Antigravity'yi kullan.

### Grok (xAI)
- **DeepSearch:** Hem web'i hem X'teki gönderileri tarar. Gündem için en güçlü seçenek.
- **Think modu:** Zor soruları adım adım çözer. Önemli bilgileri yine de kontrol et.
- **Grok Imagine:** Görsel ve sesli kısa video üretir.
- **Projects:** Dosyalarını ve talimatlarını bir arada tut.
- **Not:** Sunum gibi dosyaları kendisi üretmez; metni hazırlar, sen Gamma veya Canva'da sunuma çevirirsin.

### Codex (OpenAI, kod ajanı)
- **Nerede:** Codex uygulaması, IDE eklentisi (VS Code vb.), terminal (CLI) ve bulut.
- **AGENTS.md:** Proje klasörüne bir `AGENTS.md` koy; kurallarını, test ve çalıştırma komutlarını yaz. Codex her seferinde okur.
- **Onay modu:** Başta onay modunu açık tut ki komut çalıştırmadan önce sana sorsun.
- **/review:** İş bitince değişiklikleri incelet.
- **MCP:** GitHub, Figma gibi araçları bağlayabilirsin.

### Antigravity (Google, kod ajanı)
- **Agent Manager:** Görevleri ajanlara ver, birden fazlasını paralel çalıştır.
- **Implementation Plan:** Ajan koda başlamadan plan yazar. Okumadan onaylama, yorum yazarak düzelt.
- **Tarayıcı ajanı:** Web projelerinde ajandan siteyi tarayıcıda açıp test etmesini iste.
- **Walkthrough:** İş bitince neyin değiştiğini ve ekran görüntülerini gösterir.

---

## Genel püf noktaları (hepsinde işe yarar)

### 1. Ne istediğini net söyle
❌ `bana sunum yap`
✅ `Lise öğrencilerine yenilenebilir enerjiyi anlatan 8 slaytlık bir sunum yap. Her slaytta en fazla 3 madde olsun.`

Konu, kime yönelik olduğu, uzunluk ve format. Bu dördünü yazarsan sonuç bir anda düzelir.

### 2. Bir örnek göster
Ne istediğini anlatmak zorsa örnek ver: *"Şu tarzda yaz: …"* ya da beğendiğin bir şeyin ekran görüntüsünü ekle.

### 3. Dosyanı doğrudan ekle
PDF, Excel, Word, resim… Yükle ve *"bunu özetle"*, *"bu tablodaki hatayı bul"* de.

### 4. Önce taslak iste, sonra düzelt
*"Önce kısa bir taslak yap"* de. Sonra *"daha kısa olsun"*, *"3. maddeyi değiştir"* gibi adım adım düzelt. Yapay zekâ konuşmayı hatırlar, baştan anlatmana gerek yok.

### 5. Eksik bilgi varsa sana sormasını iste
Prompt'un sonuna *"Eksik bilgi varsa önce bana sor"* yaz. Yanlış tahmin yerine soru sorar.

### 6. Rol ver
*"Bir İK uzmanı gibi CV'mi incele"* ya da *"Bir matematik öğretmeni gibi adım adım anlat"*.

### 7. Format belirt
Tablo mu, madde listesi mi, kod mu? *"Cevabı karşılaştırma tablosu olarak ver"* gibi.

### 8. Güncel bilgi için arama yaptır
Haberler, fiyatlar, sınav tarihleri için *"internette ara ve kaynak göster"* de.

### 9. Her işe ayrı sohbet
Konu değiştiğinde yeni sohbet aç. Daha temiz sonuç verir.

### 10. Kod ajanlarında önce plan
Codex, Antigravity, Claude Code gibi ajanlara *"önce plan çıkar ve onayımı bekle"* de. Plan doğruysa kod da doğru gelir.

### 11. Kontrol et
Hiçbir yapay zekâ hatasız değil. Tarihleri, sayıları ve kodu mutlaka kontrol et. *"Bu cevabı tekrar kontrol et, hata var mı?"* demek de işe yarar.

---

## 🤝 Prompt öner

İşe yarayan bir prompt'un mu var? Paylaş, sitede **Topluluk prompt'ları** bölümünde herkes görsün.

1. Sitede ilgili konuyu aç ve en alttaki **"Prompt öner"** butonuna bas. (Ya da GitHub'da [Issues → New issue → Prompt önerisi](../../issues/new?template=prompt-onerisi.yml) yolunu izle.)
2. Konuyu, denediğin yapay zekâyı ve prompt'u yaz. Doldurulacak yerleri `[köşeli parantez]` içine al.
3. Kişisel bilgi (isim, telefon, şifre) ekleme.

Uygun bulunan öneriler siteye eklenir ve adın yanında görünür.

Özellikler hızlı değişiyor. Yanlış ya da eskimiş bir bilgi görürsen Issue ya da Pull Request aç 🙌

## Lisans

[MIT](LICENSE). İstediğin gibi kullan, değiştir, paylaş.

---

*AI Pusulası; Anthropic, OpenAI, Google veya xAI'nin resmi bir ürünü değildir. Topluluk tarafından yapılmış bir yardımcı araçtır.*
