import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./Material.css";

class Material extends Component {
  state = {
    id: window.localStorage.getItem("userId"),
    quantity: "",
    type: "",
    faild: "",
    success: ""
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addMaterial = event => {
    delete this.state.faild;
    delete this.state.success;
    axios
      .post("http://localhost:9000/addmaterial", this.state)
      .then(({ data }) => {
        console.log('data add material', data)
        if (data === "quantity Required" || data === "type Required" || data === "The quantity must be a valid number greater than 0") {
          this.setState({
            faild: <Alert variant="danger">{data}</Alert>
          });
        } else {
          this.setState({
            success: <Alert variant="success">{data}</Alert>
          });
          // setTimeout(() => {
          //   this.props.history.push("/dashboard");
          // }, 1500);
        }
        console.log("DATA :", data);
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className="container vertical">
        <div className="form-center shadow p-3 mb-5 bg-white rounded">
          <Form className="form" onSubmit={this.addMaterial}>
            <h2>send Request Material</h2>

            <div>
              <p>{this.state.faild}</p>
              <p>{this.state.success}</p>
            </div>
            <br></br>

            <Form.Group controlId="formBasicQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                value={this.state.quantity}
                onChange={this.change}
                name="quantity"
                type="number"
                placeholder="Quantity"
              />
            </Form.Group>
            <Form.Group controlId="formBasicType">
              <Form.Label>Type</Form.Label>
              <select
                defaultValue={"DEFAULT"}
                className="form-control form-text text-muted"
                name="type"
                onChange={this.change}
              >
                <option value="DEFAULT" disabled>
                  Select Your Material
                </option>
                <option value="Blastic"> Blastic </option>
                <option value="M3aden"> M3aden </option>
                <option value="Paper"> Paper </option>
              </select>
            </Form.Group>

            <Button
              variant="success"
              className="btn-lg btn-block"
              type="submit"
            >
              Send
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Material);
