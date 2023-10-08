const express=require("express");
const app=express();
const errormiddleware =require("./middlewares/error.js");
const products=require("./routes/productRoute");
app.use(express.json());
//importing routes 
app.use("/api/v1",products);
app.use(errormiddleware);
module.exports=app; 