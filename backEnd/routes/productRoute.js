import express from "express";

import {  create, fetch  } from "../controller/productController.js";

const productRoute = express.Router();

productRoute.get("/getallproducts", fetch); 
productRoute.post("/createP", create); 

export default productRoute;