import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const MyModal = (props) => {
  const { show, handleClose } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveChange = () => {
    console.log("check state: ", "name: ", name, "job", job);
    setName("")
    setJob("")
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label htmlFor="formGroupExampleInput" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label htmlFor="formGroupExampleInput2" class="form-label">
              Job
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
