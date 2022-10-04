import React, { useState } from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function NavBar() {
  let [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div>
      <div className="navbarDiv">
        <NavLink className="navbarLogo" to="/home">
          ADOPT{" "}
          <span className="material-symbols-outlined treeLogoNavbar animation ">
            {" "}
            park
          </span>{" "}
          TREE<span className="colorGreen">:</span>
        </NavLink>
        <div className="navbarList">
          <div>Hi user! &nbsp; | </div>

          {!isNavExpanded ? (
            <div className="navbarList">
              <NavLink className="navbarLink" to="/home">
                <span className="material-symbols-outlined">home</span>
              </NavLink>
              <NavLink className="navbarLink" to="/trees">
                <span className="material-symbols-outlined">forest</span>
              </NavLink>
              <NavLink className="navbarLink" to="/about">
                <span className="material-symbols-outlined">
                  contact_support
                </span>
              </NavLink>
              <NavLink className="navbarLink" to="/profile">
                <span className="material-symbols-outlined">person</span>
              </NavLink>
              <NavLink className="navbarLink" to="/login">
                <span className="material-symbols-outlined">login</span>
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
