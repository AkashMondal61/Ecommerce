import React, { Fragment, useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { clearerror,getproduct } from "../../actions/productaction";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/product";
import { useAlert } from "react-alert"; 
import "./Products.css"
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
const categories = [
  "Laptop",
  "Footwear",
  "Education",
  "Camera",
  "SmartPhones",
];
const Products=()=>{
    const dispatch=useDispatch();
    const Alert=useAlert();
    const {products,loading,error, productsCount,elementperpage,filterelement}=useSelector((state) => state.products);
    // console.log("s");
    // const keyword=match.params.keyword;
    const {keyword}=useParams();
    // console.log(keyword);
    // console.log("si");
    // console.log(products);
    console.log(productsCount);
    console.log(filterelement);
    const [currentPage, setCurrentPage] = useState(1);
    const [catagory,setCategory]=useState("");
    const [price, setPrice] = useState([0, 1000000]);
    const priceHandler=(e,newprice)=>{
      setPrice(newprice);
    }
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
    useEffect(()=>{
        if(error)
        {
            Alert.error(error);
            dispatch(clearerror());
        }
        dispatch(getproduct(keyword,currentPage,price,catagory));
    },[dispatch,Alert,error,currentPage,price,catagory])
    return(
   <Fragment>
    {loading?(<Loader/>):(
        <Fragment>
            <h2 className="productsHeading">Products</h2> 
         
            <div className="products">
            {products &&
               products.map((product) => (
                <Product key={product._id} product={product} />
                ))}
            </div>
            {filterelement<=elementperpage?(<hr className="line" />):( <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={elementperpage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>)}
            <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={1000000}
            />
             <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            </div> 
            
           
        </Fragment>
    )}
   </Fragment>
    )
}  
export default Products;