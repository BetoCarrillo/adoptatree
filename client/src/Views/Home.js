import React, { useContext, useState } from "react";
import "../styles/home.css";
import "../App.css";
import ModalHome from "../Components/ModalHome";
import { AuthContext } from "../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

/* import { AuthContext } from "../Context/AuthContext.js"; */

function Home() {
  const [userProfile, setUserProfile] = useState({});
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const redirectAdopt = useNavigate();

  const handleRedirect = () => {
    redirectAdopt("/adopt");
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
      <div className="homeMyTrees">My Trees</div>
      <div className="homeTitleBer">
        <Button
          className="learnMoreButton"
          color="success"
          type=""
          onClick={handleRedirect}
        >
          Adopt a tree now
        </Button>
      </div>
    </div>
  );
}

export default Home;
