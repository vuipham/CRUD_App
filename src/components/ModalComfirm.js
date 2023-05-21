import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../service/UserService.js";
import { toast } from "react-toastify";

const ModalComfirm = (props) => {
  const {
    show,
    handleCloseModalComfirm,
    dataUserDelete,
    handleDeleteUserFromModal,
  } = props;

  const handleDelete = async () => {
    const res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      handleCloseModalComfirm();
      handleDeleteUserFromModal(dataUserDelete);
      toast.success("Delete user succedd !");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleCloseModalComfirm}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete An User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            Are you sure you want to delete the user whose email is{" "}
            <b>{dataUserDelete.email}</b> ? ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalComfirm}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComfirm;
