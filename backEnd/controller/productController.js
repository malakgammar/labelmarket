import Product from "../model/productModel.js";

// Pour récupérer tous les produits de la base de données
export const fetch = async (req, res) => {
    try {
        // Trouver tous les produits dans la base de données
        const products = await Product.find();
        
        // Si aucun produit n'est trouvé, envoyer une réponse d'erreur 404
        if (products.length === 0) {
            return res.status(404).json({ message: "Products not found." });
        }

        // Envoyer une réponse de succès avec les données des produits récupérés
        res.status(200).json(products);
    } catch (error) {
        // Afficher l'erreur dans la console pour le débogage
        console.error("Error fetching products:", error);

        // Gérer les erreurs et envoyer une réponse d'erreur interne du serveur
        res.status(500).json({ error: "Internal Server Error." });
    }
};