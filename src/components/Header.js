import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/logo192.png";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Header = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logout successfully !");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logoApp} width="30" height="30" />
              <span className="mx-2">Basic React App</span>
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Manage Users
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="Action" id="basic-nav-dropdown">
                <NavLink className="dropdown-item" to="/">Login</NavLink>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
