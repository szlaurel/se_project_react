import "./Header.css";
import React from "react";
import logo from "../../images/Logo.svg";
import avatarlogo from "../../images/Avatarlogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const Header = ({ onCreateModal }) => {
  const todaysDate = new Date();
  console.log("Header");
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>{todaysDate.toLocaleDateString()}</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
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
        <img src={avatarlogo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
