import React, { Component } from "react";
import "./Info.css";

export class Info extends Component {
  render() {
    return (
      <div className="containerinfo">
        <div style={{ clear: "both" }}></div>
        <div className="childofcontainerinfo">
          <div className="info-container">
            <div className="info-recycle">
              <h1>Know what Recycling ?</h1>
              <p>
                <b>Metal Cans</b>
                Before recycling food and drink cans, remove paper or plastic
                labels and clean out any residual materials. Some metal cans
                have an insulated coating that might not be recyclable. When in
                doubt, throw it out! Recyclables don’t need to thoroughly
                washed, but they do need to be dry so they don’t contaminate
                other items.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
