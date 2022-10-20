import React, { useState } from "react";

export default function Search() {
  const [searchName, setSearchName] = useState();

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      console.log("works");
      setSearchName(e.target.value);
      // fetchDataSearch(e);
    }
  };

  return (
    <div>
      <form>
        <input
          placeholder="search"
          type="search"
          onKeyDown={(e) => handleEnter(e)}
        ></input>
        {/*  <button type="" onClick={(e) => handleSearch(e)}>
          Search
        </button> */}
      </form>
    </div>
  );
}
