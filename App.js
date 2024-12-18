import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [unit] = useState("metric");
  const [city] = useState("Saskatoon");
  const [weatherData, setWeatherData] = useState(null);

  const cities = [
    { name: "Saskatoon", temp: 15, temp_max: 20, temp_min: 10, humidity: 60, windSpeed: 5, description: "clear sky" },
  ];

  const getWeatherData = (selectedCity) => {
    const cityData = cities.find((city) => city.name === selectedCity);
    setWeatherData(cityData);
  };

  const getBackgroundClass = () => {
    if (!weatherData) return "default";
    const main = weatherData.description.toLowerCase();
    if (main.includes("clear")) return "sunny";
    return "default";
  };

  const displayTemperature = (temp) => {
    return unit === "metric" ? `${Math.round(temp)}°C` : `${Math.round((temp * 9) / 5 + 32)}°F`;
  };

  const displayWindSpeed = (windSpeed) => {
    return unit === "metric" ? `${Math.round(windSpeed)} km/h` : `${Math.round(windSpeed * 0.6213)} mph`;
  };

  if (!weatherData) getWeatherData(city);

  return (
    <div className={`app ${getBackgroundClass()}`}>
      <div className="container">
        <div className="weather-info">
          <h1>{weatherData ? weatherData.name : "Loading..."}</h1>
          <p>{weatherData ? weatherData.description : "Loading..."}</p>
          <p>Currently: {weatherData ? displayTemperature(weatherData.temp) : "Loading temperature..."}</p>
          <p>High: {weatherData ? displayTemperature(weatherData.temp_max) : "Loading..."} Low: {weatherData ? displayTemperature(weatherData.temp_min) : "Loading..."}</p>
          <p>Humidity: {weatherData ? `${weatherData.humidity}%` : "Loading..."}</p>
          <p>Wind: {weatherData ? displayWindSpeed(weatherData.windSpeed) : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default App;