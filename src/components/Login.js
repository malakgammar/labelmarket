import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assurez-vous d'importer correctement le contexte
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setUser, setError, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password,
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token); // Stocke le token
            setUser(user); // Met à jour l'état de l'utilisateur
            navigate('/profile'); // Redirige vers le profil
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de la connexion.'); // Utilise setError ici
            console.error('Erreur lors de la connexion:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>Connexion / تسجيل الدخول</h3>
            {error && <p className="text-danger">{error}</p>} 
            <div className="mb-3">
                <label className="form-label">Email / البريد الإلكتروني</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Mot de passe / كلمة المرور</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Se connecter / تسجيل الدخول</button>
        </form>
    );
};

export default Login;