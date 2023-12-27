const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logout, forgotpassword, resetPassword, userDetails, 
updatePassword, updateProfile, getAllUser, getOneUser, updateRole, Deleteuser } =require("../controller/usercontroller.js");
const { isAuthenticateUser , authorisedRoles  } = require("../middlewares/auth.js");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:token").put(resetPassword);
router.route("/updatepassword").put(isAuthenticateUser, updatePassword);
router.route("/me").get(isAuthenticateUser, userDetails);
router.route("/me/updateprofile").put(isAuthenticateUser, updateProfile);
router.route("/admin/alluser").get(isAuthenticateUser, authorisedRoles("admin"),getAllUser);
router.route("/admin/oneuser/:id").get(isAuthenticateUser,authorisedRoles("admin"), getOneUser);
router.route("/admin/updaterole/:id").put(isAuthenticateUser,authorisedRoles("admin"), updateRole);
router.route("/admin/deleteuser/:id").delete(isAuthenticateUser,authorisedRoles("admin"), Deleteuser);
module.exports=router;
    