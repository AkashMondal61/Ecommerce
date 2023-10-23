const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
//to generate new password token we need crypto
const crypto=require("crypto");
const useSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name "],
        maxLength:[30,"Name cannot exceed 30 charecters"],
        minLength:[4,"Name should have at least 4 charecter"]
    },
    email:{
        type:String,
        required:[true,"please enter your email "],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your pasword"],
        minLength:[8,"Password should grater then 8 character"],
        select:false 
    },
    avatar:{  
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
})
//becrypting password
useSchema.pre("save",async function(net){
    if(this.isModified("password")){
    this.password=await bcrypt.hash(this.password,10);
    }
    else {
        next(); 
    }
})
//jwt token 
useSchema.methods.getToken= function(){
    return  jwt.sign({id:this._id},process.env.JWT_SECRETKEY,{
        expiresIn:process.env.COOKIE_EXPIRE,
    })
}
//compare password
useSchema.methods.comaparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
//generating password reset token


useSchema.methods.generateNewPassword= function(){
//generate token
const resetToken=crypto.randomBytes(20).toString("hex");
 // hashing and reset and update in schema
 this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex"); 
 this.resetPasswordExpire= Date.now()+15*60*1000;
 return resetToken;

}
module.exports=mongoose.model("user",useSchema) ;