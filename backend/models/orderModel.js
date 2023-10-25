const mongoose=require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const orderSchema=new mongoose.Schema({
    shippinginfo:{
        adress:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        pin:{type:Number,required:true},
        phone:{type:Number,required:true},

    },
    orderItems:[{
        name:{type:String,required:true},
        price:{type:Number,required:true},
        quantity:{type:Number,required:true},
        image:{type:String,required:true},
        product:{
        type:mongoose.Schema. ObjectId,
        ref:"Product",
        required:true,
      },
    }],
    user:{
        type:mongoose.Schema. ObjectId,
        ref:"User",
        required:true,
    },
    paymentinfo:{
        id:{type:String,required:true},
        status:{type:String,required:true},
    },
    paidAt:{
        type:Date, 
        required:true,
    },
    itemprice:{type:Number,required:true,default:0},
    taxprice:{type:Number,required:true,default:0},
    shippingprice:{type:Number,required:true,default:0},
    totalprice:{type:Number,required:true,default:0},
    orderStatus:{type:String,required:true,default:"processing"},
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now,
    }

})
module.exports=mongoose.model("order",orderSchema)