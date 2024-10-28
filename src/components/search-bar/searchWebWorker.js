// we will import the partdata directly here since it is large
import data from "../../data.js";

// file to handle searching of the parts data file
onmessage = (e) => {
  // this is all the stuff that was passed into this webworker; we will use it to search
  const { normalizedQuery, itemsPerPage, currentPage } = e.data;

  // function to match terms of the query in any order to the 'data'
  const matchTerms = (string, query) => {
    const queryTerms = query.split(" ");
    const stringTerms = string.split(" ");
  
    return queryTerms.every((term) =>
      stringTerms.some((stringTerm) => stringTerm.startsWith(term))
    );
  };

  // function to do the actual search
  const filteredData = data.filter((item) =>
    matchTerms(item.part_num, normalizedQuery) ||
    matchTerms(item.name, normalizedQuery)
  );

  // Paginate the results
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(start, start + itemsPerPage);

  // Send the result back to the main thread
  postMessage({ paginatedData, totalResults: filteredData.length });
};