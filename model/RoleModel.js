import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
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
permissions:{
type:[mongoose.Schema.Types.ObjectId],
ref:"Permissions",
default:null
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

export const RoleModel = mongoose.model("Role",RoleSchema)