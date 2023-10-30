import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./Productdetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getproductDetails } from "../../actions/productaction";
import { Params } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"




const Productdetails = () => {
    
    const dispatch=useDispatch();
    const {id}=useParams();
    // console.log(id);
    const {product}=useSelector(state=>state.productDetails)
    useEffect(()=>{
        dispatch(getproductDetails(id));
        
    },[dispatch,id])
//     console.log("this")
    console.log(product);
    // if(product.theproduct)
    // console.log(product.theproduct.name);
//     if(product.theproduct)
//    product.theproduct.image.map((item, i) => (
//    console.log(item.url)
//  ));  
// if(product){
const options = {
  value:  product.ratings,
  readOnly: true,
  precision: 0.5,
};
    return(
        <Fragment>
            <div className="ProductDetails">
            <div>
              <Carousel>
                {product.image &&
                  product.image.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            
            <div>
           
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                { <ReactStars {...options} /> }
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button >-</button>
                    <input readOnly type="number" value={1} />
                    <button >+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                   
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

        </Fragment>
    )
                  }
//}
export default Productdetails;