import React, { useState, use, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  //   const [currentTemperatureUnit, handleToggleSwitchChange] = useState("F");

  //   const handleChange = (e) => {
  //     if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  //     if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //   };

  //   console.log(currentTemperatureUnit);

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  console.log(currentTemperatureUnit);

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "C"
            ? "switch__slider switch__slider-C"
            : "switch__slider switch__slider-F"
        }
      ></span>
      <p
        className={`switch__temp-C ${currentTemperatureUnit === "C" &&
          "switch__active"}`}
      >
        C
      </p>
      <p
        className={`switch__temp-F ${currentTemperatureUnit === "F" &&
          "switch__active"}`}
      >
        F
      </p>
    </label>
  );
};

export default ToggleSwitch;
