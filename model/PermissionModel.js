import mongoose from "mongoose";

// Define a Mongoose schema for permissions
const PermissionSchema = mongoose.Schema({
  // Name of the permission (e.g., "Read", "Write", "Delete")
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Slug is a URL-friendly version of the permission name
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  // Indicates whether the permission has been marked as "trashed" (soft delete)
  trash: {
    type: Boolean,
    default: true,
  },
  // Indicates the status of the permission (e.g., active or inactive)
  status: {
    type: Boolean,
    default: true,
  },
}, {
  // Enable timestamps to automatically record createdAt and updatedAt
  timestamps: true,
});

// Create a Mongoose model based on the PermissionSchema
export const PermissionModel = mongoose.model("Permission", PermissionSchema);
