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

import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../../firebase";
import UserAuth from "../../UserAuth";

export const Header = ({ currentPage }) => {
  return (
    <div className="header-container">
      {currentPage === "dashboard" ? (
        <nav className="navbar">
          <a class="navbar-brand text-white" href="/">
            Book My Nest
          </a>

          <div className="navbar-middle">
            <span>Renter View</span>
          </div>
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
              <Dropdown.Item href="#/action-1">My Account</Dropdown.Item>
              <Dropdown.Item href="/Owner">
                Switch To Manager View
              </Dropdown.Item>
              <Dropdown.Item href=""> Manage Rentals</Dropdown.Item>
              <Dropdown.Item href="/LodgeComplaints">
                {" "}
                Lodge Complaints{" "}
              </Dropdown.Item>
              <Dropdown.Item href="">Apply for Refund</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>LogOut</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
      ) : currentPage === "Owner" ? (
        <nav className="navbar">
          <a class="navbar-brand text-light" href="/">
            Book My Nest
          </a>
          <div className="navbar-middle">
            <span>Property Manager View</span>
          </div>
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
              <Dropdown.Item href="#/action-1">My Account</Dropdown.Item>
              <Dropdown.Item href="/dashboard">
                Switch To Renter View
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>LogOut</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
      ) : (
        <Navbar bg="primary" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">Book My Nest!!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="m-auto">
                {/* <Form inline>
                        <FormControl
                        type ="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        />
                    </Form> */}
              </Nav>
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Sign Up</Nav.Link>
                <Nav.Link href="#add property">Add property </Nav.Link>
                <Nav.Link href="#add property">Admin </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default Header;
