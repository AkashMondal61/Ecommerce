import React from "react";
import {Cartitemcart} from "./Cartitemcart";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css"
import { addItemsToCart, removeItemsToCart } from "../../actions/cartaction";
import { useAlert } from "react-alert";
export const Cart=()=>{
    const dispatch=useDispatch();
    const alert=useAlert();
    const {cartItems}=useSelector(state=>state.cart);
    const {isAuthenticated}=useSelector(state=>state.userDetails)
    const Navigate=useNavigate();
    const increaseQuantity=(id,quantity,stock)=>{ 
        if(quantity>=stock){ 
            alert.success(`cannot add more than ${quantity}`);
            return ;}
        dispatch(addItemsToCart(id,quantity+1));
    }
    const decreaseQuantity=(id,quantity)=>{
        if(quantity>0)
        dispatch(addItemsToCart(id,quantity-1));
    else
    return;
    }
    const deleteCartItems=(id)=>{
      if(isAuthenticated){
     dispatch(removeItemsToCart(id));
     alert.success("Item has been removed successfully");
      }
      
    }
    const checkoutHandler=()=>{
     Navigate("/shipping");
    }
    return (
        <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <Cartitemcart item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    > 
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
    )
}