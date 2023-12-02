import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS} from "../constants/usercnstants"
    import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
    }
  };
export const register = (userData) => async (dispatch) => {
  try {
    console.log("action")
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    console.log(userData);
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/register`,
     userData,
      config
    ); 
   
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
      console.log(error);
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.error });
  }
};
export const clearerror=()=>async(dispatch)=>{
  dispatch({type:CLEAR_ERRORS});
}