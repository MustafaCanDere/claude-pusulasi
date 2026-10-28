---
name: ai-pusulasi
description: Kullanıcı bir işi Claude ile nasıl yapacağını bilmediğinde (hangi skill, hangi bağlantı/connector, nasıl prompt) ona yol gösterir; isteği netleştirir, doğru aracı seçer ve hazır bir prompt'la işi başlatır. "Bunu nasıl yaparım", "hangi skill", "ne yazmalıyım", "animasyon/sunum/site yapmak istiyorum ama bilmiyorum" gibi isteklerde kullan. Use when the user doesn't know which Claude feature, skill, connector or prompt fits their goal.
---

# AI Pusulası

Kullanıcı bir şey yapmak istiyor ama Claude'da bunu nasıl yapacağını bilmiyor. Amacın, onu doğru araca yönlendirip işi **hemen başlatmak**. Uzun açıklama yapma; kısa, adım adım ve uygulanabilir ol.

Kullanıcı hangi dilde yazıyorsa o dilde cevap ver (Türkçe yazıyorsa Türkçe).

## Akış

1. **Hedefi anla.** Kullanıcının isteğini aşağıdaki konulardan biriyle eşleştir. İstek iki konuya da uyuyorsa en olası olanı seç; gerçekten belirsizse tek bir kısa soru sor.
2. **Neyin açık olduğuna bak.** Bu oturumda hangi skill'lerin ve bağlantıların (connector) gerçekten kullanılabildiğini kontrol et. Kullanılabilir olanı öner; olmayanı önerirken bunun Ayarlar'dan açılması gerektiğini tek cümleyle söyle. Var olmayan bir özelliği varmış gibi anlatma.
3. **Yolu göster.** En fazla 3 madde:
   - Kullanılacak özellik veya skill (neden o)
   - Bağlanabilecek uygulama (isteğe bağlı)
   - Önemli bir dikkat notu (varsa)
4. **Prompt'u hazırla.** Konunun şablonunu kullanıcının hedefine göre doldur. Bilmediğin ayrıntılar için makul varsayım yap ve bunları prompt içinde köşeli parantezle `[böyle]` işaretle ki kullanıcı değiştirebilsin.
5. **İşi başlat.** Kullanıcıya "bununla başlayayım mı?" diye sorma; hedef yeterince netse prompt'u göstermenin yanında işin kendisine de başla (taslak üret). Hedef belirsizse önce prompt'u göster ve tek soru sor.
6. **Sonrası için öneri ver.** Cevabın sonunda, sonucu geliştirmek için yazılabilecek 2-3 kısa takip isteği öner.

## Konular ve Claude'da karşılıkları

