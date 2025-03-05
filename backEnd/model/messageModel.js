import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nom de l'expéditeur
    email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // Email de l'expéditeur
    message: { type: String, required: true }, // Contenu du message
    timestamp: { type: Date, default: Date.now } // Horodatage
});

const Message = mongoose.model('Message', messageSchema);
export default Message;