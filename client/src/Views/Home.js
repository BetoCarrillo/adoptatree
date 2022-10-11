import React, { useState } from "react";
import "../styles/home.css";
import "../App.css";
import ModalHome from "../Components/ModalHome";

function Home() {
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptions
        );
        const result = await response.json();
        setUserProfile({
          email: result.email,
          userName: result.userName,
          avatarPicture: result.avatarPicture,
        });
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      setError(true);
      console.log("no token for this user");
    }
  };

  return (
    <div className="homeDiv">
      <div className="homeTitle ">
        ADOPT{" "}
        <span className="material-symbols-outlined treeLogo animation ">
          {" "}
          park
        </span>{" "}
        TREE:
      </div>
      <div className="homeTitleBer"> Berlin</div>

      <div className="homeLearnMore">
        <ModalHome />
      </div>
      <div className="homeMyTrees">My Trees </div>
    </div>
  );
}

export default Home;
