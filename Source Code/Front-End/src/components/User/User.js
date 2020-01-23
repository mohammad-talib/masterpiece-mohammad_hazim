import React, { Component } from "react";
import axios from "axios";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class User extends Component {
  state = {
    id: window.localStorage.getItem("userId"),
    user: "",
    image: ""
  };

  updatePhoto = event => {
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
          .post("http://localhost:9000/editphoto", this.state)
          .then(({ data }) => {
            this.setState({
              user: data
            });
            console.log("dataOffersssss", data);
          });
      });
    event.preventDefault();
  };

  componentDidMount() {
    this.getUser();
  }

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

  changePhoto = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  render() {
    const {
      username,
      email,
      phonenumber,
      location,
      point,
      photo
    } = this.state.user;
    return (
      <div>
        <Card style={{ width: "25rem" }}>
          <Card.Img variant="top" src={photo} alt="cards" height="450px" />
          <form onSubmit={this.updatePhoto}>
            <div className="input-group">
              <div className="input-group-prepend">
                <button className="input-group-text" id="inputGroupFileAddon01">
                  Upload
                </button>
              </div>
              <div className="custom-file">
                <input
                  onChange={this.changePhoto}
                  name="image"
                  type="file"
                  accept="image/*"
                  placeholder="Change Your Photo"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>
          </form>

          {this.state.user.admin === true ? (
            <Card.Body>
              <Card.Title>{username}</Card.Title>
            </Card.Body>
          ) : (
            <div>
              <Card.Body>
                <Card.Title className="font-weight-bold">
                  <h2>
                    <img
                      src="https://img.icons8.com/officel/30/000000/user.png"
                      alt="user"
                    />{" "}
                    {username}
                  </h2>
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  <img
                    src="https://img.icons8.com/cute-clipart/30/000000/email.png"
                    alt="email"
                  />{" "}
                  {email}
                </ListGroupItem>
                <ListGroupItem>
                  <img
                    src="https://img.icons8.com/plasticine/30/000000/phone.png"
                    alt="phone"
                  />{" "}
                  {phonenumber}
                </ListGroupItem>
                <ListGroupItem>
                  <img
                    src="https://img.icons8.com/officel/30/000000/worldwide-location.png"
                    alt="location"
                  />{" "}
                  {location}
                </ListGroupItem>
                <ListGroupItem className="font-weight-bold">
                  <img
                    src="https://img.icons8.com/plasticine/30/000000/money.png"
                    alt="money"
                  />{" "}
                  {point}
                </ListGroupItem>
              </ListGroup>
            </div>
          )}
        </Card>
      </div>
    );
  }
}

export default User;
