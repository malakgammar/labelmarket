import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate to="/authentification" />;
};

export default PrivateRoute;