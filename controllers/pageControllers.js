import asyncHandler from "express-async-handler"
import { userModel } from "../model/UserModel.js"
import { createHash } from "../utility/HashPassword.js"
import { hashCompare } from "../utility/HashCompare.js"
import { makeToken } from "../utility/makeToken.js"
/***
 * POST METHOD
 * USER REGISTRATION
 */
export const userRegistration = asyncHandler(async(req,res)=>{
const {name,email,password,role} = req.body
const user =await userModel.create({
    name,email,password:await createHash(password),role
})
!user && res.status(400).json({message:"user not found"})
res.status(200).json({user,message:"user created successfully!"})
})

/***
 * GET METHOD
 * GET ALL USER
 */
export const getAllUser = asyncHandler(async(req,res)=>{

const user =await userModel.find().populate("role")
!user && res.status(400).json({message:"user not found"})
res.status(200).json({user,message:"user created successfully!"})
})

/***
 * GET METHOD
 * GET SINGLE USER
 */
export const getSingleUser = asyncHandler(async(req,res)=>{
const {id} = req.params
console.log(id)
const user =await userModel.findById(id).populate("role")
!user && res.status(400).json({message:"no single user found"})
res.status(200).json({user,message:"single user get successfully!"})
})
/***
 * PUT METHOD
 * UPDATE USER
 */
export const updateUser = asyncHandler(async(req,res)=>{
const {name,email,role} = req.body
const {id} = req.params
const user =await userModel.findByIdAndUpdate(id,{name,email,role},{new:true})
!user && res.status(400).json({message:"user not Updated"})
res.status(200).json({user,message:"user Updated successfully!"})
})
/***
 * PATCH METHOD
 * UPDATE USER
 */
export const updateUserStatus = asyncHandler(async(req,res)=>{
const {status} = req.body
console.log(status)
const {id} = req.params
const user =await userModel.findByIdAndUpdate(id,{status},{new:true})
!user && res.status(400).json({message:"user status not Updated"})
res.status(200).json({user,message:"user status Updated successfully!"})
})
/***
 * DELETE METHOD
 * DELETE USER
 */
export const deleteUser = asyncHandler(async(req,res)=>{

const {id} = req.params
const user =await userModel.findByIdAndDelete(id)
!user && res.status(400).json({message:"user not Deleted"})
res.status(200).json({user,message:"user deleted successfully!"})
})

/***
 * POST METHOD
 * LOGIN USER
 */

export const userLogin = asyncHandler(async(req,res)=>{
const {email,password} = req.body
  const loginUser = await userModel.findOne({email})
  if(!loginUser){
    res.status(400).json({message:"User not found!"})
  }
  const comparepass = hashCompare(password,loginUser.password)
  if(!comparepass){
    res.status(400).json({message:"Password not match!"})
  }
  const token = makeToken({email:loginUser.email,id:loginUser._id},process.env.JWT_TOKEN,"30d")
  res
  .cookie("accessToken", token, {
    httponly: true,
    secure: process.env.APP_ENV === "development" ? false : true,
    sameSite:"strict",
    path:"/",
    maxage: 1000 * 60 * 60 * 24 * 7,
  })
  .status(200)
  .json({
    token: token,
    message: "Login successfull!",
    user: loginUser,
  });
  
})

export const me = asyncHandler(async(req,res)=>{
  const user = req.me
  !user && res.status(200).json({message:"Not login user!"})
res.status(200).json({me:user,message:"Loged in user"})
})