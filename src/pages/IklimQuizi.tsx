import { useState, useMemo } from "react";

interface QuizQuestion {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const easyQuestions: QuizQuestion[] = [
    {
        question: "Sera etkisinin ana nedeni nedir?",
        options: ["Güneş patlamaları", "Atmosferdeki sera gazları", "Ozon tabakası", "Ay'ın çekim gücü"],
        correct: 1,
        explanation: "Sera gazları (CO₂, metan vb.) güneş ışınlarını hapsederek dünyayı ısıtır.",
    },
    {
        question: "Hangisi yenilenebilir enerji kaynağı DEĞİLDİR?",
        options: ["Güneş enerjisi", "Rüzgar enerjisi", "Doğal gaz", "Hidroelektrik"],
        correct: 2,
        explanation: "Doğal gaz fosil yakıttır ve yenilenebilir değildir.",
    },
    {
        question: "Dünya'nın ortalama sıcaklığı son 100 yılda yaklaşık ne kadar arttı?",
        options: ["0.1°C", "1.1°C", "5°C", "10°C"],
        correct: 1,
        explanation: "Son yüzyılda küresel ortalama sıcaklık yaklaşık 1.1°C artmıştır.",
    },
    {
        question: "Hangisi en güçlü sera gazıdır?",
        options: ["Karbondioksit", "Metan", "Su buharı", "Azot"],
        correct: 1,
        explanation: "Metan, CO₂'den yaklaşık 80 kat daha güçlü bir sera gazıdır (20 yıllık sürede).",
    },
    {
        question: "Paris İklim Anlaşması hangi yıl imzalandı?",
        options: ["2010", "2015", "2020", "2005"],
        correct: 1,
        explanation: "Paris İklim Anlaşması 2015 yılında imzalanmıştır.",
    },
    {
        question: "Aşağıdakilerden hangisi bir fosil yakıt DEĞİLDİR?",
        options: ["Kömür", "Petrol", "Biyokütle", "Doğal gaz"],
        correct: 2,
        explanation: "Biyokütle organik maddelerden elde edilen yenilenebilir bir enerji kaynağıdır.",
    },
    {
        question: "Geri dönüşüm sembolünde kaç ok bulunur?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "Geri dönüşüm sembolü üç oktan oluşur: toplama, işleme ve yeniden kullanım.",
    },
    {
        question: "Dünya Çevre Günü ne zaman kutlanır?",
        options: ["22 Nisan", "5 Haziran", "16 Eylül", "1 Ocak"],
        correct: 1,
        explanation: "Dünya Çevre Günü her yıl 5 Haziran'da kutlanır.",
    },
    {
        question: "Aşağıdakilerden hangisi su tasarrufu yöntemidir?",
        options: ["Uzun duş almak", "Damlatan musluğu tamir etmek", "Bahçeyi öğle saatinde sulamak", "Bulaşıkları akan suda yıkamak"],
        correct: 1,
        explanation: "Damlatan bir musluk yılda 11.000 litre su israfına yol açabilir, tamir etmek büyük tasarruf sağlar.",
    },
    {
        question: "Küresel ısınma hangi katmandaki gazların artışıyla ilgilidir?",
        options: ["Stratosfer", "Troposfer", "Mezosfer", "Termosfer"],
        correct: 1,
        explanation: "Troposfer, dünya yüzeyine en yakın katmandır ve hava olaylarının yaşandığı, sera gazlarının biriktiği katmandır.",
    },
    {
        question: "Aşağıdakilerden hangisi çevre dostu bir ulaşım yöntemidir?",
        options: ["Dizel araç", "Bisiklet", "SUV", "Uçak"],
        correct: 1,
        explanation: "Bisiklet, sıfır emisyonlu çevre dostu bir ulaşım aracıdır.",
    },
    {
        question: "Plastik poşetin doğada çözünmesi yaklaşık ne kadar sürer?",
        options: ["1 yıl", "10 yıl", "100 yıl", "500 yıl"],
        correct: 3,
        explanation: "Plastik poşetlerin doğada tamamen çözünmesi 500 yıl kadar sürebilir.",
    },
    {
        question: "Ormanlar neden 'dünyanın akciğerleri' olarak adlandırılır?",
        options: ["Güzel görünürleri", "CO₂ emerek O₂ üretirler", "Yağmur oluştururlar", "Rüzgarı keserler"],
        correct: 1,
        explanation: "Ormanlar fotosentez yoluyla CO₂ emerek oksijen üretir, bu yüzden dünyanın akciğerleri olarak anılır.",
    },
    {
        question: "Aşağıdakilerden hangisi sera gazı DEĞİLDİR?",
        options: ["Karbondioksit", "Metan", "Oksijen", "Azot oksit"],
        correct: 2,
        explanation: "Oksijen bir sera gazı değildir. CO₂, metan ve azot oksit başlıca sera gazlarıdır.",
    },
    {
        question: "Bir ağaç yılda ortalama ne kadar CO₂ emer?",
        options: ["2 kg", "22 kg", "220 kg", "2200 kg"],
        correct: 1,
        explanation: "Bir ağaç yılda ortalama 22 kg CO₂ emerek karbon döngüsüne katkıda bulunur.",
    },
    {
        question: "Asit yağmuru oluşmasının başlıca nedeni nedir?",
        options: ["Ozon tabakası", "Volkan patlaması", "Kükürt dioksit ve azot oksit emisyonları", "Deniz tuzluluğu"],
        correct: 2,
        explanation: "Fosil yakıtların yakılmasıyla atmosfere salınan SO₂ ve NOx, yağmur suyu ile birleşerek asit yağmuruna neden olur.",
    },
    {
        question: "Aşağıdakilerden hangisi biyoçeşitliliği tehdit eden en önemli faktördür?",
        options: ["Eğitim", "Habitat kaybı", "Turizm", "Tarım"],
        correct: 1,
        explanation: "Habitat kaybı, ormansızlaşma ve kentleşme biyoçeşitliliği tehdit eden en büyük faktördür.",
    },
    {
        question: "LED ampul, normal ampule göre ne kadar daha az enerji tüketir?",
        options: ["%10", "%30", "%60", "%80"],
        correct: 3,
        explanation: "LED ampuller, normal akkor ampullere göre %80'e kadar daha az enerji tüketir.",
    },
    {
        question: "Dünya üzerindeki suyun yüzde kaçı tatlı sudur?",
        options: ["%2.5", "%10", "%25", "%50"],
        correct: 0,
        explanation: "Dünya üzerindeki suyun sadece %2.5'i tatlı sudur ve bunun büyük kısmı buzullarda hapsolmuştur.",
    },
    {
        question: "Aşağıdakilerden hangisi karbon ayak izini azaltmanın bir yoludur?",
        options: ["Daha büyük araba almak", "Yerel ürünleri tercih etmek", "Klima sıcaklığını düşürmek", "Daha fazla et yemek"],
        correct: 1,
        explanation: "Yerel ürünleri tercih etmek, taşıma kaynaklı karbon emisyonlarını azaltarak karbon ayak izini düşürür.",
    },
];

const mediumQuestions: QuizQuestion[] = [
    {
        question: "Türkiye'nin toplam sera gazı emisyonunda en büyük pay hangi sektöre aittir?",
        options: ["Tarım", "Enerji", "Ulaşım", "Sanayi"],
        correct: 1,
        explanation: "Enerji sektörü, Türkiye'nin sera gazı emisyonlarının yaklaşık %72'sinden sorumludur.",
    },
    {
        question: "Permafrost nedir?",
        options: ["Bir buzul türü", "Kalıcı donmuş toprak", "Kutup ayısı türü", "Bir okyanus akıntısı"],
        correct: 1,
        explanation: "Permafrost, en az 2 yıl boyunca donmuş kalan toprak tabakasıdır. Erimesi büyük miktarda metan salar.",
    },
    {
        question: "Karbon ayak izi en yüksek olan gıda hangisidir?",
        options: ["Pirinç", "Tavuk", "Sığır eti", "Balık"],
        correct: 2,
        explanation: "Sığır eti üretimi, en yüksek karbon ayak izine sahip gıdadır (kg başına ~27 kg CO₂).",
    },
    {
        question: "'Karbon nötr' ne demektir?",
        options: [
            "Hiç karbon üretmemek",
            "Üretilen karbonu dengeleyecek kadar karbon emmek",
            "Sadece yenilenebilir enerji kullanmak",
            "Fosil yakıtları yasaklamak",
        ],
        correct: 1,
        explanation: "Karbon nötr, salınan CO₂ miktarı kadar absorbe ederek net sıfır emisyona ulaşmaktır.",
    },
    {
        question: "Ozon tabakasını incelten başlıca kimyasal nedir?",
        options: ["CO₂", "CFC (Kloroflorokarbon)", "Metan", "Nitrojen oksit"],
        correct: 1,
        explanation: "CFC gazları ozon tabakasını inceltir. Montreal Protokolü ile yasaklanmıştır.",
    },
    {
        question: "El Niño olayı nedir?",
        options: ["Bir fırtına türü", "Pasifik Okyanusu'ndaki sıcaklık artışı", "Buzul erimesi", "Volkanik patlama"],
        correct: 1,
        explanation: "El Niño, Pasifik Okyanusu'ndaki su sıcaklığının normalin üzerine çıkmasıyla oluşan küresel iklim olayıdır.",
    },
    {
        question: "Türkiye'de en yüksek güneş enerjisi potansiyeli hangi bölgededir?",
        options: ["Karadeniz", "Marmara", "Güneydoğu Anadolu", "Doğu Anadolu"],
        correct: 2,
        explanation: "Güneydoğu Anadolu Bölgesi, Türkiye'nin en yüksek güneş ışınımı alan bölgesidir.",
    },
    {
        question: "Montreal Protokolü neyi düzenler?",
        options: ["Sera gazı emisyonlarını", "Ozon tabakasını incelen maddeleri", "Nükleer silahları", "Deniz kirliliğini"],
        correct: 1,
        explanation: "1987 Montreal Protokolü, ozon tabakasını incelen CFC gibi maddelerin kullanımını yasaklamıştır.",
    },
    {
        question: "Yeşil çatı uygulaması ne işe yarar?",
        options: ["Binaları güzelleştirir", "Isı yalıtımı sağlar ve yağmur suyunu tutar", "Güneş paneli yerine geçer", "Sadece estetik amaçlıdır"],
        correct: 1,
        explanation: "Yeşil çatılar, doğal yalıtım sağlar, yağmur suyunu tutar, kentsel ısı adası etkisini azaltır ve biyoçeşitliliği destekler.",
    },
    {
        question: "Küresel ısınma son buzul çağından bu yana kaç derece artmıştır?",
        options: ["1-2°C", "4-7°C", "10-15°C", "20°C+"],
        correct: 1,
        explanation: "Son buzul çağından bu yana (~20.000 yıl) dünya ortalama sıcaklığı 4-7°C artmıştır. Şu an çok daha hızlı ısınıyoruz.",
    },
    {
        question: "Aşağıdakilerden hangisi karbon yakalama teknolojisidir?",
        options: ["Güneş paneli", "CCS (Karbon Yakalama ve Depolama)", "Rüzgar türbini", "Termostat"],
        correct: 1,
        explanation: "CCS, endüstriyel kaynaklardan CO₂'yi yakalayıp yeraltında depolayan bir teknolojidir.",
    },
    {
        question: "Hangisi sürdürülebilir kalkınma hedeflerinden (SDG) biri DEĞİLDİR?",
        options: ["Temiz su ve sanitasyon", "İklim eylemi", "Uzay keşfi", "Yaşam boyu öğrenme"],
        correct: 2,
        explanation: "BM'nin 17 Sürdürülebilir Kalkınma Hedefi arasında uzay keşfi yer almaz. İklim eylemi SDG 13'tür.",
    },
    {
        question: "Karbondioksit atmosferde ortalama ne kadar süre kalır?",
        options: ["10 yıl", "50 yıl", "100-300 yıl", "1000+ yıl"],
        correct: 2,
        explanation: "CO₂ atmosferde 100 ila 300 yıl kadar kalabilir, bu yüzden uzun vadeli etkileri vardır.",
    },
    {
        question: "Aşağıdakilerden hangisi iklim değişikliğinin tarıma etkisidir?",
        options: ["Verimlilik artışı", "Zararlı böceklerin azalması", "Hasat dönemlerinin kayması", "Daha fazla yağış"],
        correct: 2,
        explanation: "İklim değişikliği hasat dönemlerini kaydırır, kuraklık ve sel riskini artırarak tarımı olumsuz etkiler.",
    },
    {
        question: "Marmara Denizi'ndeki müsilaj probleminin iklim değişikliği ile ilişkisi nedir?",
        options: ["Hiç ilişkisi yok", "Artan su sıcaklıkları müsilaj oluşumunu tetikler", "Sadece kirlilikten kaynaklanır", "Depremlerle ilgili"],
        correct: 1,
        explanation: "Artan deniz suyu sıcaklıkları, nutrient kirliliği ile birleşerek müsilaj (deniz salyası) oluşumunu tetiklemektedir.",
    },
    {
        question: "Su ayak izi kavramı neyi ifade eder?",
        options: ["Ayağın suda bıraktığı iz", "Bir ürünün üretiminde harcanan toplam su", "Yağmur suyu miktarı", "Deniz seviyesi"],
        correct: 1,
        explanation: "Su ayak izi, bir ürünün üretim sürecinde doğrudan ve dolaylı olarak tüketilen toplam su miktarıdır.",
    },
    {
        question: "Kentsel ısı adası etkisi nedir?",
        options: ["Şehirlerin kırsal alanlara göre daha sıcak olması", "Adaların ısınması", "Isı pompası teknolojisi", "Volkanik ada oluşumu"],
        correct: 0,
        explanation: "Beton, asfalt ve bina yoğunluğu nedeniyle şehirler çevrelerindeki kırsal alanlardan 2-5°C daha sıcak olabilir.",
    },
    {
        question: "Fosil yakıtların yakılması atmosferdeki CO₂ seviyesini ne kadar artırdı?",
        options: ["% 10", "% 25", "% 50", "% 100+"],
        correct: 2,
        explanation: "Sanayi devrimi öncesi 280 ppm olan CO₂ seviyesi, bugün 420 ppm'e çıkmıştır – yaklaşık %50 artış.",
    },
    {
        question: "Hangi ülke dünyada en fazla güneş enerjisi üretmektedir?",
        options: ["ABD", "Almanya", "Çin", "Hindistan"],
        correct: 2,
        explanation: "Çin, toplam kurulu güneş enerjisi kapasitesinde dünya lideridir.",
    },
    {
        question: "Aşağıdakilerden hangisi iklim göçünün bir örneğidir?",
        options: ["Tatil amaçlı seyahat", "Kuraklık nedeniyle köyden şehre göç", "İş değişikliği", "Öğrenci değişimi"],
        correct: 1,
        explanation: "İklim göçü, çevre felaketleri veya yaşam koşullarının bozulması nedeniyle insanların yaşadıkları yerleri terk etmesidir.",
    },
];

const hardQuestions: QuizQuestion[] = [
    {
        question: "IPCC'nin 1.5°C raporuna göre, küresel emisyonlar 2030'a kadar yüzde kaç azaltılmalı?",
        options: ["%25", "%35", "%45", "%55"],
        correct: 2,
        explanation: "IPCC'ye göre 1.5°C hedefi için 2030'a kadar emisyonlar %45 azaltılmalıdır.",
    },
    {
        question: "Atmosferdeki CO₂ konsantrasyonu (2024) yaklaşık kaç ppm'dir?",
        options: ["280 ppm", "350 ppm", "420 ppm", "500 ppm"],
        correct: 2,
        explanation: "2024 itibarıyla atmosferik CO₂ yaklaşık 420 ppm seviyesindedir (sanayi öncesi: 280 ppm).",
    },
    {
        question: "Hangisi 'albedo etkisi' ile ilgilidir?",
        options: [
            "Okyanus asitlenmesi",
            "Yüzeyin güneş ışığını yansıtma oranı",
            "Rüzgar erozyonu",
            "Volkanik aktivite",
        ],
        correct: 1,
        explanation: "Albedo, bir yüzeyin güneş ışığını yansıtma yüzdesidir. Buzullar eridikçe albedo azalır ve ısınma hızlanır.",
    },
    {
        question: "Hangi ülke kişi başı en yüksek CO₂ emisyonuna sahiptir?",
        options: ["Çin", "ABD", "Katar", "Hindistan"],
        correct: 2,
        explanation: "Katar, kişi başı en yüksek CO₂ emisyonuna sahip ülkelerden biridir (~37 ton/kişi).",
    },
    {
        question: "Okyanuslar atmosferdeki CO₂'nin yaklaşık yüzde kaçını emer?",
        options: ["%5", "%15", "%25", "%50"],
        correct: 2,
        explanation: "Okyanuslar atmosferdeki CO₂'nin yaklaşık %25-30'unu emer, bu da okyanus asitlenmesine neden olur.",
    },
    {
        question: "Keeling Eğrisi neyi ölçer?",
        options: ["Deniz seviyesi", "Atmosferik CO₂ konsantrasyonu", "Ozon kalınlığı", "Buzul hacmi"],
        correct: 1,
        explanation: "Keeling Eğrisi, 1958'den beri Mauna Loa'da ölçülen atmosferik CO₂ konsantrasyonunu gösterir.",
    },
    {
        question: "Termohalin sirkülasyon nedir?",
        options: ["Atmosfer akıntısı", "Sıcaklık ve tuzluluk farkıyla oluşan okyanus akıntısı", "Volkanik akıntı", "Rüzgar akıntısı"],
        correct: 1,
        explanation: "Termohalin sirkülasyon, sıcaklık ve tuzluluk farklarıyla hareket eden derin okyanus akıntı sistemidir. İklim düzenlemesinde kritik rol oynar.",
    },
    {
        question: "Aşağıdakilerden hangisi iklim tipping point (devrilme noktası) örneğidir?",
        options: ["Elektrikli araç üretimi", "Amazon ormanlarının savana dönüşmesi", "Rüzgar türbini kurulumu", "Organik tarım"],
        correct: 1,
        explanation: "Amazon yağmur ormanlarının geri dönülemez şekilde savana dönüşmesi, iklim sistemi için kritik bir devrilme noktasıdır.",
    },
    {
        question: "Grönland buz tabakası tamamen erirse deniz seviyesi yaklaşık ne kadar yükselir?",
        options: ["1 metre", "3 metre", "7 metre", "15 metre"],
        correct: 2,
        explanation: "Grönland buz tabakası tamamen erirse deniz seviyesi yaklaşık 7 metre yükselir, bu milyarlarca insanı etkileyecektir.",
    },
    {
        question: "Okyanus asitlenmesi pH seviyesini sanayi devriminden bu yana ne kadar değiştirdi?",
        options: ["0.01 birim düştü", "0.1 birim düştü", "0.5 birim düştü", "1.0 birim düştü"],
        correct: 1,
        explanation: "Okyanus pH'ı 0.1 birim düşmüştür. Bu küçük görünse de logaritmik ölçekte %30 asitlenme anlamına gelir.",
    },
    {
        question: "Metanın atmosferdeki ömrü yaklaşık ne kadardır?",
        options: ["2 yıl", "12 yıl", "50 yıl", "100 yıl"],
        correct: 1,
        explanation: "Metan atmosferde yaklaşık 12 yıl kalır. CO₂'den kısa ömürlü olmasına rağmen çok daha güçlü bir sera gazıdır.",
    },
    {
        question: "Aşağıdakilerden hangisi negatif emisyon teknolojisidir?",
        options: ["Kömür santralı", "BECCS (Biyoenerji + Karbon Yakalama)", "Doğal gaz çevrimi", "Plastik üretimi"],
        correct: 1,
        explanation: "BECCS, biyokütle yakılarak enerji üretilirken açığa çıkan CO₂'nin yakalanıp depolanması teknolojisidir.",
    },
    {
        question: "Küresel iklim modellerinde kullanılan RCP senaryoları neyi temsil eder?",
        options: ["Nüfus artışı", "Sera gazı yoğunluğu yolları", "Ekonomik kalkınma", "Teknolojik gelişme"],
        correct: 1,
        explanation: "RCP (Representative Concentration Pathways), farklı sera gazı emisyon senaryolarını ve bunların iklim üzerindeki etkilerini modellemek için kullanılır.",
    },
    {
        question: "Küresel ortalama sıcaklık 2°C artarsa mercan resiflerinin yüzde kaçı yok olma riski altındadır?",
        options: ["%50", "%70", "%90", "%99+"],
        correct: 3,
        explanation: "IPCC'ye göre 2°C ısınma senaryosunda mercan resiflerinin %99'undan fazlası yok olma riski altındadır.",
    },
    {
        question: "Karbondioksitin eşdeğeri olarak kullanılan CO₂e birimi neyi ifade eder?",
        options: ["Sadece CO₂ miktarı", "Tüm sera gazlarının CO₂ cinsinden toplam etkisi", "Oksijen miktarı", "Hava kalitesi endeksi"],
        correct: 1,
        explanation: "CO₂e, farklı sera gazlarının (metan, N₂O vb.) küresel ısınma potansiyeline göre CO₂ eşdeğerine çevrilmiş toplam etkisini ifade eder.",
    },
    {
        question: "Sürdürülebilir Kalkınma Hedefi 13 (SDG 13) neyi kapsar?",
        options: ["Sağlık", "Eğitim", "İklim eylemi", "Su temizliği"],
        correct: 2,
        explanation: "SDG 13 'İklim Eylemi', iklim değişikliği ve etkileriyle mücadele için acil önlem alınmasını hedefler.",
    },
    {
        question: "Aşağıdakilerden hangisi Scope 3 emisyon kategorisine girer?",
        options: ["Fabrika bacası emisyonu", "Şirket aracı emisyonu", "Tedarik zinciri emisyonları", "Ofis ısıtma emisyonu"],
        correct: 2,
        explanation: "Scope 3, bir kuruluşun dolaylı emisyonlarını kapsar: tedarik zinciri, çalışan ulaşımı, ürün yaşam döngüsü vb.",
    },
    {
        question: "Buzul buzuyla kaplı alanlar (kriyosfer) dünya yüzeyinin yaklaşık yüzde kaçını kaplar?",
        options: ["%5", "%10", "%15", "%20"],
        correct: 1,
        explanation: "Kriyosfer, dünya yüzeyinin yaklaşık %10'unu kaplar ve iklim sistemi için kritik bir düzenleyici rol oynar.",
    },
    {
        question: "Aşağıdaki geri bildirim mekanizmalarından hangisi ısınmayı hızlandıran pozitif geri bildirimdir?",
        options: ["Buharlaşmanın artmasıyla bulut oluşumu", "Buzul erimesiyle albedo azalması", "Bitki örtüsünün artmasıyla CO₂ emilimi", "Okyanus sirkülasyonunun güçlenmesi"],
        correct: 1,
        explanation: "Buz eridikçe açığa çıkan koyu yüzey daha fazla güneş ışığı emer, bu daha fazla erime ve ısınmaya neden olur (buz-albedo geri bildirimi).",
    },
    {
        question: "İklim değişikliğinin insan sağlığına etkilerinden hangisi en yaygındır?",
        options: ["Soğuk kaynaklı hastalıkların artması", "Sıcak dalgalarından kaynaklı ölümler", "Uzay radyasyonu", "Manyetik alan değişimi"],
        correct: 1,
        explanation: "Sıcak dalgaları iklim değişikliğinin en doğrudan sağlık etkisidir. DSÖ'ye göre her yıl yüz binlerce kişiyi etkilemektedir.",
    },
];

type Difficulty = "easy" | "medium" | "hard";

const difficultyMap: Record<Difficulty, { label: string; questions: QuizQuestion[]; color: string, icon: string, desc: string }> = {
    easy: { label: "Temel", questions: easyQuestions, color: "text-primary", icon: "eco", desc: "İklim değişikliği ve çevre bilinci hakkında temel kavramlar." },
    medium: { label: "İleri Seviye", questions: mediumQuestions, color: "text-amber-400", icon: "public", desc: "Küresel etkiler, politikalar ve iklim sistemleri detayları." },
    hard: { label: "Uzman", questions: hardQuestions, color: "text-rose-400", icon: "science", desc: "Karmaşık iklim modelleri, raporlar ve kimyasal süreçler." },
};

export default function IklimQuizi() {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [finished, setFinished] = useState(false);

    // Get 10 random questions from the selected difficulty pool
    const questions = useMemo(() => {
        if (!difficulty) return [];
        const shuffled = [...difficultyMap[difficulty].questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10);
    }, [difficulty]);

    const handleSelect = (idx: number) => {
        if (selected !== null) return;
        setSelected(idx);
        if (idx === questions[currentQ].correct) {
            setScore((s) => s + 1);
        }
        setShowResult(true);
    };

    const nextQuestion = () => {
        if (currentQ + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrentQ((q) => q + 1);
            setSelected(null);
            setShowResult(false);
        }
    };

    const restart = () => {
        setDifficulty(null);
        setCurrentQ(0);
        setScore(0);
        setSelected(null);
        setShowResult(false);
        setFinished(false);
    };

    // Difficulty Selection
    if (!difficulty) {
        return (
            <div className="w-full">
                <main className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col gap-12">
                    <header className="text-center md:text-left animate-fade-in-up">
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 font-headline">
                            Meydan Okuma
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface mb-6">
                            İklim <span className="text-primary-container">Nabzı</span> Bilgi Yarışması
                        </h1>
                        <p className="text-xl text-on-surface-variant max-w-2xl font-body">İklim krizi hakkındaki bilginizi test edin. Kendinize en uygun seviyeyi seçin ve 10 soruluk testi tamamlayarak puanları toplayın.</p>
                    </header>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                        {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                            <button
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className="glass-card p-10 rounded-2xl border border-outline-variant/30 hover:border-primary/50 text-left group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(107,255,143,0.2)] text-on-surface cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full border border-primary/10 group-hover:bg-primary/10 transition-colors"></div>
                                <div className="mb-6">
                                    <span className={`material-symbols-outlined text-5xl ${difficultyMap[d].color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                        {difficultyMap[d].icon}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 font-headline">{difficultyMap[d].label} Seviye</h3>
                                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed line-clamp-3">{difficultyMap[d].desc}</p>
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                                    <span>Başla</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    // Finished
    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        return (
            <div className="w-full">
                <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center gap-12 text-center animate-scale-in">
                    <div className="glass-card w-full p-12 md:p-20 rounded-3xl border border-primary/30 shadow-[0_0_50px_rgba(107,255,143,0.1)] relative overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
                        
                        <span className="material-symbols-outlined text-8xl text-primary mb-6 drop-shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {pct >= 80 ? 'trophy' : pct >= 50 ? 'thumb_up' : 'school'}
                        </span>
                        
                        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface mb-4">
                            {pct >= 80 ? "Mükemmel!" : pct >= 50 ? "İyi İş!" : "Çalışmaya Devam!"}
                        </h1>
                        <p className="text-xl text-on-surface-variant mb-12">Seviye: {difficultyMap[difficulty].label}</p>
                        
                        <div className="flex justify-center gap-12 mb-16">
                            <div>
                                <div className="text-6xl font-black text-primary font-headline mb-2">{score}<span className="text-3xl text-on-surface-variant">/10</span></div>
                                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Doğru Cevap</div>
                            </div>
                            <div>
                                <div className="text-6xl font-black text-secondary font-headline mb-2">%{pct}</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Başarı Oranı</div>
                            </div>
                        </div>

                        <button
                            onClick={restart}
                            className="bg-gradient-to-b from-primary to-primary-container text-on-primary px-10 py-5 rounded-full font-black tracking-tight hover:shadow-[0_0_30px_rgba(107,255,143,0.4)] transition-all duration-300 active:scale-95 cursor-pointer text-lg"
                        >
                            Yeni Bir Oyun Oyna
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    // Quiz Area
    const q = questions[currentQ];
    const letters = ['A', 'B', 'C', 'D'];
    const currentProgress = ((currentQ + 1) / questions.length) * 100;

    return (
        <div className="w-full">
            <main className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col gap-12">
                
                {/* Quiz Header & Progress */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
                    <div className="flex-1">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-primary-dim mb-2 block">Seviye: {difficultyMap[difficulty].label}</span>
                        <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-on-surface">
                            İklim <span className="text-primary-container">Nabzı</span>
                        </h1>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 min-w-[240px]">
                        <div className="flex justify-between w-full text-sm font-bold text-on-surface-variant font-headline">
                            <span>İlerleme</span>
                            <span>{Math.round(currentProgress)}%</span>
                        </div>
                        <div className="w-full h-3 bg-surface-container-highest border border-outline-variant/10 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-primary-container to-primary-fixed shadow-[0_0_15px_rgba(107,255,143,0.5)] transition-all duration-700 ease-out"
                                style={{ width: `${currentProgress}%` }}
                            ></div>
                        </div>
                    </div>
                </header>

                {/* Main Interaction Area */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    
                    {/* Question Canvas */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        <div className="surface-container p-8 md:p-12 rounded-2xl relative overflow-hidden group border border-outline-variant/30 shadow-2xl">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full blur-[80px] group-hover:bg-primary-container/20 transition-all duration-700"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-black border border-primary/20 font-headline">
                                        {String(currentQ + 1).padStart(2, '0')}
                                    </div>
                                    <span className="text-on-surface-variant font-bold font-headline">{questions.length} Sorudan {currentQ + 1}.</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-12 text-on-surface font-headline">
                                    {q.question}
                                </h2>

                                {/* Answers Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((opt, i) => {
                                        let btnClass = "border-outline-variant/50 hover:border-primary/40 hover:bg-surface-variant/50";
                                        let letterClass = "bg-surface-container-highest group-hover:bg-primary-container group-hover:text-on-primary";
                                        let textClass = "text-on-surface";
                                        
                                        if (showResult) {
                                            if (i === q.correct) {
                                                btnClass = "border-primary/60 bg-primary-container/10 shadow-[0_0_20px_rgba(107,255,143,0.15)]";
                                                letterClass = "bg-primary-container text-on-primary";
                                                textClass = "text-primary font-bold";
                                            } else if (i === selected) {
                                                btnClass = "border-error/60 bg-error-container/10 shadow-[0_0_20px_rgba(255,115,81,0.15)]";
                                                letterClass = "bg-error text-on-error";
                                                textClass = "text-error font-bold";
                                            } else {
                                                btnClass = "border-outline-variant/20 opacity-50";
                                                letterClass = "bg-surface-container-highest";
                                                textClass = "text-on-surface-variant";
                                            }
                                        }

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleSelect(i)}
                                                disabled={showResult}
                                                className={`glass-card p-5 md:p-6 rounded-xl text-left border relative overflow-hidden group transition-all duration-300 active:scale-[0.98] cursor-pointer ${btnClass} ${!showResult && "biolume-glow"}`}
                                            >
                                                <div className="flex items-center gap-4 relative z-10">
                                                    <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-sm transition-colors font-headline ${letterClass}`}>
                                                        {letters[i]}
                                                    </span>
                                                    <span className={`text-sm md:text-base ${textClass}`}>{opt}</span>
                                                </div>
                                                
                                                {showResult && i === selected && (
                                                    <div className={`mt-4 pt-4 border-t ${i === q.correct ? 'border-primary/20 text-primary' : 'border-error/20 text-error'} flex items-center gap-2 text-[10px] font-black uppercase tracking-widest`}>
                                                        <span className="material-symbols-outlined text-sm">
                                                            {i === q.correct ? 'check_circle' : 'cancel'}
                                                        </span> 
                                                        {i === q.correct ? 'DOĞRU CEVAP' : 'YANLIŞ CEVAP'}
                                                    </div>
                                                )}
                                                {showResult && i === q.correct && i !== selected && (
                                                    <div className="mt-4 pt-4 border-t border-primary/20 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                                                        <span className="material-symbols-outlined text-sm">check_circle</span> DOĞRU CEVAP
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between">
                            <div className="flex-1"></div>
                            {showResult && (
                                <button 
                                    onClick={nextQuestion}
                                    className="bg-gradient-to-b from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-xl font-black tracking-tight biolume-glow transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-3 animate-fade-in"
                                >
                                    {currentQ + 1 >= questions.length ? "Sonuçları Göster" : "Sonraki Soruya Geç"}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        
                        {/* Score Card */}
                        <div className="surface-container p-6 rounded-2xl border-l-4 border-primary shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg font-headline">Mevcut Skor</h3>
                                <span className="material-symbols-outlined text-primary-dim" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-on-surface font-headline">{score * 100}</span>
                                <span className="text-primary font-bold text-sm uppercase tracking-widest">XP</span>
                            </div>
                            <div className="mt-6 pt-6 border-t border-outline-variant/20">
                                <div className="flex flex-col gap-1 text-sm text-on-surface-variant">
                                    <div className="flex justify-between">
                                        <span>Doğru:</span>
                                        <span className="font-bold text-on-surface">{score}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Yanlış:</span>
                                        <span className="font-bold text-on-surface">{showResult ? (currentQ + 1) - score : currentQ - score}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fact Card (Dynamic Explanation) */}
                        <div className={`surface-container-highest p-6 rounded-2xl relative overflow-hidden transition-all duration-500 border ${showResult ? (selected === q.correct ? 'border-primary/50 bg-primary/5' : 'border-error/50 bg-error/5') : 'border-outline-variant/10'}`}>
                            <div className="relative z-10">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${showResult ? (selected === q.correct ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error') : 'bg-surface-variant text-on-surface-variant'}`}>
                                    <span className="material-symbols-outlined">
                                        {showResult ? (selected === q.correct ? 'task_alt' : 'error') : 'lightbulb'}
                                    </span>
                                </div>
                                <h4 className="font-bold mb-3 font-headline text-lg">
                                    {showResult ? "Açıklama" : "İpucu Zamanı"}
                                </h4>
                                <p className="text-sm leading-relaxed text-on-surface-variant min-h-[80px]">
                                    {showResult ? q.explanation : "Soruyu dikkatlice okuyun. Emin olmadığınız cevapları elemek doğru sonuca ulaşmanızı kolaylaştırır."}
                                </p>
                            </div>
                        </div>

                        {/* Visual Connector / Gallery */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="aspect-square rounded-xl overflow-hidden glass-card group border border-outline-variant/10">
                                <img alt="Nature aesthetic" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfoxEHDtSy8xML_2_0ovGjaWAzya3DNZu9mOUo5oIy32quxoDdTOyBX0L-QfzP7HS-4fmXIQ-b3gP44ThJkwaK84n6fLpjDsmFN3x3LvGMVyjacFdhkRN6vEA9gl0jjM__V81Hq0VC9tKrurRNFkXlQ6f7-zmFa2pydyuNkzUsnbX5aTi9HrO5ZjjRwi--rjc3SxxK7Vn485uf1MIkyXIhz7ogYJmX7is_l3mkiZ8KZivImXYfKV5hewGgXzp2abiowidCzZePe94"/>
                            </div>
                            <div className="aspect-square rounded-xl overflow-hidden glass-card group border border-outline-variant/10">
                                <img alt="Nature aesthetic 2" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClaaz0CvIAX5DMjJcXJkKkbiYKHpV3nb2ADzD9JacZ1knXn6Iqkhe8Cr_8LiSWgV8Wt8WQbIapyO6-unmNMnur_o3g0KRtvyflNYfTPmy63j2kAuaVekYdqVmLw38CORNjz80plEbdlF3gpie9Lticp4pPQ7R6R5Ewy0Zo-GDj7bqmZKe1YLSuUOH4pEwhn66ho9E2u4F_VWovHB2efihRyaZS_O63YWPN-Ao2J1GqIR5bwz-OpOb3fNzGgbnmIPewkzkT82NxAWY"/>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}
