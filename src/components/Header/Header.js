import React from "react";
import {
  Button,
  Form,
  FormControl,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../../firebase";
import UserAuth from "../../UserAuth";

export const Header = ({ currentPage }) => {
  let token = Cookies.get("token");
  return (
    <div className="header-container">
      {token ? (
        token === "admin" ? (
          <Navbar expand="lg" variant="dark">
            <Container>
              <Navbar.Brand href="/">Book My Nest!!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto"></Nav>
                <Nav>
                  <Nav.Link href="/admin/users">Users</Nav.Link>
                  <Nav.Link href="/admin/properties">Properties</Nav.Link>
                  <Nav.Link href="/admin/bookings">Bookings</Nav.Link>
                  <Nav.Link href="/admin/payments">Payments</Nav.Link>
                </Nav>
                <Nav>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="my-dropdown-menu"
                      style={{
                        color: "white",
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                      }}
                      id="dropdown-basic"
                    >
                      {"Admin"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={logout} href="/">
                        LogOut
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : (
          <Navbar expand="lg" variant="dark">
            <Container>
              <Navbar.Brand href="/">Book My Nest!!</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto"></Nav>
                <Nav>
                  <Nav.Link href="/dashboard">Home</Nav.Link>
                  <Nav.Link href="/bookings">Bookings</Nav.Link>
                  <Nav.Link href="/LodgeComplaints">Lodge Complaints</Nav.Link>
                </Nav>
                <Nav>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="my-dropdown-menu"
                      style={{
                        color: "white",
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                      }}
                      id="dropdown-basic"
                    >
                      {UserAuth()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item href="/dashboard">Home</Dropdown.Item> */}
                      <Dropdown.Item href="/account">My Account</Dropdown.Item>
                      <Dropdown.Item href="/Owner">
                        Manage My Properties
                      </Dropdown.Item>
                      {/* <Dropdown.Item href="/booking">Show Bookings</Dropdown.Item> */}
                      {/* <Dropdown.Item href="/LodgeComplaints"> </Dropdown.Item> */}

                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logout} href="/">
                        LogOut
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )
      ) : (
        <Navbar expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">Book My Nest!!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="m-auto"></Nav>
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                <Nav.Link href="/admin/login">Admin </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default Header;
