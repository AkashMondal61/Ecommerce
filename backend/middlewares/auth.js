const ErrorHandeler = require("../utils/errorhandellaer");
const catchAsyncErrors =require("./catchAsyncErrors");
const User=require("../models/usermodel");
const jwt=require("jsonwebtoken");
exports.isAuthenticateUser= catchAsyncErrors(async(req,res,next)=>{
  const {token}=req.cookies;
  console.log(token);
  if(!token)
  {
    return next(new ErrorHandeler("Please log in first",203 ));
  }
  const decodeData=jwt.verify(token,process.env.JWT_SECRETKEY );
  req.user=await User.findById(decodeData.id); //req.user contains all information  about  
  next();
})

exports.authorisedRoles=(...roles)=>{
    return (req,res,next)=> {
        if(!roles.includes(req.user.role))
        {
            return next(new ErrorHandeler("you are not allow to access",404));
        }
        next(); 
    }
   
}