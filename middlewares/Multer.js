import multer from "multer"

const storage = multer.memoryStorage()
export const profilePhoto = multer({
    storage
}).single("photo")