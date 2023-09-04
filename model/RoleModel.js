import mongoose from "mongoose";

// Define a Mongoose schema for roles
const RoleSchema = mongoose.Schema({
  // Name of the role (e.g., "Admin", "User", "Editor")
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Slug is a URL-friendly version of the role name
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  // Array of permission IDs associated with the role
  permissions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Permission",
    default: null,
  },
  // Indicates whether the role has been marked as "trashed" (soft delete)
  trash: {
    type: Boolean,
    default: true,
  },
  // Indicates the status of the role (e.g., active or inactive)
  status: {
    type: Boolean,
    default: true,
  },
}, {
  // Enable timestamps to automatically record createdAt and updatedAt
  timestamps: true,
});

// Create a Mongoose model based on the RoleSchema
export const RoleModel = mongoose.model("Role", RoleSchema);
