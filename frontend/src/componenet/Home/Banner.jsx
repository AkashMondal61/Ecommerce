import React from "react";
import "./Banner.css";
import imgg from "../../images/video.mp4";

export const Banner = () => {
    return (
        <div className="hero">
            <div className="overlay"></div>
            <div className="contents">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button>Scroll</button>
                </a>
            </div>
            <video autoPlay loop muted playsInline className="back">
                <source src={imgg} type="video/mp4"></source>
            </video>
        </div>
    );
};
