import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import history from "./history";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Material from "./components/Add Material/Material";
import Showmaterial from "./components/Material/Showmaterial";
import Editmaterial from "./components/Edit Material/Editmaterial";
import Offeradmin from "./components/Offer Admin/Offeradmin";
import Offers from "./components/Offers/Offers";
import Userboard from "./components/User Dashboard/Userboard";
import Adminboard from "./components/Admin Dashboard/Adminboard";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";

class App extends Component {
  state = {
    admin: false
  };

  render() {
    return (
      <div>
        <Router history={history}>
          <Nav />
          <Switch>
            <Route
              exact
              path="/"
              render={props => {
                return <Login {...props} getAdmin={this.getAdmin} />;
              }}
            />

            <Route path="/registration">
              <Registration />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <Route
              path="/homepage"
              render={props => {
                return (
                  <div>
                    <Home {...props} />
                  </div>
                );
              }}
            />

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/addmaterial">
              <Material />
            </Route>

            <Route
              path="/showmaterial"
              render={props => {
                return <Showmaterial {...props} />;
              }}
            />

            <Route
              path="/editmaterial"
              render={props => {
                return <Editmaterial {...props} />;
              }}
            />

            <Route path="/offers">
              {localStorage.getItem("admin") === "false" ? (
                <Offers />
              ) : (
                <Offeradmin />
              )}
            </Route>

            <Route
              path="/dashboard"
              render={props => {
                return localStorage.getItem("admin") === "false" ? (
                  <Userboard {...props} />
                ) : (
                  <Adminboard {...props} />
                );
              }}
            />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
