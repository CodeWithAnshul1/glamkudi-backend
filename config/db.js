 const mongoose = require("mongoose");

 const connectDB =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb is connected successfully");
    }
    catch(err){
        console.log(err,"connection failed" );
        process.exit(1);
    }
 };
 module.exports = connectDB;