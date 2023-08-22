import "./WeatherCard.css";
import weatherApi from "../../utils/weatherApi";
import React from "react";
// import fog from '../../images/day/'

const weatherOptions = [
  {
    url: require("../../images/day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/day/storm.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/night/cloud.svg").default,
    day: false,
    type: "cloud",
  },
  {
    url: require("../../images/night/moon.svg").default,
    day: false,
    type: "moon",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log("weathercard");
  const imageSrc = weatherOptions.filter((i) => {
    console.log(i);
    return i.day === day && i.type === type;
  });
  console.log(imageSrc);
  console.log(imageSrc[0].url);

  const imageSrcUrl = imageSrc[0].url || "";
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
