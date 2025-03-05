import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    nom: { type: String, required: true }, 
    email: { type: String, required: true }, 
    message: { type: String, required: true }, 
    date: {type: Date,default: Date.now,required: true},
});

export default mongoose.model("message", messageSchema);