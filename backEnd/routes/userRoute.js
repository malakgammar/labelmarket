import express from "express";

import { create, deleteUser, fetch, update } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.get("/getallusers", fetch); 
userRoute.post ("/createU", create); 
userRoute.put("/updateU/:id", update); 
userRoute.delete("/deleteU/:id", deleteUser); 
export default userRoute;