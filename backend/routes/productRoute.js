const express=require("express");
const { getAllProducts ,createProduct,updateProduct,deleteProduct, getProductdetails} = require("../controller/productcontroller.js");
const { isAuthenticateUser, authorisedRoles  } = require("../middlewares/auth.js");
const router=express.Router();
router.route ("/products").get( getAllProducts)
router.route ("/products/new").post(isAuthenticateUser,authorisedRoles("admin"), createProduct)
router.route("/products/:id").put(isAuthenticateUser,authorisedRoles("admin"),updateProduct)
router.route("/products/:id").delete(isAuthenticateUser,authorisedRoles("admin"),deleteProduct);
router.route("/products/:id").get(getProductdetails);
module.exports=router;   
    