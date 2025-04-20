import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({
        cin: user?.cin || '',
        nom: user?.nom || '',
        telephone: user?.telephone || '',
        email: user?.email || '',
    });
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:5000/auth/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (err) {
            console.error('Erreur lors de la récupération du profil :', err);
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { 
                email,
                password 
            });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de la connexion.');
        }
    };

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
            localStorage.setItem('token', token);
            setUser(user);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de l\'inscription.');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, error, setError, updatedUser, setUpdatedUser }}>
            {children}
        </AuthContext.Provider>
    );
};