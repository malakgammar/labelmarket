import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Loader from './Loader';

const Login = () => {
    const { login } = useAuth();
    const [telephone, setTelephone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(telephone, password);
        } catch (err) {
            setError('Erreur lors de la connexion.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>Connexion / تسجيل الدخول</h3>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
                <label className="form-label">Numéro de téléphone / رقم الهاتف</label>
                <input
                    type="tel"
                    className="form-control"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
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