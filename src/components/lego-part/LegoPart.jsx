import React, { useEffect, useState } from "react";

import "./lego-part.css";

const LegoPart = () => {
  const colors = ["red", "blue", "green", "yellow", "black", "white"]; // Add / Remove colors as needed

  const [partId, setPartId] = useState(null);
  const [partTitle, setPartTitle] = useState(null);
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setPartId(); // Add part ID here
    setPartTitle(); // Add part title here
  }, []);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value < 0 ? 0 : value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  // Check if all inputs are valid
  const isFormValid = quantity > 0 && color !== "" && condition !== "";

  return (
    <div className="lego-part-background">
      <img
        src="" // Add image source here
        alt="lego img"
        className="lego-part-img"
      />
      <p className="lego-part-id">ID: {partId}</p>
      <p className="lego-part-title">{partTitle}</p>
      <div className="lego-part-vars-background">
        <div className="lego-part-var">
          <label htmlFor="lego-quantity">Quantity: </label>
          <input
            className="lego-part-input-box"
            id="lego-quantity"
            type="number"
            min="0"
            value={quantity}
            onInput={handleQuantityChange}
            placeholder="⸻"
          />
        </div>
        <div className="lego-part-var flex-container">
          <label htmlFor="lego-color">Color: </label>
          <select
            id="lego-color"
            value={color}
            onChange={handleColorChange}
            className="lego-part-select-box"
          >
            <option value="" disabled hidden>
              ⸻
            </option>
            {colors.map((colorOption) => (
              <option key={colorOption} value={colorOption}>
                {colorOption.charAt(0).toUpperCase() + colorOption.slice(1)}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="lego-part-var flex-container">
          <label htmlFor="lego-condition">Condition: </label>
          <select
            id="lego-condition"
            value={condition}
            onChange={handleConditionChange}
            className="lego-part-select-box"
          >
            <option value="" disabled hidden>
              ⸻
            </option>
            <option value="any">Any</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>
      </div>
      <button
        className={`lego-part-button ${isFormValid ? "valid" : ""}`}
        disabled={!isFormValid}
      >
        Add to List
      </button>
    </div>
  );
};

export default LegoPart;
