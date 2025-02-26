import express from "express";

import {  fetch, create} from "../controller/categoryController.js";

const categoryRoute = express.Router();

categoryRoute.get("/getallcategories", fetch); 
categoryRoute.post("/createCa", create); 

export default categoryRoute;
