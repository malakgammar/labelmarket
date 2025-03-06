import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Panier = () => {
    const [panier, setPanier] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPanier = async () => {
            try {
                const response = await axios.get('http://localhost:5000/panier', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` 
                    }
                });
                setPanier(response.data.panier);
            } catch (err) {
                setError(err.response?.data?.message || 'Erreur lors de la récupération du panier.');
            }
        };

        fetchPanier();
    }, []);

    const supprimerProduit = async (idproduit) => {
        try {
            await axios.delete(`http://localhost:5000/panier/supprimer/${idproduit}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setPanier(prevPanier => ({
                ...prevPanier,
                produits: prevPanier.produits.filter(item => item.idproduit._id !== idproduit)
            }));
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la suppression du produit.');
        }
    };

    return (
        <div>
            <h2>Mon Panier</h2>
            {error && <p className="text-danger">{error}</p>}
            {panier ? (
                <div>
                    <ul>
                        {panier.produits.map(item => (
                            <li key={item.idproduit._id}>
                                <span>{item.idproduit.nom} (Quantité: {item.quantite}) - Prix unitaire: {item.prixUnitaire} €</span>
                                <button onClick={() => supprimerProduit(item.idproduit._id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: {panier.total} €</h3>
                </div>
            ) : (
                <p>Chargement du panier...</p>
            )}
        </div>
    );
};

export default Panier;