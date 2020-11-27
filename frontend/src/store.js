import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import teacherReducer from "./TeacherRedux/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  Auth: authReducer,
  Teachers: teacherReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
