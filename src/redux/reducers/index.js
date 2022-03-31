import { combineReducers } from 'redux';
import * as LoginReducer from "../collections/Login/reducer";
import * as UsersReducer from "../collections/Users/reducer";

const appReducers = combineReducers(
  Object.assign(LoginReducer, UsersReducer)
);

export default appReducers;
