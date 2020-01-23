import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import back from "./image/waste.png";

class Login extends Component {
  state = {
    email: "",
    password: "",
    faildUser: "",
    loginUser: ""
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = event => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/login", this.state)
      .then(({ data }) => {
        if (data === null) {
          this.setState({
            faildUser: <Alert variant="danger">invalid email or Password</Alert>
          });
        } else {
          this.setState({
            loginUser: data
          });
          localStorage.setItem("userId", data._id);
          localStorage.setItem("admin", data.admin);
          this.props.history.push("/dashboard");
          window.location.reload();
        }
        console.log("DATA :", data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div className="margin-img">
          <img className="w-100" src={back} alt="save env" />
        </div>
        <div className="formlogin">
          <Form onSubmit={this.login}>
            <h2>Sign in</h2>
            <br></br>
            <div>
              <h5>{this.state.faildUser}</h5>
            </div>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={this.change}
                name="email"
                type="email"
                placeholder="Email"
              />
              <Form.Text value={this.state.email} className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.change}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="pargraph">
          <h4>Why create an account?</h4>
          <p>
            To be able to submit requests to recycle materials<br></br> and
            obtain points and exchange them <br></br> with one of the offers on
            the site
          </p>
          <Link to="registration">
            <button className="btn btn-success">SIGN UP HERE</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
