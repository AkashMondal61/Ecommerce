
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import Header from './componenet/layout/Header/Header';
import Footer from './componenet/layout/Footer/Footer';
import Home from './componenet/Home/Home';
import Productdetails from './componenet/Product/Productdetails';
import Products from './componenet/Product/Products';
import Search from './componenet/Product/Search';
import Login from './componenet/User/Login';
import store from "./store.js"
import {load} from "./actions/useraction.js"
import { useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { LoggedinUser } from './componenet/layout/Header/LoggedinUser.js';
import { Profile } from './componenet/User/Profile.jsx';
import { Updateprofile } from './componenet/User/Updateprofile.jsx';
import { Updatepassword } from './componenet/User/Updatepassword.jsx';
import {ForgotPassword} from './componenet/User/Forgotpassword.jsx';
import { Resetpassword } from './componenet/User/Resetpassword.jsx';

import { Shipping } from './componenet/Cart/Shipping';
import { Cart } from './componenet/Cart/Cart';
import { Confirmorder } from './componenet/Cart/Confirmorder.jsx';
import { Payment } from './componenet/Cart/Payment.jsx';
import { Myorder } from './Order/Myorder.js';
import { OrderDetails } from './Order/OrderDetails.js';

const App = () => {
  const {isAuthenticated,user}=useSelector((state)=>state.userDetails)

  useEffect(()=>{
    store.dispatch(load());
  },[]) 
  return (<>
    <BrowserRouter>
    <Header/> 
    { isAuthenticated && <LoggedinUser user={user}/>}
    <Routes>
 
    <Route exact path="/" element={<Home/>}/>
    {/* <Route  path="/:keyword" element={<Products/>}/> */}
    <Route  exact path="/products" element={<Products/>}/>
    <Route  path="/products/:id" element={<Productdetails/>}/>
    <Route  exact path="/Search" element={<Search/>}/>
    <Route  exact path="/login" element={<Login/>}/>
    <Route exact path="/account" element={<Profile/>}/>
{ isAuthenticated && <Route exact path="/me/updateprofile" element={<Updateprofile/>}/>}
{ isAuthenticated && <Route exact path="/updatepassword" element={<Updatepassword/>}/>}
{ isAuthenticated && <Route exact path="/shipping" element={<Shipping/>}/>}
{ isAuthenticated && <Route exact path="/order/confirm" element={<Confirmorder/>}/>}
{ isAuthenticated && <Route exact path="/order/payment" element={<Payment/>}/>}
{ isAuthenticated && <Route exact path="/myorders" element={<Myorder/>}/>}
{ isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails/>}/>}
<Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
<Route exact path="/resetpassword/:token" element={<Resetpassword/>}/>
<Route exact path="/cart" element={<Cart/>}/>
    <Route  exact path="/logout" element={<Home/>}/>
    </Routes>
    <Footer/>
   </BrowserRouter> 
   </> 
  ); 
}

export default App; 
