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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import {
  getForecastWeather,
  parseWeatherData,
  parseWeatherLocation,
} from "../../utils/weatherApi";
import React from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { api } from "../../utils/Api";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const weatherTemp = "75°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [deleteCard, setDeleteCard] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  // need to put useEffect in front of this token check first

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getContent(jwt).then((res) => {
        // check the content
        if (res) {
          const userData = {
            username: res.username,
            password: res.password,
          };
          console.log(userData);

          setLoggedIn(true, userData);
        }
        history.push("/profile");
      });
    }
  });

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleDeleteCard = (id) => {
    const token = localStorage.getItem("jwt");
    api
      .deleteItems(selectedCard._id, token)
      .then(() => {
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
      })
      .catch((err) => {
        console.log("an error has occured, please see error", err);
      })
      .finally(() => console.log("done"));
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onRegisterUser = (values) => {
    const userName = values.name;
    const email = values.email;
    const link = values.link;
    const password = values.password;

    auth
      .register({
        name: userName,
        link: link,
        email: email,
        password: password,
      })
      .then((data) => {
        if (data.jwt) {
          console.log(data.jwt);
          handleCloseModal();
        }
        return;
      })
      .catch((e) => {
        console.log("im in the catch for auth.register user");
        console.log(e);
      });
  };

  // we just got done writing code for configuring the user authorization
  // when you get back and read this you need to "check the token" its in the task

  const onLoggedInUser = (values) => {
    const email = values.email;
    const password = values.password;

    if (!email || !password) {
      return;
    }
    auth.authorize(email, password).then((data) => {
      if (data.jwt) {
        handleLogin();
      }
    });
  };

  // this is what you want to do with registration request and how to send it properly VVV

  const onAddItem = (values) => {
    const itemName = values.name;
    const weatherValue = values.weatherType;
    const imageLink = values.link;
    const token = localStorage.getItem("jwt");

    api
      .postItems(
        {
          name: itemName,
          weather: weatherValue,
          imageUrl: imageLink,
        },
        token
      )
      .then((item) => {
        setItems([item, ...items]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log("an error has occured, please see error", err);
      })
      .finally(() => console.log("done"));
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
      })
      .finally(() => console.log("done"));
    api
      .getItems()
      .then((res) => {
        setItems(res);
      })
      .catch((err) => {
        console.log("there was an error", err);
      })
      .finally(() => console.log("done"));
  }, []);

  // console.log(temp);
  console.log(currentTemperatureUnit);
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
        onCreateModal={handleCreateModal}
        onRegisterModal={handleRegisterModal}
        onLoginModal={handleLoginModal}
      />
      <Switch>
        <Route exact path="/">
          <Main
            weatherTemp={temp}
            onSelectCard={handleSelectedCard}
            temp={temp}
            items={items}
          />
        </Route>
        <ProtectedRoute path="/profile" loggedIn={loggedIn}>
          <Profile
            items={items}
            onSelectCard={handleSelectedCard}
            onCreateModal={handleCreateModal}
          />
        </ProtectedRoute>
        <Route path="/register">
          {activeModal === "register" && (
            <RegisterModal
              onRegisterUser={onRegisterUser}
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
            ></RegisterModal>
          )}
        </Route>
        <Route path="login">
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              handleLogin={handleLogin}
              onLoggedInUser={onLoggedInUser}
            ></LoginModal>
          )}
        </Route>
      </Switch>
      <Footer />
      {activeModal === "create" && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "create"}
          onAddItem={onAddItem}
          onClose={handleCloseModal}
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
  );
}

export default App;
