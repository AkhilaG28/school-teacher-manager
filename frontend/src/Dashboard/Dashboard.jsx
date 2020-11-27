import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AllTeachers from "./AllTeachers";
import AddTeacher from "./AddTeacher";
import styled from "styled-components";
import { logout } from "../Auth/actions";
import { useHistory } from "react-router-dom";

const Div = styled.div`
  cursor: pointer;
  i {
    &:hover {
      color: #ef786c;
    }
  }
`;

function Dashboard() {
  const { userData } = useSelector((state) => state.Auth);
  const [content, setContent] = useState("allTeachers");

  const changeContent = (value) => {
    setContent(value);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: "#10133e",
        marginTop: "1%",
        marginBottom: "1%",
        borderRadius: "15px",
        height: "1500px",
      }}
    >
      <div className="row">
        <div className="col-1">
          <div className="row">
            <img
              className="mt-4 ml-2"
              width="80px"
              style={{ borderRadius: 30 }}
              src="https://www.pngkit.com/png/detail/263-2636288_admin-premiumcare-female-administrator-icon.png"
              alt={userData.name}
            />
            <div className="text-white ml-4 mt-3 h4">
              {userData.name.toUpperCase()}
            </div>
          </div>
          <Div
            className="row text-white my-5 ml-3"
            onClick={() => changeContent("allTeachers")}
          >
            <i className="fas fa-book fa-3x"></i>
            <div className="mt-2">Ledger</div>
          </Div>
          <Div
            className="row text-white ml-3 mb-4"
            onClick={() => changeContent("addTeacher")}
          >
            <i className="fas fa-user-plus fa-3x"></i>
            <div className="mt-2">Add</div>
          </Div>
        </div>
        <div
          className="col-10 bg-white my-4 pr-5"
          style={{ background: "#f4f7fc", borderRadius: "10px" }}
        >
          {/* admin name card */}
          <div
            className="mt-4"
            style={{
              display: "flex",
              background: "#10133e",
              color: "white",
              borderRadius: "15px",
            }}
          >
            <div
              className="card"
              style={{
                background: "#10133e",
                borderRadius: "15px",
                color: '"#f4f7fc"',
              }}
            >
              <div
                className="card-body"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h5 className="card-title">
                  Hi {userData.name.toUpperCase()} ,
                </h5>
                <p className="card-text h3">Check Teachers Data</p>
              </div>
            </div>
            <Div style={{ marginLeft: "auto" }} onClick={logoutUser}>
              <i className="fas fa-power-off pt-5 mr-5 fa-2x text-white"></i>
            </Div>
          </div>

          {/* Teacher Cards */}
          {content == "allTeachers" ? <AllTeachers /> : <AddTeacher />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
