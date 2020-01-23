import React, { Component } from "react";
import axios from "axios";
import "./Buyoffer.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

class Buyoffer extends Component {
  state = { buyoffers: [] };

  componentDidMount() {
    this.getBuyOffer();
  }

  getBuyOffer = () => {
    axios
      .post("http://localhost:9000/getbuyoffer", {
        id: localStorage.getItem("userId")
      })
      .then(({ data }) => {
        this.setState({
          buyoffers: data.buyoffer
        });
        console.log("data.offers", data.buyoffer);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log("this.state.buyoffers", this.state.buyoffers.length);
    return (
      <div className="m-4 ">
        <h1 className="mb-4" style={{ color: "#52732f" }}>
          Purchased offers
        </h1>
        {this.state.buyoffers.length === 0 ? (
          <div className="buy-offer">
            <p>
              You Don't Buy Offer Yet!<Link to="/offers"> Buy Now</Link>
            </p>
          </div>
        ) : (
          <div>
            <div className="row">
              {this.state.buyoffers.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="card border-success col-sm-12 col-md-12 col-lg-12 col-xl-3 m-2 mb-4 p-2 profile-card-5"
                  >
                    <div className="card-img-block">
                      <img
                        className="card-img-top"
                        src={item.image}
                        alt="Card"
                        height="150px"
                      />
                    </div>
                    <div className="card-body pt-0">
                      <h5 className="card-title">{item.title}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Buyoffer;
