import React from "react";
import useFetch from "../hooks/useFetch";

function Trees() {
  const { data, loading, error } = useFetch(
    "http://localhost:5002/api/trees/all/"
  );
  console.log(data);

  return (
    <div>
      {/*   {data &&
        data.data.map((value, i) => {
          return (
            <div key={i}>
              <h2>{value}</h2>
            </div>
          );
        })} */}
    </div>
  );
}

export default Trees;
