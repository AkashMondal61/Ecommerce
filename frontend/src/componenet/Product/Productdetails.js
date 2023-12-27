import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./Productdetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearerror, getproductDetails } from "../../actions/productaction";
import { Params } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import Loader from "../layout/Loader/Loader"
import ReviewCard from "./Reviewcard";
import { useAlert } from "react-alert";

const Productdetails = () => {
    const Alert=useAlert();
    const dispatch=useDispatch();
    const {id}=useParams();
   
    // console.log(id);
    const {product,loading,error}=useSelector(state=>state.productDetails)
    useEffect(()=>{
      if(error)
      {
        Alert.error(error);
        dispatch(clearerror( ));
      }
        dispatch(getproductDetails(id));
        
    },[dispatch,id,error,Alert])
    // console.log(product);
const options = {
    edit:false,
    color:"rgba",
    activeColor:"tomato",
  value:  product.ratings,
  readOnly: true,
  isHalf:true,
};
const [quantity,setquantity]=useState(1);
console.log(quantity);
const increaseq=()=>{
  if(product.stock>quantity)
  setquantity(quantity+1);
  else
  return;
}
const decreaseq=()=>{
  if(quantity>0) setquantity(quantity-1);
  else return;
}
    return(
        <Fragment>
          {loading ? (
        <Loader />
      ) : (
          <Fragment>
            <div className="ProductDetails">
            <div className="im"> 
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
            
            <div className="details">
           
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                { <ReactStars {...options} /> }
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfreviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseq}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseq}>+</button>
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
          <h3 className="reviewsHeading">REVIEWS</h3>
          <div className="review">
          {/* <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          > */}
            {/* <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}  
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog> */}

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          </div>
        </Fragment>
      )}
        </Fragment>
    )
                  }
//}
export default Productdetails;