import express from "express";
import {
  deleteUser,
  me,
  getAllUser,
  updateUser,
  userLogin,
  userRegistration,
  updateUserStatus,
  getSingleUser,
  userLogout,
} from "../controllers/pageControllers.js";
import { tokenVerify } from "../middlewares/TokenVerify.js";

// Create an Express Router
const router = express.Router();

// Route to get the currently logged-in user's details
router.route("/me").get(tokenVerify, me);

// Route to log in a user
router.route("/login").post(userLogin);

// Route to register a new user and get all users
router.route("/").post(userRegistration).get(getAllUser);

// Route to log out a user
router.route("/logout").post(userLogout);

// Route to get all users
router.route("/").get(getAllUser);

// Route to update, delete, patch (update status), or get a single user by ID
router
  .route("/:id")
  .put(updateUser)
  .delete(deleteUser)
  .patch(updateUserStatus)
  .get(getSingleUser);

// Export the Express Router
export default router;
