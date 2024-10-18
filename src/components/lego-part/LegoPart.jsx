import React, { useEffect, useState } from "react";

import "./lego-part.css";

const LegoPart = ({
  isPersonalList,
  partIdInput,
  partTitleInput,
  colorInput,
  conditionInput,
  quantityInput,
  addToList,
}) => {
  const colors = ["red", "blue", "green", "yellow", "black", "white"]; // Add / Remove colors as needed

  const [partId, setPartId] = useState(partIdInput);
  const [partTitle, setPartTitle] = useState(partTitleInput);
  const [color, setColor] = useState(colorInput);
  const [condition, setCondition] = useState(conditionInput);
  const [quantity, setQuantity] = useState(quantityInput);
  const [imgPath, setImgPath] = useState(`/public/images/${partId}.png`);

  const defaultImg = "/public/images/default.png";

  useEffect(() => {}, []);

  const handleImgError = () => {
    setImgPath(defaultImg);
  };

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
        src={imgPath}
        alt={partTitle}
        onError={handleImgError}
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
      {!isPersonalList && (
        <button
          className={`lego-part-button ${isFormValid ? "valid" : ""}`}
          disabled={!isFormValid}
          onClick={() => addToList(quantity, color, condition)}
        >
          Add to List
        </button>
      )}
    </div>
  );
};

export default LegoPart;
