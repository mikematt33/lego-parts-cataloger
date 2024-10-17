import React from "react";
import SearchBar from "./search-bar/SearchBar";
import NavBar from "./nav-bar/NavBar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />} />
      </Routes>

      <SearchBar/>
    </Router>
  );
}

export default App;
