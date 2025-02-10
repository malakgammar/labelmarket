import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import './AuthCard.css';

const AuthCard = () => {
    const [isLogin, setIsLogin] = useState(true); // État initial

    const toggleForm = () => {
        setIsLogin(!isLogin); // Bascule entre connexion et inscription
    };

    return (
        
        <div className="auth-card">
        
        
            <button className="btn btn-outline-danger btn-lg" onClick={toggleForm}>
                {isLogin ? 'Créer un compte - إنشاء حساب' : 'Déjà un compte - لدي حساب'}
            </button>
            {isLogin ? (
                <Login /> // Affiche le formulaire de connexion
            ) : (
                <Register /> // Affiche le formulaire d'inscription
            )}
        </div>
    );
};

export default AuthCard;