import React, { useState } from "react";
import './App.css'; // Import the App.css for styling

const Weather = () => {
  const [city, setCity] = useState(""); // Stores the city input
  const [weather, setWeather] = useState(null); // Stores fetched weather data
  const [error, setError] = useState(null); // Stores any error messages

  const apiKey = "30795c11ee13db428b1c8fc3abd912a6"; // Replace with your OpenWeather API key

  // Fetch weather data based on the city input
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data); // Store weather data
      setError(null); // Clear previous errors
    } catch (error) {
      setError(error.message); // Set error if API call fails
      setWeather(null); // Clear previous weather data
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (city.trim() !== "") {
      fetchWeather(); // Fetch weather for the entered city
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="weather-input"
        />
        <button type="submit" className="weather-button">Get Weather</button>
      </form>
      
      {error && <p className="error-message">{error}</p>}

      {weather && (
        <div className="weather-details">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
