import express from "express"
import { createPermission, deletePermission, getAllPermissions, updatePermission, updatePermissionStatus } from "../controllers/PermissionController.js"



const PermissionRouter = express.Router()

PermissionRouter.route("/").post(createPermission).get(getAllPermissions)
PermissionRouter.route("/:id").put(updatePermission).delete(deletePermission).patch(updatePermissionStatus)

export default PermissionRouter