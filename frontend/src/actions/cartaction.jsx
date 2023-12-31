import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartconstants";
import axios from "axios";
// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
     console.log(data);
     console.log("additems er data")
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.theproduct._id,
        name: data.theproduct.name,
        price: data.theproduct.price,
        image: data.theproduct.image[0].url,
        stock: data.theproduct.stock,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const removeItemsToCart = (id) => async (dispatch, getState) => {
   
   
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: {
        product: id
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  export const saveshippinfinfo = (data) => async (dispatch) => {
   
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };