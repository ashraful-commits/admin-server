import bcryptjs from "bcryptjs"


export  const createHash = (password)=>{
    const salt = bcryptjs.genSaltSync(10)
    const hashPassword = bcryptjs.hash(password,salt)
    return hashPassword
}

