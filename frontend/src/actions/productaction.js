import axios from "axios";
import { useState } from "react";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
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
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
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