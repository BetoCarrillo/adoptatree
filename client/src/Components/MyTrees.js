import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

function MyTrees() {
  const { user } = useContext(AuthContext);
  // console.log("user", user._id);

  const getUserTrees = async (e) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("user_id", user._id);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/trees/user",
        requestOptions
      );
      const results = await response.json();
      console.log("getUserProfileresults", results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // getUserTrees();
  }, []);

  return <div>MyTrees</div>;
}

export default MyTrees;
