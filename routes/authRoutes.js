import express from "express";
import rateLimit from "express-rate-limit";
const router = express.Router();

const apiLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,// 15 minutes
    max : 10,
    message : 'too many request from this ip,please try again after 15 minutes',

})

import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middlewares/auth.js";

router.route("/register").post(apiLimiter,register);
router.route("/login").post(apiLimiter,login);
router.route("/updateUser").patch(authenticateUser,updateUser);

export default router;
