//importing db
const product=require("../models/productModels");
const Errorhandeler =require("../utils/errorhandellaer.js");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors.js");
const express = require("express");
const Features = require("../utils/features.js");
const cloudinry=require("cloudinary");
const { listenerCount } = require("nodemailer/lib/xoauth2/index.js");
//creat product --- Admin
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
  req.body.user=req.user.id;
  let imagearr=[];
  console.log(typeof(req.body.image));
  if(typeof(req.body.image)==="string")
  {
    imagearr.push(req.body.image);
  }
  else
  {
       imagearr=req.body.image;
  }
  let uploadedImages = [];

  for(let i=0;i<imagearr.length;i++)
  {
    const imageURL = imagearr[i];
    const result = await cloudinry.v2.uploader.upload(imageURL,{
      folder:"Images",
      width:150,
      crop:"scale"
    });
    console.log(imagearr)
    uploadedImages.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
}
  console.log(imagearr)
  req.body.image=uploadedImages;
  console.log(uploadedImages);
  const Product= await product.create(req.body);
  console.log("producdt created");
  console.log(Product);
   res.status(201).json({
      success:true, 
      Product
  }) 
})
//Get All Products 
exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{
 // return next(new Errorhandeler("No product exist",404));
    
    const elementperpage=6 ;
    const productcount=await product.countDocuments();
    let filterproducts=productcount;
    const {category,keyword, page ,price}=req.query;
    console.log(price);
    const querys={};
    if (keyword) {
      querys.name = { $regex: new RegExp(keyword, 'i') }; // Case-insensitive keyword search
    }
    if (price) {
      querys.price = { $gte: price.gt, $lte:price.lt };
    }
    if (category) {
      querys.category = { $regex: new RegExp(category, 'i') };
    }
    let currentpage=Number(req.query.page)||1;
    const skip=elementperpage*(currentpage-1);
    
    let Products;
    if(querys)
    {
      Products = await product.find(querys)
      filterproducts=Products.length; 
    }
    if(page){
    Products = await product.find(querys)
      .skip(skip)
      .limit(elementperpage)
    }  
    else
    {
      Products = await product.find(querys) 
    }
    if(!Products)
    {
        return next(new Errorhandeler("No product exist",404));
    }
    res.status(200).json({ 
        success:true,
        Products ,
        productcount,   
        elementperpage,
       filterproducts,
     });   
})

//Update product --Admin

exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
     let upProduct=await product.findById(req.params.id); 
     if(!upProduct)
     {
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
  const Product= await product.findById(productId);

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

//Get All Products  for Admin
exports.getAllProductsadmin = catchAsyncErrors(async(req,res,next)=>{
  
  console.log(product)
    const   Products = await product.find();
     res.status(202).json({ 
         success:true,
         Products 
      });   
 })