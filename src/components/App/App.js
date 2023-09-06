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
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import Api from "../../utils/Api";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [deleteCard, setDeleteCard] = useState("");
  const baseUrl = "http://localhost:3001";

  const api = new Api({
    baseUrl: baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleDeleteCard = (id) => {
    api.deleteItems(selectedCard._id).then(() => {
      const filteredCards = items.filter((item) => {
        console.log(item._id);
        return item._id !== selectedCard._id;
      });
      console.log(filteredCards);
      setItems(filteredCards);
      handleCloseModal();
      //filter out items
      //check if items is filtered out
      //then setItems with the filtered items list
    });
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (values) => {
    const itemName = values.name;
    const weatherValue = values.weatherType;
    const imageLink = values.link;

    api
      .postItems({
        name: itemName,
        weather: weatherValue,
        imageUrl: imageLink,
      })
      .then((item) => {
        setItems([item, ...items]);
      });
    console.log(values);
  };

  console.log(setItems);

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
    api
      .getItems()
      .then((res) => {
        setItems(res);
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
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              temp={temp}
              items={items}
            />
          </Route>
          <Route path="/profile">
            <Profile items={items} onSelectCard={handleSelectedCard} />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDelete={handleDeleteCard}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
