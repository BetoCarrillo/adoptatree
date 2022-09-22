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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeadingDiv">
          <Modal.Title>What is adopt a tree?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
