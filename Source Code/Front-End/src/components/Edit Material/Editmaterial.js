import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./Editmaterial.css";

class Editmaterial extends Component {
  state = {
    userid: localStorage.getItem("userId"),
    id: this.props.location.state.detail._id,
    quantity: this.props.location.state.detail.quantity,
    type: this.props.location.state.detail.type,
    show: ""
  };

  componentDidMount() {
    let { quantity, type } = this.props.location.state.detail;
    this.refs.quantity.value = quantity;
    this.refs.type.value = type;
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editMaterial = event => {
    console.log("this.props", this.props);
    axios
      .put("http://localhost:9000/editmaterial", this.state)
      .then(({ data }) => {
        this.setState({
          show: <Alert variant="success">{data}</Alert>
        });
        setTimeout(() => {
          this.props.history.push("/dashboard");
        }, 1500);
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
          <Form className="form" onSubmit={this.editMaterial}>
            <h2>Edit Request Material</h2>
            <p>{this.state.show}</p>
            <Form.Group controlId="formBasicQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                onChange={this.change}
                name="quantity"
                ref="quantity"
                type="number"
                placeholder="Quantity"
              />
            </Form.Group>
            <Form.Group controlId="formBasicType">
              <Form.Label>Type</Form.Label>
              <select
                defaultValue={"DEFAULT"}
                className="form-control form-text text-muted"
                //   value={this.state.type}
                name="type"
                ref="type"
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
              Edit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Editmaterial);
