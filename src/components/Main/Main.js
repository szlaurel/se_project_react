import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import weatherApi from "../../utils/weatherApi";
import "./Main.css";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, items }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  // this VV code doesnt work becuase i dont have the right loader for this file type but we have a fix for it.
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  // const temp =
  //   (weatherTemp &&
  //     weatherTemp.temperature &&
  //     weatherTemp.temperature[currentTemperatureUnit]) ||
  //   999;

  // const getWeatherType = (weatherTemp) => {
  //   if (temp >= 86) {
  //     return "hot";
  //   } else if (temp >= 66 && temp <= 85) {
  //     return "warm";
  //   } else if (temp <= 65) {
  //     return "cold";
  //   }
  // };

  const getWeatherType = (weatherTemp, currentTemperatureUnit) => {
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    } else if (currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 18.9 && temp <= 29.4) {
        return "warm";
      } else if (temp <= 18.3) {
        return "cold";
      }
    }
  };

  // getweathertype needs to check if the temperature scale is either F or C
  // once getweathertype figures out what the temperature scale is it check that temperature scale with the right numbers associated with degrees and temp

  const weatherType = getWeatherType(weatherTemp, currentTemperatureUnit);

  console.log(weatherType);

  console.log(temp);

  const filteredCards = items.filter((item) => {
    // uncomment this to check if the items show up VVVV
    // console.log(item);
    // theres an error that occurs when adding clothes and the error happens here.
    console.log(item.weather);
    return item.weather.toLowerCase() === weatherType;
  });

  console.log(filteredCards);
  return (
    <main className="main">
      <WeatherCard
        day={true}
        type="cloudy"
        weatherTemp={temp}
        weatherScale={currentTemperatureUnit}
      />
      <section className="item-card__section" id="card-section">
        Today is {temp}
        {`°${currentTemperatureUnit}`} / You may want to wear:
        <div className="item-card__items main-section__image">
          {filteredCards.map((item, index) => {
            return (
              <ItemCard key={index} item={item} onSelectCard={onSelectCard} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
