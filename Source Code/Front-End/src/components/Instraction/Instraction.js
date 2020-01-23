import React, { Component } from "react";
import "./Instraction.css";

class Instraction extends Component {
  state = {};
  render() {
    return (
      <div className="features container">
        <h1 className="title-of-instruction">
          <i className="fas fa-tools"></i> Instructions of Platform
        </h1>

        <div>
          <div className="whats">
            <h2>
              <i className="far fa-question-circle"></i> What is Recycling
            </h2>
            <p>
              Recycling is the process of collecting and processing materials
              that would otherwise be thrown away as trash and turning them into
              new products.
            </p>
          </div>

          <div className="how-to-use">
            <h3>
              <i className="fas fa-sign-language"></i> How to Use
            </h3>
            <p>
              Using the site you should send a request to recycle some of the
              materials according to the type and quantity.
            </p>
          </div>

          <div className="how-it-works">
            <h4>
              <i className="fas fa-chalkboard-teacher"></i> How it Works ?
            </h4>
            <p>
              We will contact you to take the materials and will exchange points
              on our site and when collecting points you can exchange them for
              one of the offers on our site.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Instraction;
