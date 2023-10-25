const express=require("express");
const { getAllProducts ,createProduct,updateProduct,deleteProduct, getProductdetails, createreview, getAllreviews, deleteReviews} = require("../controller/productcontroller.js");
const { isAuthenticateUser, authorisedRoles  } = require("../middlewares/auth.js");
const router=express.Router();
router.route ("/products").get( getAllProducts)
router.route ("/products/new").post(isAuthenticateUser,authorisedRoles("admin"), createProduct)
router.route("/products/:id").put(isAuthenticateUser,authorisedRoles("admin"),updateProduct)
router.route("/products/:id").delete(isAuthenticateUser,authorisedRoles("admin"),deleteProduct);
router.route("/products/:id").get(getProductdetails);
router.route("/productsreview").put(isAuthenticateUser , createreview);
router.route("/allreviews").get( getAllreviews);
router.route("/deletereviews").get(isAuthenticateUser ,deleteReviews);

module.exports=router;   
    