import React from "react";
import avatarlogo from "../../images/Avatarlogo.svg";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SideBar = ({ onEditModal }) => {
  const userValue = React.useContext(CurrentUserContext);
  // console.log(userValue);

  const userDataValue = userValue.currentUser;
  const userName = userDataValue.username;
  const avatar = userDataValue.avatar;

  // console.log(userName, avatar);

  return (
    <div>
      <div className="sidebar__main">
        <img src={avatar} alt="logo" className="sidebar__logo" />
        <div className="sidebar__name">{userName}</div>
      </div>
      <div className="sidebar__buttons">
        <button
          type="text"
          className="sidebar__edit-profile_button"
          onClick={onEditModal}
        >
          Change Profile Data
        </button>
        <button
          type="text"
          // onClick={onLogOut}
          className="sidebar__log-out_button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
