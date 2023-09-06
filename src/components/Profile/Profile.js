import React from "react";
import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ items, onSelectCard }) => {
  // const AllClothingItems = items.filter((item) => {
  //   console.log(item);
  // });

  // console.log(AllClothingItems);
  return (
    <div className="profile__main">
      <section>
        <SideBar />
      </section>
      <section>
        <ClothesSection items={items} onSelectCard={onSelectCard} />
      </section>
    </div>
  );
};

export default Profile;
