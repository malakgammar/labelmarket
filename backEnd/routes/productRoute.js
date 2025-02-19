// Import the express module
import express from "express";

// Import controller functions for handling user productRoutes
import {   fetch  } from "../controller/productController.js";
// import {   create  } from "../controller/productController.js";

// Create a new productRouter instance
const productRoute = express.Router();

// Define productRoutes and their corresponding controller functions
productRoute.get("/getallproduits", fetch); // productRoute to fetch all users
// productRoute.post("/createP", create); // productRoute to fetch all users

// Export the productRouter
export default productRoute;