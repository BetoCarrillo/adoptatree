import React, { useEffect } from "react";

function SearchBar({ searchName, setSearchName, fetchTrees }) {
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setSearchName(e.target.value);
      console.log(searchName);
    }
  };
  console.log("first");

  useEffect(() => {}, []);

  return (
    <div>
      <div>
        <input
          type="text"
          name=""
          value={searchName}
          onKeyDown={(e) => handleEnter(e)}
        ></input>
      </div>
    </div>
  );
}

export default SearchBar;
