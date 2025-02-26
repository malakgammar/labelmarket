import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, user, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await login(email, password); // Appelle la fonction login

        // Vérifie si l'utilisateur est connecté après la promesse
        if (user) {
            navigate('/profile'); // Redirige vers la page de profil si l'utilisateur est connecté
        }

        setLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

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