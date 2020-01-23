import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  state = {};

  render() {
    return (
      <div>
        <Navbar id="green-nav" expand="lg">
          <div className="container">
            <i className="fa recycle fa-recycle" aria-hidden="true"></i>
            <Navbar.Brand
              id="green-logo"
              className="logo-font font-weight-bold"
              href="/homepage"
            >
              Recycle Circle
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Link className="nav-link" to="/home">
                  Home
                </Link>

                <Link className="nav-link" to="/">
                  Sign In
                </Link>

                <Link className="nav-link" to="/registration">
                  Sign Up
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Header;
