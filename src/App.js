import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import Container from "react-bootstrap/Container";
import Header from "./components/Header.js";
import Home from "./components/Home";
import TableUsers from "./components/TableUsers.js";
import Login from "./components/Login";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </div>
    </>
  );
}

export default App;
