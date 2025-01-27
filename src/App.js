import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import sunIcon from "./lotties/sun.json";
import rainIcon from "./lotties/rain.json";

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
    const fetchWeatherData = async () => {
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
    fetchWeatherData();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const weatherCondition = weatherData.weather[0].main;
  console.log(weatherData.weather[0].main);
  console.log("======");
  console.log(weatherCondition);

  const sunAnimation = {
    loop: true,
    autoplay: true,
    animationData: sunIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const rainAnimation = {
    loop: true,
    autoplay: true,
    animationData: rainIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="App">
      <p className="location">{weatherData.name}</p>
      <div className="weather-conodition">
        {weatherCondition == "Rain" ? (
          <Lottie options={rainAnimation} height={400} width={400} />
        ) : (
          <Lottie options={rainAnimation} height={400} width={400} />
        )}
      </div>
      <p className="temperature">{weatherData.main.temp}°C</p>
    </div>
  );
}

export default App;
