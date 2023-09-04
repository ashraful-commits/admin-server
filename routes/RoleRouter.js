// Import the Express framework for creating a router
import express from "express";

// Import controller functions for handling role-related routes
import {
  createRoles,      // Function to create a new role
  deleteRole,       // Function to delete a role
  getAllRoles,      // Function to get a list of all roles
  updateRole,       // Function to update a role
  updateRoleStatus, // Function to update the status of a role
} from "../controllers/RoleControllers.js";

// Create an instance of an Express router to handle role-related routes
const RoleRouter = express.Router();

// Define the routes and associate them with their respective controller functions
RoleRouter.route("/")          // Route for managing roles
  .post(createRoles)           // POST request to create a new role
  .get(getAllRoles);           // GET request to fetch all roles

RoleRouter.route("/:id")       // Route for managing a specific role by ID
  .put(updateRole)             // PUT request to update a role
  .delete(deleteRole)          // DELETE request to delete a role
  .patch(updateRoleStatus);    // PATCH request to update the status of a role

// Export the RoleRouter for use in other parts of the application
export default RoleRouter;
