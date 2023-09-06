import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import weatherApi from "../../utils/weatherApi";
import "./Main.css";
import React from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, items }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  // this VV code doesnt work becuase i dont have the right loader for this file type but we have a fix for it.
  // const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;
  const temp =
    (weatherTemp &&
      weatherTemp.temperature &&
      weatherTemp.temperature[currentTemperatureUnit]) ||
    999;
  const getWeatherType = (weatherTemp) => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };
  const weatherType = getWeatherType(weatherTemp);

  console.log(weatherType);

  const filteredCards = items.filter((item) => {
    console.log(item);
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
          {filteredCards.map((item, card) => {
            return (
              <ItemCard
                key={card._id}
                item={item}
                onSelectCard={onSelectCard}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
