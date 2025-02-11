import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            const testUser = {
                nom: 'user',
                email: 'user@example.com',
                adresse: 'Casablanca, Maroc',
                telephone: '+212 6 23 45 67 89',
            };
            setUser(testUser);
            localStorage.setItem('user', JSON.stringify(testUser));
        }
    }, []);

    const login = (userData) => {
        if (!userData.email || !userData.password) {
            setError('Email et mot de passe requis.');
            return;
        }
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);