// Import the express module
import express from "express";

// Import controller functions for handling user messageRoutes
import { create, fetch  } from "../controller/messageController.js";

// Create a new messageRouter instance
const messageRoute = express.Router();

// Define messageRoutes and their corresponding controller functions
messageRoute.get("/getallmessages", fetch); // messageRoute to fetch all users
messageRoute.post ("/createM", create); // messageRoute to create a new user

// Export the messageRouter
export default messageRoute;