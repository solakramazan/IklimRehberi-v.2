React ile Hava Durumu Uygulaması

Bu proje, kullanıcıların istedikleri şehrin anlık hava durumu bilgilerini görmelerini sağlayan, OpenWeatherMap API'ı ile entegre çalışan modern bir web uygulamasıdır. React'in temel hook'ları ve asenkron JavaScript yetenekleri kullanılarak geliştirilmiştir.

🎯 Projenin Çalışma Prensibi

Uygulamanın işleyişi temel olarak aşağıdaki adımları takip eder:
1. Kullanıcı Etkileşimi: Kullanıcı, arayüzdeki input alanına bir şehir adı girer. Girilen bu değer, React'in useState hook'u ile anlık olarak bir state içerisinde saklanır.
2. API İsteği: Kullanıcı "Ara" butonuna tıkladığında, async/await yapısı kullanılarak OpenWeatherMap API'ına bir fetch isteği gönderilir. Bu istek, kullanıcının girdiği şehir adını ve kişisel API anahtarını içerir. Sonuçların Santigrat (units=metric) ve Türkçe (lang=tr) gelmesi için gerekli parametreler de URL'e eklenir.
3. Veri İşleme: API'den dönen JSON formatındaki veri işlenir.
	- Başarılı Durum: Eğer istek başarılıysa ve API geçerli bir veri dönerse (response.ok), gelen hava durumu bilgileri (şehir adı, sıcaklık, açıklama, ikon kodu vb.) weather state'ine aktarılır. Aynı anda, daha önce gösterilmiş olabilecek hata mesajları error state'i temizlenerek kaldırılır.
	- Hatalı Durum: Eğer API geçersiz bir şehir adı gibi bir hata dönerse (404 Not Found), API'nin hata mesajı error state'ine aktarılır ve weather state'i temizlenir.
4. Arayüz Güncellemesi (Render): React'in reaktif yapısı sayesinde, weather veya error state'i güncellendiği anda arayüz otomatik olarak yeniden render edilir. JSX içerisindeki koşullu render ({weather && ...} ve {error && ...}) mantığı sayesinde, sadece ilgili veri mevcut olduğunda ilgili bileşen (hava durumu kartı veya hata mesajı) ekrana çizilir.

🛠️ Kullanılan Teknolojiler ve Araçlar

- Frontend:
	- React: Modern ve bileşen tabanlı kullanıcı arayüzleri oluşturmak için kullanıldı.
	- React Hooks (useState): Uygulama içerisindeki durumları (şehir, hava durumu verisi, hata mesajı) yönetmek için kullanıldı.
	- JavaScript (ES6+): Asenkron işlemler için async/await ve fetch API gibi modern JavaScript özellikleri kullanıldı.
	- HTML5 & CSS3: Uygulamanın temel yapısı ve modern stil özellikleri (Flexbox, gölgeler, geçişler) için kullanıldı.
- API:
	- OpenWeatherMap API: Anlık hava durumu verilerini çekmek için kullanıldı.
- Proje Kurulumu ve Geliştirme Ortamı:
	- Vite: Hızlı ve modern bir geliştirme sunucusu ve proje oluşturma aracı olarak kullanıldı.
	- npm: Paket yönetimi için kullanıldı.

💡 Yapımda Karşılaşılan Zorluklar ve Öğrenimler

Bu projenin geliştirilmesi sırasında karşılaşılan temel zorluklar ve bu zorlukların getirdiği değerli öğrenimler şunlardır:
1. Asenkron Veri Yönetimi:
	- Zorluk: API'den veri çekme işlemlerinin asenkron doğasını yönetmek ve verinin ne zaman geleceğini bilmeden arayüzü buna göre hazırlamak.
	- Öğrenim: Bu proje sayesinde Promise yapısını ve async/await kullanımını uygulamalı olarak pekiştirdim. Bir API isteğinin başarılı, hatalı veya beklemede olma durumlarını try...catch blokları ile yönetmenin önemini kavradım. Özellikle ağ hatalarını (internet kopması gibi) ve API'den dönen hataları (örn: 404 Şehir Bulunamadı) ayrıştırarak kullanıcıya anlamlı geri bildirimler sunmanın, kullanıcı deneyimini ne kadar iyileştirdiğini gördüm.
2. Koşullu Arayüz (Conditional Rendering):
	- Zorluk: Uygulamanın farklı durumlarına (ilk açılış, veri yüklendi, hata oluştu) göre arayüzde farklı bileşenler göstermek.
	- Öğrenim: React'in en güçlü yanlarından biri olan koşullu render etme mantığını useState ile birleştirerek etkin bir şekilde kullandım. {weather && ...} ve {error && ...} gibi kısa ve okunaklı JSX ifadeleriyle, sadece ilgili veri mevcut olduğunda ilgili bileşenin ekrana çizilmesini sağlayarak temiz, hatasız ve dinamik bir arayüz oluşturdum. Bu, uygulamanın daha profesyonel ve sağlam çalışmasını sağladı.
