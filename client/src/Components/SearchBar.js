import { Button } from "@mui/material";
import React from "react";

function SearchBar({ searchName, setSearchName, fetchTrees, fetchDataSearch }) {
  const handleSearch = (e) => {
    // console.log(e.target.value);
    fetchDataSearch(e);
  };

  return (
    <div className="searchBarDiv">
      <Button className="searchBarLabel">
        {" "}
        &nbsp; &nbsp;
        <span className="material-symbols-outlined">search</span> &nbsp; &nbsp;
      </Button>
      <input
        className="searchBarInput"
        placeholder=" search "
        // ref={inputRef}
        type="text"
        name="searchbar"
        onChange={(e) => handleSearch(e)}
      ></input>
    </div>
  );
}

export default SearchBar;
