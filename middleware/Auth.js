import dotenv from "dotenv";
import jwt  from "jsonwebtoken";
import User  from "../models/User.js";
dotenv.config();

const auth=async(req, res, next)=>{
    try{

        const accesstoken = req.cookies?.accesstoken;
        // console.log(accesstoken);
        if(!accesstoken) return res.status(401).json({message:"token not found"});
    
        const detail = jwt.verify(accesstoken,process.env.JWT_ACCESS_SECRET);
    
        if (!detail) return res.status(401).json({message:"invalid token "});
    
        const user=await User.findById(detail.userId).select("-password");
        if (!user) return res.status(401).json({message:"user not found"});
    
        req.user=user;
        next();
    }
     catch(err)
     {
        return res.status(500).json({
            message:"invalid or expired token "
        });
     }


}
export default auth;