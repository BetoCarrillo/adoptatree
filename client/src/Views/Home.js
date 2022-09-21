import React from "react";
import "../styles/home.css";
import Button from "@mui/material/Button";

function Home() {
  const handleLearnMore = () => {
    alert("works");
  };

  return (
    <div className="homeDiv">
      <div className="homeTitle">
        ADOPT <span class="material-symbols-outlined treeLogo"> park</span>{" "}
        TREE:
      </div>
      <div className="homeTitleBer"> Berlin</div>

      <div className="homeLearnMore">
        {" "}
        <Button color="success" type="" onClick={handleLearnMore}>
          Learn More
        </Button>
      </div>
      <div className="homeMyTrees">My Trees </div>
    </div>
  );
}

export default Home;
