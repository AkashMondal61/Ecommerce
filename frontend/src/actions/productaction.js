import axios from "axios";
import { useState } from "react";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/productconstants"
let isDataLoaded =false;
export const getproduct=()=>async(dispatch)=>{
     try{
        dispatch({type:ALL_PRODUCT_REQUEST});
        const {data}=await axios.get("api/v1/products");
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
    //    console.log(id);
    //    console.log("cecec");
       const {data}=await axios.get(`api/v1/products/${id}`);
       console.log(data.theproduct);
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

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
export const getIsDataLoaded = () => {
    getproduct();
    return isDataLoaded;
};