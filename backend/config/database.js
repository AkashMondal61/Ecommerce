const mongoose=require("mongoose");

const connectDatabase=()=>
{
mongoose.connect(process.env.DB_URL)
.then((data)=>{console.log(`database connected with server: ${data.connection.host}`)})
//As we have handeled the 
// .catch((error)=>{console.log(`error`)});
}

module.exports=connectDatabase; 