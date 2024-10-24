import React, { useEffect, useState } from "react";
import colorsData from "../../colors.json";
import "./color-select.css";

import { hexToHSL, categorizeColorByHue } from "./utils/colorFunctions";

// ********** Color Item **********
function ColorItem({ color, onClick }) {
  return (
    <li className="color-item" onClick={() => onClick(color)}>
      <div
        className="color-item-background"
        style={{ backgroundColor: `#${color.rgb}` }}
      >
        <div className="color-info">
          <div className="color-name">{color.name}</div>
          <div className="color-hex">#{color.rgb}</div>
        </div>
      </div>
    </li>
  );
}

// ********** Color Modal **********
function ColorModal({ colors, onClose, onSelectColor }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorizedColors, setCategorizedColors] = useState([]);

  useEffect(() => {
    // Categorize colors based on hex
    const categorized = colors.map((color) => {
      const hsl = hexToHSL(color.rgb);
      const category = categorizeColorByHue(hsl);
      return { ...color, category };
    });
    setCategorizedColors(categorized);
  }, [colors]);

  // Function to filter and sort colors based on search term or category
  const filterColors = () => {
    let filtered = categorizedColors;

    const categoryOrder = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple",
      "gray",
    ];

    if (searchTerm.startsWith("#")) {
      // Search by hex if search starts with #
      const hex = searchTerm.substring(1).toLowerCase();
      filtered = categorizedColors.filter((color) =>
        color.rgb.toLowerCase().startsWith(hex)
      );
    } else if (selectedCategory) {
      // Filters by category
      filtered = categorizedColors.filter(
        (color) => color.category === selectedCategory
      );
    } else if (!searchTerm) {
      // If no search term or category, sort colors by predefined category order
      filtered = categorizedColors.sort((a, b) => {
        const indexA = categoryOrder.indexOf(a.category);
        const indexB = categoryOrder.indexOf(b.category);
        return indexA - indexB;
      });
    }

    // Filter by name if a search term exists
    return filtered.filter((color) =>
      color.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Color categories for visual category buttons
  const categories = [
    { name: "Reds", category: "red", style: { backgroundColor: "red" } },
    {
      name: "Oranges",
      category: "orange",
      style: { backgroundColor: "orange" },
    },
    {
      name: "Yellows",
      category: "yellow",
      style: { backgroundColor: "yellow" },
    },
    { name: "Greens", category: "green", style: { backgroundColor: "green" } },
    { name: "Blues", category: "blue", style: { backgroundColor: "blue" } },
    {
      name: "Purples",
      category: "purple",
      style: { backgroundColor: "purple" },
    },
    {
      name: "Whites/Grays/Blacks",
      category: "gray",
      style: {
        backgroundImage: "linear-gradient(135deg, white 50%, black 50%)",
      },
    },
  ];

  // Filtering colors
  const filteredColors = filterColors();

  const handleBackdropClick = (e) => {
    if (e.target.className === "color-modal") {
      onClose();
    }
  };

  return (
    <div className="color-modal" onClick={handleBackdropClick}>
      <div className="color-modal-content">
        <input
          type="text"
          className="color-search-input"
          placeholder="Search by name or #hex"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="color-categories">
          {/* Reset Button */}
          <button
            className={`category-button reset-button ${
              selectedCategory === "" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("")}
          >
            &#10006;
          </button>
          {/* Render Category Buttons */}
          {categories.map((cat) => (
            <button
              key={cat.category}
              className={`category-button ${
                selectedCategory === cat.category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.category)}
              style={cat.style}
            ></button>
          ))}
        </div>
        <ul>
          {filteredColors.map((color) => (
            <ColorItem key={color.id} color={color} onClick={onSelectColor} />
          ))}
        </ul>
      </div>
      <span className="color-modal-close" onClick={onClose}>
        &times;
      </span>
    </div>
  );
}

// ********** Color Select **********
function ColorSelect({ colorName, colorHexInput, handleColorChange }) {
  const [colors, setColors] = useState([]);
  const [selectedColorInput, setSelectedColorInput] = useState(
    colorHexInput || "#eaeaea"
  );
  const [selectedColor, setSelectedColor] = useState(
    colorName || { name: "⸻" }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const filteredColors = colorsData.results.slice(1).map((color) => ({
      id: color.id,
      name: color.name,
      rgb: color.rgb,
    }));

    setColors(filteredColors);
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setSelectedColorInput(`#${color.rgb}`);
    handleColorChange(color);
    setIsModalOpen(false);
  };

  return (
    <div className="color-select-flex-container">
      <p className="color-select-text">{selectedColor.name}</p>
      <button
        style={{ backgroundColor: selectedColorInput }}
        className="color-select-button"
        onClick={handleButtonClick}
      ></button>
      {isModalOpen && (
        <ColorModal
          colors={colors}
          onClose={handleCloseModal}
          onSelectColor={handleSelectColor}
        />
      )}
    </div>
  );
}

export default ColorSelect;
