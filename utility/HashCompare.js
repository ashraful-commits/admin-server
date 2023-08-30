
import bcryptjs from "bcryptjs"
export  const hashCompare = (password,userpass)=>{
    
   const passsCompare = bcryptjs.compareSync(password,userpass)
   return passsCompare
}
