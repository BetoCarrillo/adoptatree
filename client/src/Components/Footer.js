import React, { useRef, useState } from "react";
import "../styles/footer.css";
import linkedin from "../styles/images/linkedin.png";
import github from "../styles/images/github.png";
import codelogo from "../styles/images/codelogo.png";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { NavLink } from "react-router-dom";

function Footer() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className="footerDiv">
      <div className="footerList">
        <div className="githubLogo">
          <a
            rel="noreferrer"
            href="https://github.com/BetoCarrillo"
            target={"_blank"}
          >
            <div>
              <img src={github} alt="" height={44}></img>
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
              <img src={linkedin} alt="" height={45}></img>
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
        <NavLink to="/about" className="FootText">
          More about this web page
        </NavLink>
      </div>
      <div className="footerList">
        <a
          rel="noreferrer"
          target={"_blank"}
          href="https://www.codeacademyberlin.com/"
        >
          {" "}
          <img className="FootAcademy" src={codelogo} alt="" height={30}></img>
        </a>
        <Overlay target={target.current} show={show} placement="top">
          {(props) => (
            <Tooltip className="mailpopover" {...props}>
              alberto.carrillo01@gmail.com
            </Tooltip>
          )}
        </Overlay>
      </div>
    </div>
  );
}

export default Footer;
