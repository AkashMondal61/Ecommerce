
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
const App = () => {
  return (<>
    <BrowserRouter>
    
    <Header/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    </Routes>
    <Footer/>
   </BrowserRouter>
   </>
  );
}

export default App;
