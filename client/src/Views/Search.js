import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import TreeCards from "../Components/TreeCards";
import { TreeContext } from "../Context/TreeContext";

function Search() {
  const [error, setError] = useState(null);
  const {
    trees,
    setTrees,
    loading,
    setLoading,
    like,
    setLike,
    likes,
    unlikes,
    setChangeLike,
    changeLike,
    functionChangeLikes,
  } = useContext(TreeContext);

  const fetchDataSearch = async (e) => {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("$text", e.target.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    if (e.target.value === "") {
      try {
        const response = await fetch(`http://localhost:5005/api/trees/all/`);
        const result = await response.json();
        console.log("result", result);
        // setLoading(false);
        setTrees(result);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    } else {
      try {
        const response = await fetch(
          "http://localhost:5005/api/trees/search",
          requestOptions
        );
        const results = await response.json();
        console.log("result", results);
        setLoading(false);
        setTrees(true);
        setTrees(results);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        setError(error);
      }
    }
  };
  useEffect(() => {
    console.log("search refresh");
  }, []);

  return (
    <div>
      <SearchBar fetchDataSearch={fetchDataSearch} />
      <TreeCards trees={trees} />
    </div>
  );
}

export default Search;
