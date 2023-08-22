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
} from "../utils/weatherApi";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

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

  useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      console.log(temperature);
      setTemp(temperature);
    });
  }, []);

  console.log(temp);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} temp={temp} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onClose={handleCloseModal}>
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
              <input type="radio" id="hot" value="hot" />
              <label> Hot</label>
            </div>
            <div>
              <input type="radio" id="warm" value="warm" />
              <label> Warm</label>
            </div>
            <div>
              <input type="radio" id="cold" value="cold" />
              <label> Cold</label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
