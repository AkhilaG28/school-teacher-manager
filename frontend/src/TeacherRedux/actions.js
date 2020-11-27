import {
  ADD_TEACHER_REQUEST,
  ADD_TEACHER_SUCCESS,
  ADD_TEACHER_FAILURE,
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAILURE,
  CHANGE_QUERIES,
} from "./actionTypes";
import axios from "axios";

// add a teacher record

export const addTeacherRequest = () => ({
  type: ADD_TEACHER_REQUEST,
});

export const addTeacherSuccess = (payload) => ({
  type: ADD_TEACHER_SUCCESS,
  payload,
});

export const addTeacherFailure = (payload) => ({
  type: ADD_TEACHER_FAILURE,
  payload,
});

export const addTeacherRecord = (payload) => (dispatch) => {
  dispatch(addTeacherRequest());
  console.log(payload);
  axios
    .post("http://localhost:8000/addTeacher", payload)
    .then((res) => {
      console.log(res.data);
      dispatch(addTeacherSuccess(res.data));
    })
    .catch((err) => dispatch(addTeacherFailure(err)));
};

// get teachers records

export const getTeacherRequest = () => ({
  type: GET_TEACHERS_REQUEST,
});

export const getTeacherSuccess = (payload) => ({
  type: GET_TEACHERS_SUCCESS,
  payload,
});

export const getTeacherFailure = (payload) => ({
  type: GET_TEACHERS_FAILURE,
  payload,
});

export const getTeachersRecords = (payload) => (dispatch) => {
  console.log(payload);
  dispatch(getTeacherRequest());
  // console.log(payload, page, name, gender);
  axios
    .get(
      `http://localhost:8000/getTeachers/${payload.id}?page=${payload.page}&limit=5&name=${payload.name}&filter=${payload.filter}&sort=${payload.sortOrder}`
    )
    .then((res) => dispatch(getTeacherSuccess(res.data)))
    .catch((err) => dispatch(getTeacherFailure(err)));
};
