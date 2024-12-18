import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [unit, setUnit] = useState("metric");
  const [city, setCity] = useState("Saskatoon");
  const [weatherData, setWeatherData] = useState(null);

  const cities = [
    { name: "Saskatoon", temp: 15, temp_max: 20, temp_min: 10, humidity: 60, windSpeed: 25, description: "clear sky" },
    { name: "Toronto", temp: 25, temp_max: 28, temp_min: 18, humidity: 63, windSpeed: 6, description: "partly cloudy" },
    { name: "Regina", temp: 14, temp_max: 18, temp_min: 4, humidity: 46, windSpeed: 48, description: "tornado" },
    { name: "Vancouver", temp: 18, temp_max: 22, temp_min: 14, humidity: 70, windSpeed: 4, description: "light rain" },
    { name: "Calgary", temp: 12, temp_max: 16, temp_min: 7, humidity: 77, windSpeed: 7, description: "snowy" },
    { name: "Ohio", temp: 24, temp_max: 36, temp_min: 24, humidity: 55, windSpeed: 17, description: "thunder" },
  ];

  const getWeatherData = (selectedCity) => {
    const cityData = cities.find((city) => city.name === selectedCity);
    setWeatherData(cityData);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    getWeatherData(selectedCity);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const getBackgroundClass = () => {
    if (!weatherData) return "default";
    const main = weatherData.description.toLowerCase();
    if (main.includes("cloud")) return "cloudy";
    if (main.includes("rain")) return "rainy";
    if (main.includes("snow")) return "snowy";
    if (main.includes("clear")) return "sunny";
    if (main.includes("thunder")) return "thunder";
    if (main.includes("tornado")) return "tornado";
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
        <div className="city-selector">
          <select onChange={handleCityChange} value={city}>
            {cities.map((cityOption) => (
              <option key={cityOption.name} value={cityOption.name}>
                {cityOption.name}
              </option>
            ))}
          </select>
        </div>
          <h1>{weatherData ? weatherData.name : "Loading...."}</h1>
          <p>{weatherData ? weatherData.description : "Loading..."}</p>
          <p>Currently: {weatherData ? displayTemperature(weatherData.temp) : "Loading temperature..."}</p>
          <p>High: {weatherData ? displayTemperature(weatherData.temp_max) : "Loading..."} Low: {weatherData ? displayTemperature(weatherData.temp_min) : "Loading..."}</p>
          <p>Humidity: {weatherData ? `${weatherData.humidity}%` : "Loading..."}</p>
          <p>Wind: {weatherData ? displayWindSpeed(weatherData.windSpeed) : "Loading..."}</p>
          <button onClick={toggleUnit} className="unit-toggle">
            Switch Units
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