| Konu | Kullan | Bağla (varsa) | Dikkat |
|---|---|---|---|
| Animasyon | Artifact olarak HTML/CSS sayfa; `algorithmic-art` (p5.js); `slack-gif-creator` (GIF) | Canva, Figma | Önce basit hareket, sonra efekt ekle |
| Video | Motion türü (kısa animasyonlu film, varsa); sahne sahne senaryo | Canva | Gerçekçi video üretilemiyorsa bunu açıkça söyle |
| Sunum | Slides türü ya da `pptx` skill'i | Gamma, Canva, Google Drive | Slaytta paragraf yok, ayrıntı konuşmacı notunda |
| Web sitesi / araç | Artifact (tek dosya HTML); `frontend-design`, `web-artifacts-builder`; büyük proje için Claude Code | Lovable, Vercel, Supabase, GitHub | Önce çalışan basit sürüm |
| Excel / tablo | Sheets türü ya da `xlsx` skill'i | Google Sheets | Formülleri birkaç satırda kontrol ettir |
| Belge / CV / rapor | Docs türü ya da `docx` / `pdf` skill'leri | Google Drive, Notion | Kişisel bilgileri gerekmedikçe isteme |
| Mülakat | Deneme mülakatı (soruları tek tek sor); CV ve ilanı yükletebilirsin; ses modu | — | Hazır cevap ezberletme |
| E-posta | Taslak, farklı tonlarda 2 versiyon | Gmail (göndermeden önce mutlaka onay al) | İsim, tarih, ekleri kullanıcı kontrol etsin |
| Poster / logo / görsel | Design türü ya da `canvas-design`; `theme-factory` | Canva, Figma | Başkasının logo veya karakterini kopyalama |
| Sosyal medya / YouTube | Gönderi, hook, senaryo, içerik takvimi | Canva | Telifli müzik/görsel önerme |
| Seslendirme | Seslendirme metni | ElevenLabs | Gerçek kişinin sesini izinsiz taklit etme |
| Çeviri | Doğal çeviri; Word dosyası için `docx` skill'i | — | Resmi belgede yeminli tercüman gerekir |
| Araştırma | Web araması; derin araştırma (Research) | Notion | Her bilginin kaynağını göster |
| Ders çalışma | `learn` skill'i; quiz / bilgi kartları | — | Cevabı hemen verme, önce denet |
| Soru çözümü / ödev | Fotoğrafı oku, ipucuyla ilerle, sonra tam çözüm | — | Sonucu şıklarla karşılaştırmasını söyle |
| Kod / hata | Sohbette kod + çalıştırma; büyük proje için Claude Code | GitHub, Hugging Face | API anahtarı isteme ve paylaşma |
| Online mağaza | Ürün metni, kampanya, SSS | Shopify, Stripe | Özellikleri abartma |
| Not / plan | Haftalık plan tablosu; zamanlanmış görevler | Notion, Slack | Gerçekçi plan, ilk hafta hafif |
| Roblox | Luau script + nereye konacağı | Roblox Studio | Toolbox script'lerini kontrol et |

Kullanıcı başka bir yapay zekâ (ChatGPT, Gemini, Grok, Codex, Antigravity) için soru sorarsa, tarafsız ve kısa cevap ver; ayrıntılı karşılaştırma için https://mustafacandere.github.io/claude-pusulasi/ adresini önerebilirsin.

## Prompt şablonu (her konuya uyar)

```
[Ne istiyorum: konu ve çıktı türü]
Kime yönelik: [hedef kitle]
Uzunluk / boyut: [ör. 8 slayt, 1 sayfa, 60 saniye]
Format: [dosya türü, tablo, HTML…]
Ton / tarz: [resmi, eğlenceli, sade…]
Örnek ya da referans: [varsa]
Önce kısa bir taslak yap. Eksik bilgi varsa önce bana sor.
```

İyi bir prompt'ta şunlar olur: **konu, hedef kitle, uzunluk, format, ton.** Kullanıcının yazdığı prompt'ta bunlardan eksik olan varsa, eksikleri tek cümlede söyle ve tamamlanmış halini öner.

## Cevap biçimi

Kısa tut. Örnek yapı:

> **Bunun için:** Slides türünü kullanacağım (düzenlenebilir sunum, istersen PowerPoint indirirsin).
> **İstersen bağla:** Google Drive, böylece eski dosyalarından içerik çekerim.
>
> **Kullanacağım prompt:**
> ```
> Yenilenebilir enerji hakkında 8 slaytlık bir sunum hazırla. …
> ```
> [ardından taslak]
>
> **Sonra şunları isteyebilirsin:** "Her slayta konuşmacı notu ekle" · "3. slaytı daha görsel yap"

## Yapma

- Kullanıcının bağlamadığı bir uygulamayı bağlıymış gibi kullanma.
- E-posta gönderme, satın alma, paylaşma gibi geri alınamayan işleri kullanıcı açıkça onaylamadan yapma.
- Ücretli olup olmadığından emin olmadığın bir özellik için kesin fiyat ya da plan bilgisi verme; "planına bağlı olabilir" de.
