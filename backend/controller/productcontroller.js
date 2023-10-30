//importing db
// const productModels = require("../models/productModels");
const product=require("../models/productModels");
// const catchAsyncErrors=require("../middlewares/catchAsyncErrors");

const Errorhandeler =require("../utils/errorhandellaer.js");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors.js");
const express = require("express");
const Features = require("../utils/features.js");
//creat product --- Admin
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
  req.body.user=req.user.id;
  const Product= await product.create(req.body);
   res.status(201).json({
      success:true, 
      Product
  }) 
})
//Get All Products 
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{
 // return next(new Errorhandeler("No product exist",404));
    const elementperpage=8 ;
    const productcount=await product.countDocuments();
   const apifeature=new Features(product.find(),req.query)
   .search()
   .filter()
  .pagination(elementperpage)
    const products= await apifeature.query;
//    const products=await product.find();
    if(!products)
    {
        return next(new Errorhandeler("No product exist",404));
    }
    res.status(200).json({ 
        success:true,
        products ,
        productcount,   
     });   
})

//Update product --Admin

exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
     let upProduct=await product.findById(req.params.id); 
     //if product is not found
     if(!upProduct)
     {
        // res.status(404).json({
        //     success:false,
        //     message:"Product not found"
        // }) 
        return next(new Errorhandeler("Product not found",404));
     }
     console.log("jhgjh");
     upProduct =await product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
     })
     res.status(200).json({ 
        success:true,
        upProduct
     });
})
 //Delete product --Admin

 exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    let deproduct=await product.findByIdAndRemove(req.params.id);
    if(!deproduct)
    {
        // res.status(404).json({
        //     success:false,
        //     message:"Product not found"
        // }) ;
        return next(new Errorhandeler("Product not exist to delete",404));
    }
    console.log(deproduct); 
    // await deproduct.remove();
    res.status(200).json({ 
        success:true, 
        message:"producted deleted" ,
        deproduct
         
     });
 })
 
 //show single product

exports.getProductdetails=catchAsyncErrors(async(req,res,next)=>{
  const theproduct=await product.findById(req.params.id);
  if(!theproduct)
  {
    //  return res.status(404).json({ 
    //       success:false,
    //       message:"Product not found"
    //   }) 
   return next(new Errorhandeler("Product not found",404));
  }
  res.status(200).json({ 
    success:true, 
    message:"producted found" ,
    theproduct,
  })
} )


//create new review and update review 

exports.createreview=catchAsyncErrors(async(req,res,err)=>{
  const {rating,comment,productId} =req.body;
  const review ={
    user:req.user.id,
    name:req.user.name,
    rating:Number(rating),
    comment, 
  }
  // console.log(productId);
  const Product= await product.findById(productId);
  // console.log(Product.name);
  //console.log(Product.reviews.user);
  const isReviewed= await Product.reviews.find((rev)=>rev.user.toString()===req.user.id.toString());
  if(isReviewed)
  {
    Product.reviews.forEach((rev)=>{
      if(rev.user.toString()===req.user.id.toString()){
      rev.rating=rating,
      rev.comment=comment
      }
    });
  }
  else
  {
    Product.reviews.push(review);
    Product.numOfreviews=Product.reviews.length;
    console.log(Product.numOfreviews);

  }
  // await Product.save({ validateBeforeSave:false});
  // console.log(Product.numOfreviews);
  let avg=0;
   Product.reviews.forEach((rev)=>{
   avg= avg+rev.rating
  })
  console.log(Product.numOfreviews);
  Product.ratings=avg/Product.numOfreviews;
  await Product.save({ validateBeforeSave:false});
  res.status(202).json({
    sucess:true,
  })
})

// See all Reviews
exports.getAllreviews=catchAsyncErrors(async(req,res,next)=>{
  const Product=await product.findById(req.query.id);
  if(!Product)
  {
    return next(new Errorhandeler("Product not found",404));
  }
  const allreviews=await Product.reviews;
  res.status(202).json({
    sucess:true,
    allreviews
  })
})

// delete reviews
 
exports.deleteReviews=catchAsyncErrors(async(req,res,next)=>{
  const Product=await product.findById(req.query.id);
  if(!Product)
  {
    return next(new Errorhandeler("Product not found",404));
  }
  const needreviews=await Product.reviews.filter((rev)=>rev.user.toString()!==req.user.id.toString())
  let avg=0;
  needreviews.forEach((rev)=>{
   avg= avg+rev.rating
  })
  const Ratings=avg/needreviews.length;
  Product.ratings=Ratings;
  Product.reviews=needreviews;
  Product.numOfreviews=needreviews.length;
  await Product.save({ validateBeforeSave:false});
  res.status(202).json({
    sucess:true,
    Product
  })
})