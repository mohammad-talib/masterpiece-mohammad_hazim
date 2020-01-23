import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./Request.css";

class Request extends Component {
  state = {
    request: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/request")
      .then(({ data }) => {
        this.setState({
          request: data
        });
        console.log("data", data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  acceptMaterial = object => {
    console.log("object Material", object);
    axios
      .post("http://localhost:9000/accept", object)
      .then(({ data }) => {
        this.setState({
          request: data
        });
        console.log("data", data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log("material", this.state.material);
    console.log("request", this.state.request);
    return (
      <div className="request">
        <h1 className="admin"> Request Users</h1>
        <div className="line-admin"></div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Points</th>
              <th>Request Material</th>
            </tr>
          </thead>
          <tbody>
            {this.state.request.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phonenumber}</td>
                  <td>{item.location}</td>
                  <td>{item.point}</td>
                  <th>
                    {item.addmaterial.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.type}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                this.acceptMaterial(item);
                              }}
                              disabled={item.accept ? true : false}
                            >
                              Accept
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Request;
