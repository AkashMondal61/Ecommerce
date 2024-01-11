import axios from "axios";
import { useState } from "react";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, 
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,   
    CLEAR_ERRORS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL ,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS ,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL 
} from "../constants/productconstants"
let isDataLoaded =false;
export const getproduct=(keyword="", currentPage=1,price=[0,10000000],category="")=>async(dispatch)=>{
     try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        console.log("s");
        const {data}=await axios.get(`api/v1/products?keyword=${keyword}&page=${currentPage}&price[gt]=${price[0]}&price[lt]=${price[1]}&category=${category}`);
        isDataLoaded=true;
        console.log(data);
        dispatch({
            type:ALL_PRODUCT_SUCCESS, 
            payload:data,
        });
     }catch(error)
     {
        console.log(error);
        dispatch({
        type:ALL_PRODUCT_FAIL,
        payload:error.response.data.error,
            
        })
     }
}

export const getproductDetails=(id)=>async(dispatch)=>{
    try{
       dispatch({type:PRODUCT_DETAILS_REQUEST});
       const {data}=await axios.get(`http://localhost:3000/api/v1/product/${id}`);

       dispatch({
           type:PRODUCT_DETAILS_SUCCESS,
           payload:data.theproduct,
       });
    }catch(error)
    {
       console.log(error);
       dispatch({
           type:PRODUCT_DETAILS_FAIL,
           payload:error.response.data.error, 
           
       })
    }
}



export const newReview=(reviewdata)=>async(dispatch)=>{
    try{
       dispatch({type:NEW_REVIEW_REQUEST});
       const config={
        headers:{"content-type":"application/json"}
       }
       console.log(reviewdata)
       const {data}=await axios.put(`http://localhost:3000/api/v1/productsreview`,reviewdata,config);
       console.log(data);
       dispatch({
           type:NEW_REVIEW_SUCCESS,
           payload:data.sucess,
       });
    }catch(error)
    {
       console.log(error);
       dispatch({
           type:NEW_REVIEW_FAIL,
           payload:error.response.data, 
           
       })
    }
}


export const getproductadmin=()=>async(dispatch)=>{
    try{
       dispatch({type:ADMIN_PRODUCT_REQUEST});
       console.log("s");
       const {data}=await axios.get(`/api/v1/admin/allproducts`);
       console.log(data);
       dispatch({
           type:ADMIN_PRODUCT_SUCCESS,
           payload:data.Products,
       });
    }catch(error)
    {
       console.log(error);
       dispatch({
       type:ADMIN_PRODUCT_FAIL,
       payload:error.response.data.error,
           
       })
    }
}


export const createProduct = (userData) => async (dispatch) => {
    try {
    //   console.log("action")
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      console.log(userData);
      const { data } = await axios.post(
        `/api/v1/admin/product/new`,
       userData,
        config
      ); 
      
      dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data.Product });
    } catch (error) {
        console.log(error);
      dispatch({ type:  NEW_PRODUCT_FAIL, payload: error.response.data.error });
    }
  };
export const clearerror=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
export const getIsDataLoaded = () => {
    getproduct();
    return isDataLoaded;
};