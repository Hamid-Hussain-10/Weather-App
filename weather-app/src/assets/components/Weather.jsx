import { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (city) => {
    if (!city) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setWeatherData(response.data);
      setError(null);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("City not found! Please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src="/images/search.png"
          alt="search"
          width="40"
          onClick={getWeather}
        />
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <>
          <div className="weather-img">
            <img src="/images/1.png" alt="weather" width="180" />
            <h3>{weatherData.name}</h3>
            <p>🌡️ {weatherData.main.temp}°C</p>
          </div>
          <div className="weather-info">
            <p>☁️ {weatherData.main.humidity}%</p>
            <p>💨 {weatherData.wind.speed} Km/h</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
