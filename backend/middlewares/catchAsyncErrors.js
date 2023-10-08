module.exports=(theFunction)=>(req,res,next)=> {

  Promise.resolve(theFunction(req,res,next)).catch(next) ; 
  console.log("async works");
};