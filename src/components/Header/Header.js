import "./Header.css";

const Header = () => {
  console.log("Header");
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../../images/Logo.svg").default} alt="logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text">Add New Clothes</button>
        </div>
        <div>Name</div>
        <img src={require("../../images/Avatarlogo.svg").default} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
