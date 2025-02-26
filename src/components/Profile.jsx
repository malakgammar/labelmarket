import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth(); // Utilise le contexte pour récupérer l'utilisateur et la fonction logout
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Appelle la fonction logout
        navigate('/'); // Redirige vers la page d'accueil ou de connexion
    };

    return (
        <div>
            <h1>Profil</h1>
            {user ? (
                <div>
                    <p>Nom: {user.nom}</p>
                    <p>Email: {user.email}</p>
                    <p>Téléphone: {user.telephone}</p>
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Se déconnecter / تسجيل الخروج
                    </button>
                </div>
            ) : (
                <p>Vous n'êtes pas connecté.</p>
            )}
        </div>
    );
};

export default Profile;