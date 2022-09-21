import React, { useState } from "react";
import "../styles/navbar.css";
import logo from "../styles/images/logo.png";

function NavBar() {
  return (
    <div>
      <div className="navbarDiv">
        <div className="navbarLogo">
          {" "}
          <img className="" src={logo} alt="" height={25}></img>
        </div>
        <div className="navbarList">
          <div>Welcome user |</div>
          <div>Home</div>
          <div>Trees</div>
          <div>Login</div>
          <div>About</div>
          <div>Profile</div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
