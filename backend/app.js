const express=require("express");
const app=express();
const errormiddleware =require("./middlewares/error.js");
const products=require("./routes/productRoute");
const user=require("./routes/userout.js");
const cookieparser=require("cookie-parser");
app.use(express.json());
//to use cookie parser
app.use( cookieparser());
//importing routes 
app.use("/api/v1",products);
app.use("/api/v1",user);
app.use(errormiddleware);
module.exports=app; 