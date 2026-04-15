import { GET_JOBS_REQUEST, GET_JOBS_SUCCESS, GET_JOBS_FAILURE } from "./ActionType";    

const initialState = {
  loading: false,
  jobs: [],
  error: null,
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_JOBS_SUCCESS:
      return { ...state, loading: false, jobs: action.payload };
    case GET_JOBS_FAILURE:
      return { ...state, loading: false, error: action.payload, jobs: [] };
    default:
      return state;
  }
};

export default jobReducer;
