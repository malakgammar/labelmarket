import mongoose from "mongoose";

// Define the schema for the user entity
const productSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prix: { type: Number, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    idCategorie: { type: String, required: true }
});

// Create and export the Mongoose model for the "users" collection based on the productSchema
export default mongoose.model("Product", productSchema);