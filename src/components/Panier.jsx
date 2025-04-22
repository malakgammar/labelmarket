import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf'; // Librairie pour générer le PDF
import './Panier.css';

const Panier = () => {
    const [cart, setCart] = useState({ produits: [], statut: '', total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:5000/panier', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log('Réponse panier:', response.data);
            setCart({
                produits: response.data.panier.produits,
                statut: response.data.panier.statut,
                total: response.data.panier.total,
                idPanier: response.data.idPanier,
            });
        } catch (error) {
            setError('Erreur lors de la récupération du panier.');
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer ce produit du panier ?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/panier/supprimer/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchCart();
        } catch (err) {
            setError('Erreur lors de la suppression du produit.');
            console.error(err);
        }
    };



    const generateInvoice = () => {
        const doc = new jsPDF();
        
        // Configuration de base
        doc.setFont('helvetica'); // Police plus moderne
        const margin = 20;
        let yPosition = margin;
    
        // En-tête de la facture
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.text("FACTURE", margin, yPosition);
        yPosition += 10;
    
        // Informations de base
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition);
        doc.text(`N° Commande: ${cart._id || "N/A"}`, 110, yPosition);
        yPosition += 15;
    
        // Ligne de séparation
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, 190, yPosition);
        yPosition += 10;
    
        // En-têtes du tableau
        const columns = [
            { header: "Produit", width: 80 },
            { header: "Quantité", width: 30 },
            { header: "Prix Unitaire", width: 40 },
            { header: "Total", width: 30 }
        ];
    
        // Dessiner les en-têtes
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPosition, 170, 10, 'F');
        doc.setFont(undefined, 'bold');
        let xPosition = margin;
        columns.forEach(col => {
            doc.text(col.header, xPosition + 2, yPosition + 7);
            xPosition += col.width;
        });
        yPosition += 15;
    
        // Contenu des articles
        doc.setFont(undefined, 'normal');
        cart.produits.forEach((item, index) => {
            // Gestion des sauts de page
            if(yPosition > 250) {
                doc.addPage();
                yPosition = margin;
            }
    
            const product = item.idproduit;
            const total = (item.quantite * item.prixUnitaire).toFixed(2);
    
            // Ligne d'article
            xPosition = margin;
            doc.text(product.nom.substring(0, 30), xPosition + 2, yPosition + 4); // Tronquer les noms longs
            xPosition += columns[0].width;
            
            doc.text(`${item.quantite}`, xPosition + 2, yPosition + 4, { align: 'right' });
            xPosition += columns[1].width;
            
            doc.text(`${item.prixUnitaire.toFixed(2)} MAD`, xPosition + 2, yPosition + 4, { align: 'right' });
            xPosition += columns[2].width;
            
            doc.text(`${total} MAD`, xPosition + 2, yPosition + 4, { align: 'right' });
            
            yPosition += 10;
        });
    
        // Ligne de total
        yPosition += 5;
        doc.line(margin, yPosition, 190, yPosition);
        yPosition += 10;
        
        // Total à payer
        doc.setFont(undefined, 'bold');
        doc.text(`Total à payer: ${cart.total.toFixed(2)} MAD`, 130, yPosition, { align: 'right' });
    
        // Sauvegarder le PDF
        doc.save(`Facture_${cart._id || Date.now()}.pdf`);
    };
    
    

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) return <p>Chargement du panier...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="panier-container">
            <fieldset>
                <legend>🛒 Mon Panier</legend>
                <p><strong>Statut :</strong> {cart.statut}</p>

                {cart.produits.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <div className="cart-items">
                        {cart.produits.map((item) => (
                            <div key={item.idproduit._id} className="cart-item">
                                <img src={item.idproduit.photo} alt={item.idproduit.nom} />
                                <h3>{item.idproduit.nom}</h3>
                                <p>Prix unitaire : MAD{item.prixUnitaire.toFixed(2)}</p>
                                <p>Total : MAD{(item.quantite * item.prixUnitaire).toFixed(2)}</p>

                                

                                <button onClick={() => handleRemoveFromCart(item.idproduit._id)}>
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <h3>Total du panier : MAD{cart.total.toFixed(2)}</h3>

                <button onClick={generateInvoice}>Générer la facture</button>
            </fieldset>

            <button onClick={() => navigate('/')}>Retour à l'accueil</button>
        </div>
    );
};

export default Panier;
