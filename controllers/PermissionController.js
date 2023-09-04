import asyncHandler from "express-async-handler";
import { PermissionModel } from "../model/PermissionModel.js";
import { createSlug } from "../utility/createSlug.js";

/**
 * POST METHOD
 * CREATE PERMISSION
 */
export const createPermission = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Create a new permission with a slug based on the name
  const permission = await PermissionModel.create({
    name,
    slug: createSlug(name),
  });

  // Handle permission creation success or failure
  !permission
    ? res.status(400).json({ message: "Permission not created" })
    : res.status(200).json({ permission, message: "Permission created successfully!" });
});

/**
 * GET METHOD
 * GET ALL PERMISSIONS
 */
export const getAllPermissions = asyncHandler(async (req, res) => {
  const permissions = await PermissionModel.find();

  // Handle permission retrieval success or failure
  !permissions
    ? res.status(400).json({ message: "Permissions not found" })
    : res.status(200).json({ permissions, message: "Permissions retrieved successfully!" });
});

/**
 * PUT METHOD
 * UPDATE PERMISSION
 */
export const updatePermission = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  // Update permission name and optionally update the slug based on the name
  const permission = await PermissionModel.findByIdAndUpdate(
    id,
    { name, slug: name && createSlug(name) },
    { new: true }
  );

  // Handle permission update success or failure
  !permission
    ? res.status(400).json({ message: "Permission not updated" })
    : res.status(200).json({ permission, message: "Permission updated successfully!" });
});

/**
 * PATCH METHOD
 * UPDATE PERMISSION STATUS
 */
export const updatePermissionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  // Update permission status
  const permission = await PermissionModel.findByIdAndUpdate(id, { status }, { new: true });

  // Handle permission status update success or failure
  !permission
    ? res.status(400).json({ message: "Permission status not updated" })
    : res.status(200).json({ permission, message: "Permission status updated successfully!" });
});

/**
 * DELETE METHOD
 * DELETE PERMISSION
 */
export const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Delete a permission by ID
  const permission = await PermissionModel.findByIdAndDelete(id);

  // Handle permission deletion success or failure
  !permission
    ? res.status(400).json({ message: "Permission not deleted" })
    : res.status(200).json({ permission, message: "Permission deleted successfully!" });
});
