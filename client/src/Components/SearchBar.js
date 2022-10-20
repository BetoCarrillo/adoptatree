import React, { useEffect, useRef, useState } from "react";

function SearchBar({ searchName, setSearchName, fetchTrees, fetchDataSearch }) {
  const [search, setSearch] = useState();
  // const inputRef = useRef();
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      console.log("works");
      fetchDataSearch(e);
      // console.log(e.target.value);
      // setSearch(e.target.value);
      // console.log(search);
    }
  };
  useEffect(() => {
    // inputRef.current.focus();
  }, []);

  return (
    <div>
      <div>
        <input
          // ref={inputRef}
          type="text"
          name=""
          onKeyDown={(e) => handleEnter(e)}
        ></input>
      </div>
    </div>
  );
}

export default SearchBar;
