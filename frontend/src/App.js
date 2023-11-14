
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
const App = () => {
  return (<>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route  path="/:keyword" element={<Products/>}/>
    <Route  exact path="/products" element={<Products/>}/>
    <Route  path="/products/:id" element={<Productdetails/>}/>
    <Route  exact path="/Search" element={<Search/>}/>
    </Routes>
    <Footer/>
   </BrowserRouter>
   </> 
  ); 
}

export default App;
