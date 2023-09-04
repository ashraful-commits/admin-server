import asyncHandler from "express-async-handler";
import { RoleModel } from "../model/RoleModel.js";
import { createSlug } from "../utility/createSlug.js";

/**
 * POST METHOD
 * CREATE ROLE
 */
export const createRoles = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  // Create a new role with a slug based on the name and associated permissions
  const role = await RoleModel.create({
    name,
    slug: createSlug(name),
    permissions,
  });

  // Handle role creation success or failure
  !role
    ? res.status(400).json({ message: "Role not created" })
    : res.status(200).json({ role, message: "Role created successfully!" });
});

/**
 * GET METHOD
 * GET ALL ROLES
 */
export const getAllRoles = asyncHandler(async (req, res) => {
  const role = await RoleModel.find().populate("permissions");

  // Handle role retrieval success or failure
  !role
    ? res.status(400).json({ message: "Roles not found" })
    : res.status(200).json({ role, message: "Roles retrieved successfully!" });
});

/**
 * PUT METHOD
 * UPDATE ROLE
 */
export const updateRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;
  const { id } = req.params;

  // Update role name, slug, and permissions
  const role = await RoleModel.findByIdAndUpdate(
    id,
    { name, slug: name && createSlug(name), permissions },
    { new: true }
  );

  // Handle role update success or failure
  !role
    ? res.status(400).json({ message: "Role not updated" })
    : res.status(200).json({ role, message: "Role updated successfully!" });
});

/**
 * PATCH METHOD
 * UPDATE ROLE STATUS
 */
export const updateRoleStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  // Update role status
  const role = await RoleModel.findByIdAndUpdate(id, { status }, { new: true });

  // Handle role status update success or failure
  !role
    ? res.status(400).json({ message: "Role status not updated" })
    : res.status(200).json({ role, message: "Role status updated successfully!" });
});

/**
 * DELETE METHOD
 * DELETE ROLE
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Delete a role by ID
  const role = await RoleModel.findByIdAndDelete(id);

  // Handle role deletion success or failure
  !role
    ? res.status(400).json({ message: "Role not deleted" })
    : res.status(200).json({ role, message: "Role deleted successfully!" });
});
