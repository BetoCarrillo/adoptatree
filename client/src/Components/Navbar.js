import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import linkedin from "../styles/images/linkedin.png";
import github from "../styles/images/github.png";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { baseURL } from "../utils/getServerUrl";
// import { TreeContext } from "../Context/TreeContext";

function NavBar() {
  const { user, logged } = useContext(AuthContext);
  // const { myTrees, setMyTrees } = useContext(TreeContext);
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [myTrees, setMyTrees] = useState();

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptionsOne = {
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          baseURL + "/api/users/profile",
          requestOptionsOne
        );
        const result = await response.json();
        // console.log("result", result);
        setMyTrees(result);
      } catch (error) {
        console.log("error getting user's profile", error);
      }
    } else {
      // console.log("no token for this user");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // console.log("user", myTrees);
  // useEffect(() => {}, [logged]);

  return (
    <div>
      <div className="navbarDiv">
        <NavLink className="navbarLogo" to="/home">
          ADOPT{" "}
          <span className="material-symbols-outlined treeLogoNavbar animation">
            park
          </span>
          TREE<span className="colorGreen">:</span>
        </NavLink>
        <div className="navbarList">
          {logged !== true ? (
            <div></div>
          ) : (
            <div className="helloText">
              <div>
                {myTrees &&
                  myTrees.createdTrees.map((tree, i) => (
                    <span
                      className="material-symbols-outlined navbarTree"
                      key={i}
                    >
                      star
                    </span>
                  ))}
                &nbsp;
              </div>
              <div>
                {" "}
                <span className="useremail">
                  {user.userName === undefined ? user.userName : user.email}
                  &nbsp;
                </span>
              </div>
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
                <img src={github} alt="" className="gitHubLogoDiv"></img>
              </a>
            </div>
            <div className="LinkLogo">
              <a
                rel="noreferrer"
                href="https://www.linkedin.com/in/alberto-carrillo-ch/"
                target={"_blank"}
              >
                <img src={linkedin} alt="" className="linkLogoDiv"></img>
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
