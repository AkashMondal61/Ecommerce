const express=require("express");
const app=express();
const errormiddleware =require("./middlewares/error.js");
const products=require("./routes/productRoute");
const user=require("./routes/userout.js");
const order=require("./routes/orderRout.js");
const cookieparser=require("cookie-parser");
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const bodyParser=require("body-parser");
const fileupload=require("express-fileupload");

app.use(express.json());
//to use cookie parser
app.use( cookieparser());
//for cloudinary
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileupload());
//importing routes 
app.use("/api/v1",products);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use(errormiddleware);
module.exports=app; 