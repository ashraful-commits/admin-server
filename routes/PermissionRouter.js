import express from "express";
import {
  CreatePermission,
  deletePermission,
  getAllPermissions,
  updatePermission,
  updatePermissionStatus,
} from "../controllers/PermissionController.js";

// Create an Express Router for handling permissions
const PermissionRouter = express.Router();

// Route to create a new permission and get all permissions
PermissionRouter.route("/").post(CreatePermission).get(getAllPermissions);

// Route to update, delete, or patch (update status) a permission by ID
PermissionRouter.route("/:id").put(updatePermission).delete(deletePermission).patch(updatePermissionStatus);

// Export the PermissionRouter
export default PermissionRouter;
