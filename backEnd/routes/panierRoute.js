import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import panierController from '../controller/panierController.js';

const panierRoute = express.Router();

panierRoute.post('/ajouter', authenticate, panierController.ajouterAuPanier);
panierRoute.get('/', authenticate, panierController.obtenirPanier);
panierRoute.delete('/supprimer/:idproduit', authenticate, panierController.supprimerDuPanier);

export default panierRoute;