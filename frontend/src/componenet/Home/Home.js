
// export default Home;
import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./product";
import { getproduct, getIsDataLoaded, clearerror } from "../../actions/productaction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Banner } from "./Banner";
const Home = () => {
  const alert=useAlert();
  const dispatch = useDispatch();
  const {loading,error, products,productCount } = useSelector((state) => state.products);
  console.log("re");
   console.log(products);
  useEffect(() => {
        if(error)
        {
           alert.error(error);
           dispatch(clearerror());
        }
        dispatch(getproduct());
      
  }, [dispatch,error,alert]);

  return (
    <Fragment>
     {loading?<Loader/>: 
      <Fragment>
        {/* <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>Scroll</button>
        </a>
        </div> */}
        <Banner/>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {/* {products.length > 0 ? (
          products.map((product) => <Product product={product} />)
        ) : (
          <p>Loading...</p>
        )} */}
         {products &&
              products.map((product) => 
              <Product product={product}/>
              )}
      </div>
      </Fragment>
      }
    </Fragment>
  );
};

export default Home;
