// Importer le module express
import express from "express";

// Importer les fonctions du contrôleur pour gérer les categoryRoutes des commandes
import {  fetch, create} from "../controller/categoryController.js";

// Créer une nouvelle instance de categoryRouteur
const categoryRoute = express.Router();

// Définir les categoryRoutes et leurs fonctions de contrôleur correspondantes
categoryRoute.get("/getallcategories", fetch); // categoryRoute pour récupérer toutes les commandes
categoryRoute.post("/createCa", create); // categoryRoute pour créer une nouvelle commande


// Exporter le categoryRouteur
export default categoryRoute;
