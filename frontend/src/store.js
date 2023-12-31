 import {legacy_createStore as createStore , combineReducers,applyMiddleware} from "redux"
 import thunk from "redux-thunk"
 import { composeWithDevTools } from "redux-devtools-extension"
import { productsReducer , productDetailsReducer} from "./reducers/productreducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/usereducer";
import { addcartreducer } from "./reducers/cartreducer";
 const reducer=combineReducers({
 products:productsReducer,
 productDetails:productDetailsReducer ,
 userDetails:userReducer,
 profile:profileReducer,
 forgotPassword:forgotPasswordReducer,
 cart:addcartreducer,
 
 })
 let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
    }
 };
 const middleware=[thunk];
 const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
 export default store;