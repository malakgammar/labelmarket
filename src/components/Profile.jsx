import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
    const { user, logout, setUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setUpdatedUser(user);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleUpdate = async () => {
        if (!user || !user.id) {
            setError('Utilisateur non trouvé.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/user/updateU/${user.id}`, updatedUser);
            setSuccessMessage('Informations mises à jour avec succès !');
            setError('');
            setEditMode(false);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (err) {
            console.error("Erreur lors de la mise à jour :", err);
            setError(err.response?.data?.message || 'Erreur lors de la mise à jour.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    const goToCart = () => {
        navigate('/panier');
    };

    if (!user) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Bienvenue, {user.nom} !</h1>
                <div className="cart-icon" onClick={goToCart}>
                    <FaShoppingCart size={24} />
                </div>
            </div>

            <div className="profile-info">
                {editMode ? (
                    <>
                        <div>
                            <label>CIN</label>
                            <input
                                type="text"
                                name="cin"
                                value={updatedUser.cin}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Nom</label>
                            <input
                                type="text"
                                name="nom"
                                value={updatedUser.nom}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Téléphone</label>
                            <input
                                type="tel"
                                name="telephone"
                                value={updatedUser.telephone}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email}
                                onChange={handleChange}
                            />
                        </div>
                        <button onClick={handleUpdate}>Enregistrer</button>
                        <button onClick={toggleEditMode}>Annuler</button>
                    </>
                ) : (
                    <>
                        <p><strong>CIN :</strong> {user.cin}</p>
                        <p><strong>Nom :</strong> {user.nom}</p>
                        <p><strong>Téléphone :</strong> {user.telephone}</p>
                        <p><strong>Email :</strong> {user.email}</p>
                        <button onClick={toggleEditMode}>Modifier mes informations</button>
                        <button onClick={handleLogout} className="logout-button">Déconnexion</button>
                    </>
                )}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error">{error}</p>}
            </div>

            <div className="thank-you-message">
                <p>
                    Cher(e) {user.nom},<br />
                    Nous tenons à vous remercier pour votre fidélité et votre confiance en LabelMarket.
                    Votre satisfaction est notre priorité, et nous sommes ravis de vous compter parmi nos clients.
                    <br />
                    L'équipe LabelMarket.
                </p>
            </div>
        </div>
    );
};

export default Profile;