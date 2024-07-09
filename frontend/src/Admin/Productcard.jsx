import React from "react";
import "./Productcard.css";
import { Link } from "react-router-dom";

export const Productcard = ({ product }) => {
  const a = product.price - 10000;
  return (
    <>
      <div className="product-card">
        <Link to={`/products/${product._id}`}>
          <div className="badge">Hot</div>
          <div className="product-tumb">
            <img src={product.image[0].url} alt="Product" />
          </div>
          <div className="product-details">
            <span className="product-category">{product.category}</span>
            <h4><a href="#">Women leather bag</a></h4>
            <p>{product.description}</p>
            <div className="product-bottom-details">
              <div className="product-price"><small>{a}</small>{product.price}</div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
