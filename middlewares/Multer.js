import multer from "multer"

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,Date.now() + Math.floor(Math.random()*10000000) +" "+file.fieldname)
    }
})
export const profilePhoto = multer({
    storage
}).single("photo")