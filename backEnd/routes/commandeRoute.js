// Importer le module express
import express from "express";

// Importer les fonctions du contrôleur pour gérer les commandeRoutes des commandes
import { create, deleteCommande, fetch, update } from "../controller/commandeController.js";

// Créer une nouvelle instance de commandeRouteur
const commandeRoute = express.Router();

// Définir les commandeRoutes et leurs fonctions de contrôleur correspondantes
commandeRoute.get("/getallcommandes", fetch); // commandeRoute pour récupérer toutes les commandes
commandeRoute.post("/createC", create); // commandeRoute pour créer une nouvelle commande
commandeRoute.put("/updateC/:id", update); // commandeRoute pour mettre à jour une commande par ID
commandeRoute.delete("/deleteC/:id", deleteCommande); // commandeRoute pour supprimer une commande par ID

// Exporter le commandeRouteur
export default commandeRoute;
