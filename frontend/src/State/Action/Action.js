import axios from "axios";
import API, { API_BASE_URL } from "../../config/api";
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
  LOGOUT
} from "./ActionType";

// -------------------- REGISTER --------------------------
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }

    dispatch({ type: REGISTER_SUCCESS, payload: user });
    console.log("Registered user:", user);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data || error.message });
  }
};

// -------------------- LOGIN --------------------
export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    const { token, user } = response.data;
    console.log("user",token,user);
    

    if (token && user) {
      localStorage.setItem("jwt", token);
      localStorage.setItem("userId", user.id);
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.user || response.data,
    });

    console.log("Logged in user:", user);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};


// -------------------- GET USER --------------------
export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await api.get("/api/users/profile");
    const user = response.data;
    console.log("Fetched user:", user);
    dispatch({ type: GET_USER_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.response?.data || error.message });
  }
};

// -------------------- LOGOUT --------------------
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};