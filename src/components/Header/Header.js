import "./Header.css";
import React from "react";
import logo from "../../images/Logo.svg";
import avatarlogo from "../../images/Avatarlogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ onCreateModal }) => {
  const todaysDate = new Date();
  console.log("Header");
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
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
        <Link to="/profile">Name</Link>
        <img src={avatarlogo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
