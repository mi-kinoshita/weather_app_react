import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatherData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!: {error.message}</div>;

  return (
    <div className="App">
      <h1>Weather in {weatherData.name}</h1>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Condition: {weatherData.weather[0].description}</p>
      <br />
      <p>都市を選んでください。</p>
      <input
        type="text"
        value={city}
        onChange={inputCity}
        placeholder="都市を入力してください"
      />
      <button onClick={setWeatherData}>API Call</button>
    </div>
  );
}

export default App;
