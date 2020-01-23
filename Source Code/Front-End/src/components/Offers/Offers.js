import React, { Component } from "react";
import axios from "axios";
import Cards from "../card Offer/Cards";
import "./Offers.css";

class Offers extends Component {
  state = { offers: [], massage: "" };

  componentDidMount() {
    axios
      .get("http://localhost:9000/getoffers")
      .then(({ data }) => {
        this.setState({
          offers: data[0].offers
        });
        console.log("data.offers", data[0].offers);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1 className="offer-head">Offers</h1>
        <div className="line"></div>
        <div className="row cont">
          {this.state.offers.map((item, index) => {
            return (
              <div key={index} className="col-sm-12 col-md-5 col-lg-6 col-xl-3 mr-2 mt-4">
                <Cards key={index} carditem={item} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Offers;
