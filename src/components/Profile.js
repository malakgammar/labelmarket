import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Loader from './Loader'; // Assurez-vous d'importer le loader
import './Profile.css';

const Profile = () => {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false); // État de chargement

    // Exemple d'historique des commandes avec articles
    const orders = [
        {
            id: 1,
            items: [
                { name: 'Produit A', quantity: 2, price: 50 },
                { name: 'Produit B', quantity: 1, price: 30 },
            ],
            date: '2023-01-15',
            status: 'Livré',
        },
        {
            id: 2,
            items: [
                { name: 'Produit C', quantity: 3, price: 20 },
            ],
            date: '2023-02-01',
            status: 'En cours',
        },
        {
            id: 3,
            items: [
                { name: 'Produit D', quantity: 1, price: 15 },
            ],
            date: '2023-02-10',
            status: 'Annulé',
        },
    ];

    const handleLogout = () => {
        setLoading(true); // Démarrer le loader lors de la déconnexion
        setTimeout(() => {
            logout();
            window.location.href = '/';
        }, 2000); // Simule un délai pour le loader
    };

    const handleModify = (orderId) => {
        setLoading(true); // Démarrer le loader lors de la modification
        setTimeout(() => {
            console.log(`Modifier la commande ${orderId}`);
            setLoading(false); // Arrêter le loader après la modification
        }, 2000); // Simule un délai pour le loader
    };

    if (loading) {
        return <Loader />; // Affiche le loader si l'état est en chargement
    }

    if (!user) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="profile">
            <h2>Mon Profil - ملفي الشخصي</h2>

            <h3>Informations Personnelles - المعلومات الشخصية</h3>
            <p><strong>*Nom complet - اسم كامل:</strong></p> <p> {user.nom}</p>
            <p><strong>*Email - البريد الإلكتروني:</strong></p> <p> {user.email}</p>
            <p><strong>*Adresse - عنوان:</strong></p> <p> {user.adresse}</p>
            <p><strong>*Téléphone - رقم الهاتف:</strong></p> <p>{user.telephone}</p>

            <div className="profile-actions">
                <Link to="/modifier-profil" onClick={() => handleModify(user.id)} className="action-button">Modifier le Profil - تعديل الملف الشخصي</Link>
                <button onClick={handleLogout} className="action-button">Déconnexion - تسجيل الخروج</button>
            </div>

            <h3>Historique des Commandes - سجل الطلبات</h3>
            <div className="order-history">
                {orders.map(order => {
                    // Calculer le total de chaque commande
                    const total = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

                    return (
                        <div key={order.id} className="order">
                            <h4>Commande ID: {order.id}</h4>
                            <p>Date: {order.date}</p>
                            <p>Status: {order.status}</p>
                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <span>+{item.name} - Quantité: {item.quantity}</span>
                                        <p>Prix: {item.price} DH</p>
                                    </div>
                                ))}
                                <h4>Total: {total} DH</h4>
                            </div>
                            <button onClick={() => handleModify(order.id)}>Modifier - تعديل</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Profile;