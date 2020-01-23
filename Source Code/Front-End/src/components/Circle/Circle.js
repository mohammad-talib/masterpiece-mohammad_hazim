import React, { Component } from "react";
import "./Circle.css";

class Circle extends Component {
  state = {};
  render() {
    return (
      <div className="container text-center">
        <div className="circle">
          <h2 className="mb-4">What is the service provided?</h2>
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="img-background d-flex justify-content-center align-items-center ">
                <div className="icon">
                  <i className="fas user fa-user"></i>
                </div>
              </div>
              <h3 className="font-weight-bolder mt-2">User</h3>
              <p>
                The user can get rid of unwanted materials such as aluminum,
                plastic and paper to take points that he can exchange in one of
                the offers.{" "}
              </p>
            </div>
            <div className="col-12 col-md-4">
              {" "}
              <div className="img-background-black d-flex justify-content-center align-items-center ">
                <div className="icon">
                  <i className="fas user fa-handshake"></i>
                </div>
              </div>
              <h3 className="font-weight-bolder mt-2">Stack Holder</h3>
              <p>
                Companies can provide their products and make offers to users so
                that both parties benefit from this product as an advertisement
                and service
              </p>
            </div>
            <div className="col-12 col-md-4">
              {" "}
              <div className="img-background d-flex justify-content-center align-items-center ">
                <div className="icon">
                  <i className="fas user fa-recycle"></i>
                </div>
              </div>
              <h3 className="font-weight-bolder mt-2">Material</h3>
              <p>
                Recycling materials is a benefit for all to preserve the
                environment from pollution and sell these materials to factories
                interested in this field{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Circle;
