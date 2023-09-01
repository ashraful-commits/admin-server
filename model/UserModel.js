import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  name:{
    type:String,
    require:true,
    unique:true,
    trim:true
  },
  email:{
    type:String,
    require:true,
    unique:true,
    trim:true
  },
  role:{
  type:mongoose.Schema.Types.ObjectId,
  default:"6009c0eee65f6dce28fb3e50",
  require:true,
  ref:"Role"
  },
  password:{
    type:String,
    require:true,
    trim:true
  },
  photo:{
    type:String,
    require:true,
    trim:true,
    default:null,
  },
  status:{
    type:Boolean,
    trim:true,
    default:true
  },
  trash:{
    type:Boolean,
    trim:true,
    default:true
  }
},{
    timestamps:true
})


export  const userModel = mongoose.model("User",userSchema)