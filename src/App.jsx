import React, { useState, useEffect } from 'react';
import './App.css';

const apiKey = '04f038dd451c170018192a4f6fcd3057';  // OpenWeatherMap API anahtarınız
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

function App() {
  const [city, setCity] = useState(''); 
  const [weather, setWeather] = useState(null); 
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // LocalStorage'dan favorileri yükle
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCities');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Dark mode değiştiğinde body class'ını güncelle
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  // Sıcaklık birimini değiştir
  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Dark mode'u değiştir
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Sıcaklık dönüştürme
  const convertTemp = (temp) => {
    if (isCelsius) {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9/5) + 32);
    }
  };

  // Favori ekleme/çıkarma
  const toggleFavorite = (cityName) => {
    let updatedFavorites;
    if (favorites.includes(cityName)) {
      updatedFavorites = favorites.filter(fav => fav !== cityName);
    } else {
      updatedFavorites = [...favorites, cityName];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  // Konum bazlı hava durumu
  const getLocationWeather = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=tr`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (response.ok) {
              setWeather(data);
              setCity(data.name);
              await fetchForecast(data.name);
              setError('');
            } else {
              setError('Konum bilgisi alınamadı.');
            }
          } catch (err) {
            setError('Veri alınırken bir hata oluştu.');
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError('Konum izni reddedildi.');
          setLoading(false);
        }
      );
    } else {
      setError('Tarayıcınız konum servislerini desteklemiyor.');
    }
  };

  // 5 günlük tahmin
  const fetchForecast = async (cityName) => {
    try {
      const url = `${forecastUrl}?q=${cityName}&appid=${apiKey}&units=metric&lang=tr`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        // Her günün öğlen verilerini al (12:00)
        const dailyForecasts = data.list.filter(item => 
          item.dt_txt.includes('12:00:00')
        ).slice(0, 5);
        setForecast(dailyForecasts);
      }
    } catch (err) {
      console.error('Tahmin verisi alınamadı:', err);
    }
  };

  // Arama fonksiyonu
  const handleSearch = async () => {
    if (!city) {
      setError('Lütfen bir şehir adı girin.');
      setWeather(null);
      setForecast(null);
      return;
    }

    setLoading(true);
    try {
      const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        await fetchForecast(city);
        setError('');
      } else {
        setError(data.message || 'Şehir bulunamadı.');
        setWeather(null);
        setForecast(null);
      }
    } catch (err) {
      setError('Veri alınırken bir hata oluştu.');
      setWeather(null);
      setForecast(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Enter tuşuna basınca arama yap
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Favori şehre tıklandığında
  const handleFavoriteClick = (favCity) => {
    setCity(favCity);
    // Otomatik arama için setTimeout kullan
    setTimeout(() => {
      document.querySelector('.search-button').click();
    }, 100);
  };

  // Hava durumuna göre arka plan sınıfı
  const getWeatherBackground = () => {
    if (!weather) return '';
    const condition = weather.weather[0].main.toLowerCase();
    
    if (condition.includes('clear')) return 'clear-sky';
    if (condition.includes('cloud')) return 'cloudy';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
    if (condition.includes('snow')) return 'snowy';
    if (condition.includes('thunder')) return 'stormy';
    if (condition.includes('mist') || condition.includes('fog')) return 'foggy';
    
    return '';
  };

  // Tarih formatla
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    return days[date.getDay()];
  };
  
  return (
    <div className={`weather-app ${getWeatherBackground()}`}>
      {/* Üst bar: Başlık ve kontroller */}
      <div className="header">
        <h1>🌤️ Hava Durumu Uygulaması</h1>
        <div className="controls">
          <button onClick={toggleUnit} className="control-btn" title="Sıcaklık birimini değiştir">
            {isCelsius ? '°C' : '°F'}
          </button>
          <button onClick={toggleDarkMode} className="control-btn" title="Tema değiştir">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Arama bölümü */}
      <div className="search-section">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Şehir adı girin..." 
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button onClick={handleSearch} className="search-button" disabled={loading}>
            {loading ? '⏳' : '🔍'} Ara
          </button>
          <button onClick={getLocationWeather} className="location-button" title="Konumumu kullan" disabled={loading}>
            📍
          </button>
        </div>
      </div>

      {/* Favori şehirler */}
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h3>⭐ Favori Şehirler</h3>
          <div className="favorites-list">
            {favorites.map((fav, index) => (
              <button 
                key={index} 
                className="favorite-chip"
                onClick={() => handleFavoriteClick(fav)}
              >
                {fav}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hata mesajı */}
      {error && <div className="error-message">❌ {error}</div>}

      {/* Yükleniyor göstergesi */}
      {loading && <div className="loading">Yükleniyor...</div>}

      {/* Mevcut hava durumu */}
      {weather && !loading && (
        <div className="weather-card">
          <div className="weather-main">
            <div className="weather-header">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <button 
                onClick={() => toggleFavorite(weather.name)}
                className="favorite-btn"
                title={favorites.includes(weather.name) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              >
                {favorites.includes(weather.name) ? '⭐' : '☆'}
              </button>
            </div>
            
            <div className="weather-current">
              <div className="temp-display">
                <span className="temp-value">{convertTemp(weather.main.temp)}</span>
                <span className="temp-unit">°{isCelsius ? 'C' : 'F'}</span>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                alt={weather.weather[0].description}
                className="weather-icon"
              />
            </div>
            
            <p className="weather-description">{weather.weather[0].description}</p>
            
            {/* Detaylı bilgiler */}
            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-icon">🌡️</span>
                <span className="detail-label">Hissedilen</span>
                <span className="detail-value">{convertTemp(weather.main.feels_like)}°{isCelsius ? 'C' : 'F'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <span className="detail-label">Nem</span>
                <span className="detail-value">{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <span className="detail-label">Rüzgar</span>
                <span className="detail-value">{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🔽</span>
                <span className="detail-label">Basınç</span>
                <span className="detail-value">{weather.main.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">👁️</span>
                <span className="detail-label">Görüş</span>
                <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">☁️</span>
                <span className="detail-label">Bulutluluk</span>
                <span className="detail-value">{weather.clouds.all}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5 günlük tahmin */}
      {forecast && !loading && (
        <div className="forecast-section">
          <h3>📅 5 Günlük Tahmin</h3>
          <div className="forecast-cards">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p className="forecast-day">{formatDate(day.dt)}</p>
                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                  alt={day.weather[0].description}
                />
                <p className="forecast-temp">
                  {convertTemp(day.main.temp)}°{isCelsius ? 'C' : 'F'}
                </p>
                <p className="forecast-desc">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;