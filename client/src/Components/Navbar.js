import React, { useState } from "react";
import "../styles/navbar.css";
import logo from "../styles/images/logo.png";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function NavBar() {
  let [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div>
      <div className="navbarDiv">
        <NavLink to="/home" className="navbarLogo">
          {" "}
          <img className="" src={logo} alt="" height={25}></img>
        </NavLink>
        <div className="navbarList">
          <div>Welcome user &nbsp; | </div>

          {!isNavExpanded ? (
            <div className="navbarList">
              <NavLink className="navbarLink" to="/home">
                Home
              </NavLink>
              <NavLink className="navbarLink" to="/trees">
                Trees
              </NavLink>
              <NavLink className="navbarLink" to="/login">
                Login
              </NavLink>
              <NavLink className="navbarLink" to="/about">
                About
              </NavLink>
              <NavLink className="navbarLink" to="/profile">
                <span className="material-symbols-outlined">nature_people</span>
              </NavLink>
            </div>
          ) : (
            <div>
              <DropdownButton
                id="dropdown-basic-button"
                title={
                  <span className="material-symbols-outlined">
                    nature_people
                  </span>
                }
              >
                <Dropdown.Item>
                  {" "}
                  <NavLink className="navbarLink" to="/home">
                    Home
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <NavLink className="navbarLink" to="/trees">
                    Trees
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <NavLink className="navbarLink" to="/login">
                    Login
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <NavLink className="navbarLink" to="/about">
                    About
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <NavLink className="navbarLink" to="/profile">
                    Profile
                  </NavLink>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
