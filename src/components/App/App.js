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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import Api, { api } from "../../utils/Api";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const weatherTemp = "75°F";

  /* -------------------------------------------------------------------------- */
  /*                          useStates and useHistory                          */
  /* -------------------------------------------------------------------------- */

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [deleteCard, setDeleteCard] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [splitUserName, setSplitUserName] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const history = useHistory();

  /* -------------------------------------------------------------------------- */
  /*            new useEffect code regarding localstorage.getItem jwt           */
  /* -------------------------------------------------------------------------- */

  // an error occurs here at the useEffect when the users token expires in 7 days
  // and it says that there's an error reading email.
  // need to find a way to prevent this from happening
  // maybe i might need to add an else if that states if the !res then just return

  // the error for reading undefined when emails and usernames don't go through happen here at the useEffect
  // add loggedIn in the dependency to run after it checks that checks
  // user is loggedIn

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if ("jwt") {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res.data === undefined) {
            return;
          } else if (res) {
            console.log(res.data?.email);
            const userData = {
              username: res.data?.name,
              email: res.data?.email,
              avatar: res.data?.avatar,
              id: res.data?._id,
            };
            setCurrentUser(userData);
            setLoggedIn(true);
            setSplitUserName(userData.username.split(""));
            history.push("/profile");
          } else {
            return;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const firstNameInitial = splitUserName[0] ? splitUserName[0][0] : "";

  console.log(firstNameInitial);

  /* -------------------------------------------------------------------------- */
  /*                             handle open modals                             */
  /* -------------------------------------------------------------------------- */

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleRegisterModal = (e) => {
    setActiveModal("register");
    console.log("the register button works");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
    console.log("the login button works");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditModal = () => {
    setActiveModal("editUser");
    console.log("the edit modal button works");
  };

  /* -------------------------------------------------------------------------- */
  /*                              delete card code                              */
  /* -------------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------------- */
  /*                            handle like card code                           */
  /* -------------------------------------------------------------------------- */

  // update this code accordingly so that it matches with key-value pairs that
  // you have in your line of code

  const handleLikeClick = ({ id, isLiked, user }) => {
    const token = localStorage.getItem("jwt");
    console.log(isLiked);
    // Check if this card is now liked
    isLiked
      ? // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            console.log(updatedCard);
            console.log(items);
            setItems((items) =>
              items.map((c) => (c._id === id ? updatedCard.doc : c))
            );
          })
          .catch((err) => console.log(err))
      : // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            console.log(updatedCard);
            console.log(items);
            setItems((items) =>
              items.map((c) => (c._id === id ? updatedCard.doc : c))
            );
          })
          .catch((err) => console.log(err));
  };

  /* -------------------------------------------------------------------------- */
  /*                               handle submits                               */
  /* -------------------------------------------------------------------------- */

  const handleRegister = (values) => {
    const userName = values.name;
    const email = values.email;
    const link = values.link;
    const password = values.password;

    console.log(userName, "this is just test if the variables load up");

    auth
      .register({
        name: userName,
        link: link,
        email: email,
        password: password,
      })
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        handleCloseModal();
      })
      .catch((e) => {
        console.log("im in the catch for auth.register user");
        console.log(e);
      });
  };

  // we just got done writing code for configuring the user authorization
  // when you get back and read this you need to "check the token" its in the task

  const handleLogin = (values) => {
    // debugger
    const email = values.email;
    const password = values.password;

    if (!email || !password) {
      return;
    }
    auth
      .authorize({ email: email, password: password })
      .then((res) => {
        if (res == undefined) {
          return;
        }
        localStorage.setItem("jwt", res.token);
        setCurrentUser({ ...currentUser });
        setLoggedIn(true);
      })
      .then(() => {
        handleCloseModal();
      })
      .then(() => {
        history.push("/profile");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 10);
      })
      .catch((err) => {
        console.log("an error has occured at handleLogin", err);
      })
      .finally(() => console.log("done"));
    console.log(values);
  };

  const handleAddItem = (values) => {
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
        console.log(item);
        const newItem = item?.data;
        setItems([newItem, ...items]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log("an error has occured, handleAddItem", err);
      })
      .finally(() => console.log("done"));
    console.log(values);
  };

  const handleEditUser = (values) => {
    const username = values.username;
    const avatar = values.avatar;
    const jwt = localStorage.getItem("jwt");

    if (!username || !avatar) {
      return;
    }
    api
      .updateProfile({ name: username, avatar: avatar }, jwt)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        handleCloseModal();
      })
      .catch((e) => {
        console.log("an error has occured, handleEditUser", e);
      })
      .finally(() => console.log("done"));
    console.log(values);
  };

  // this is what you want to do with registration request and how to send it properly VVV

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const handleLogOut = () => {
    debugger;
    localStorage.removeItem("jwt");
    if (loggedIn === true) {
      setLoggedIn(false);
    }
  };
  // debugger;
  console.log(loggedIn);

  /* -------------------------------------------------------------------------- */
  /*                 useEffect for getting the forecast once VVV                */
  /* -------------------------------------------------------------------------- */

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

  console.log(items);

  console.log(currentTemperatureUnit);
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          onCreateModal={handleCreateModal}
          onRegisterModal={handleRegisterModal}
          onLoginModal={handleLoginModal}
          isLoggedIn={loggedIn}
          firstNameInitial={firstNameInitial}
        />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              onCardLike={handleLikeClick}
              temp={temp}
              items={items}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Profile
              items={items}
              onSelectCard={handleSelectedCard}
              onCreateModal={handleCreateModal}
              onEditModal={handleEditModal}
              onCardLike={handleLikeClick}
              handleLogOut={handleLogOut}
              firstNameInitial={firstNameInitial}
              isLoggedIn={loggedIn}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
        {activeModal === "register" && (
          <RegisterModal
            handleRegister={handleRegister}
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            alternateModalOpen={handleLoginModal}
          ></RegisterModal>
        )}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            handleLogin={handleLogin}
            alternateModalOpen={handleRegisterModal}
          ></LoginModal>
        )}
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            handleAddItem={handleAddItem}
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
        {activeModal === "editUser" && (
          <EditProfileModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "editUser"}
            handleEditUser={handleEditUser}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
