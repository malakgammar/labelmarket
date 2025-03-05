import Commande from "../model/commandeModel.js";

export const create = async (req, res) => {
    try {
        const { status, produits, total } = req.body;

        if (!status || !Array.isArray(produits) || produits.length === 0 || !total) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const commandeData = new Commande({ status, produits, total });

        const commandeExists = await Commande.findOne({ status, produits, total });
        if (commandeExists) {
            return res.status(400).json({ message: "Commande déjà existante." });
        }

        const savedCommande = await commandeData.save();
        res.status(201).json(savedCommande);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
}

export const fetch = async (req, res) => {
    try {
        const commandes = await Commande.find();
        if (commandes.length === 0) {
            return res.status(404).json({ message: "Aucune commande trouvée." });
        }
        res.status(200).json(commandes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
}

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
        console.error(error); 
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
}

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
        console.error(error); 
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
}
