const express=require("express");
const { getAllProducts ,createProduct,updateProduct,deleteProduct,getAllProductsadmin, getProductdetails, createreview, getAllreviews, deleteReviews} = require("../controller/productcontroller.js");
const { isAuthenticateUser, authorisedRoles  } = require("../middlewares/auth.js");
const router=express.Router();
router.route ("/products").get( getAllProducts)
router.route ("/admin/allproducts").get( getAllProductsadmin)
router.route ("/admin/product/new").post(isAuthenticateUser,authorisedRoles("admin"), createProduct)
router.route("/admin/product/:id").put(isAuthenticateUser,authorisedRoles("admin"),updateProduct)
router.route("/admin/product/:id").delete(isAuthenticateUser,authorisedRoles("admin"),deleteProduct);
router.route("/product/:id").get(getProductdetails);
router.route("/productsreview").put(isAuthenticateUser , createreview);
router.route("/allreviews").get( getAllreviews);
router.route("/deletereviews").get(isAuthenticateUser ,deleteReviews);
module.exports=router;   
