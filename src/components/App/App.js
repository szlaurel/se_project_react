// import logo from "../logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
// import WeatherCard from "../WeatherCard/WeatherCard";
// import ItemCard from "../ItemCard/ItemCard";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import {
  getForecastWeather,
  parseWeatherData,
  parseWeatherLocation,
} from "../../utils/weatherApi";
import React from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        console.log(temperature);
        setTemp(temperature);
      })
      .catch((err) => {
        console.log("there was an error", err);
      });
  }, []);

  // console.log(temp);
  console.log(currentTemperatureUnit);
  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Main
          weatherTemp={temp}
          onSelectCard={handleSelectedCard}
          temp={temp}
        />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            title="New Garment"
            onClose={handleCloseModal}
            buttonText="Add garment"
          >
            <label className="modal__label">Name</label>
            <input
              name="name"
              type="text"
              minLength="1"
              maxLength="30"
              placeholder="Name"
              className="modal__input"
            />
            {/* <span className="modal__span">Please enter a Name</span> */}
            <label className="modal__label">Image</label>
            <input
              name="link"
              type="url"
              minLength="1"
              maxLength="30"
              placeholder="Image URL"
              className="modal__input"
            />
            {/* <span className="modal__span">Please enter a valid URL</span> */}
            <p>Select the weather type:</p>
            <div>
              <div>
                <input type="radio" id="hot" name="weather-type" value="hot" />
                <label> Hot</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="warm"
                  name="weather-type"
                  value="warm"
                />
                <label> Warm</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="cold"
                  name="weather-type"
                  value="cold"
                />
                <label> Cold</label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
