//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

import { APIkey, latitude, longitude } from "./constants";

const processServerRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

export const getForecastWeather = () => {
  const weatherApi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
  `).then(processServerRequest);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  console.log(Math.ceil(temperature));
  return Math.ceil(temperature);
};

export default getForecastWeather;
