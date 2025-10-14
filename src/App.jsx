import React, { useState } from 'react';
import './App.css';

// 1. API anahtarımızı ve temel URL'yi bir değişken olarak tanımlayalım.
const apiKey = '04f038dd451c170018192a4f6fcd3057'; // ÖNEMLİ!
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [city, setCity] = useState(''); 
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  // 2. Arama fonksiyonunu async olarak güncelledik.
  const handleSearch = async () => {
    if (!city) {
      // Eğer arama kutusu boşsa hata ver.
      setError('Lütfen bir şehir adı girin.');
      setWeather(null);
      return;
    }

    try {
      // 3. API'ye bağlanmak için tam URL'yi oluşturuyoruz.
      // `&units=metric` sıcaklığı Santigrat olarak getirir.
      // `&lang=tr` açıklamaları Türkçe getirir.
      const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
      
      // 4. API'ye isteği gönderiyoruz.
      const response = await fetch(url);
      const data = await response.json();

      // 5. API'den gelen cevabı kontrol ediyoruz.
      if (response.ok) { // `response.ok` veya `data.cod === 200` da olur.
        setWeather(data); // Gelen veriyi weather state'ine kaydet.
        setError('');     // Önceki hataları temizle.
      } else {
        // Eğer API şehir bulunamadı gibi bir hata dönerse
        setError(data.message || 'Şehir bulunamadı.');
        setWeather(null);
      }
    } catch (err) {
      // 6. İnternet bağlantısı gibi bir ağ hatası olursa
      setError('Veri alınırken bir hata oluştu.');
      setWeather(null);
      console.error(err);
    }
  };
  
  return (
    <div className="weather-app">
      <h1>Hava Durumu Uygulaması</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Şehir adı girin..." 
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Ara</button>
      </div>

      {/* 7. Hata varsa hata mesajını göster */}
      {error && <p className="error-message">{error}</p>}

      {/* 8. Hava durumu verisi varsa bilgileri göster */}
      {weather && (
        <div className="weather-card">
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description} 
          />
        </div>
      )}
    </div>
  );
}

export default App;