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
  
    // Check if each query term matches any term in the string (startsWith or contains)
    return queryTerms.every((term) =>
      stringTerms.some((stringTerm) => stringTerm.includes(term))
    );
  };

  const normalizeString = (string) => {
    return string
      .replace(/\s+/g, " ")
      .replace(/(\d)\s*x\s*(\d)/g, "$1x$2")
      .replace(/[^\w\s]/g, "")
      .trim()
      .toLowerCase();
  };
  
  const normalizedData = data.map((item) => ({
    ...item,
    normalizedPartNum: normalizeString(item.part_num),
    normalizedName: normalizeString(item.name),
  }));

  // function to do the actual search
  const filteredData = normalizedData.filter((item) =>
    matchTerms(item.normalizedPartNum, normalizedQuery) ||
    matchTerms(item.normalizedName, normalizedQuery)
  );

  // Paginate the results
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(start, start + itemsPerPage);

  // Send the result back to the main thread
  postMessage({ paginatedData, totalResults: filteredData.length });
};