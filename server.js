const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
 const connectDB = require("./config/db");
 const productRoutes = require("./routes/productRoutes");
 const cors = require("cors")
 const PORT =5000;
 const cloudinary = require("./config/cloudinary");
 const upload =require("./middleware/upload")

 const app = express();

 connectDB();
  app.use(express.json());
  app.use(cors({
  origin :  "http://localhost:5173",
  // origin: "https://glamkudi.netlify.app",
  
}));
  //  app.get("/api/product/test",(req, res)=>{
  //   console.log("ok");
  //  })

  

  app.use("/api/products",productRoutes);


  app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
  });