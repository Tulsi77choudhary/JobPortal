import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./Action/Reducer";
import { jobReducer } from "./Job/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  jobs: jobReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
