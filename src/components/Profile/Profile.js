import React from "react";
import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const Profile = ({
  items,
  onSelectCard,
  onCreateModal,
  onEditModal,
  onCardLike,
}) => {
  const userValue = React.useContext(CurrentUserContext);
  // const AllClothingItems = items.filter((item) => {
  //   console.log(item);
  // });

  // console.log(AllClothingItems);
  return (
    <div className="profile__main">
      <section>
        <SideBar onEditModal={onEditModal} />
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
