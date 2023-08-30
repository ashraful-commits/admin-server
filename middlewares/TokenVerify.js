
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { userModel } from "../model/UserModel.js";


export const tokenVerify = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
// const accessToken = req.cookies.accessToken
const accessToken = token.split(" ")[1]
  if (!accessToken) {
   return res.status(404).json({ message: "not authorize" });
  } 

    jwt.verify(
      accessToken,
      process.env.JWT_TOKEN,
      asyncHandler(async (err, decode) => {
        console.log(err)
        err && res.status(404).json({ message: "Not user" });

        const me = await userModel.findOne({ email: decode?.email }).select().populate("role");
        req.me = me;
        next();
      })
    );
  
};
