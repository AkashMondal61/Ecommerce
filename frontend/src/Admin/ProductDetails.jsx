import React, { useEffect } from "react";
import "./ProductDetails.css"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearerror, getproductadmin } from "../actions/productaction";
import { Productcard } from "./Productcard";
import "./ProductDetails.css"
import {Sidebar} from "./Sidebar"
import Product from "../componenet/Home/product"


export const ProductDetails=()=>{
    const dispatch=useDispatch();
    const Alert=useAlert();
    const{loading,error,products}=useSelector((state)=>state.allproducts)
   
    useEffect(()=>{
        if(error)
        {
          Alert.error(error);
          clearerror();
        }
        dispatch(getproductadmin());
      
    },[dispatch, alert, error])
    return (
        <>
           {loading?(<loading/>):(
            <div className="mainn">
                <div className="lefts">
                    <Sidebar/>
                </div >
                <div className="rights">
               
                {products&&products.map((item)=>
                    <Product product={item}/>
                )}
              
           
                </div>
            </div>
           )}
        </>
    )
}