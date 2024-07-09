
const Errorhandeler =require("../utils/errorhandellaer.js");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors.js");
const user=require("../models/usermodel.js");
 const {sendToken} =require("../utils/jwttoken.js");
 const {sendEmail}=require("../utils/sendEmail");
 const crypto=require("crypto");
const { use } = require("../routes/userout.js");
const cloudinry=require("cloudinary");

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
///add cloudinary

var mycloud;
console.log(req.body.avatar);
 mycloud=await cloudinry.v2.uploader.upload(req.body.avatar,{
    folder:"avatar",
    width:150,
    crop:"scale"
})
console.log("hbjbrejh");
const {name,email,password}=req.body;

const User=await user.create({
    name,
    email,
    password,
    avatar:{
        public_id:mycloud.public_id,
        url:mycloud.secure_url
    }
    // avatar:{
    //     public_id:null,
    //     url:null
    // }

})
console.log("hbjbrejh");
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
// console.log(User)
sendToken(User,202, res);
})



//logout   

exports.logout=catchAsyncErrors(async(req,res,next)=>{
    console.log("logoutt")
    (
    
    res.cookie("token",null,{
     expires:new Date(Date.now()),
     httpOnly:true,
    }),
    
    res.status(202).json({
        sucess:true,
        message:"successfully log out please visit again",
    })
)});

// function for forgot password
exports.forgotpassword=catchAsyncErrors(async (req,res, next )=>{
    const uSer=await user.findOne({email:req.body.email});
    if(!uSer){
        return next (new Errorhandeler("user not found",404));
    }
   // get resetpasswordtoken 
    const resetToken= await uSer.getResetPasswordToken();console.log("logout");
    

    await uSer.save({validateBeforeSave:false});
    // const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/resetpassword/${resetToken}`;
    const resetPasswordUrl=`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    const message=`Hi ${uSer.name} your password change link is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this 
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
       
       });
    }catch(error){
       // console.log(error); 
     uSer.resetPasswordToken=undefined;
     uSer.resetPasswordExpire= undefined;
     await uSer.save({validateBeforeSave:false});
     return next (new Errorhandeler(error.message,500)) ;
    }
   
})



//Reset Password
 exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
   
   const resetPassToken= crypto.createHash("sha256").update(req.params.token).digest("hex");
   const uSer=await user.findOne({resetPasswordToken:resetPassToken ,resetPasswordExpire:{$gt:Date.now()},});
   console.log(req.body);
   if(!uSer)
   {
    console.log(req.body.password);
     return next(new Errorhandeler("Password token has expired",402))
   }
//    console.log(req.body.password);
   if(req.body.password!=req.body.confirmpassword){
   return next(new Errorhandeler("Password does not match",404));
   }
   uSer.password=req.body.password;
   uSer.resetPasswordExpire=undefined;
   uSer.resetPasswordToken=undefined;
   await uSer.save({validateBeforeSave:false});
   sendToken(uSer,202,res);
 })


//  user details
 exports.userDetails=catchAsyncErrors(async(req,res,next)=>{
    const uSer= await user.findById(req.user.id);
    res.status(202).json({
        sucess:true,
       uSer,
    })
 })


 //  Update User Password
 exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{

    const uSer= await user.findById(req.user.id).select("+password");
    const isPasswordMatched=await uSer.comaparePassword(req.body.oldpassword);
    if(!isPasswordMatched)
    {
        return next(new Errorhandeler("oldpassword is incorrect",404));
    }
    if(req.body.newpassword!=req.body.confirmpassword)
    {
        return next(new Errorhandeler("password doesnot matched",404));
    }
    uSer.password=req.body.newpassword;
    await uSer.save({validateBeforeSave:false}); 
    sendToken(uSer,202,res);
 })


  //  Update User Profile

  exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{

    const newUserData={
        name:req.body.name,
        email:req.body.email,
    }
    //delete the previous image from cloudinary add newone
    if(req.user.avatar!==""){
    const userr=await user.findById(req.user.id);
    const imageid=userr.avatar.url;
    await cloudinry.v2.uploader.destroy(imageid);
    const mycloud=await cloudinry.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    newUserData.avatar={
            public_id:mycloud.public_id,
            url:mycloud.secure_url
        }
}
    const uSer=await user.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        sucess:true,
        uSer
    })
 })

 // Get all user details 

 exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
    
    const uSers=await user.find();
    res.status(200).json({
        sucess:true,
        uSers
    })
 })

// Get aone user details 

exports.getOneUser=catchAsyncErrors(async(req,res,next)=>{
    
    const uSer=await user.findById(req.params.id);
    // console.log(uSer.id)
    if(!uSer)
    {
        return next(new Errorhandeler(`user does not exist with ${req.params.id}`,404))
    }
    res.status(200).json({
        sucess:true,
        uSer
    })
 })

   //  Update User role by admin only
   exports.updateRole=catchAsyncErrors(async(req,res,next)=>{

    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
   console.log(req.params.id);
    const uSer=await user.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        sucess:true,
        uSer
    })
 }) 


   //  Delete User  by admin only
   exports.Deleteuser=catchAsyncErrors(async(req,res,next)=>{
   const uSer= await user.findById(req.params.id); 
    if(!uSer)
    {
        return next (new Errorhandeler("User not found",404))
    }
    //remove cloudinary later
    await uSer.deleteOne();
    res.status(200).json({
        sucess:true,
        uSer
    })
 })
