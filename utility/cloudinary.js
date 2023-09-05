import  cloudinary from 'cloudinary';
 import fs from "fs"
cloudinary.v2.config({ 
  cloud_name: 'ds9mljkgj', 
  api_key: '681823761534747', 
  api_secret: '_Eb_2iPZ5soB8Bg7FRsVryaW7qc' 
});


export const cloudeUpload = async(req)=>{
    fs.writeFileSync("./" + req.file.orginalname,req.file.buffer)
    const data = await cloudinary.v2.uploader.upload("./"+req.file.orginalname,req.file.buffer)
    fs.unlinkSync("./"+ req.file.orginalname)
    return data
}