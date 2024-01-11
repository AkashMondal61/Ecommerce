 import {legacy_createStore as createStore , combineReducers,applyMiddleware} from "redux"
 import thunk from "redux-thunk"
 import { composeWithDevTools } from "redux-devtools-extension"
import { productsReducer , productDetailsReducer, reviewReducer, allproductsReducer, newProduct} from "./reducers/productreducer";
import { allUserReducer, forgotPasswordReducer, profileReducer, userReducer } from "./reducers/usereducer";
import { addcartreducer } from "./reducers/cartreducer";
import { AllOrderReducer, OrderReducer, deleteOrderReducer, myOrderReducer, newOrderReducer } from "./reducers/Orderreducer";
 const reducer=combineReducers({
 products:productsReducer, 
 productDetails:productDetailsReducer ,
 userDetails:userReducer,
 profile:profileReducer,
 forgotPassword:forgotPasswordReducer,
 cart:addcartreducer,
 newOrder:newOrderReducer,
 myOrders:myOrderReducer,
 orderDetails:OrderReducer,
newReview:reviewReducer,
allUser:allUserReducer,
allproducts:allproductsReducer ,
createProduct:newProduct,
AllOrder:AllOrderReducer,
deleteorder:deleteOrderReducer })
 let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [],
          shippinginfo: localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {},
    }
 };
 const middleware=[thunk];
 const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
 export default store;