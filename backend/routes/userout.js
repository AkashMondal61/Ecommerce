const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logout, forgotpassword } =require("../controller/usercontroller.js");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/forgotpassword").post(forgotpassword);
module.exports=router;
  