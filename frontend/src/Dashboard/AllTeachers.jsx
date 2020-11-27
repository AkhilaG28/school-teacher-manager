import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { getTeachersRecords, changeQueries } from "../TeacherRedux/actions";
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

  let { teachers, urlParams, totalCount } = useSelector(
    (state) => state.Teachers
  );
  const { userData } = useSelector((state) => state.Auth);

  let totalPages = Math.ceil(totalCount / 5);

  const [teacherName, setTeacherName] = useState(urlParams.name);
  const [filterGender, setFilterGender] = useState(urlParams.filter);
  const [sortOrder, setSortOrder] = useState(urlParams.sortOrder);
  const [activePage, setActivePage] = useState(urlParams.page);

  const handleChange = (e) => {
    setTeacherName(e.target.value);
  };

  useEffect(() => {
    let payload = {
      id: userData.userId,
      name: teacherName,
      sortOrder: sortOrder,
      page: activePage,
      filter: filterGender,
    };
    dispatch(getTeachersRecords(payload));
    history.push(
      `/dashboard/${userData.userId}?page=${activePage}limit=5&name=${teacherName}&filter=${filterGender}&sort=${sortOrder}`
    );
  }, []);

  const searchTeacher = () => {
    console.log("object");
    setActivePage(1);
    let payload = {
      id: userData.userId,
      name: teacherName,
      sortOrder: sortOrder,
      page: 1,
      filter: filterGender,
    };
    dispatch(changeQueries(payload));
    dispatch(getTeachersRecords(payload));
    history.push(
      `/dashboard/${
        userData.userId
      }?page=${1}limit=5&name=${teacherName}&filter=${filterGender}&sort=${sortOrder}`
    );
  };

  const handlePageChange = (e, value) => {
    setActivePage(value);
  };

  useEffect(() => {
    let payload = {
      id: userData.userId,
      name: teacherName,
      sortOrder: sortOrder,
      page: activePage,
      filter: filterGender,
    };
    dispatch(changeQueries(payload));
    dispatch(getTeachersRecords(payload));

    history.push(
      `/dashboard/${userData.userId}?page=${activePage}&limit=5&name=${teacherName}&filter=${filterGender}&sort=${sortOrder}`
    );
  }, [sortOrder, activePage, filterGender]);

  const setSort = (e) => {
    setSortOrder(e.target.value);
  };

  const setGender = (e) => {
    setFilterGender(e.target.value);
  };
  teachers =
    teachers &&
    teachers.map((item) => {
      if (!item.avatar.includes("http")) {
        item.avatar = item.avatar.split("/");
        item.avatar = `http://localhost:8000/uploads/${
          item.avatar[item.avatar.length - 1]
        }`;
        return item;
      } else return item;
    });

  return (
    <div>
      {/* search bar */}
      <div className="row col-4 mt-2 offset-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="Search Teacher"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <div className="input-group-append">
            <span
              className="input-group-text"
              id="basic-addon1"
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

      {/* Sort and Filter */}
      <div className="row">
        <div className="col">
          <div className="form-check form-check-inline ml-4">
            <input
              className="form-check-input"
              checked={filterGender == "Male" ? true : false}
              type="radio"
              name="gender"
              onChange={setGender}
              id="male"
              value="Male"
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              checked={filterGender == "Female" ? true : false}
              type="radio"
              name="gender"
              onChange={setGender}
              id="female"
              value="Female"
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              checked={filterGender == "Other" ? true : false}
              type="radio"
              name="gender"
              onChange={setGender}
              id="other"
              value="Other"
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
          </div>
        </div>
        <div className="col">
          <select name="gender" onChange={setSort} value={filterGender}>
            <option value="sort">Sort By Age</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        onChange={handlePageChange}
        style={{
          clear: "both",
          marginLeft: "40%",
          outline: "none",
          marginBottom: "3%",
        }}
        color="secondary"
      />

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
                    to={`/teacherDetails/${item._id}`}
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
