import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { editUser } from "../service/UserService";
import { toast } from "react-toastify";

const ModalEdit = (props) => {
  const { show, handleCloseModalEdit, dataUserEdit, handleEditUserFromModal } =
    props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await editUser(name, job);
    if (res && res.updatedAt) {
      // success
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      handleCloseModalEdit();
      toast.success('Edit user successfully!')
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal show={show} onHide={handleCloseModalEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit An User</Modal.Title>
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
          <Button variant="secondary" onClick={handleCloseModalEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
