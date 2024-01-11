import React from "react";
import "./Productcard.css"
import { Link } from "react-router-dom";
export const Productcard=({product})=>{
    console.log(product);
    const a=product.price-10000;
return(
    <>
    <div class="product-card">
        <Link  to={`/products/${product._id}`}>
<div class="badge">Hot</div>
<div class="product-tumb">
    <img src={product.image[0].url} alt=""/>
</div>
<div class="product-details">
    <span class="product-catagory">{product.category}</span>
    <h4><a href="">Women leather bag</a></h4>
    <p>{product.description}</p>
    <div class="product-bottom-details">
        <div class="product-price"><small>{a}</small>{product.price}</div>
    </div>
</div>
</Link>
</div>
    </>
)
} 