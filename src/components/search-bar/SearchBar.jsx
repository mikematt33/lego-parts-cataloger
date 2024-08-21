import React, { useState } from "react";
import data from "../../data.js";

import "./search-bar.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.part_num.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pages = [];

    if (currentPage > 2) {
      pages.push(
        <button key={1} onClick={() => handlePageChange(1)}>
          1
        </button>
      );
      if (currentPage > 3) {
        pages.push(<span key="start-ellipsis">...</span>);
      }
    }

    if (currentPage > 1) {
      pages.push(
        <button
          key={currentPage - 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      );
    }

    pages.push(
      <button key={currentPage} className="active">
        {currentPage}
      </button>
    );

    if (currentPage < totalPages) {
      pages.push(
        <button
          key={currentPage + 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push(<span key="end-ellipsis">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by part number or name"
      />

      <ul>
        {currentItems.map((item) => (
          <li key={item.part_num}>
            {highlightText(item.part_num, searchQuery)} |{" "}
            {highlightText(item.name, searchQuery)}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
