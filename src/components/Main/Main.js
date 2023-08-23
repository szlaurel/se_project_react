import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo } from "react";
import weatherApi from "../../utils/weatherApi";
import "./Main.css";
import React from "react";

function Main({ weatherTemp, onSelectCard }) {
  const getWeatherType = (weatherTemp) => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };
  const weatherType = getWeatherType(weatherTemp);

  console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    console.log(item);
    return item.weather.toLowerCase() === weatherType;
  });

  console.log(filteredCards);
  return (
    <main className="main">
      <WeatherCard day={true} type="cloudy" weatherTemp={weatherTemp} />
      <section className="item-card__section" id="card-section">
        Today is {weatherTemp}°F / You may want to wear:
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
