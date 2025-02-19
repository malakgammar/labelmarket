import category from "../model/categoryModel.js";

export const create = async (req, res) => {
    try {
        // Créer une nouvelle instance de Category avec les données de la requête
        const categoryData = new category(req.body);

        // Sauvegarder la nouvelle catégorie dans la base de données
        const savedCategory = await categoryData.save();

        // Envoyer une réponse de succès avec les données de la catégorie sauvegardée
        res.status(200).json(savedCategory);
    } catch (error) {
        // Gérer les erreurs et envoyer une réponse d'erreur interne du serveur
        res.status(500).json({ error: "Internal Server Error." });
    }
}

export const fetch = async (req, res) => {
    try {
        // Trouver toutes les catégories dans la base de données
        const categories = await category.find();

        // Si aucune catégorie n'est trouvée, envoyer une réponse d'erreur 404
        if (categories.length === 0) {
            return res.status(404).json({ message: "Categories not found." });
        }

        // Envoyer une réponse de succès avec les données des catégories récupérées
        res.status(200).json(categories);
    } catch (error) {
        // Afficher l'erreur dans la console pour le débogage
        console.error("Error fetching categories:", error);

        // Gérer les erreurs et envoyer une réponse d'erreur interne du serveur
        res.status(500).json({ error: "Internal Server Error." });
    }
};