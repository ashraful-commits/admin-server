// Import necessary modules and libraries
import express from "express"; // Import the Express framework
import dotenv from "dotenv"; // Import dotenv for environment variables
import colors from "colors"; // Import colors for console logging in colors
import router from "./routes/pageRoutes.js"; // Import the router for pages
import mongodbConnect from "./confige/mongodbConfige.js"; // Import MongoDB configuration
import RoleRouter from "./routes/RoleRouter.js"; // Import the router for roles
import PermissionRouter from "./routes/PermissionRouter.js"; // Import the router for permissions
import cors from "cors"; // Import CORS for handling cross-origin requests
import cookiesParser from "cookie-parser"; // Import cookie-parser for handling cookies
import { errorHandeler } from "./middlewares/errorHendler.js"; // Import the error handler middleware

// Load environment variables from a .env file if present
dotenv.config();

// Define the port for the server to listen on
const port = process.env.PROT || 5000;

// Create an instance of the Express application
const app = express();

// Configure CORS to allow requests from http://localhost:5173 with credentials
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
);

// Parse cookies in incoming requests
app.use(cookiesParser());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Use the "router" for handling routes related to user authentication
app.use("/api/v1/auth", router);

// Use the "RoleRouter" for handling routes related to roles
app.use("/api/v1/role", RoleRouter);

// Use the "PermissionRouter" for handling routes related to permissions
app.use("/api/v1/permissions", PermissionRouter);

// Use the custom error handler middleware
app.use(errorHandeler);

// Start the server and connect to MongoDB
app.listen(port, () => {
    mongodbConnect();
    console.log(`Server is running on port ${port}`.bgWhite.cyan);
});
