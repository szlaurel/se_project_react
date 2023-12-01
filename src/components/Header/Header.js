import "./Header.css";
import React from "react";
import logo from "../../images/Logo.svg";
import avatarlogo from "../../images/Avatarlogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useState } from "react";

const Header = ({
  onCreateModal,
  onRegisterModal,
  onLoginModal,
  isLoggedIn,
  firstNameInitial,
}) => {
  const todaysDate = new Date();
  const userValue = React.useContext(CurrentUserContext);

  // console.log(userValue);
  const userDataValue = userValue.currentUser;
  const userName = userDataValue.username;
  const avatar = userDataValue.avatar;

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
      <div>
        {isLoggedIn ? (
          <div className="header__avatar_container">
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
            <Link to="/profile">{userName}</Link>
            {avatar ? (
              <img
                src={avatar}
                alt="logo"
                className="header__avatar"
                placeholder="logo"
              />
            ) : (
              <span alt="alt logo" className="header__avatar-alternate">
                {firstNameInitial}
              </span>
            )}
          </div>
        ) : (
          <div className="header__nav-bar">
            <ToggleSwitch />

            <button
              type="text"
              onClick={onRegisterModal}
              className="header__button"
            >
              Sign Up
            </button>
            <button
              type="text"
              onClick={onLoginModal}
              className="header__button"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

/* -------------------------------------------------------------------------- */
/*                       This goes before the </header>                       */
/* -------------------------------------------------------------------------- */
//the code below was when the user is authorized and logged in
{
  /* <div className="header__avatar-logo">
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
</div> */
}

/* -------------------------------------------------------------------------- */
/*                  The original code with the logged in user                 */
/* -------------------------------------------------------------------------- */
// copy and paste this code if needed too VVVVV

// const Header = ({ onCreateModal }) => {
//   const todaysDate = new Date();
//   console.log("Header");
//   return (
//     <header className="header">
//       <div className="header__logo">
//         <div>
//           <Link to="/">
//             <img src={logo} alt="logo" />
//           </Link>
//         </div>
//         <div>{todaysDate.toLocaleDateString()}</div>
//       </div>
//       <div className="header__avatar_container">
//         <ToggleSwitch />
//         <div>
//           <button
//             type="text"
//             onClick={onCreateModal}
//             className="header__button"
//           >
//             + Add Clothes
//           </button>
//         </div>
//         <Link to="/profile">Name</Link>
//         <img src={avatarlogo} alt="logo" />
//       </div>
//     </header>
//   );
// };

/* -------------------------------------------------------------------------- */
/*                         code if youre not logged in                        */
/* -------------------------------------------------------------------------- */

// const Header = ({ onCreateModal, onRegisterModal, onLoginModal }) => {
//   const todaysDate = new Date();
//   const value = React.useContext(CurrentUserContext);
//   console.log(value);
//   console.log("Header");
//   return (
//     <header className="header">
//       <div className="header__logo">
//         <div>
//           <Link to="/">
//             <img src={logo} alt="logo" />
//           </Link>
//         </div>
//         <div>{todaysDate.toLocaleDateString()}</div>
//       </div>
//       <div className="header__nav-bar">
//         <ToggleSwitch />

//         <button
//           type="text"
//           onClick={onRegisterModal}
//           className="header__button"
//         >
//           Sign Up
//         </button>
//         <button type="text" onClick={onLoginModal} className="header__button">
//           Log In
//         </button>
//       </div>
//     </header>
//   );
// };

// {
//   isLoggedIn ? (
//     <div className="header__avatar-logo">
//       <ToggleSwitch />
//       <div>
//         <button type="text" onClick={onCreateModal} className="header__button">
//           + Add Clothes
//         </button>
//       </div>
//       <Link to="/profile">Name</Link>
//       <img src={avatarlogo} alt="logo" />
//     </div>
//   ) : (
//     <div className="header__nav-bar">
//       <ToggleSwitch />

//       <button type="text" onClick={onRegisterModal} className="header__button">
//         Sign Up
//       </button>
//       <button type="text" onClick={onLoginModal} className="header__button">
//         Log In
//       </button>
//     </div>
//   );
// }
