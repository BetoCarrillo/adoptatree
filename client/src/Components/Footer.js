import React, { useContext } from "react";
import "../styles/footer.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Footer() {
  const { logged, setLogged } = useContext(AuthContext);
  const redirectLogout = useNavigate();

  const logout = () => {
    if (window.confirm("Logout?") === true) {
      localStorage.removeItem("token");
    } else {
      redirectLogout("/trees", { replace: true });
    }
    setLogged(!logged);
  };

  return (
    <div className="footerDiv">
      <div className="navList">
        <NavLink className="navbarLink" to="/home">
          <span className="material-symbols-outlined homeLogo">home</span>
        </NavLink>
        {/* <NavLink className="navbarLink" to="/search">
              <span class="material-symbols-outlined">search</span>
            </NavLink> */}
        <NavLink className="navbarLink" to="/trees">
          <span className="material-symbols-outlined treesLogo">forest</span>
        </NavLink>
        <NavLink className="navbarLink" to="/profile">
          <span className="material-symbols-outlined profileLogo">person</span>
        </NavLink>
        <NavLink className="navbarLink" to="/about">
          <span className="material-symbols-outlined aboutLogo">
            contact_support
          </span>
        </NavLink>
        <NavLink className="navbarLink" to="/login">
          {logged !== false ? (
            <span
              className="material-symbols-outlined loginLogo"
              onClick={logout}
            >
              logout
            </span>
          ) : (
            <span className="material-symbols-outlined loginLogo">login</span>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
