import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Icon, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("tokyo");

  const inputCity = (event) => {
    setCity(event.target.value);
  };

  const cityName = "tokyo";
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchWatherData = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        setWeatherData(res.data);
        console.log(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatherData();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <div className="search-form">
        <input type="text" value={city} onChange={inputCity} />
        <IconButton onClick={() => setCity(city)}>
          <SearchIcon />
        </IconButton>
      </div>
      <h1 className="location">Weather in {weatherData.name}</h1>
      <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
      <p className="condition">
        Condition: {weatherData.weather[0].description}
      </p>
      <br />

      <WbSunnyIcon className="weather-icon" />
    </div>
  );
}

export default App;
