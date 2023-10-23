
const Errorhandeler =require("../utils/errorhandellaer.js");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors.js");
const user=require("../models/usermodel.js");
 const sendToken =require("../utils/jwttoken.js");
 const sendEmail=require("../utils/sendEmail.js")
exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
const {name,email,password}=req.body;
const User=await user.create({
    name,
    email,
    password,
    avatar:{
        public_id:"this is a sample id",
        url:"firsturl"
    }
})

// const token=User.getToken();
// res.status(201).json({
//     sucess:true,
//     token,
// })

sendToken(User,201,res);

})



//login




exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
  const {email,password}=req.body; 
  // checking password and email given
  if(!email || !password)
  {
    return next(new Errorhandeler("Please enter email and password",400))
  }
  const User= await user.findOne({email}).select("+password");
  if(!User)
  {
    return next(new Errorhandeler("Email or password doesnot match",401));
  }
  const passwordmatch= await User.comaparePassword(password);
//   console.log(passwordmatch);
  if(!passwordmatch) 
  {
     console.log("passmath works");
    return next(new Errorhandeler("Email or password doesnot match",401))
  }

//     const token=User.getToken();
//     res.status(202).json({
//     sucess:true,
//    token,
// })

sendToken(User,202, res);
})



//logout   

exports.logout=catchAsyncErrors(async(req,res,next)=>{(
    res.cookie("token",null,{
     expires:new Date(Date.now()),
     httpOnly:true,
    }),
    res.status(201).json({
        sucess:true,
        message:"successfully log out please visit again",
    })
)});

// function for forgot password
exports.forgotpassword=catchAsyncErrors(async(req,res,next)=>{
    const uSer=await user.findOne({email:req.body.email});
    if(!uSer){
        return next(new Errorhandeler("user not found",404));
    }
   // get resetpasswordtoken 
    const resetToken= await uSer.generateNewPassword();
    

    await uSer.save({validateBeforeSave:false});
    console.log("bfcjjc")
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1//forgotpassword/${resetToken}`;
    const message=`your password chnge link is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this 
    email then please ignore it `;
    try{
       await sendEmail({
        email:uSer.email,
        subject:"Ecommerce password Recovery",
        message,
       })
       res.status(200).json({
        sucess:true,
        message:`email send to ${uSer.email} secessfully`,
        message,
       });
    }catch(error){
      
     uSer.resetPasswordToken=undefined;
     uSer.resetPasswordExpire= undefined;
     await uSer.save({validateBeforeSave:false});
     return next(new Errorhandeler(error.message,500));
    }
   
})