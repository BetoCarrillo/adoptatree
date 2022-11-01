import { Button } from "@mui/material";
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
    <div className="searchBarDiv">
      <Button className="searchBarLabel">
        {" "}
        &nbsp; &nbsp;
        <span className="material-symbols-outlined">search</span> &nbsp; &nbsp;
      </Button>
      <input
        className="searchBarInput"
        placeholder=" search"
        // ref={inputRef}
        type="text"
        name="searchbar"
        onChange={(e) => handleSearch(e)}
      ></input>
    </div>
  );
}

export default SearchBar;
