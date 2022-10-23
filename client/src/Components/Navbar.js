import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import linkedin from "../styles/images/linkedin.png";
import github from "../styles/images/github.png";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";

function NavBar() {
  const { user, setUser, logged, setLogged, checkUserStatus, userProfile } =
    useContext(AuthContext);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  // const redirectLogout = useNavigate();

  // const logout = () => {
  //   if (window.confirm("Logout?") === true) {
  //     localStorage.removeItem("token");
  //   } else {
  //     redirectLogout("/trees", { replace: true });
  //   }
  //   setLogged(!logged);
  // };

  useEffect(() => {}, [logged]);

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
            <div className="helloText">
              <span className="useremail">
                {userProfile.userName === undefined
                  ? userProfile.userName
                  : user.email}
                &nbsp;
              </span>
              |
            </div>
          )}
          <div className="footerList">
            <div className="githubLogo">
              <a
                rel="noreferrer"
                href="https://github.com/BetoCarrillo"
                target={"_blank"}
              >
                <div>
                  <img src={github} alt="" className="gitHubLogoDiv"></img>
                </div>
              </a>
            </div>
            <div className="LinkLogo">
              <a
                rel="noreferrer"
                href="https://www.linkedin.com/in/alberto-carrillo-ch/"
                target={"_blank"}
              >
                <div>
                  <img src={linkedin} alt="" className="linkLogoDiv"></img>
                </div>
              </a>
            </div>
            <div className="mailDiv">
              <div>
                <span
                  className="material-symbols-outlined mailLogo"
                  ref={target}
                  onClick={() => setShow(!show)}
                >
                  mail
                </span>
              </div>
            </div>
          </div>
          <div className="footerList">
            {/*       <a
          rel="noreferrer"
          target={"_blank"}
          href="https://www.codeacademyberlin.com/"
        >
          {" "}
          <img className="FootAcademy" src={codelogo} alt="" height={30}></img>
        </a> */}
            <Overlay target={target.current} show={show} placement="bottom">
              {(props) => (
                <Tooltip className="mailpopover" {...props}>
                  alberto.carrillo01@gmail.com
                </Tooltip>
              )}
            </Overlay>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
