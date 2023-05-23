import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/logo192.png";
import { useLocation, NavLink } from "react-router-dom";

const Header = (props) => {
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
                <NavDropdown.Item href="login">Login</NavDropdown.Item>
                <NavDropdown.Item href="logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
