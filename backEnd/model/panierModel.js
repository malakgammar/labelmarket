// models/panierModel.js
import mongoose from 'mongoose';

const panierSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    produits: [{
        idproduit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true }, 
        quantite: { type: Number, required: true, min: 1 },
        prixUnitaire: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    statut: { type: String, default: 'en attente' } 
}, { timestamps: true });

export default mongoose.model('Panier', panierSchema);