import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addTeacherRecord } from "../TeacherRedux/actions";

function AddTeacher() {
  let initialState = {
    gender: "",
    name: "",
    age: "",
    avatar: "",
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector((state) => state.Auth);
  const [teacherDetails, setTeacherDetails] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file")
      setTeacherDetails({ ...teacherDetails, avatar: e.target.files[0] });
    else setTeacherDetails({ ...teacherDetails, [name]: value });
  };

  const [classes, setClasses] = useState([
    { grade: "", section: "", subject: "" },
  ]);

  const handleClasses = (e, index) => {
    const { name, value } = e.target;
    const list = [...classes];
    list[index][name] = value;
    setClasses(list);
  };

  const handleAdd = () => {
    setClasses([...classes, { grade: "", section: "", subject: "" }]);
  };

  const addTeacher = (e) => {
    e.preventDefault();
    let teacherRecord = new FormData();
    for (let key in teacherDetails) {
      teacherRecord.append(key, teacherDetails[key]);
    }
    teacherRecord.append("classes", JSON.stringify(classes));
    teacherRecord.append("adminId", userData.userId);
    console.log(classes);
    dispatch(addTeacherRecord(teacherRecord));
  };

  return (
    <div>
      <h2 className="text-center mt-5">Add a Teacher Record</h2>
      <form encType="multipart/form-data" className="offset-3 col-6">
        <div className="my-4">
          <input
            onChange={handleChange}
            name="name"
            value={teacherDetails.name}
            type="text"
            className="form-control"
            placeholder="Enter name of teacher"
            required
          />
        </div>
        <div className="row">
          <div className="col-6 mb-4">
            <input
              onChange={handleChange}
              name="age"
              value={teacherDetails.age}
              type="number"
              className="form-control"
              placeholder="Enter age of teacher"
              required
            />
          </div>
          <div className="col-6 mt-2">
            <div className="form-check form-check-inline ml-4">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={handleChange}
                id="male"
                value="Male"
                required
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={handleChange}
                id="female"
                value="Female"
                required
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={handleChange}
                id="other"
                value="Other"
                required
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row text-left mt-4 ml-3">
          <label htmlFor="imageFile">Upload picture</label>
          <input
            type="file"
            onChange={handleChange}
            className="form-control-file"
            id="imageFile"
            required
          />
        </div>

        {classes.map((item, i) => (
          <div className="row text-center my-2" key={i}>
            <input
              className="col"
              name="grade"
              type="number"
              value={item.grade}
              onChange={(e) => handleClasses(e, i)}
              placeholder="Grade"
              required
            />
            <input
              name="section"
              className="col offset-1"
              type="text"
              value={item.section}
              onChange={(e) => handleClasses(e, i)}
              placeholder="Section"
              required
            />
            <input
              name="subject"
              className="col offset-1"
              type="text"
              value={item.subject}
              onChange={(e) => handleClasses(e, i)}
              placeholder="Subject"
              required
            />

            {classes.length - 1 === i && (
              <i
                className="fas fa-plus-square fa-2x col"
                onClick={handleAdd}
              ></i>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addTeacher}
          style={{ background: "#ef786c" }}
          className="btn btn-block col-6 offset-3 mt-4"
        >
          Add Teacher
        </button>
      </form>
    </div>
  );
}

export default AddTeacher;
