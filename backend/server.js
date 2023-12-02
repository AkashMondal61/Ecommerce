const app=require("./app");
const dotenv=require("dotenv");
const cloudinary=require("cloudinary");
//database 
const connectDatabase=require("./config/database");


//handelling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Sutting down the error due to uncaught exception`);
    server.close(()=>{
        process.exit(1);  
    }); 
})

dotenv.config({path:"backend/config/config.env"});
//connect database 
connectDatabase();
//connect cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY, 
}
);
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
  

///Unhandeled promise error
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Sutting down the error due to unhandeled promise rejection`);
    server.close(()=>{
        process.exit(1);  
    });
}) ;