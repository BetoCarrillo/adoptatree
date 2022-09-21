import React from "react";
import "../styles/home.css";
import ModalHome from "../Components/ModalHome";

function Home() {
  return (
    <div className="homeDiv">
      <div className="homeTitle">
        ADOPT <span className="material-symbols-outlined treeLogo"> park</span>{" "}
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
