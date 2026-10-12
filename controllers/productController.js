const Product =require("../models/product");
const cloudinary =require("../config/cloudinary")

const createProduct = async (req, res)=>{

    try {
     console.time("cloudinary-upload");
      const {title,disc,category,price}=req.body;

      const isexist =  await Product.findOne({title : { $regex : `^${title}$`,$options:"i"}});
      if(isexist){
        return res.status(409).json({message:"product already exist"});
      }
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "glamkudi/products",
          upload_preset: "square_thumbnails"
        },
        
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    console.log("Cloudinary URL:", result.secure_url);
     console.timeEnd("cloudinary-upload");
     const product = await  Product.create({
      title:title,
      discription:disc,
      category:category,
      price:price,
      image:result.secure_url
     })
    res.status(201).json({
      title:product.title,
      message: "product add successfully"
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "product upload failed",
    });
  }
  // console.log(req.file.size);

};

//fetch product

const fatchproduct =async( req,res)=>{

  try{

    const product =await Product.find().lean();

       return res.status(200).json({
      success :"true",
      count: product.length,
      product:product
    });
  }
  catch(err){
    console.log(err);

   return res.status(500).json({
      success:"false",
      message:"fatch failed"
        });

  }

 
};

const productdetail= async(req ,res)=>{
  try{

    const {id}=req.params;
  
    const product = await Product.findById(id);
    if(!product) return res.status(404).json({message:"not found"});
    console.log(product);

   return res.status(200).json({product:product});
  
  }catch(err){
    console.log(err);
   return  res.status(500).json({message:"internal server error"})
  }


}
module.exports = {
    createProduct ,fatchproduct ,productdetail};