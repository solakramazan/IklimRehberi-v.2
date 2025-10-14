# 🌤️ React Hava Durumu Uygulaması

Modern ve kullanıcı dostu bir React hava durumu uygulaması. OpenWeatherMap API kullanarak gerçek zamanlı hava durumu bilgileri sunar.

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Özellikler

### 📊 Detaylı Hava Durumu Bilgileri
- ✅ Anlık sıcaklık
- ✅ Hissedilen sıcaklık
- ✅ Nem oranı (%)
- ✅ Rüzgar hızı (m/s)
- ✅ Atmosferik basınç (hPa)
- ✅ Görüş mesafesi (km)
- ✅ Bulutluluk oranı (%)

### 📅 5 Günlük Hava Tahmini
- Gelecek 5 günün detaylı tahmini
- Her gün için sıcaklık ve hava durumu ikonu
- Türkçe açıklamalar

### 📍 Konum Bazlı Otomatik Algılama
- Tarayıcı konum servislerini kullanır
- Tek tıkla bulunduğunuz yerin hava durumunu gösterir

### ⭐ Favori Şehirler
- İstediğiniz şehirleri favorilere ekleyin
- LocalStorage ile kalıcı saklama
- Tek tıkla hızlı erişim

### 🌡️ Sıcaklık Birimi Değiştirme
- Celsius (°C) ↔ Fahrenheit (°F)
- Tek buton ile geçiş
- Otomatik dönüştürme

### 🌙 Dark Mode
- Göz yormayan karanlık tema
- Aydınlık tema ile kolay geçiş
- Tercih otomatik kaydedilir

### 🎨 Hava Durumuna Göre Dinamik Arka Plan
- 🌞 Güneşli: Mavi tonlar
- ☁️ Bulutlu: Gri tonlar
- 🌧️ Yağmurlu: Koyu mavi tonlar
- ❄️ Karlı: Beyaz-mavi tonlar
- ⛈️ Fırtınalı: Siyah tonlar
- 🌫️ Sisli: Gri-lacivert tonlar

### ✨ Modern Tasarım ve Animasyonlar
- Yumuşak geçiş animasyonları
- Hover efektleri
- Responsive (mobil uyumlu) tasarım
- Glassmorphism efekti
- İkon animasyonları

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/solakramazan/react-hava-durumu.git
cd react-hava-durumu
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **API Anahtarı ayarlayın:**
- [OpenWeatherMap](https://openweathermap.org/api) sitesinden ücretsiz API anahtarı alın
- `src/App.jsx` dosyasında `apiKey` değişkenini güncelleyin:
```javascript
const apiKey = 'BURAYA_KENDI_API_ANAHTARINIZI_YAPISTIIRIN';
```

4. **Uygulamayı başlatın:**
```bash
npm run dev
```

5. **Tarayıcıda açın:**
```
http://localhost:5173
```

## 📖 Kullanım

### Şehir Arama
1. Arama kutusuna şehir adını yazın
2. "🔍 Ara" butonuna tıklayın veya Enter'a basın

### Konum Kullanma
1. 📍 butonuna tıklayın
2. Tarayıcı izni verin

### Favori Ekleme
1. Şehir adının yanındaki ☆ ikonuna tıklayın
2. Favori olarak ⭐ işaretlenir

### Sıcaklık Birimi Değiştirme
- Sağ üstteki °C veya °F butonuna tıklayın

### Tema Değiştirme
- Sağ üstteki ☀️ veya 🌙 butonuna tıklayın

## 🛠️ Teknolojiler

- **React 19.1.1** - UI Framework
- **Vite 7.1.7** - Build Tool
- **CSS3** - Stil ve Animasyonlar
- **OpenWeatherMap API** - Hava Durumu Verileri
- **LocalStorage** - Veri Saklama
- **Geolocation API** - Konum Servisleri

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda mükemmel çalışır:
- 📱 Mobil telefonlar
- 📱 Tabletler
- 💻 Masaüstü bilgisayarlar
- 🖥️ Geniş ekranlar

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview

# Linter çalıştır
npm run lint
```

## 📝 Notlar

- İnternet bağlantısı gereklidir
- Konum özelliği için tarayıcı izni gerekir
- Ücretsiz API günlük 1000 istek sınırına sahiptir

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında açık kaynaklıdır.

## 👨‍💻 Geliştirici

**Ramazan Solak**
- GitHub: [@solakramazan](https://github.com/solakramazan)

## 🙏 Teşekkürler

- [OpenWeatherMap](https://openweathermap.org/) - API sağladığı için
- [React](https://react.dev/) - Harika framework için
- [Vite](https://vitejs.dev/) - Hızlı build tool için

---

**⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!**

**Keyifli Kullanımlar! ☀️🌧️❄️**
