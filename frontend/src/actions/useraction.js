import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST ,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET ,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET ,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    ALL_USER_RESET,
  } from "../constants/usercnstants"
    import axios from "axios";

// Login
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `/api/v1/login`,
        { email , password },
        config
      );
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.error });
    }
  };


//logout 
export const logout =()=> async (dispatch) => {
    try {
      const {data}= await axios.get(
        `/api/v1/logout`
      );
      dispatch({ type: LOGOUT_SUCCESS ,payload: data});
    } catch (error) {
      dispatch({ type:  LOGOUT_FAIL, payload: error.response.data.error });
    }
  };
//REGISTER
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
   
    const { data } = await axios.post(
      `/api/v1/register`,
     userData,
      config
    ); 
   
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.error });
  }
};


//LOAD
export const load = () => async (dispatch) => {
  try {
    dispatch({ type:  LOAD_USER_REQUEST });
    const { data } = await axios.get(
      `/api/v1/me`
    );
     dispatch({ type:  LOAD_USER_SUCCESS, payload: data.uSer });
  } catch (error) {
    dispatch({ type:  LOAD_USER_FAIL, payload: error.response.data.error });
  }
};

export const clearerror=()=>async(dispatch)=>{
  dispatch({type:CLEAR_ERRORS});
}

//update profile
export const updateprofile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put(
      `http://localhost:3000/api/v1/me/updateprofile`,
      userData,
      config
    ); 
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.uSer });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.error });
  }
}

  //update password

  export const updatepassword= (userData) => async (dispatch) => {
    try {

      dispatch({ type: UPDATE_PASSWORD_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/updatepassword`,
       userData,
        config
      ); 
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.error });
    }
};


// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/forgotpassword`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//reset password

export const resetPassword = (token,datas) => async (dispatch) => {
  try {
  
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
 
    const { data } = await axios.put(`/api/v1/resetpassword/${token}`, datas, config);
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.sucess });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.error,
    });
  }
};

//All user details  

export const alluser = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const { data } = await axios.get(
      `/api/v1/admin/alluser`,
    ); 
    dispatch({ type: ALL_USER_SUCCESS, payload: data.uSers });
  } catch (error) {
    dispatch({ type: ALL_USER_FAIL , payload: error.response.data.error });
  }
}
