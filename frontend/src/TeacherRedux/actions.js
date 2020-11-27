import {
  ADD_TEACHER_REQUEST,
  ADD_TEACHER_SUCCESS,
  ADD_TEACHER_FAILURE,
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAILURE,
  CHANGE_QUERIES,
  FIND_TEACHER_REQUEST,
  FIND_TEACHER_SUCCESS,
  FIND_TEACHER_FAILURE,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAILURE,
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
    .then((res) => dispatch(addTeacherSuccess(res.data)))
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
  dispatch(getTeacherRequest());
  axios
    .get(
      `http://localhost:8000/getTeachers/${payload.id}?page=${payload.page}&limit=5&name=${payload.name}&filter=${payload.filter}&sort=${payload.sortOrder}`
    )
    .then((res) => dispatch(getTeacherSuccess(res.data)))
    .catch((err) => dispatch(getTeacherFailure(err)));
};

// change queries

export const changeQueries = (payload) => ({
  type: CHANGE_QUERIES,
  payload,
});

// find teacher

export const findTeacherRequest = () => ({
  type: FIND_TEACHER_REQUEST,
});

export const findTeacherSuccess = (payload) => ({
  type: FIND_TEACHER_SUCCESS,
  payload,
});

export const findTeacherFailure = (payload) => ({
  type: FIND_TEACHER_FAILURE,
  payload,
});

export const findTeacher = (payload) => (dispatch) => {
  dispatch(findTeacherRequest());
  axios
    .get(`http://localhost:8000/findTeacher/${payload}`)
    .then((res) => dispatch(findTeacherSuccess(res.data)))
    .catch((err) => dispatch(findTeacherFailure(err)));
};

// delete teacher record

export const deleteTeacherRequest = () => ({
  type: DELETE_TEACHER_REQUEST,
});

export const deleteTeacherSuccess = (payload) => ({
  type: DELETE_TEACHER_SUCCESS,
  payload,
});

export const deleteTeacherFailure = (payload) => ({
  type: DELETE_TEACHER_FAILURE,
  payload,
});

export const deleteTeacher = (id, payload) => (dispatch) => {
  dispatch(deleteTeacherRequest());
  //   console.log(id, payload);
  axios
    .delete(`http://localhost:8000/deleteTeacher/${id}`)
    .then((res) => {
      console.log(res);
      dispatch(deleteTeacherSuccess(res.data));
      dispatch(getTeachersRecords(payload));
    })
    .catch((err) => dispatch(deleteTeacherFailure(err)));
};
