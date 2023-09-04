// Import the mongoose library, which is a popular MongoDB library for Node.js.
import mongoose from "mongoose";

// Define an asynchronous function called 'mongodbConnect' responsible for connecting to the MongoDB server.
const mongodbConnect = async () => {
    try {
        // Use the 'await' keyword to connect to the MongoDB server using the 'mongoose.connect' method.
        // The MongoDB server URL should be provided via the 'process.env.MOGODB_SERVER' environment variable.
        const connect = await mongoose.connect(process.env.MOGODB_SERVER);

        // If the connection is successful, log a message indicating that MongoDB is connected.
        console.log(`MongoDB connected!`.bgGreen.white);
    } catch (error) {
        // If an error occurs during the connection process, log the error.
        console.log(error);
    }
}

// Export the 'mongodbConnect' function to make it available for use in other parts of your application.
export default mongodbConnect;
