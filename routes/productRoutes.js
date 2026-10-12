const express =require("express");
const router = express.Router();
const upload =require("../middleware/upload")
const {createProduct, fatchproduct , productdetail} = require("../controllers/productController");

router.post("/test",(req, res)=>{
    console.log("hello");
    res.send("working");
})

router.post("/",upload.single("image"), createProduct);
// router.get("/product-fetch", (req, res) => {
//   res.status(200).json({
//     message: "Fetch route working",
//   });
// });
router.get("/product-fetch",fatchproduct);
router.get("/detail/:id",productdetail)

module.exports = router;