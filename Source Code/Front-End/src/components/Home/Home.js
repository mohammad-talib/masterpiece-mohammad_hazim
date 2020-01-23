import React, { Component } from "react";
import "./Home.css";

import Instraction from "../Instraction/Instraction";
import Videohome from "../VideoHome/Videohome";
import Aboutus from "../About Us/Aboutus";
import Circle from "../Circle/Circle";
import Info from "../Info/Info";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Videohome />
        <Instraction />
        <Aboutus />
        <Circle />
        <Info />
      </div>
    );
  }
}

export default Home;
