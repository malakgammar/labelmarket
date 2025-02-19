import mongoose from "mongoose";

// Define the schema for the user entity
const messageSchema = new mongoose.Schema({
    nom: { type: String, required: true }, // Nom de l'utilisateur
    email: { type: String, required: true }, 
    message: { type: String, required: true }, 
    date: {type: Date,default: Date.now,required: true},
});

// Create and export the Mongoose model for the "users" collection based on the userSchema
export default mongoose.model("message", messageSchema);