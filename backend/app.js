const express=require("express");
const app=express();
const dotenv=require("dotenv");
const errormiddleware =require("./middlewares/error.js");
const products=require("./routes/productRoute");
const user=require("./routes/userout.js");
const authRoutes=require("./routes/authroutes.js")
const order=require("./routes/orderRout.js");
const cookieparser=require("cookie-parser");
const cors = require('cors');
const passport=require("passport")
require("./utils/passport.js")
// const passportUtill=require("./utils/passport.js")
// passportUtill(app);
const corsOptions = {
    origin: true, // This will allow any origin
    credentials: true, // Access-Control-Allow-Credentials:true
    optionSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(passport.initialize());
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
app.use("/auth", authRoutes)
app.use(errormiddleware);
module.exports=app; 