
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
const App = () => {
  return (<>
    <BrowserRouter>
    
    <Header/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/:id" element={<Productdetails/>}/>
    </Routes>
    <Footer/>
   </BrowserRouter>
   </>
  ); 
}

export default App;
