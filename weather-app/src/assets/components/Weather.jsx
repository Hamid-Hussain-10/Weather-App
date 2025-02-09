import { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherImage = (temp) => {
    if (temp < 0) {
      return "images/1.png";
    } else if (temp >= 0 && temp < 15) {
      return "images/2.png";
    } else if (temp >= 15 && temp < 25) {
      return "images/3.png";
    } else if (temp >= 25 && temp < 35) {
      return "images/4.png";
    } else {
      return "images/5.png";
    }
  };

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      if (error.response?.status === 404) {
        setError("City not found! Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
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
          onKeyPress={(e) => e.key === "Enter" && getWeather()}
        />
        <img
          src="images/search.png"
          alt="search"
          width="40"
          onClick={getWeather}
        />
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <>
          <div className="weather-img">
            <img
              src={getWeatherImage(weatherData.main.temp - 273.15)}
              alt="weather"
              width="180"
            />
            <h3>{weatherData.name}</h3>
            <p>🌡️ {(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
          </div>
          <div className="weather-info">
            <p>💨 {weatherData.wind.speed} Km/h</p>
            <p>💧 {weatherData.main.humidity}%</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
