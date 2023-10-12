import React, {useState} from "react";

import './WeatherDisplay.css';
const DisplayWeather = (props) => {
  const { data } = props;
  console.log(data);




  const timeStamp = new Date().toLocaleTimeString();

  // Add conditional checks for necessary properties
  const name = data && data.name ? data.name : "";
  const country = data && data.sys && data.sys.country ? data.sys.country : "";
  const temp = data && data.main && data.main.temp ? Math.floor(data.main.temp) : 0;

  const weatherStatus = data && data.main && data.weather[0].main;
  let weatherImgClass = "";
    
  if(weatherStatus == "Clouds"){
    if(data.clouds.all >= 50){
        weatherImgClass = "cloudy";
    }else{
        weatherImgClass = "partly-cloudy";
    }
  }else if(weatherStatus == "Rain"){
    weatherImgClass = "rainy";
  }else if(weatherStatus == "Snow"){
    weatherImgClass = "snowy";
  }else if(weatherStatus == "Clear"){
    weatherImgClass = "sunny";
  }
  
  
  return (
    <div>
      <div className="current-weather-wrapper">
        <div className="current-weather">            
          <div className={weatherImgClass + " img"}></div>
          <div className="current-weather-details">
              <h2 className="today">Idag</h2>
              <p>{timeStamp.slice(0, 5)}</p>
              <h3>Plats: {name} </h3>
              <p className="current-temp">Just nu: {temp}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayWeather;
