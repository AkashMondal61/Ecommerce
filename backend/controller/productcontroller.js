//importing db
const productModels = require("../models/productModels");
const product=require("../models/productModels");
// const catchAsyncErrors=require("../middlewares/catchAsyncErrors");

const Errorhandeler =require("../utils/errorhandellaer.js");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors.js");
const express = require("express");
const Features = require("../utils/features.js");
//creat product --- Admin
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
  const Product= await product.create(req.body);
   res.status(201).json({
      success:true, 
      Product
  }) 
})
//Get All Products 
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
    const elementperpage=2;
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
        products    
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
    theproduct
  })
} )