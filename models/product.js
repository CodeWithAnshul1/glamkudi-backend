 const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title:{
            type :String,
         required :true,
         unique:true
         
        },

        discription :{
            type:String,
         required : true
        },

        price :{
            type :Number,
         required:true
        },

        image:{
            type:String,
            required:true
        }

    //     isActive :{
    //         type:Boolean,
    //   requiredd :true
    //     }


        
    }
    ,{timestamps:true}
);
module.exports =mongoose.model("Product",productSchema);
