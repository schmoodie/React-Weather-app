import React from "react";

const ForecastData = (props) => {
  const { data } = props;
  const list = data.list;

  return (
    <div >
      {list !== undefined ? (
        <div className="forecast-wrapper">
          {list.map((e) => {
            let weatherStatus = e.weather[0].main;
            let weatherImgClass = "";

            if (weatherStatus === "Clouds") {
              if (e.clouds.all >= 50) {
                weatherImgClass = "cloudy";
              } else {
                weatherImgClass = "partly-cloudy";
              }
            } else if (weatherStatus === "Rain") {
              weatherImgClass = "rainy";
            } else if (weatherStatus === "Snow") {
              weatherImgClass = "snowy";
            } else if (weatherStatus === "Clear") {
              weatherImgClass = "sunny";
            }

            return (
              <div key={e.dt} className="forecast-time">
                <p>{e.dt_txt.slice(11, 13)}.00</p>
                <div className={`forecast-icon ${weatherImgClass}`}></div>
                <p className="forecast-temp">{Math.ceil(e.main.temp)} °C</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ForecastData;
