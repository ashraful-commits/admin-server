import asyncHandler from "express-async-handler"
import { PermissionModel } from "../model/PermissionModel.js"

import { createSlug } from "../utility/createSlug.js"
/***
 * POST METHOD
 * USER REGISTRATION
 */
export const CreatePermission = asyncHandler(async(req,res)=>{
const {name} = req.body
const permission =await PermissionModel.create({
    name,
    slug:createSlug(name)
})
!permission && res.status(400).json({message:"permission not found"})
res.status(200).json({permission,message:"permission created successfully!"})
})

/***
 * GET METHOD
 * GET ALL USER
 */
export const getAllPermissions = asyncHandler(async(req,res)=>{

const permission =await PermissionModel.find()
!permission && res.status(400).json({message:"permission not found"})
res.status(200).json({permission,message:"permission created successfully!"})
})

/***
 * PUT METHOD
 * UPDATE PERMISSION
 */


export const updatePermission = asyncHandler(async(req,res)=>{
    const {name} = req.body
    const {id} = req.params
    const permission =await PermissionModel.findByIdAndUpdate(id,{name,slug:name&&createSlug(name)},{new:true})
    !permission && res.status(400).json({message:"permission not Updated"})
    res.status(200).json({permission,message:"permission Updated successfully!"})
    })
    
/***
 * PATCH METHOD
 * UPDATE STATUS
 */


export const updatePermissionStatus = asyncHandler(async(req,res)=>{
    const {status} = req.body
    const {id} = req.params
    const permission =await PermissionModel.findByIdAndUpdate(id,{status},{new:true})
    !permission && res.status(400).json({message:"permission status not Updated"})
    res.status(200).json({permission,message:"permission status Updated successfully!"})
    })
    

/***
 * DELETE METHOD
 * DELETE PERMISSION
 */


export const deletePermission = asyncHandler(async(req,res)=>{

    const {id} = req.params
    const permission =await PermissionModel.findByIdAndDelete(id)
    !permission && res.status(400).json({message:"permission not Deleted"})
    res.status(200).json({permission,message:"permission Deleted successfully!"})
    })
    