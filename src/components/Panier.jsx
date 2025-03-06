import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Panier.css';

const Panier = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userId = "12345";
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCart(response.data.panier.produits);
        } catch (err) {
            setError('Erreur lors de la récupération du panier.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/supprimer/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchCart();
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