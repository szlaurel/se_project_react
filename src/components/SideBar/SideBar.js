import React from "react";
import avatarlogo from "../../images/Avatarlogo.svg";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SideBar = ({ onEditModal, handleLogOut, firstNameInitial }) => {
  const userValue = React.useContext(CurrentUserContext);
  console.log(userValue);
  const userDataValue = userValue.currentUser;
  const userName = userDataValue.username;
  const avatar = userDataValue.avatar;

  const onSubmitLogOut = () => {
    handleLogOut();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 10);
  };

  // console.log(userName, avatar);

  const history = useHistory();

  return (
    <div>
      <div className="sidebar__main">
        {avatar ? (
          <img src={avatar} alt="logo" className="sidebar__logo" />
        ) : (
          <span src="alt logo" className="sidebar__logo-alternate">
            {firstNameInitial}
          </span>
        )}
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
          onClick={onSubmitLogOut}
          className="sidebar__log-out_button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
