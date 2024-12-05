import React, { useState, useEffect } from "react";
import LegoPart from "../lego-part/LegoPart";
import "./search-bar.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredResults, setFilteredResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [worker, setWorker] = useState(null); // use this to keep the webworker we create in useEffect
  const itemsPerPage = 100;
  const debounceTime = 200; // debounce time in milliseconds  
  const [isLoading, setIsLoading] = useState(false); // state that tracks whether or not the webworker is searching


  // Normalize the given query to be more flexible.
  const normalizeQuery = (query) => { 
    return query
      .replace(/\s+/g, " ")
      .replace(/(\d)\s*x\s*(\d)/g, "$1x$2")
      .replace(/[^\w\s]/g, "")
      .trim()
      .toLowerCase();
  };

  useEffect(() => {
    // create the webworker here to avoid having to remake it every render
    const searchWorker = new Worker(new URL("./searchWebWorker.js", import.meta.url));

    // Set up the message handler for the worker
    searchWorker.onmessage = (e) => {
      setFilteredResults(e.data.paginatedData);
      setTotalResults(e.data.totalResults);
      setIsLoading(false); // when the message is handled, the search has concluded
    };

    // error logging for debug
    searchWorker.onerror = (error) => {
      console.error("searchWorker error: ", error)
      setIsLoading(false); // the search stops if there is an error
    };

    setWorker(searchWorker);

    return () => {
      // Clean up the worker when the component unmounts
      searchWorker.terminate();
    };
  }, []);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // triggers for searching (ie. debouncedSearchQuery is changed, or the page changes)
  useEffect(() => { 
    // Now use the web worker to search with the debounced query
    if (debouncedSearchQuery) {
      setIsLoading(true); // search starts
      const normalizedQuery = normalizeQuery(debouncedSearchQuery);
      worker.postMessage({
        normalizedQuery, // Change here to match your worker's expected property
        itemsPerPage,
        currentPage,
      });
    }
  }, [debouncedSearchQuery, currentPage, worker]); // Also trigger when currentPage changes

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(totalResults / itemsPerPage); // Corrected to use totalResults

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
        <button key={currentPage - 1} onClick={() => handlePageChange(currentPage - 1)}>
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
        <button key={currentPage + 1} onClick={() => handlePageChange(currentPage + 1)}>
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
    const listData = JSON.parse(localStorage.getItem("example_name_list")) || [];
    listData.push({
      id: 0,
      name: "example_name",
      quantity,
      condition,
      color,
    });
    localStorage.setItem("example_name_list", JSON.stringify(listData));
  };

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
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query directly here
        placeholder="Search by part number or name"
      />

      {isLoading && <div className="spinner"></div>} {/* Loading sprite */} 

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
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {renderPageNumbers()}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
