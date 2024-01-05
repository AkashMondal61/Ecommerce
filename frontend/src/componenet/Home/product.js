import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"
import "./Home.css"
const options={
    edit:false,
    color:"rgba",
    activeColor:"tomato",
    value:2.5,
    isHalf:true,
}
const Product=({product})=>{
    const n=product.numOfreviews
    return(
        <Link className="productCard" to={`/products/${product._id}`}>
        <img src={product.image[0].url} alt={product.name}/>
        
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/>
            {n<2?(<span>({n} review)</span>):(<span>({n} reviews)</span>)}
           
        </div>
        <span>₹{product.price}</span>
        </Link>
    );
}
export default Product; 