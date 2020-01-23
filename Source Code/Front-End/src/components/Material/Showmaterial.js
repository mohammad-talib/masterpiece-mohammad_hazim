import React, { Component } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./Showmaterial.css";

class Showmaterial extends Component {
  state = {
    show: [],
    delete: "",
    data: [],
    isOpen: true
  };

  componentDidMount = () => {
    this.showMaterial();
  };

  showMaterial = () => {
    axios
      .post("http://localhost:9000/showmaterial", {
        _id: localStorage.getItem("userId")
      })
      .then(({ data }) => {
        this.setState({
          show: data.addmaterial
        });
        console.log("dataaaaaaaaa", data.addmaterial);
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteMaterial = materialId => {
    axios
      .delete("http://localhost:9000/deletematerial", {
        params: { userId: localStorage.getItem("userId"), materialId }
      })
      .then(({ data }) => {
        this.setState({
          show: data.addmaterial
        });
        console.log("dataaaaaaaaa", data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  editMaterial = e => {
    this.props.prp.history.push({
      pathname: "/editmaterial",
      search: "?query=abc",
      state: { detail: e }
    });
  };

  handleCancel = () => {
    this.setState({ isOpen: false });
  };

  submit = items => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete your request.",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteMaterial(items)
        },
        {
          label: "No",
          onClick: () => this.handleCancel()
        }
      ]
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="show-req">Request Material</h1>
        <div className="line-admin"></div>
        <div className="row">
          {this.state.show.map((items, index) => {
            return (
              <div key={index}
                className="card mb-3 shadow bg-white rounded"
                style={{ width: "60%", margin: " 0 auto" }}
              >
                {items.accept ? (
                  <div className="card-header bg-success">
                    <b> This Material Is Accepted</b>
                  </div>
                ) : (
                  <div className="card-header bg-warning">
                    Your request is under review
                  </div>
                )}

                <div className="row">
                  <div className="card-body pl-4 col-6">
                    <h5 className="card-title">
                      <img
                        src="https://img.icons8.com/cotton/30/000000/scales.png"
                        alt="scales"
                      />{" "}
                      {items.quantity}
                    </h5>
                    <h5 className="card-title">
                      <img
                        src="https://img.icons8.com/plasticine/30/000000/full-trash.png"
                        alt="trash"
                      />
                      {items.type}
                    </h5>
                  </div>
                  <div className="col-6 d-flex align-items-end justify-content-end p-4">
                    <div style={{ display: items.accept ? "none" : "block" }}>
                      <button
                        onClick={() => this.editMaterial(items)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>{" "}
                      <button
                        onClick={() => this.submit(items._id)}
                        className="btn btn-danger"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Showmaterial;
