const ErrorHandeler = require("../utils/errorhandellaer.js");
const errormiddleware=(err,req,res,next)=>{
    console.log("error works");
    err.statusCode=err.statusCode||500;
    err.message=err.message||"internal server error";
    //wrong mongodb id error
    if(err.name==="CastError")
    {
        const message=`Resourse not found: invalid:${err.path}`;
        err=new ErrorHandeler(message,400) ;
    }
    res.status(err.statusCode).json({
        success:false,
        error:err.message,
    });
}
module.exports=errormiddleware;