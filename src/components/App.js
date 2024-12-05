import React from "react";
// import SearchBar from "./search-bar/SearchBar";
// import NavBar from "./nav-bar/NavBar";
import TempComponent from "./temp-component/TempComponent";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TempComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
