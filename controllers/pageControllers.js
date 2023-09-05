import asyncHandler from "express-async-handler";
import { userModel } from "../model/UserModel.js";
import { createHash } from "../utility/HashPassword.js";
import { hashCompare } from "../utility/HashCompare.js";
import { makeToken } from "../utility/makeToken.js";
import { cloudeUpload } from "../utility/cloudinary.js";

/**
 * POST METHOD
 * USER REGISTRATION
 */
export const userRegistration = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Create a new user using the userModel and hashed password
  const user = await userModel.create({
    name,
    email,
    password: await createHash(password),
    role,
  });

  // Handle user creation success or failure
  !user
    ? res.status(400).json({ message: "User not created" })
    : res.status(200).json({ user, message: "User created successfully!" });
});

/**
 * GET METHOD
 * GET ALL USERS
 */
export const getAllUser = asyncHandler(async (req, res) => {
  const user = await userModel.find().populate("role");

  // Handle user retrieval success or failure
  !user
    ? res.status(400).json({ message: "Users not found" })
    : res.status(200).json({ user, message: "Users retrieved successfully!" });
});

/**
 * GET METHOD
 * GET SINGLE USER
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find a single user by ID and populate the 'role' field
  const user = await userModel.findById(id).populate("role");

  // Handle user retrieval success or failure
  !user
    ? res.status(400).json({ message: "No single user found" })
    : res.status(200).json({ user, message: "Single user retrieved successfully!" });
});

/**
 * PUT METHOD
 * UPDATE USER
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;

  // Update user information and return the updated user
  const user = await userModel.findByIdAndUpdate(id, { name, email, role }, { new: true });

  // Handle user update success or failure
  !user
    ? res.status(400).json({ message: "User not updated" })
    : res.status(200).json({ user, message: "User updated successfully!" });
});

/**
 * PATCH METHOD
 * UPDATE USER STATUS
 */
export const updateUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  // Update user status and return the updated user
  const user = await userModel.findByIdAndUpdate(id, { status }, { new: true });

  // Handle user status update success or failure
  !user
    ? res.status(400).json({ message: "User status not updated" })
    : res.status(200).json({ user, message: "User status updated successfully!" });
});

/**
 * DELETE METHOD
 * DELETE USER
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Delete a user by ID
  const user = await userModel.findByIdAndDelete(id);

  // Handle user deletion success or failure
  !user
    ? res.status(400).json({ message: "User not deleted" })
    : res.status(200).json({ user, message: "User deleted successfully!" });
});

/**
 * POST METHOD
 * LOGIN USER
 */
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const loginUser = await userModel.findOne({ email });

  // Handle user not found
  if (!loginUser) {
    res.status(400).json({ message: "User not found!" });
  }

  // Compare the provided password with the stored hashed password
  const comparePass = hashCompare(password, loginUser.password);

  // Handle password mismatch
  if (!comparePass) {
    res.status(400).json({ message: "Password does not match!" });
  }

  // Generate a JWT token for the user
  const token = makeToken({ email: loginUser.email, id: loginUser._id }, process.env.JWT_TOKEN, "30d");

  // Set the access token as a cookie
  res
    .cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.APP_ENV === "development" ? false : true,
      sameSite: "strict",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .status(200)
    .json({
      token: token,
      message: "Login successful!",
      user: loginUser,
    });
});

/**
 * GET METHOD
 * RETRIEVE CURRENTLY LOGGED-IN USER
 */
export const me = asyncHandler(async (req, res) => {
  const user = req.me;

  // Handle no logged-in user
  !user ? res.status(200).json({ user, message: "Not logged-in user!" }) : res.status(200).json({ user, message: "Logged-in user" });
});

/**
 * POST METHOD
 * LOGOUT USER
 */
export const userLogout = asyncHandler(async (req, res) => {
  // Clear the access token cookie or invalidate the session
  res.clearCookie("accessToken");

  // Send a response to confirm the logout
  res.status(200).json({ message: "Logout successful!" });
});


//================= profile photo upload


export const profilPhotoUpload = asyncHandler(async(req,res)=>{
  try {
    const { id } = req.params;
    const photoUrl = await cloudeUpload(req);

    // Ensure 'cloudeUpload' function properly returns a 'photoUrl' object
    if (!photoUrl || !photoUrl.secure_url) {
      return res.status(400).json({ message: "Invalid photo URL" });
    }

    // Use 'await' with 'findByIdAndUpdate' and capture the updated 'user'
    const user = await userModel.findByIdAndUpdate(
      id,
      { photo: photoUrl.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, message: "photo uploaded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})