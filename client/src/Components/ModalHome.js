import { Button } from "@mui/material";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ModalHome() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        className="learnMoreButton"
        color="success"
        type=""
        onClick={handleShow}
      >
        Learn More
      </Button>
      <Modal size="lg" show={show} onHide={handleClose} centered>
        <Modal.Header className="modalHeadingDiv"></Modal.Header>
        <Modal.Body className="modalText">
          Use this app to take care of street trees around the city. <br />
          <br />
          Once you find a tree to adopt, take a picture and upload it{" "}
          <span>
            {" "}
            <a className="noDecor" href="/adopt">
              here
            </a>{" "}
          </span>
          so you can share it with your friends for some{" "}
          <span className="material-symbols-outlined goldenStar navbarTree">
            star
          </span>
          ! <br /> <br />
          To get more information about your exact adopted tree in Berlin such
          as water requirements, age, and type you can visit the{" "}
          <span>
            {" "}
            <a
              className="noDecor"
              href="https://giessdenkiez.de/about"
              rel="noreferrer"
              target={"_blank"}
            >
              Gieß den Kiez
            </a>{" "}
          </span>
          app from{" "}
          <span>
            {" "}
            <a
              className="noDecor"
              href="https://citylab-berlin.org/de/start/"
              rel="noreferrer"
              target={"_blank"}
            >
              {" "}
              City Lab{" "}
            </a>{" "}
          </span>{" "}
          City Lab Berlin.
          <br />
          <br />
          Don’t forget that trees are the city’s green lungs and provide cool
          shade when the summers get hotter. <br />
          <br />
          Learn more about the page{" "}
          <span>
            {" "}
            <a className="noDecor" href="/about">
              here!
            </a>{" "}
          </span>{" "}
        </Modal.Body>
        <Modal.Footer className="modalFooterDiv">
          <Button variant="secondary" onClick={handleClose}>
            <span className="material-symbols-outlined">cancel</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalHome;
