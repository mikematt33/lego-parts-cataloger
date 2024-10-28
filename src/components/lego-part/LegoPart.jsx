import React, { useEffect, useState } from "react";
import ColorSelect from "../color-select/ColorSelect";

import "./lego-part.css";

const LegoPart = ({
  isPersonalList,
  partIdInput,
  partTitleInput,
  colorNameInput,
  colorHexInput,
  conditionInput,
  quantityInput,
  addToList,
}) => {
  const [partId, setPartId] = useState(partIdInput);
  const [partTitle, setPartTitle] = useState(partTitleInput);
  const [colorName, setColorName] = useState(colorNameInput);
  const [colorHex, setColorHex] = useState(colorHexInput);
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
    setColorName(event.name);
    setColorHex(event.rgb);
  };

  const handleConditionChange = (event) => {
    setCondition(event.target.value);
  };

  // Check if all inputs are valid
  const isFormValid =
    quantity > 0 && colorName !== undefined && condition !== undefined;

  return (
    <div className="lego-part-background">
      <img
        src={imgPath}
        alt={partTitle}
        onError={handleImgError}
        className="lego-part-img"
      />
      <p className="lego-part-id">ID: {partId}</p>
      <div className="lego-part-scroll-text">
        <p className="lego-part-title">{partTitle}</p>
      </div>
      <div className="lego-part-vars-background">
        <div style={{ marginTop: "1px" }} className="lego-part-var">
          <label htmlFor="lego-quantity">Quantity: </label>
          <input
            className="lego-part-input-box"
            id="lego-quantity"
            type="number"
            min="0"
            value={quantity || ""}
            onInput={handleQuantityChange}
            placeholder="⸻"
          />
        </div>
        <div className="lego-part-var flex-container">
          <label htmlFor="lego-color">Color: </label>
          <ColorSelect
            colorName={colorName}
            colorHex={colorHex}
            handleColorChange={handleColorChange}
          />
        </div>
        <div className="lego-part-var flex-container">
          <label htmlFor="lego-condition">Condition: </label>
          <select
            id="lego-condition"
            value={condition || ""}
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
          onClick={() => addToList(quantity, colorName, condition)}
        >
          Add to List
        </button>
      )}
    </div>
  );
};

export default LegoPart;
