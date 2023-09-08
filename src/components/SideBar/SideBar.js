import React from "react";
import avatarlogo from "../../images/Avatarlogo.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar__main">
      <img src={avatarlogo} alt="logo" className="sidebar__logo" />
      <div className="sidebar__name">Terrence Tegegne</div>
    </div>
  );
};

export default SideBar;
