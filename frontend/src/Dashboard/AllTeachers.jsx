import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { changeQueries } from "../PatientRecords/actions";
import { getTeachersRecords } from "../TeacherRedux/actions";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 15px;
  padding: 1% 2%;
`;

const Div = styled.div`
  color: #fc427b;
  font-size: 40px;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  padding: 3px;
  border: 2px solid #fc427b;
`;

export default function AllTeachers() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [teacherName, setTeacherName] = useState("all");

  const handleChange = (e) => {
    setTeacherName(e.target.value);
  };

  let { teachers, urlParams } = useSelector((state) => state.Teachers);
  const { userData } = useSelector((state) => state.Auth);

  useEffect(() => {
    let payload = {
      id: userData.userId,
      name: teacherName,
      sortOrder: urlParams[0].sortOrder,
      page: urlParams[0].page,
      filter: urlParams[0].filter,
    };
    dispatch(getTeachersRecords(payload));
  }, []);

  const searchTeacher = () => {
    let payload = {
      id: userData.userId,
      name: teacherName,
      sortOrder: urlParams[0].sortOrder,
      page: urlParams[0].page,
      filter: urlParams[0].filter,
    };
    dispatch(changeQueries(payload));
  };

  teachers = teachers.map((item) => {
    if (!item.avatar.includes("http")) {
      item.avatar = item.avatar.split("/");
      item.avatar = `http://localhost:8000/uploads/${
        item.avatar[item.avatar.length - 1]
      }`;
      return item;
    }
  });

  return (
    <div>
      {/* search bar */}
      <div className="row col-4 mt-2 offset-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Teacher"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon1"
              onChange={handleChange}
              style={{
                background: "transparent",
                border: "1px 0 1px 1px",
              }}
            >
              <i className="fas fa-search" onClick={searchTeacher}></i>
            </span>
          </div>
        </div>
      </div>

      {/* Map Teachers Data */}
      {teachers &&
        teachers.map((item) => (
          <Div key={item._id}>
            <Card className="card col-10 offset-1 mb-2">
              <div className="row no-gutters">
                <div className="col-md-2">
                  <Image
                    src={item.avatar}
                    className="card-img"
                    alt={item.name}
                  />
                </div>
                <div className="col-md-4 mt-1">
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                  </div>
                </div>
                <div className="col-md-3 mt-3">
                  <div className="card-body">
                    <h2
                      className="card-title text-dark"
                      style={{ fontSize: "20px" }}
                    >
                      Classes: {JSON.parse(item.classes).length}
                    </h2>
                  </div>
                </div>
                <div className="col-md-2 mt-3">
                  <div className="card-body">
                    <h2
                      className="card-title text-dark"
                      style={{ fontSize: "20px" }}
                    >
                      Age: {item.age}
                    </h2>
                  </div>
                </div>
                <div className="col-md-1">
                  <Link
                    to={`/patientDetails/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="mt-2 text-dark">...</div>
                  </Link>
                </div>
              </div>
            </Card>
          </Div>
        ))}
    </div>
  );
}
