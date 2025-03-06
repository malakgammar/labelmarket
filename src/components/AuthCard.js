import React, { useState } from 'react';
import Register from './Register'; // Importer le composant Register
import Login from './Login'; // Importer le composant Login
import './AuthCard.css'; // Importer le fichier CSS

const AuthCard = () => {
    const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Register

    // Fonction pour basculer entre Login et Register
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-card">
            <button className="btn btn-outline-danger btn-lg" onClick={toggleForm}>
                {isLogin ? 'Créer un compte - إنشاء حساب' : 'Déjà un compte - لدي حساب'}
            </button>
            {isLogin ? (
                <Login /> // Afficher le formulaire de connexion
            ) : (
                <Register /> // Afficher le formulaire d'inscription
            )}
        </div>
    );
};

export default AuthCard;