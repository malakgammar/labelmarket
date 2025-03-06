import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Panier.css';

const Panier = () => {
    const [cart, setCart] = useState([]); // État pour stocker les produits du panier
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(''); // État pour gérer les erreurs
    const userId = "12345"; // Remplace par l'ID de l'utilisateur connecté
    const navigate = useNavigate();

    // Fonction pour récupérer le panier de l'utilisateur
    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclure le token d'authentification
                },
            });
            setCart(response.data.panier.produits); // Mettre à jour l'état du panier
        } catch (err) {
            setError('Erreur lors de la récupération du panier.');
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour supprimer un produit du panier
    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/supprimer/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclure le token d'authentification
                },
            });
            fetchCart(); // Recharger le panier après suppression
        } catch (err) {
            setError('Erreur lors de la suppression du produit.');
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) {
        return <p>Chargement du panier...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="panier-container">
            <h1>Mon Panier</h1>
            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.idproduit} className="cart-item">
                            <img src={item.idproduit.photo} alt={item.idproduit.nom} />
                            <h3>{item.idproduit.nom}</h3>
                            <p>Quantité : {item.quantite}</p>
                            <p>Prix unitaire : ${item.prixUnitaire.toFixed(2)}</p>
                            <p>Total : ${(item.quantite * item.prixUnitaire).toFixed(2)}</p>
                            <button onClick={() => handleRemoveFromCart(item.idproduit._id)}>
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={() => navigate('/')}>Retour à l'accueil</button>
        </div>
    );
};

export default Panier;