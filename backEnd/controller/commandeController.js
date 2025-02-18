// Importer le modèle de commande depuis commandeModel.js
import Commande from "../model/commandeModel.js";

// Pour poster des données dans la base de données
export const create = async (req, res) => {
    try {
        const { date, status, idproduits, total } = req.body;

        // Créer une nouvelle instance de Commande
        const commandeData = new Commande({ date, status, idproduits, total });

        // Vérifier si une commande avec les mêmes détails existe déjà
        const commandeExists = await Commande.findOne({ date, status, idproduits, total });
        if (commandeExists) {
            return res.status(400).json({ message: "Commande déjà existante." });
        }

        // Enregistrer les données de la nouvelle commande dans la base de données
        const savedCommande = await commandeData.save();
        res.status(200).json(savedCommande);
    } catch (error) {
        console.error(error); // Afficher l'erreur dans la console
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
}

// Pour obtenir toutes les commandes de la base de données
export const fetch = async (req, res) => {
    try {
        const commandes = await Commande.find();
        if (commandes.length === 0) {
            return res.status(404).json({ message: "Aucune commande trouvée." });
        }
        res.status(200).json(commandes);
    } catch (error) {
        console.error(error); // Afficher l'erreur dans la console
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
}

// Pour mettre à jour des données
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const commandeExist = await Commande.findById(id);
        if (!commandeExist) {
            return res.status(404).json({ message: "Commande non trouvée." });
        }
        const updateCommande = await Commande.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updateCommande);
    } catch (error) {
        console.error(error); // Afficher l'erreur dans la console
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
}

// Pour supprimer des données de la base de données
export const deleteCommande = async (req, res) => {
    try {
        const id = req.params.id;
        const commandeExist = await Commande.findById(id);
        if (!commandeExist) {
            return res.status(404).json({ message: "Commande non trouvée." });
        }
        await Commande.findByIdAndDelete(id);
        res.status(200).json({ message: "Commande supprimée avec succès." });
    } catch (error) {
        console.error(error); // Afficher l'erreur dans la console
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
}