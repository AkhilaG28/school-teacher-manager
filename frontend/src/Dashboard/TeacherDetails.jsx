import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { findTeacher, deleteTeacher } from "../TeacherRedux/actions";

const Card = styled.div`
  border-radius: 15px;
  margin-top: 5%;
  padding: 1% 2%;
  background: linear-gradient(285deg, #d6aed6 0%, #98d9e1 99%);
`;

const Table = styled.table`
  margin-left: 42%;
  margin-top: 2%;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid white;
    text-align: center;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #cf6a87;
    color: white;
  }
`;

const Button = styled.button`
  background: crimson;
  border: 1px solid crimson;
  color: white;
  border-radius: 5px;
  margin-top: 2%;
`;

function TeacherDetails() {
  let params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  let teacherId = params.id;

  useEffect(() => {
    dispatch(findTeacher(teacherId));
  }, []);

  const { teacher, urlParams, deleted } = useSelector(
    (state) => state.Teachers
  );

  const { userData } = useSelector((state) => state.Auth);

  let classes = JSON.parse(teacher.data.classes);

  const deleteTeacherRecord = () => {
    let payload = {
      ...urlParams,
      id: userData.userId,
    };
    // console.log(payload);
    dispatch(deleteTeacher(params.id, payload));
  };

  if (deleted) history.push("/dashboard");

  return (
    <>
      <Card className="card col-8 offset-2 mb-3">
        <div className="card-body">
          <div className="row text-center">
            <h2 className="card-title col">Name: {teacher.data.name}</h2>
            <h5 className="card-text col mt-2">Age: {teacher.data.age}</h5>
          </div>
          <div className="row text-center">
            <h5 className="card-text text-center col">Classes:</h5>
          </div>

          <Table>
            <thead>
              <tr className="p-4" style={{ background: "#22a6b3" }}>
                <td>Grade</td>
                <td>Section</td>
                <td>Subject</td>
              </tr>
            </thead>
            <tbody>
              {classes.map((grade, index) => (
                <tr key={index} className="p-4">
                  <td>{grade.grade}</td>
                  <td>{grade.section}</td>
                  <td>{grade.subject}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="row text-center">
            <Button className="col-4 offset-4" onClick={deleteTeacherRecord}>
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default TeacherDetails;
