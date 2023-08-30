import express from "express"
import { CreatePermission, deletePermission, getAllPermissions, updatePermission, updatePermissionStatus } from "../controllers/PermissionController.js"



const PermissionRouter = express.Router()

PermissionRouter.route("/").post(CreatePermission).get(getAllPermissions)
PermissionRouter.route("/:id").put(updatePermission).delete(deletePermission).patch(updatePermissionStatus)

export default PermissionRouter