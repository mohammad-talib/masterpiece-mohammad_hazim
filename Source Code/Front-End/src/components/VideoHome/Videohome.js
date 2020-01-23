import React, { Component } from "react";
import Video from "./recycling.mp4";
import "./Videohome.css";

class Videohome extends Component {
  state = {};
  render() {
    return (
      <div style={{ position: "relative" }}>
        <div className="abs-div">
          <p>Save the Environment</p>
          <p>Let's make our environment better !</p>
        </div>
        <video
          autoPlay
          muted
          loop
          ref="vidRef"
          src={Video}
          type="video/mp4"
          width="100%"
        />
      </div>
    );
  }
}

export default Videohome;
