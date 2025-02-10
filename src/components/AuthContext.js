import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (telephone, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { telephone, password });
            const userData = response.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            setError('Échec de la connexion.');
            console.error(err);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/register', userData);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        } catch (err) {
            setError('Échec de l\'inscription.');
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);