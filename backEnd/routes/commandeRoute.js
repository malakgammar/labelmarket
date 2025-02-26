import express from "express";

import { create, deleteCommande, fetch, update } from "../controller/commandeController.js";

const commandeRoute = express.Router();

commandeRoute.get("/getallcommandes", fetch); 
commandeRoute.post("/createC", create); 
commandeRoute.put("/updateC/:id", update); 
commandeRoute.delete("/deleteC/:id", deleteCommande);

export default commandeRoute;
