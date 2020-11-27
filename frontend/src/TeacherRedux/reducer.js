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

import { loadData, saveData } from "../localStorage";

export const initialState = {
  isLoading: false,
  isError: false,
  teachers: [],
  totalCount: "",
  urlParams: loadData("schoolUrl") || {
    name: "all",
    sortOrder: "sort",
    filter: "all",
    page: 1,
    teacherName: "all",
  },
  errMsg: "",
  addedTeacher: false,
  deleted: false,
  teacher: loadData("schoolTeacher") || {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TEACHER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
        addedTeacher: false,
      };

    case ADD_TEACHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        deleted: false,
        addedTeacher: true,
      };

    case ADD_TEACHER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
        addedTeacher: false,
      };

    case GET_TEACHERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
        addedTeacher: false,
      };

    case GET_TEACHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teachers: action.payload.current,
        totalCount: action.payload.totalCount,
        isError: false,
        errMsg: "",
        deleted: false,
        addedTeacher: false,
      };

    case GET_TEACHERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
        addedTeacher: false,
      };

    case CHANGE_QUERIES:
      saveData("schoolUrl", action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        deleted: false,
        addedTeacher: false,
        urlParams: action.payload,
      };

    case FIND_TEACHER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
        addedTeacher: false,
      };

    case FIND_TEACHER_SUCCESS:
      saveData("schoolTeacher", action.payload);
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        deleted: false,
        teacher: action.payload,
        addedTeacher: true,
      };

    case FIND_TEACHER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
        addedTeacher: false,
      };

    case DELETE_TEACHER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
        addedTeacher: false,
      };

    case DELETE_TEACHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        deleted: true,
        addedTeacher: true,
      };

    case DELETE_TEACHER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
        addedTeacher: false,
      };

    default:
      return state;
  }
};
