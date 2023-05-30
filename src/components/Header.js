import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/logo192.png";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const { login } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      login(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, []);

  const handleLogout = () => {
    logout();
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

              {(user && user.auth === true) ||
              window.location.pathname === "/" ? (
                <>
                  <NavLink to="/users" className="nav-link">
                    Manage Users
                  </NavLink>
                </>
              ) : (
                ""
              )}
            </Nav>
            <Nav>
              {user && user.auth === true ? (
                <span className="nav-link">Welcome's {user.email}</span>
              ) : (
                ""
              )}
              <span></span>
              <NavDropdown title="Action" id="basic-nav-dropdown">
                {user && user.auth === true ? (
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <NavLink className="dropdown-item" to="/login">
                    Login
                  </NavLink>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
