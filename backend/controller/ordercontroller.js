const Order=require("../models/orderModel");
const Product=require("../models/productModels");
const Errorhandeler =require("../utils/errorhandellaer.js");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors.js");

exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
    const { shippinginfo,orderItems, paymentinfo,itemprice,taxprice, shippingprice,
        totalprice}=req.body;
    const order=await Order.create({
        shippinginfo,orderItems, paymentinfo,itemprice,taxprice, shippingprice,
        totalprice,
        user:req.user.id,
        paidAt:Date.now()
    })
    console.log(req.user.id);
    res.status(202).json({
        sucess:true,
        order
    })
})

//get single user order

exports.singleOrder=catchAsyncErrors(async(req,res,next)=>{
    
const order=await Order.findById(req.params.id);//problem with name and email
 console.log(order.user);
if(!order)
{
    return next(new Errorhandeler("order not found with the id ",404));
}
res.status(202).json({
    sucess:true,
    order
})

})

//get logged in user orders

exports.myOrders=catchAsyncErrors(async(req,res,next)=>{
   
const order=await Order.find({user:req.user.id});
// console.log(req.user.id);
if(!order)
{
    return next(new Errorhandeler("order not found",404));
}
res.status(202).json({
    sucess:true,
    order
})

})


//get All orders --Admin

exports.AllOrders=catchAsyncErrors(async(req,res,next)=>{
    const order=await Order.find();
    if(!order)
    {
        return next(new Errorhandeler("order not found",404));
    }
    let totalorderamount=0;
    order.forEach((order)=>totalorderamount+=order.totalprice);
    res.status(202).json({
        sucess:true,
        totalorderamount,
        order
    })
    
    })
//Update order status --Admin

async function updateStock(id,quantity){
    const product= await Product.findById(id);
   
    product.stock-=quantity;
    // console.log(product);
    await product.save({validateBeforeSave:false});
}
    exports.updateOrders=catchAsyncErrors(async(req,res,next)=>{
        const order=await Order.findById(req.params.id);
        if(!order)
        {
            return next(new Errorhandeler("Order not present with the id",404))
        }
        if(order.orderStatus === "Delivered")
        {
            return next(new Errorhandeler("order has already delivered",404));
        }
        order.orderItems.forEach(async (ord)=>{

        await updateStock(ord.product,ord.quantity);

        });
        order.orderStatus=req.body.status;
        console.log(req.body.status)
        if(req.body.status==="Delivered"){
            order.deliveredAt=Date.now();
        }
        await order.save({validateBeforeSave:false})
        res.status(202).json({
            sucess:true,
            order,
        })
    })

   

//Delete Order

    exports.deleteOrders=catchAsyncErrors(async(req,res,next)=>{
        const order=await Order.findById(req.params.id);
        if(!order)
        {
            return next(new Errorhandeler("Order not present with the id",404))
        }
        await order.deleteOne();
      
        res.status(202).json({
            sucess:true,
            
        })
    })