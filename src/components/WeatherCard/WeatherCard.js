import "./WeatherCard.css";
import weatherApi from "../../utils/weatherApi";
import React from "react";
import cloudy from "../../images/day/cloudy.svg";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log("weathercard");
  const weatherOption = weatherOptions.find((item) => {
    console.log(item);
    return item.day === day && item.type === type;
  });
  console.log(weatherOption);
  // console.log(weatherOption[0].url);

  const imageSrcUrl = weatherOption ? weatherOption.url : "";
  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp}°F</div>
      <div>
        <img src={imageSrcUrl} className="weather_image" alt={imageSrcUrl} />
      </div>
    </section>
  );
};

export default WeatherCard;
