import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import clear from "../assets/clear.png";
import rain from "../assets/rain.png";
import clouds from "../assets/clouds.png";
import mist from "../assets/mist.png";
import drizzle from "../assets/drizzle.png";
import snow from "../assets/snow.png";

const Weather = () => {
  const [input, setInput] = useState(""); // Input city
  const [weather, setWeather] = useState(null); // Weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [history, setHistory] = useState([]); // History state

  const API_KEY = "d47c6bfcc5adf4202a2a5582db156d62";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return clear;
      case "Clouds":
        return clouds;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Mist":
        return mist;
      case "Drizzle":
        return drizzle;
      default:
        return clear; // Default image
    }
  };

  // Fetch weather data
  const fetchWeather = async () => {
    if (!input) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error
    setWeather(null); // Clear previous weather data

    try {
      const response = await fetch(
        `${API_URL}?q=${input}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }
      const data = await response.json();
      setWeather(data);

      // Update history, ensuring no duplicates and limit to 5 items
      setHistory((prevHistory) => {
        const cityExists = prevHistory.some(
          (item) => item.name.toLowerCase() === data.name.toLowerCase()
        );
        if (!cityExists) {
          const updatedHistory = [
            ...prevHistory,
            { name: data.name, temp: data.main.temp },
          ];
          return updatedHistory.slice(-5); // Keep only the last 5 items
        }
        return prevHistory;
      });

      setInput("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="max-w-sm mx-auto flex flex-col justify-center items-center py-8">
      {/* Header */}
      <div className="text-6xl font-bold mb-8 text-stone-950">
        <h1>Weather App</h1>
      </div>
      {/* Input and Button */}
      <div className="mt-3 p-4 border border-gray-800 shadow-black shadow-lg  flex items-center rounded-md bg-red-200">
        <input
          className="border border-gray-800 rounded-xl p-4 text-xl w-full"
          type="text"
          placeholder="Enter the city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
        />
        <button
          className="pl-4"
          onClick={fetchWeather}
          aria-label="Search Weather"
        >
          <FaSearch className="p-2 text-5xl hover:border hover:border-gray-900 rounded-lg" />
        </button>
      </div>
      {/* Loading, Error, and Weather Display */}
      {loading && <p className="text-xl mt-4">Loading...</p>}
      {error && <p className="text-lg text-red-700 mt-4">{error}</p>}

      {weather && (
        <div className="mt-8 py-4 px-8 border-gray-900  shadow-black shadow-lg border-2 bg-indigo-300 flex flex-col items-center rounded-lg">
          <h1 className="text-6xl font-bold">{weather.name}</h1>
          <p className="text-4xl mt-2">{Math.round(weather.main.temp)}°C</p>
          <img
            className="h-24 mt-4"
            src={getWeatherImage(weather.weather[0].main)}
            alt="Weather Icon"
          />
          <h2 className="text-2xl mt-2 font-semibold">
            {weather.weather[0].main}
          </h2>
          <h2 className="text-xl mt-2 font-semibold">
            Humidity: {weather.main.humidity}%
          </h2>
          <h2 className="text-xl mt-2 font-semibold">
            Wind: {weather.wind.speed} km/h
          </h2>
        </div>
      )}

      {/* History Section */}
      <div className="mt-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Search History:</h2>
        <ul className="bg-gray-200 p-4 rounded-lg">
          {history.length === 0 && (
            <p className="text-gray-500">No history yet. Search for a city!</p>
          )}
          {history.map((item, index) => (
            <li
              key={index}
              className="p-2 mb-2 bg-gray-100 border-b cursor-pointer hover:bg-gray-300"
              onClick={() => setInput(item.name)} // Allow user to click a city to search again
            >
              {item.name} - {Math.round(item.temp)}°C
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Weather;
