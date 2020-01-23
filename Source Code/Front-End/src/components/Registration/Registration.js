import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./Registration.css";
import back from "../Login/image/waste.png";

class Registration extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    location: "",
    regUser: "",
    user: []
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  registration = event => {
    axios
      .post("http://localhost:9000/registration", this.state)
      .then(({ data }) => {
        if (data === "registration successfully completed") {
          this.setState({
            regUser: <Alert variant="success">{data}</Alert>
          });
          setTimeout(() => {
            this.props.history.push("/");
          }, 1500);
        } else {
          this.setState({
            user: data
          });
        }

        console.log("DATA :", data);
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  };

  render() {
    const {
      user,
      regUser,
      username,
      email,
      phonenumber,
      password
    } = this.state;
    return (
      <div>
        <div className="margin-img-req">
          <img className="w-100" src={back} alt="save env" />
        </div>
        <div className="form-reg">
          <Form onSubmit={this.registration}>
            <h2>Sign Up</h2>
            <div>
              {user.map(item => {
                return <Alert variant="danger">{item}</Alert>;
              })}
              <h5>{regUser}</h5>
            </div>
            <br></br>
            <Form.Group controlId="formBasicUser">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                onChange={this.change}
                name="username"
                type="text"
                placeholder="User Name"
              />
              <Form.Text value={username} className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={this.change}
                name="email"
                type="email"
                placeholder="Email"
              />
              <Form.Text value={email} className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={this.change}
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={phonenumber}
                onChange={this.change}
                name="phonenumber"
                type="number"
                placeholder="Phone Number"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Location</Form.Label>
              <select
                defaultValue={"DEFAULT"}
                className="form-control form-text text-muted"
                // value={type}
                name="location"
                onChange={this.change}
              >
                <option value="DEFAULT" disabled>
                  Select Your Material
                </option>
                <option value="Amman"> Amman </option>
                <option value="Jarash"> Jarash </option>
                <option value="Irbid"> Irbid </option>
              </select>
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="pargraph-reg">
          <h4>Why create an account?</h4>
          <p>
            To be able to submit requests to recycle materials<br></br> and
            obtain points and exchange them <br></br> with one of the offers on
            the site
          </p>
          <Link to="/">
            <button className="btn btn-success">SIGN IN HERE</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Registration);
