import ReactStars from "react-rating-stars-component"
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit:false,
    color:"rgba",
    activeColor:"tomato",
   value:  review.rating,
  readOnly: true,
  isHalf:true,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;