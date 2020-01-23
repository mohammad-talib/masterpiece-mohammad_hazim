import React, { Component } from "react";
import axios from "axios";
import { Navbar, Nav, Dropdown, Badge, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./Headeruser.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

class Header extends Component {
  state = {
    id: window.localStorage.getItem("userId"),
    user: "",
    navigate: false
  };

  componentDidMount = () => {
    this.getUser();
  };

  getUser = () => {
    axios
      .post("http://localhost:9000/user", this.state)
      .then(({ data }) => {
        this.setState({
          user: data
        });
        console.log("DATA :", data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  LogOut = () => {
    localStorage.clear();
    this.props.history.push("/");

    window.location.reload();
  };

  render() {
    const { navigate } = this.state;
    if (navigate) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div>
        <Navbar id="green-header" bg="light" expand="lg">
          <div className="container">
            <i className="fa recycle fa-recycle" aria-hidden="true"></i>
            <Navbar.Brand
              className="logo-font font-weight-bold"
              href="/homepage"
              id="green-logo"
            >
              Recycle Circle
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav id="green-nav" className="ml-auto">
                <Link className="nav-link" to="/homepage">
                  Home
                </Link>

                <Link className="nav-link" to="/offers">
                  Offers
                </Link>
              </Nav>
              <Dropdown className="green-dropdown">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  <img
                    src={this.state.user.photo}
                    style={{ borderRadius: "50%", border: "2px #52732F solid" }}
                    alt={this.state.user.photo}
                    width="45"
                    height="45"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="green-drop">
                  <Dropdown.Item className="green-greeting" disabled>
                    Hi, {this.state.user.username}
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/dashboard" className="nav-link">
                      <i className="fas green-margin-right fa-tachometer-alt"></i>
                      Dashboard
                    </Link>
                  </Dropdown.Item>
                  {this.state.user.admin === true ? (
                    <div></div>
                  ) : (
                    <Dropdown.Item>
                      <Link to="/profile" className="nav-link">
                        <i className="fas green-margin-right fa-user"></i>
                        Profile
                      </Link>
                    </Dropdown.Item>
                  )}

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.LogOut}>
                    <Link to="/" className="nav-link">
                      <i className="fas green-margin-right fa-sign-out-alt"></i>{" "}
                      Log out
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {this.state.user.admin === true ? (
                <div></div>
              ) : (
                <Button href="/offers" className="button-point" variant="light">
                  <div className="green-money">
                    <i className="fas fa-coins"></i>{" "}
                    <Badge pill id="pill-black" variant="dark">
                      {this.state.user.point}
                    </Badge>
                  </div>
                </Button>
              )}
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
