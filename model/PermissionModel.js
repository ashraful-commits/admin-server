import mongoose from "mongoose";

const PermissionSchema = mongoose.Schema({
name:{
    type:String,
    require:true,
    unique:true,
},
slug:{
    type:String,
    require:true,
    unique:true,
},

trash:{
    type:Boolean,
    default:true,
},
status:{
 type:Boolean,
 default:true
}
},{timestamps:true})

export const PermissionModel = mongoose.model("Permission",PermissionSchema)