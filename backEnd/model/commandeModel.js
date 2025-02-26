import mongoose from 'mongoose';

const commandeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    status: {
        type: String,
        required: true
    },
    produits: [
        {
            idproduit: {
                type: String,
                required: true
            },
            quantite: {
                type: Number,
                required: true,
                min: 1 
            },
            prixUnitaire: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Commande', commandeSchema);