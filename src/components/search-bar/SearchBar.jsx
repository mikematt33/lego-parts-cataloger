import React, { useState } from "react";
import data from "../../data.js";

import LegoPart from "../lego-part/LegoPart"

import "./search-bar.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // search function that looks through 'data' to find the specied part given a query
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  
    if (query === "") {
      setFilteredData(data);
    } else {
      const normalizedQuery = normalizeQuery(query);
  
      const filtered = data.filter((item) => {
        const normalizedPartNum = normalizeQuery(item.part_num);
        const normalizedName = normalizeQuery(item.name);
  
        return (
          matchTerms(normalizedPartNum, normalizedQuery) ||
          matchTerms(normalizedName, normalizedQuery)
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  };

  // function to normalize the query to make small differences irrelevant when searching
  // ex. the query, "1x1" is considered the same as "1 x 1"
  const normalizeQuery = (query) => {
    return query
      .replace(/\s+/g, " ") // normalize multiple spaces to a single space
      .replace(/(\d)x(\d)/g, "$1 x $2") // handle cases like 1x1, 1x2, 2x4, etc.
      .replace(/[^\w\s]/g, "") // remove non-alphanumeric characters but keep spaces
      .trim()
      .toLowerCase();
  };
  

  // function that checks that given a string and query, looks to see if all terms in the query are in the string
  // this allows us to ignore order
  const matchTerms = (string, query) => {
    const queryTerms = query.split(" ");
    const stringTerms = string.split(" ");
    
    return queryTerms.every((term) =>
      stringTerms.some((stringTerm) => stringTerm.includes(term))
    );
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

  // TODO: maybe get this working with the text on a part component, or remove
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

  // function for adding a item to a userlist
  const addToList = (quantity, color, condition) => {
    const listData = 
      JSON.parse(localStorage.getItem("example_name_list")) || [];
    listData.push({
      id: 0,
      name: "example_name",
      quantity,
      condition,
      color,
    });
    localStorage.setItem("example_name_list", JSON.stringify(listData));
  }

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
          <LegoPart key={item.part_num} isPersonalList={false} partIdInput={item.part_num} partTitleInput={item.name} addToList={addToList}/>
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
