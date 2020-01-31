import React, { Component } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./Cards.css";

class Cards extends Component {
  state = { message: "", isOpen: true };

  getOffer = object => {
    axios
      .post("http://localhost:9000/buyoffer", {
        params: { userId: localStorage.getItem("userId"), object }
      })
      .then(({ data }) => {
        if (data === "you buy this offer") {
          this.setState({
            massage: <Alert variant="success">{data}</Alert>
          });
        } else {
          this.setState({
            massage: <Alert variant="danger">{data}</Alert>
          });
        }
        console.log("dataaaaaaaaa", data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCancel = () => {
    this.setState({ isOpen: false });
  };

  submit = items => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to Buy This Offer.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.getOffer(items)
        },
        {
          label: "No",
          onClick: () => this.handleCancel()
        }
      ]
    });
  };

  render() {
    return (
      <div>
        <figure className="card border-success shadow bg-white rounded card-product">
          <div>
            <img src={this.props.carditem.image} alt="cards" width="100%" height="300px" />
          </div>
          <figcaption className="info-wrap">
            <h4 className="title">{this.props.carditem.title}</h4>
            <p className="desc">{this.props.carditem.description}</p>
            {this.state.massage}
          </figcaption>
          <div className="bottom-wrap">
            <button
              onClick={() => {
                this.submit(this.props.carditem);
              }}
              className="btn btn-green btn-success float-right"
            >
              <i className="fas fa-money-bill-wave"></i> Buy Offer
            </button>
            <div className="price-wrap h5">
              <span className="price-new">
                <i className="fas fa-coins"></i>
                {this.props.carditem.point}
              </span>
            </div>
          </div>
        </figure>
      </div>
    );
  }
}

export default Cards;
