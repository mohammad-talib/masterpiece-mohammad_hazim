import React, { Component } from "react";
import "./Footer.css";
import { Link } from "react-router-dom/cjs/react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p>
                Recyclingis important in today’s world if we want to leave this
                planet for our future generations. It is good for the
                environment, since we are making new products from the old
                products which are of no use to us. Recycling begins at home. So
                We Should To Start Recycling. Welcome in Recycle Website
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Content</h6>
              <ul className="footer-links">
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/offers">Offers</Link>
                </li>
                <li>
                  <Link to="/">Log In </Link>
                </li>
                <li>
                  <Link to="/registration">Registration</Link>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2019 All Rights Reserved by
                <Link to="/">Recycle</Link>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <Link className="facebook" to="/">
                    <i className="fa fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link className="twitter" to="/">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link className="dribbble" to="/">
                    <i className="fa fa-dribbble"></i>
                  </Link>
                </li>
                <li>
                  <Link className="linkedin" to="/">
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
