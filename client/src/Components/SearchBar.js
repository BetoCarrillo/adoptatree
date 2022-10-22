import React, { useEffect, useRef, useState } from "react";

function SearchBar({ searchName, setSearchName, fetchTrees, fetchDataSearch }) {
  // const inputRef = useRef();
  // const handleEnter = (e) => {
  //   if (e.key === "Enter") {
  //     fetchDataSearch(e);
  //   }
  // };

  const handleSearch = (e) => {
    console.log(e.target.value);
    fetchDataSearch(e);
  };

  // useEffect(() => {
  //   // inputRef.current.focus();
  // }, []);

  return (
    <div>
      <div>
        <input
          // ref={inputRef}
          type="text"
          name=""
          onChange={(e) => handleSearch(e)}
        ></input>
      </div>
    </div>
  );
}

export default SearchBar;
