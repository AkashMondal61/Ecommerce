import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
    MY_ORDER_REQUEST,
    MY_ORDER_FAIL,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS, 
  ORDER_DETAILS_FAIL,
  ALL_ORDER_FAIL,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_REQUEST,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL
} from "../constants/Orderconstants"
import axios from "axios";
// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/order", order, config);
      
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  //showorders
  export const myOrder = () => async (dispatch) => {
    try {
      dispatch({ type: MY_ORDER_REQUEST });
  
      const { data } = await axios.get("/api/v1/order/showall");
      
      dispatch({ type: MY_ORDER_SUCCESS, payload: data.order });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: MY_ORDER_FAIL,
        payload: error.response.data,
      });
    }
  };

  //ORDER details
  export const Orderdetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/order/showone/${id}`);
      // console.log(data);
      dispatch({ type:ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.error,
      });
    }
  };
  export const clearerror=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
  }

  //all order
  export const allorder = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDER_REQUEST });
  
      const { data } = await axios.get(`/api/v1/admin/order`);
      // console.log(data);
      dispatch({ type:ALL_ORDER_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: ALL_ORDER_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  export const deleteOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type:DELETE_ORDER_REQUEST});
      const { data } = await axios.delete(`/api/v1/admin/delete/${id}`);
      // console.log(data);
      dispatch({ type:DELETE_ORDER_SUCCESS, payload: data.order });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.error,
      });
    }
  };

  