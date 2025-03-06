import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // État de l'utilisateur
    const [error, setError] = useState(null); // État des erreurs

    // Fonction pour se connecter
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token); // Stocker le token
            setUser(user); // Mettre à jour l'utilisateur
            setError(null); // Réinitialiser les erreurs
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la connexion.'); // Gérer les erreurs
        }
    };

    // Fonction pour s'inscrire
    const register = async (cin, nom, telephone, email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                cin,
                nom,
                telephone,
                email,
                password,
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token); // Stocker le token
            setUser(user); // Mettre à jour l'utilisateur
            setError(null); // Réinitialiser les erreurs
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de l\'inscription.'); // Gérer les erreurs
        }
    };

    // Fonction pour se déconnecter
    const logout = () => {
        localStorage.removeItem('token'); // Supprimer le token
        setUser(null); // Réinitialiser l'utilisateur
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};