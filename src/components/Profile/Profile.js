import React, { useEffect } from "react";
import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useState } from "react";

const Profile = ({
  items,
  onSelectCard,
  onCreateModal,
  onEditModal,
  onCardLike,
  handleLogOut,
  firstNameInitial,
  isLoggedIn,
}) => {
  const userValue = React.useContext(CurrentUserContext);
  // const AllClothingItems = items.filter((item) => {
  //   console.log(item);
  // });
  // console.log(AllClothingItems);

  console.log(isLoggedIn);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (isLoggedIn === true) {
      setRefresh(true);
    }
  }, [isLoggedIn]);

  console.log(refresh);

  return (
    <div className="profile__main">
      <section>
        <SideBar
          onEditModal={onEditModal}
          handleLogOut={handleLogOut}
          firstNameInitial={firstNameInitial}
        />
      </section>
      <section>
        <ClothesSection
          items={items}
          onSelectCard={onSelectCard}
          onCreateModal={onCreateModal}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
};

export default Profile;
