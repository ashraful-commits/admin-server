import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { userModel } from "../model/UserModel.js";

export const tokenVerify = asyncHandler(async(req, res, next) => {

  const token = req.headers.authorization || req.headers.Authorization;
  console.log(token)
  // const accessToken = req.cookies.accessToken
//  console.log(accessToken)
  if (!token) {
    return res.status(401).json({ message: "No Access Token" });
  }
  // if (!accessToken) {
  //   return res.status(401).json({ message: "No Access Token" });
  // }
  const accessToken = token.split(" ")[1];
  jwt.verify(
    accessToken,
    process.env.JWT_TOKEN,
    asyncHandler(async (err, decode) => {
      if (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(401).json({ message: "Not authorized" });
      }
      try {
        const me = await userModel.findOne({ email: decode?.email }).select().populate("role");
        if (!me) {
          return res.status(404).json({ message: "User not found" });
        }
        req.me = me;
        next();
      } catch (error) {
        console.error(error); // Log any unexpected errors for debugging
        res.status(500).json({ message: "Internal Server Error" });
      }
    })
  );
})
