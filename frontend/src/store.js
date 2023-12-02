 import {legacy_createStore as createStore , combineReducers,applyMiddleware} from "redux"
 import thunk from "redux-thunk"
 import { composeWithDevTools } from "redux-devtools-extension"
import { productsReducer , productDetailsReducer} from "./reducers/productreducer";
import { userReducer } from "./reducers/usereducer";
 const reducer=combineReducers({
 products:productsReducer,
 productDetails:productDetailsReducer ,
 userDetails:userReducer,
 
 })
 let initialState={};
 const middleware=[thunk];
 const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
 export default store;