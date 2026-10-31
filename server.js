import dotenv from "dotenv";
dotenv.config();
import express from "express";
 import connectDB from "./config/db.js";
 import productRoutes from "./routes/productRoutes.js";
 import userRoutes from "./routes/userRoutes.js";
 import cors from "cors"
import cookieParser from "cookie-parser";
 const PORT =5000;
 
 

 const app = express();

 connectDB();
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin : [
      "http://localhost:5173",
      "https://glamkudi.in",
      "https://www.glamkudi.in"
    ] ,
  
  // origin: "https://glamkudi.netlify.app",
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  
}));
  //  app.get("/api/product/test",(req, res)=>{
  //   console.log("ok");
  //  })

  

  app.use("/api/products",productRoutes);
  app.use("/api/users",userRoutes);


  app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
  });