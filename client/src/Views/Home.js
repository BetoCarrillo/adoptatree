import React, { useContext, useState } from "react";
import "../styles/home.css";
import "../App.css";
import ModalHome from "../Components/ModalHome";
import { AuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
/* import { AuthContext } from "../Context/AuthContext.js"; */

function Home() {
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

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
      <div className="homeMyTrees">My Trees</div>
      <NavLink to="/adopt">Adopt</NavLink>
    </div>
  );
}

export default Home;
