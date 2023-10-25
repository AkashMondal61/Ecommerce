const express=require("express");
const router=express.Router();
const { isAuthenticateUser, authorisedRoles  } = require("../middlewares/auth.js");
const { newOrder, singleOrder, myOrders, AllOrders, updateOrders, deleteOrders } = require("../controller/ordercontroller.js");

router.route("/order").post(isAuthenticateUser, newOrder);
router.route("/order/showone/:id").get(isAuthenticateUser,authorisedRoles("admin"),singleOrder);
router.route("/order/showall").get(isAuthenticateUser,myOrders);
router.route("/admin/order").get(isAuthenticateUser,authorisedRoles("admin"),AllOrders);
router.route("/admin/update/:id").put(isAuthenticateUser,authorisedRoles("admin"),updateOrders);
router.route("/admin/delete/:id").delete(isAuthenticateUser,authorisedRoles("admin"),deleteOrders);
module.exports=router;