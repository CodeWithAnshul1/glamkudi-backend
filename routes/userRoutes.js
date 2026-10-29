import express from "express";
const router =express.Router();
import {createacc,verify,Loggin,me} from "../controllers/userControllers.js"
import auth from "../middleware/Auth.js"

router.post("/signup-otp",createacc);
router.post("/verify-otp",verify);
router.post("/sign-in",Loggin);
router.get("/me",auth,me);

export default router;