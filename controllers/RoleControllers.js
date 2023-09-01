import asyncHandler from "express-async-handler"
import { RoleModel } from "../model/RoleModel.js"

import { createSlug } from "../utility/createSlug.js"
/***
 * POST METHOD
 * USER REGISTRATION
 */
export const createRoles = asyncHandler(async(req,res)=>{
const {name,permissions} = req.body
const role =await RoleModel.create({
    name,
    slug:createSlug(name),
    permissions
})
!role && res.status(400).json({message:"role not found"})
res.status(200).json({role,message:"role created successfully!"})
})

/***
 * GET METHOD
 * GET ALL USER
 */
export const getAllRoles = asyncHandler(async(req,res)=>{

const role =await RoleModel.find().populate("permissions")
!role && res.status(400).json({message:"role not found"})
res.status(200).json({role,message:"role created successfully!"})
})




/***
 * PUT METHOD
 * UPDATE ROLE
 */


export const updateRole = asyncHandler(async(req,res)=>{
    const {name,roles} = req.body
    const {id} = req.params
    const role =await RoleModel.findByIdAndUpdate(id,{name,slug:name&&createSlug(name),roles},{new:true})
    !role && res.status(400).json({message:"role not Updated"})
    res.status(200).json({role,message:"role Updated successfully!"})
    })
    
/***
 * PATCH METHOD
 * UPDATE ROLE STATUS
 */


export const updateRoleStatus = asyncHandler(async(req,res)=>{
    const {status} = req.body
    const {id} = req.params
    const role =await RoleModel.findByIdAndUpdate(id,{status},{new:true})
    !role && res.status(400).json({message:"role status not Updated"})
    res.status(200).json({role,message:"role status Updated successfully!"})
    })
    
/***
 * DELETE METHOD
 * DELETE ROLET
 */


export const deleteRole = asyncHandler(async(req,res)=>{
   
    const {id} = req.params
    const role =await RoleModel.findByIdAndDelete(id)
    !role && res.status(400).json({message:"role not Deleted"})
    res.status(200).json({role,message:"role Deleted successfully!"})
    })
    