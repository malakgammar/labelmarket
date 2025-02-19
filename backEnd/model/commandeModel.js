import mongoose from 'mongoose';

const commandeSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true, default: Date.now,
    },
    status: {
        type: String,
        required: true
    },
    idproduits: {
        type: [String],
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Commande', commandeSchema);