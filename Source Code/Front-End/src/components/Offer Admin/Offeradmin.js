import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import "./Offeradmin.css";

class Offeradmin extends Component {
  state = {
    id: localStorage.getItem("userId"),
    image: "",
    title: "",
    description: "",
    point: null,
    offer: []
  };

  changeFile = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addOffer = event => {
    const formData = new FormData();
    formData.append("image", this.state.image);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:9000/upload", formData, config)
      .then(({ data }) => {
        this.setState({
          image: "http://localhost:9000/" + data.path
        });
        console.log("DATA :", data.path);
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        console.log("this.stateeeeeeeeeeee", this.state);
        axios
          .post("http://localhost:9000/senddata", this.state)
          .then(({ data }) => {
            this.setState({
              offer: data.offers
            });
            console.log("dataOffersssss", data.offers);
          });
      });
    event.preventDefault();
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/getoffersadmin")
      .then(({ data }) => {
        this.setState({
          offer: data[0].offers
        });
        console.log("data.offers", data[0].offers);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getIdOffer = offers => {
    axios
      .delete("http://localhost:9000/deleteoffer", {
        params: { userId: localStorage.getItem("userId"), offers }
      })
      .then(({ data }) => {
        this.setState({
          offer: data[0].offers
        });
        console.log("dataaaaaaaaa", data[0].offers);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container mt-4">
        <h1 className="admin">Offer Admin</h1>
        <div className="line-admin"></div>
        <div className="shadow p-3 mb-5 bg-white rounded">
          <Form onSubmit={this.addOffer} encType="multipart/form-data">
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={this.change}
                name="title"
                type="text"
                placeholder="Title"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPoint">
              <Form.Label>Point</Form.Label>
              <Form.Control
                onChange={this.change}
                name="point"
                type="number"
                placeholder="Point"
              />
            </Form.Group>
            <Form.Label>Image</Form.Label>
            <div className="input-group">
              <div className="input-group-prepend">
                <button className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </button>
              </div>
              <div className="custom-file">
                <input
                  onChange={this.changeFile}
                  name="image"
                  type="file"
                  accept="image/*"
                  placeholder="choose Your Photo"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
            <br />
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onChange={this.change}
                name="description"
                type="text"
                placeholder="Description"
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="row">
          {this.state.offer.map((item, index) => {
            return (
              <Card
                key={index}
                className="col-sm-12 col-lg-6 col-xl-3 shadow bg-white rounded border-success justify-content-center mr-4 mb-4"
              >
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <span className="price-new">
                      <i className="fas fa-coins"></i>
                      {item.point}
                    </span>
                    <Button
                      variant="danger"
                      onClick={() => this.getIdOffer(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Offeradmin;
