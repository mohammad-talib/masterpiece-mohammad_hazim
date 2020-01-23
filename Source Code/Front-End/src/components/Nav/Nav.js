import React from "react";
import Header from "../Header/Header";
import Headeruser from "../Header User/Headeruser";

const Nav = () => {
  return (
    <div>
      {localStorage.getItem("admin") === null ? <Header /> : <Headeruser />}
    </div>
  );
};

export default Nav;
