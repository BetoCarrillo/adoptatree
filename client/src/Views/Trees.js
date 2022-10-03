import React from "react";
import useFetch from "../hooks/useFetch";

function Trees() {
  const { data, loading, error } = useFetch(
    "http://localhost:5005/api/trees/all/"
  );
  console.log("data", data);

  return (
    <div>
      {data &&
        data.allTrees.map((value, i) => {
          return (
            <div key={i}>
              <h2>{value.name}</h2>
            </div>
          );
        })}
      {data && <p>{data.allTrees[0].name}</p>}
    </div>
  );
}

export default Trees;
