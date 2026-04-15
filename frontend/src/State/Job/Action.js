import axios from "axios";
import {
  GET_JOBS_REQUEST,
  GET_JOBS_SUCCESS,
  GET_JOBS_FAILURE,
} from "./ActionType";

export const searchJobs = (title = "", location = "") => async (dispatch) => {
  try {
    dispatch({ type: GET_JOBS_REQUEST });

    const { data } = await axios.post(`http://localhost:5000/api/jobs/search`, { 
      title, 
      location 
    });

    console.log("Data Received:", data);
    

    dispatch({
      type: GET_JOBS_SUCCESS,
      payload: data.jobs, 
    });
  } catch (error) {
    dispatch({
      type: GET_JOBS_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};