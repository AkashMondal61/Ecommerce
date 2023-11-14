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
export const getproduct=(keyword="", currentPage=1,price=[0,10000000],category)=>async(dispatch)=>{
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

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}
export const getIsDataLoaded = () => {
    getproduct();
    return isDataLoaded;
};