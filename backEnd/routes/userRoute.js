// Import the express module
import express from "express";

// Import controller functions for handling user userRoutes
import { create, deleteUser, fetch, update } from "../controller/userController.js";

// Create a new userRouter instance
const userRoute = express.Router();

// Define userRoutes and their corresponding controller functions
userRoute.get("/getallusers", fetch); // userRoute to fetch all users
userRoute.post ("/createU", create); // userRoute to create a new user
userRoute.put("/updateU/:id", update); // userRoute to update a user by ID
userRoute.delete("/deleteU/:id", deleteUser); // userRoute to delete a user by ID

// Export the userRouter
export default userRoute;