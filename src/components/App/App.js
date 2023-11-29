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
import { api } from "../../utils/Api";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const weatherTemp = "75°F";
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

  const history = useHistory();

  // const handleLogin = (e) => {
  //   // e.preventDefault();
  //   //then(() => //set goes here)
  //   setLoggedIn(true);
  //   setUserData()
  //   setCurrentUser({ ...currentUser });
  // };

  // const currentUser = {
  //   loggedIn,
  //   userData,
  // };
  // console.log(userData);

  // console.log(loggedIn);

  // console.log(currentUser);
  // need to put useEffect in front of this token check first
  /* -------------------------------------------------------------------------- */
  /*            old useEffect code regarding locaStorage.getItem jwt            */
  /* -------------------------------------------------------------------------- */
  // useEffect(() => {
  //   if (localStorage.getItem("jwt")) {
  //     const jwt = localStorage.getItem("jwt");
  //     auth
  //       .getContent(jwt)
  //       .then((res) => {
  //         check the content
  //         if (res) {
  //           const userData = {
  //             username: res.username,
  //             password: res.password,
  //           };
  //           get rid of this console.log when you have what you need from userData

  //           console.log(userData);
  //         }
  //         history.push("/profile");
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // });

  // need to rewrite the entire useEffect code to check

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
      auth.getContent(jwt).then((res) => {
        if (res) {
          console.log(res.data.email);
          const userData = {
            username: res.data.name,
            email: res.data.email,
            avatar: res.data.avatar,
            id: res.data._id,
          };
          setUserData(userData);
          setLoggedIn(true);
          setCurrentUser(userData);
          history.push("/profile");
        } else if (!res) {
          return;
        } else {
          return;
        }
      });
    }
  }, [loggedIn]);

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
      ? // if so, send a request to add the user's id to the card's likes array
        auth
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
      : // if not, send a request to remove the user's id from the card's likes array
        auth
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
    auth.authorize({ email: email, password: password }).then((res) => {
      // localStorage.setItem("jwt", res.token);
      // console.log(res.token);
      console.log(res);
      setLoggedIn(true);
      setUserData(res.userData);
      setCurrentUser({ ...currentUser });
    });
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
        console.log("an error has occured, please see error", err);
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
    auth.updateProfile({ name: username, avatar: avatar }, jwt).then((res) => {
      console.log(res);
    });
  };

  // this is what you want to do with registration request and how to send it properly VVV

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

  // console.log(setItems);
  console.log(items);
  // console.log(temp);
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
          ></RegisterModal>
        )}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            handleLogin={handleLogin}
            // onLoggedInUser={onLoggedInUser}
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
