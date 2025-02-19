import message from "../model/messageModel.js";

// For posting data into the database
export const create = async(req, res)=>{
    try {
        // Create a new message instance with the request body
        const messageData = new message( req.body);

        // Save the new message data into the database
        const savedmessage = await messageData.save();
        // Send a success response with the saved message data
        res.status(200).json(savedmessage)
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({error : "Internal Server Error. "})
    }
}

// Pour récupérer tous les messages de la base de données
export const fetch = async (req, res) => {
    try {
        // Trouver tous les messages dans la base de données
        const messages = await message.find();
        
        // Si aucun message n'est trouvé, envoyer une réponse d'erreur 404
        if (messages.length === 0) {
            return res.status(404).json({ message: "Messages not found." });
        }

        // Envoyer une réponse de succès avec les données des messages récupérés
        res.status(200).json(messages);
    } catch (error) {
        // Afficher l'erreur dans la console pour le débogage
        console.error("Error fetching messages:", error);

        // Gérer les erreurs et envoyer une réponse d'erreur interne du serveur
        res.status(500).json({ error: "Internal Server Error." });
    }
};