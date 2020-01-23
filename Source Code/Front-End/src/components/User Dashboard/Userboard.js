import React, { Component } from "react";
import Showmaterial from "../Material/Showmaterial";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Userboard.css";

class Userboard extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="row mr-0">
          <div className="col-sm-12 col-lg-6">
            <Showmaterial prp={this.props} />
          </div>
          <div className="col-sm-12 col-lg-6 image-back">
            <div className="save-env">
              <p>Save The Environment and you will save the life and future.</p>
              <div className="position-btn">
                <Link to="/addmaterial">
                  <button className="button-request">
                    <i className="fas fa-paper-plane"></i> Send Request
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Userboard;
