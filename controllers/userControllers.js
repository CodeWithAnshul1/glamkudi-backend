import dotenv from "dotenv"
dotenv.config();
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


const createacc =async(req ,res)=>{
    try{

        const {name ,email,password}=req.body;
        // console.log(name,email,password);
        const user =  await User.findOne({email});

        if( user && user.verified) return res.json({message:"user all exist"});

        const otp = crypto.randomInt(100000,1000000).toString();
        const otpexpire = Date.now()+ 5 * 60 * 1000;

        if(user && !user.verified){
          
            user.otp=otp;
            user.otpexpire=otpexpire;
            await user.save();
            await sendEmail({
                to:email,
                subject: "sign up otp for joinning glamkudi",
                text:`Your 6 digit otp is ${otp}`,
            });
            return res.status(200).json({message:"otp successfully send "});
        }
            
        
        
        const hashpass =  await bcrypt.hash(password,10);
         const newuser = await User.create({
            
            name:name,
            email:email,
            password:hashpass ,
            otp:otp,
            otpexpire:otpexpire,
        });
        await sendEmail({
                to:email,
                subject: "sign up otp for joinning glamkudi",
                text:`Your 6 digit otp is ${otp}`,
            });
        

       return res.json({message:"enter six digit otp recive on mail ",newuser});
    
    }catch(err){
        console.error("Signup OTP error:", err);
        
         return res.status(500).json({message:"error in otp send"});

    }
};

const verify = async(req ,res)=>{
    try{

    const {email,otp,}=req.body;

    const user = await User.findOne({email}).select("-password");
    if(!user) return res.status().json({message:"user not found"});
    if(user.otp==otp && Date.now()<user.otpexpire){
        user.verified=true;
        await user.save();
        return res.json({message: "user verified"});
    }

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"user verification failed"});
    }
   
};

const Loggin= async(req ,res)=>{
   try{ const {email,password}=req.body;
//    console.log(req.body);
        const user =await User.findOne({email});
        if(!user) return res.status(404).json({message:"user not found "});
        const match = await bcrypt.compare(password,user.password);
        if(!match){

            return res.status(401).json({message:"invalid creadintails"});
        }

        const accesstoken = jwt.sign(
            {userId :user.id},
            process.env.JWT_ACCESS_SECRET,
            {expiresIn:"1d"}
        );
        res.cookie("accesstoken",accesstoken,{
            httpOnly:true,
            secure:process.env.COOKIE==="production",
            sameSite:"lax" ,
            maxAge:24 * 60 * 60 *1000
        });
        console.log("loggin success");
        return res.status(200).json({message:"loggin successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"login failed"});

    }
}

const me=async(req ,res)=>{
    console.log(req.user);
  
    return res.status(200).json({
        message:true,
        user:req.user});

};


export  {createacc,verify,Loggin,me};