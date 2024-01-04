import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearerror } from "../actions/productaction";
import { Orderdetails } from "../actions/Orderaction";
import { Link, useParams } from "react-router-dom";
import "./OrderDetails.css"
import Loader from "../componenet/layout/Loader/Loader";
import { userReducer } from "../reducers/usereducer";
export const OrderDetails = () => {
  
    const dispatch = useDispatch();

    const { id } = useParams();
    console.log(id);
    const Alert = useAlert();
      const {user}=useSelector((state)=>state.userDetails)
      let a=true;
    const { loading, error, detailorder } = useSelector((state) => state.orderDetails)
      useEffect(() => {
        console.log("ddsd");
        dispatch(Orderdetails(id));
       

    }, [dispatch,id])
    // const add= `${detailorder.shippinginfo.adress}, ${detailorder.shippinginfo.city}, ${detailorder.shippinginfo.state}, ${detailorder.shippinginfo.pin}, ${detailorder.shippinginfo.country}`;
    let subtotal=0;
    if(loading===false){ a=false; 
         subtotal = detailorder.orderItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );}
    console.log(a);
   
    return (
        <>
            {a || loading ? (<Loader />) : (
                <div className="containers">
                    <div className="order"> ORDER DETAILS </div>
                    <div className="up">
                        <div className="left">
                            <div className="heading"> Shipping Address</div>
                            <div className="confirmshippingAreaBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>{detailorder.shippinginfo.phone}</span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>{`${detailorder.shippinginfo.adress}, ${detailorder.shippinginfo.city}, ${detailorder.shippinginfo.state}, ${detailorder.shippinginfo.pin}, ${detailorder.shippinginfo.country}`}</span>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <div className="heading"> Payment Details</div>
                            <div className="confirmshippingAreaBox">
                                <div>
                                    <p>Product Cost :</p>
                                    <span>{subtotal}</span>
                                </div>
                                <div>
                                    <p>Tax Amount : </p>
                                    <span>{detailorder.taxprice}</span>
                                </div>
                                <div>
                                    <p>Shipping Charges : </p>
                                    <span>{detailorder.shippingprice}</span>
                                </div>
                                <div>
                                    <p>Toatal Amount : </p>
                                    <span>{detailorder.totalprice}</span>
                                </div>
                                <div>
                                    <p>Payment Status :</p>
                                     {detailorder.paymentinfo.status==="true"?(<span className="greene">Paid</span>):(<span className="rede">Paid</span>)} 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="down">
                        <div className="heading"> Product Details</div>
                        <div className="confirmCartItemsContainer">
                            {detailorder.orderItems &&
                                detailorder.orderItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X ₹{item.price} ={" "}
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}