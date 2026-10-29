import  express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import {createProduct, fatchproduct , productdetail} from "../controllers/productController.js";

router.post("/test",(req, res)=>{
    console.log("hello");
    res.send("working");
})

router.post("/",upload.single("image"), createProduct);
router.get("/product-fetch",fatchproduct);
router.get("/detail/:id",productdetail)

export default router;