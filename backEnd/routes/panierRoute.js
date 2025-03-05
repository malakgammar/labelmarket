import express from 'express';
import authenticate from '../middleware/auth.js';
import panierController from '../controller/panierController.js';

const router = express.Router();

router.post('/ajouter', authenticate, panierController.ajouterAuPanier);
router.get('/', authenticate, panierController.obtenirPanier);
router.delete('/supprimer/:idproduit', authenticate, panierController.supprimerDuPanier);

export default router;