import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${capital}`
      );
      console.log(response);
      setWeather(response.data);
      setLoading(false);
    };
    getWeather();
  }, [capital]);

  return loading ? (
    <div>Loading weather...</div>
  ) : (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <div>
        <b>temperature:</b> {weather.current.temperature} celcius
      </div>
      <img src={weather.current.weather_icons[0]} alt="weather icon" />
      <div>
        <b>wind</b>: speed {weather.current.wind_speed} in direction{" "}
        <b>"{weather.current.wind_dir}"</b>
      </div>
    </div>
  );
};

export default Weather;
