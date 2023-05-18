import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./components/Header.js";
import TableUsers from "./components/TableUsers.js";
import MyModal from "./components/Modal.js";

function App() {
  const [isShow, setIsShow] = useState(false);

  const handleClose = () => setIsShow(false);

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="d-flex justify-content-between my-3">
          <span>
            <h4>List Users:</h4>
          </span>
          <button onClick={() => setIsShow(true)} className="btn btn-success">
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>
      <MyModal show={isShow} handleClose={handleClose} />
    </div>
  );
}

export default App;
