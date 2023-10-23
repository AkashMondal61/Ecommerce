// create token and save in cokie

const user=require("../models/usermodel")

const sendtoken=(user,statusCode , res)=>{
    const token=user.getToken();
    //option for cookie
    const options ={
        expire :new Date(
            Date.now()+process.env.JWT_EXPIRE*24*60*60*1000
        ),
        httpOnly:true
    };

res.status(statusCode).cookie("token",token,options).json({
    sucess:true,
    user,
    token,
})
}
module.exports=sendtoken;