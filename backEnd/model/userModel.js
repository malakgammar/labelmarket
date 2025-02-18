import mongoose from "mongoose";

// Define the schema for the user entity
const userSchema = new mongoose.Schema({
    cin: { type: String, required: true }, // Numéro d'identification
    nom: { type: String, required: true }, // Nom de l'utilisateur
    telephone: { type: String, unique: true, required: true }, // Numéro de téléphone unique
    email: { type: String, required: true }, // Adresse e-mail
    password: { type: String, required: true }, // Mot de passe (haché)
});

// Create and export the Mongoose model for the "users" collection based on the userSchema
export default mongoose.model("Users", userSchema);