import React from "react"
import "./Footer1.css"
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/apps.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import { Link } from "react-router-dom"
export const Footer1=()=>{
    return(
        <>
    <footer class="footer">
                <div class="row">
                    <div class="first">
                        <div class="widget1">
                            
                            <div class="logo">
                                <img src="https://i.ibb.co/vLDyPtM/ak-logo-yellow.png" class="img-fluid" alt=""/>
                            </div>
                            <div className="para">
                            <p>
                                In eu libero ligula. Fusce eget metus lorem, ac viverra
                                leo. Nullam convallis, arcu vel pellentesque sodales,
                                nisi est varius diam, ac ultrices sem ante quis sem.
                                Proin ultricies volutpat sapien.
                            </p>
                            </div>
                            <div class="socialLinks">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fab fa-linkedin-in"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fab fa-google-plus-g"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="second">
                        <div class="widget2">
                            <h5>
                                Latest Items
                            </h5>
                            <div class="media">
                                <img class="img-fluid" src="https://i.ibb.co/CKNmhMX/blog1.jpg" alt=""/>
                                <div class="media-body d-flex align-self-center">
                                    <div class="content">
                                        <a href="#">
                                            <p>
                                                    Did son unreserved themselves indulgence its
                                            </p>
                                        </a>
                                        <span>
                                            Dec 20, 2023
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="media">
                                <img class="img-fluid" src="https://i.ibb.co/m5yGbdR/blog2.jpg" alt=""/>
                                <div class="media-body d-flex align-self-center">
                                    <div class="content">
                                        <a href="#">
                                            <p>
                                                    Rapturous am eagerness it as resolving household
                                            </p>
                                        </a>
                                        <span>
                                        Dec 10, 2023
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="third">
                        <div class="widget3">
                            <h5>
                                Quick Links
                            </h5>
                            <ul>
                                <li>
                                    <Link to="/"> Home</Link>
                                </li>
                                <li>
                                <Link to="/about"> About</Link>
                                </li>
                                <li>
                                <Link to="/products"> Product</Link>
                                </li>
                                <li>
                                <Link to="/login"> Register</Link>
                                </li>
                                <li>
                                <Link to="/career"> Career</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="fourth">
                        <div class="widget4">
                            <p>
                            DOWNLOAD OUR APP
                            </p>
                            <ul>
                                <li>
                                    <a href="#">
                                        Platforms
                                    </a>
                                </li>
                               
                               
                                <img src={playStore} alt="playstore" />
                                <img src={appStore} alt="Appstore" />
     
                            </ul>
                        </div>
                    </div>
                </div>
            <div class="copyRightArea">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <p>&copy; Copyright All rights reserved 2019.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  </>
    )
}