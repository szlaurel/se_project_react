import "./WeatherCard.css";
import weatherApi from "../../utils/weatherApi";
import React, { useContext } from "react";
import cloudy from "../../images/day/cloudy.svg";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "", weatherScale = "" }) => {
  console.log("weathercard");
  const weatherOption = weatherOptions.find((item) => {
    console.log(item);
    return item.day === day && item.type === type;
  });
  console.log(weatherOption);
  // console.log(weatherOption[0].url);
  const imageSrcUrl = weatherOption ? weatherOption.url : "";
  console.log(imageSrcUrl.default);
  const defaultImageSrc = imageSrcUrl.default;

  return (
    <section className="weather" id="weather">
      <div className="weather_info">
        {weatherTemp}
        {`°${weatherScale}`}
      </div>
      <div>
        <img
          src={defaultImageSrc}
          className="weather_image"
          alt={imageSrcUrl}
        />
      </div>
    </section>
  );
};

// °F

export default WeatherCard;
