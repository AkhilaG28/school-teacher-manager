import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row mt-4 font-weight-bold">
          <div className="col"></div>
          <div className="col">
            <h1 style={{ color: "#d7263c" }}>IGS</h1>
          </div>
          <div className="col mt-2">Home</div>
          <div className="col mt-2">About Us</div>
          <div className="col mt-2">Academics</div>
          <div className="col mt-2">Blogs</div>
          <div className="col mt-2">Contact Us</div>
          <div className="col ">
            <Link to="/login">
              <button className="btn btn-danger">SIGN IN</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ position: "relative" }}>
        <div className="row">
          <img src="./bg.jpeg" alt="IGS" style={{ width: 1550 }} />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
