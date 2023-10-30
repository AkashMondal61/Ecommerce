// import React, { Fragment, useEffect,useState } from "react";
// // import { CgMouse } from "react-icons/all";
// import "./Home.css";
// import Product from "./product";
// import { getproduct ,getIsDataLoaded } from "../../actions/productaction";
// import { useSelector,useDispatch } from "react-redux";
// const product={
//     name:"pen",
//     images:[{url:"data:image/jpeg;base64,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"}],
//     price:"3000",
//     _id:"apple"
// }

// const Home = () => {

// const dispatch=useDispatch();
// const {products}=  useSelector((state)=>state.products);
// // const [isDataLoaded, setIsDataLoaded] = useState(false);
// console.log(products);
// // useEffect(()=>{
// //     dispatch(getproduct());
// // },[])
// useEffect(() => {
//   // Fetch products
//   dispatch(getproduct())
//     .then(() => {
//       // Mark the data as loaded when the request is complete
//       // setIsDataLoaded(true);
//     })
//     .catch((err) => {
//       console.error("Error fetching products:", err);
//     });
// }, []);
//   const isDataLoaded=getIsDataLoaded();
//   console.log(isDataLoaded);
//   return (
//     <Fragment>
//           <div className="banner">
//             <p>Welcome to Ecommerce</p>
//             <h1>FIND AMAZING PRODUCTS BELOW</h1>

//             <a href="#container">
//               <button>
//                 Scroll 
//               </button>
//             </a>
//           </div>
//           <h2 className="homeHeading">Featured Products</h2>
//           <div className="container" id="container">
            
//              {/* {products &&
//               products.map((product) => 
//               <Product product={product}/>
//               )} */}
//               {/* {isDataLoaded ? (
//           products.map((product) => <Product key={product._id} product={product} />)
//         ) : (  
//           <p>Loading...</p>
//         )}  */}
//             </div>
//     </Fragment>
//   );
// };

// export default Home;
import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./product";
import { getproduct, getIsDataLoaded } from "../../actions/productaction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
const Home = () => {
  const alert=useAlert();
  const dispatch = useDispatch();
  const {loading,error, products,productCount } = useSelector((state) => state.products);
  //  console.log(error);
  useEffect(() => {
        if(error)
        {
          return alert.error(error);
        }
        dispatch(getproduct());
  }, [dispatch,error,alert]);

  return (
    <Fragment>
     {loading?<Loader/>: 
      <Fragment>
        <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>Scroll</button>
        </a>
      </div>
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
