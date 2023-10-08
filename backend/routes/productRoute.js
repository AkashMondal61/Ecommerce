const express=require("express");
const { getAllProducts ,createProduct,updateProduct,deleteProduct, getProductdetails} = require("../controller/productcontroller.js");
const router=express.Router();
router.route ("/products").get(getAllProducts)
router.route ("/products/new").post(createProduct)
router.route("/products/:id").put(updateProduct)
router.route("/products/:id").delete(deleteProduct);
router.route("/products/:id").get(getProductdetails);
module.exports=router;   
    