import React from "react";
import { useSelector } from "react-redux";
import AllTeachers from "./AllTeachers";
import { Link } from "react-router-dom";

function Dashboard() {
  const { userData } = useSelector((state) => state.Auth);

  return (
    <div
      className="container-fluid"
      style={{
        background: "#10133e",
        marginTop: "1%",
        marginBottom: "1%",
        borderRadius: "15px",
      }}
    >
      <div className="row">
        <div className="col-1">
          <div className="row">
            <img
              width="100px"
              src="https://comps.canstockphoto.com/administrator-icon-stock-illustrations_csp33521157.jpg"
              alt={userData.name}
            />
          </div>
          <div className="row text-white my-5 ml-3">
            <i className="fas fa-book fa-2x"></i>
          </div>
          <div className="row text-white ml-3 mb-4">
            <i className="fas fa-user-plus fa-2x"></i>
          </div>
        </div>
        <div
          className="col-10 bg-white my-4 pr-5"
          style={{ background: "#f4f7fc", borderRadius: "10px" }}
        >
          {/* admin name card */}
          <div
            className="card mt-5"
            style={{
              background: "#10133e",
              color: "white",
              borderRadius: "15px",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Hi {userData.name}</h5>
              <p className="card-text h3">Check Teachers Data</p>
            </div>
          </div>

          {/* Teacher Cards */}
          <AllTeachers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
