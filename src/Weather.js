import axios from "axios";
import React, { useState, useEffect } from "react";
import DisplayWeather from "./DisplayWeather";
import ForecastData from "./Forecast";

const Weather = () => {
  const APIKEY = "1116f4c4e6007e63fa30e4b4bfbd5f43";

  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [form, setForm] = useState({
    city: "",
  });

  useEffect(() => {
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
      setForm({ ...form, city: storedCity });
    }
  }, []);

  function handleClick(e) {
    e.preventDefault();
    weatherData();
  }

  async function weatherData() {
    if (form.city === "") {
      alert("Add values");
    } else {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&appid=${APIKEY}&units=metric`
        );
        const data = response.data;
        setWeather(data);
        setLat(data.coord.lat);
        setLon(data.coord.lon);
        console.log("Lat:", lat);
        console.log("Lon:", lon);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (lat && lon) {
      forecastWeather();
    }
  }, [lat, lon]);

  async function forecastWeather() {
    const cnt = 40;
    if (form.city === "") {
      alert("Add values");
    } else {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${APIKEY}&units=metric`
        );
        const forecastData = response.data;
        setForecast(forecastData);
        console.log("Forecast Data:", forecastData);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
      localStorage.setItem("city", value);
    }
  };

  return (
    <div className="weatherApp">
      <div className="search-bar">
        <form>
          <input
            type="text"
            name="city"
            id="city"
            value={form.city}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <button onClick={(e) => handleClick(e)}>Sök</button>
        </form>
      </div>

      {weather !== undefined ? (
        <div>
          <DisplayWeather data={weather} />
          <ForecastData data={forecast} />
        </div>
      ) : null}
    </div>
  );
};

export default Weather;
