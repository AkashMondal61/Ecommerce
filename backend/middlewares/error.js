const ErrorHandeler = require("../utils/errorhandellaer.js");
const errormiddleware=(err,req,res,next)=>{

    err.statusCode = err.statusCode||500;
    err.message=err.message||"internal server error";
    //wrong mongodb id error
    if(err.name==="CastError")
    {
        const message=`Resourse not found: invalid:${err.path}`;
        err=new ErrorHandeler(message,400) ;
    }
    //if duplicate email found
    if(err.code===11000)
    {
        const message=`User with ${Object.keys(err.keyValue)} already exist`;
        err=new ErrorHandeler(message,400) ;
    }
    //wrong JWT token error
    if(err.name==="JsonWebTokenError")
    {
        const message=`Invalid token please try again`;
        err=new ErrorHandeler(message,400) ;
    }
      //JWT token expire error
      if(err.name === "TokenExpiredError")
      {
          const message=`Token has expired please relogin `;
          err=new ErrorHandeler(message,400) ;
      }
      if(err.code===206)
      {
        console.log("woek")
          const message=`Please log in first`;
          err=new ErrorHandeler(message,400) ;
      }
     res.status(err.statusCode).json({
        success:false,
        error:err.message,
    }); 
}
module.exports=errormiddleware;