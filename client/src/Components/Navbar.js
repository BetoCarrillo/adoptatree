import React, { useContext, useEffect } from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, setUser, logged, setLogged, checkUserStatus, getUserProfile } =
    useContext(AuthContext);
  const redirectLogout = useNavigate();

  const logout = () => {
    if (window.confirm("Logout?") === true) {
      localStorage.removeItem("token");
      logged(false);
    } else {
      redirectLogout("/trees", { replace: true });
    }
  };

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
          {logged !== true ? (
            <div></div>
          ) : (
            <div>Hi {user && user.email}&nbsp; |</div>
          )}

          <div className="navbarList">
            <NavLink className="navbarLink" to="/home">
              <span className="material-symbols-outlined">home</span>
            </NavLink>
            <NavLink className="navbarLink" to="/trees">
              <span className="material-symbols-outlined">forest</span>
            </NavLink>
            <NavLink className="navbarLink" to="/about">
              <span className="material-symbols-outlined">contact_support</span>
            </NavLink>
            <NavLink className="navbarLink" to="/profile">
              <span className="material-symbols-outlined">person</span>
            </NavLink>
            <NavLink className="navbarLink" to="/login">
              {logged === null ? (
                <span className="material-symbols-outlined" onClick={logout}>
                  logout
                </span>
              ) : (
                <span className="material-symbols-outlined">login</span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
