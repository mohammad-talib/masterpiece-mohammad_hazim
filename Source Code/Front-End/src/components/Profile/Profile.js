import React, { Component } from "react";
import User from "../User/User";
import Buyoffer from "../Show Buy Offer/Buyoffer";

class Profile extends Component {
  render() {
    return (
      <div className="row mb-4 mt-4 mr-0">
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
          <User />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-8">
          <Buyoffer />
        </div>
      </div>
    );
  }
}

export default Profile;
