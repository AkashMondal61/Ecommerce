import React, { useState } from "react";
import "./Payment.css"
import { Checkoutsteps } from "./Checkoutsteps"
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/Orderaction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearerror } from "../../actions/useraction";

export const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const navigate=useNavigate();
    const Alert=useAlert();
    const { shippinginfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector((state) => state.userDetails);
    const {error}=useSelector((state)=>state.newOrder);
    const [ Id, setId ] = useState("TransctionId");
    const [ status, setstatus] = useState("true");
    const dispatch = useDispatch();
    const paymentinfo={id:Id,
    status:status}
    const order = {
        shippinginfo,
        paymentinfo,
        orderItems: cartItems,
        itemsprice: orderInfo.subtotal,
        taxprice: orderInfo.tax,
        shippingprice: orderInfo.shippingCharges,
        totalprice: orderInfo.totalPrice,
    };
    
    const setorder = () => {
        if(error)
        {
            Alert.error(error);
            clearerror(error());
        }else{
        console.log(order);
        dispatch(createOrder(order));
        Alert.success("Order successfully placed")
        navigate("/myorders")
        }
    }
    return (
        <>
            <Checkoutsteps activeStep={3} />
            <div className="container">
            <h1>Comming Soon</h1>
            <form
                className="shippingForm"
                encType="multipart/form-data"
                onSubmit={setorder}
             >

                <div>
                    {/* <LocationCityIcon /> */}
                    <input
                        type="text"
                        placeholder="TransctionId"
                        required
                        value={Id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>

                <div className="option">
                    {/* <LocationCityIcon /> */}
                    <select name="status" id="status" onChange={(e)=>setstatus(e.target.value)}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <button type="submit">Paied</button>
            </form>
            </div>
        </>
    )
}