import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, 
    message: { type: String, required: true }, 
    rating: { type: Number, required: true, min: 1, max: 5 },  
    timestamp: { type: Date, default: Date.now } 
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
