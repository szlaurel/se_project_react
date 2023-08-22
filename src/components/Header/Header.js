import "./Header.css";
import React from "react";
import logo from "../../images/Logo.svg";

const Header = ({ onCreateModal }) => {
  console.log("Header");
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>Date and location</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            type="text"
            onClick={onCreateModal}
            className="header__button"
          >
            + Add Clothes
          </button>
        </div>
        <div>Name</div>
        <img src={require("../../images/Avatarlogo.svg").default} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
