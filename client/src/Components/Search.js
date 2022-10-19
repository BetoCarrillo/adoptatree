import React, { useEffect, useState } from "react";

function Search() {
  const [search, setsearch] = useState(false);

  const fetchDataSearch = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/trees/all/?name=${e.target.value}`
      );
      const result = await response.json();
      console.log("result", result);
      setsearch(true);
      /*       setLoading(false); */
    } catch (error) {
      /*       setLoading(false);
      setError(error); */
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      fetchDataSearch(e);
    }
  };

  const handleSearch = (e) => {
    fetchDataSearch(e);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <form>
        <input
          placeholder="search"
          type="search"
          onKeyDown={(e) => handleSearch(e)}
        ></input>
        {/*  <button type="" onClick={(e) => handleSearch(e)}>
          Search
        </button> */}
      </form>
    </div>
  );
}

export default Search;
