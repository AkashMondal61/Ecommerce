import ReactStars from "react-rating-stars-component"
import React from "react";
import profilePng from "../../images/Profile.png";
import { useSelector } from "react-redux";
import ReviewLoader from "../layout/Loader/Loader"

const ReviewCard = ({ review, users }) => {
 

const User = users.find((user) => user._id === review.user);
console.log("dwed")
console.log(User); 
const options = {
    edit:false,
    color:"rgba",
    activeColor:"tomato",
   value:  review.rating,
  readOnly: true,
  isHalf:true,
  };

  return (<>
   {User===undefined?(<ReviewLoader/>):(

<div className="reviewCard">
<img src={User.avatar.url} alt="User" />
<p>{review.name}</p>
<ReactStars {...options} />
<span className="reviewCardComment">{review.comment}</span>
</div>
   )}
  </>)
 ;
};

export default ReviewCard;