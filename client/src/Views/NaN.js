import React from "react";
import desert from "../styles/images/desert.png";

function NaN() {
  return (
    <div>
      <div className="desertTitle">
        <div className="noTreesText">Ups!.. No trees to adopt in here.</div>{" "}
        <br />
        <div className="protectionClimate">
          <span className="material-symbols-outlined">public</span> Let's take
          action for climate protection!{" "}
          <span className="material-symbols-outlined">public</span>
        </div>{" "}
      </div>
      <div>
        <img src={desert} alt="" className="desertPNG"></img>
      </div>
    </div>
  );
}

export default NaN;
