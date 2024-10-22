import React, { useState, useEffect, useMemo } from "react";
import data from "../../data.js";
import LegoPart from "../lego-part/LegoPart";
import "./search-bar.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const itemsPerPage = 20;
  const debounceTime = 200; // time (in milliseconds) between when the user finishes input and when the search starts

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // normalize the given query to be more flexible. (ie. 1x1 is equivalent to 1 x 1)
  const normalizeQuery = (query) => {
    return query
      .replace(/\s+/g, " ") // normalize multiple spaces to a single space
      .replace(/(\d)x(\d)/g, "$1 x $2") // handle cases like 1x1, 1x2, 2x4, etc.
      .replace(/[^\w\s]/g, "") // remove non-alphanumeric characters
      .trim()
      .toLowerCase();
  };

  // function to match terms of the query in any order to the 'data'
  const matchTerms = (string, query) => {
    const queryTerms = query.split(" ");
    const stringTerms = string.split(" ");

    return queryTerms.every((term) =>
      stringTerms.some((stringTerm) => stringTerm.includes(term))
    );
  };

  // memoize filtered data, so when entering in queries with pauses in between, a rerender is not done redundantly
  const filteredData = useMemo(() => {
    if (debouncedSearchQuery === "") {
      return data;
    } else {
      const normalizedQuery = normalizeQuery(debouncedSearchQuery);

      return data.filter((item) => {
        const normalizedPartNum = normalizeQuery(item.part_num);
        const normalizedName = normalizeQuery(item.name);

        return (
          matchTerms(normalizedPartNum, normalizedQuery) ||
          matchTerms(normalizedName, normalizedQuery)
        );
      });
    }
  }, [debouncedSearchQuery]);

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
  };

  // TODO: maybe get this working with the text on a part component, or remove
  // eslint-disable-next-line
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
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query directly
        placeholder="Search by part number or name"
      />

      <ul>
        {currentItems.map((item) => (
          <LegoPart
            key={item.part_num}
            isPersonalList={false}
            partIdInput={item.part_num}
            partTitleInput={item.name}
            addToList={addToList}
          />
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
