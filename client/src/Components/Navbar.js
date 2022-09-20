import React, { useState } from "react";
import "../styles/navbar.css";

function NavBar() {
  return (
    <div className="navbarDiv">
      <div className="navbarLogo">Logo</div>
      <div>Welcome user |</div>
      <div>Home</div>
      <div>Trees</div>
      <div>Login</div>
      <div>About</div>
      <div>Profile</div>
    </div>
  );
}

export default NavBar;
