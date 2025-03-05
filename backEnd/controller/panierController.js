import Panier from "../model/panierModel.js"; 
import Produit from "../model/productModel.js";

const ajouterAuPanier = async (req, res) => {
    const { idproduit, quantite } = req.body;
    const userId = req.user.id;

    try {
        const produit = await Produit.findById(idproduit);
        if (!produit) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        let panier = await Panier.findOne({ userId });
        if (!panier) {
            panier = new Panier({
                userId,
                produits: [],
                total: 0,
            });
        }

        const itemIndex = panier.produits.findIndex(item => item.idproduit.toString() === idproduit);
        if (itemIndex > -1) {
            panier.produits[itemIndex].quantite += quantite;
        } else {
            panier.produits.push({
                idproduit,
                quantite,
                prixUnitaire: produit.prix,
            });
        }

        panier.total = panier.produits.reduce((acc, item) => acc + (item.quantite * item.prixUnitaire), 0);

        await panier.save();
        res.json({ message: 'Produit ajouté au panier.', panier });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout au panier.', error });
    }
};

const obtenirPanier = async (req, res) => {
    const userId = req.user.id;

    try {
        const panier = await Panier.findOne({ userId }).populate('produits.idproduit');
        if (!panier) {
            return res.status(404).json({ message: 'Panier vide.' });
        }
        res.json({ panier });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du panier.', error });
    }
};

const supprimerDuPanier = async (req, res) => {
    const idproduit = req.params.idproduit;
    const userId = req.user.id;

    try {
        const panier = await Panier.findOne({ userId });
        if (!panier) {
            return res.status(404).json({ message: 'Panier vide.' });
        }

        panier.produits = panier.produits.filter(item => item.idproduit.toString() !== idproduit);
        panier.total = panier.produits.reduce((acc, item) => acc + (item.quantite * item.prixUnitaire), 0);

        await panier.save();
        res.json({ message: 'Produit supprimé du panier.', panier });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du produit.', error });
    }
};

export default {
    ajouterAuPanier,
    obtenirPanier,
    supprimerDuPanier,
};