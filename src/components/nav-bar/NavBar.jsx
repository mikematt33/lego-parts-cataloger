import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

import "./nav-bar.css";

const NavBar = ({ selectedPage }) => {
  // Possible selected pages: ["all-parts", "your-collections", "history"]
  const [currentSelectedPage, setCurrentSelectedPage] = useState(selectedPage);
  // const navigate = useNavigate();

  useEffect(() => {
    if (!selectedPage) {
      setCurrentSelectedPage("all-parts");
    }
  }, [selectedPage]);

  const handlePageSelect = (page) => {
    setCurrentSelectedPage(page);
    // Below is what will be used when navigating to a new page. Currently, it's commented out until we have a real navigation system in place.
    // navigate(`/${page}`);
  };

  return (
    <div className="nav-bar-full-div">
      <img
        src={process.env.PUBLIC_URL + "/images/logo-no-background.svg"}
        alt="Lego Parts Cataloger Logo"
        className="light-mode-logo"
      />
      <div className="nav-bar-routes-div">
        <button
          className={`nav-bar-route-button ${
            currentSelectedPage === "your-collections" ? "selected" : ""
          }`}
          onClick={() => handlePageSelect("your-collections")}
        >
          <i className="fa-solid fa-list-ul fa-xl"></i> Your Collections
        </button>
        <button
          className={`nav-bar-route-button ${
            currentSelectedPage === "all-parts" ? "selected" : ""
          }`}
          onClick={() => handlePageSelect("all-parts")}
        >
          <i className="fa-solid fa-table-cells-large fa-xl"></i> All Parts
        </button>
        <button
          className={`nav-bar-route-button ${
            currentSelectedPage === "history" ? "selected" : ""
          }`}
          onClick={() => handlePageSelect("history")}
        >
          <i className="fa-solid fa-clock-rotate-left fa-xl"></i> History
        </button>
      </div>
      <div className="nav-bar-light-mode-switch-background">
        <div className="nav-bar-light-mode-switch">
          <i class="fa-regular fa-sun fa-xl"></i>
        </div>
        <h4 style={{ marginLeft: "10px" }}>Light Mode</h4>
      </div>
    </div>
  );
};

export default NavBar;
