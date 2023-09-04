import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import router from "./routes/pageRoutes.js"
import mongodbConnect from "./confige/mongodbConfige.js"
import RoleRouter from "./routes/RoleRouter.js"
import PermissionRouter from "./routes/PermissionRouter.js"
import cors from "cors"
import cookiesParser from "cookie-parser"
import { errorHandeler } from "./middlewares/errorHendler.js"


//=========================== config
dotenv.config()

//============================= port config
const port  = process.env.PROT || 5000

const app = express()
//==============================  json and urlencoded

// app.use(
//     cors({
//       origin: "http://localhost:5173",
//       credentials: true,
//     })
//   );
app.use(
    cors({
      origin: "https://admin-dashboard-seven-kappa.vercel.app",
      credentials: true,
    })
  );

  app.use(cookiesParser())
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))
  app.use(express.static("public"))
  //========================== user router
  app.use("/api/v1/auth",router)
  //========================== Role router
  app.use("/api/v1/role",RoleRouter)
  //========================== Permission router
  app.use("/api/v1/permissions",PermissionRouter)
app.use(errorHandeler);

//================================  server create
app.listen(port,()=>{
    mongodbConnect()
    console.log(`Server is running on port ${port}`.bgWhite.cyan)
})