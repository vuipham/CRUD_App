import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createUser } from "../service/UserService.js";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleCloseModalAddNew, handleUpdateUser } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveChange = async () => {
    const res = await createUser(name, job);
    if (res && res.id) {
      setName("");
      setJob("");
      handleUpdateUser({ first_name: name, id: res.id });
      handleCloseModalAddNew();
      toast.success("Successfully added new user");
    }
    console.log(res);
  };

  return (
    <>
      <Modal show={show} onHide={handleCloseModalAddNew}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Job
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalAddNew}>
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

export default ModalAddNew;
