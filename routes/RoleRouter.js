import express from "express"
import { createRoles, deleteRole, getAllRoles, updateRole, updateRoleStatus } from "../controllers/RoleControllers.js"



const RoleRouter = express.Router()

RoleRouter.route("/").post(createRoles).get(getAllRoles)
RoleRouter.route("/:id").put(updateRole).delete(deleteRole).patch(updateRoleStatus)


export default RoleRouter