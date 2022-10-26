import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

function Favorites() {
  const { user } = useContext(AuthContext);
  const [myTrees, setMyTrees] = useState({});
  const [myFavorites, setMyFavorites] = useState({});
  const [myFavoritesID, setMyFavoritesID] = useState({});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({});

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptionsOne = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptionsOne
        );
        const result = await response.json();
        console.log("result", result);
        setMyTrees(result);
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      console.log("no token for this user");
    }
  };

  const fetchTrees = async () => {
    try {
      const response = await fetch(
        `http://localhost:5005/api/trees/all/?_id=${myFavoritesID}`
      );
      const result = await response.json();
      console.log("result", result);
      setLoading(false);
      setMyFavorites(result);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  console.log(myTrees);
  useEffect(() => {
    getProfile();
  }, []);

  return <div>Favorites</div>;
}

export default Favorites;
