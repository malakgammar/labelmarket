import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, error } = useAuth();
    const [cin, setCin] = useState('');
    const [nom, setNom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(cin, nom, telephone, email, password);
        navigate('/profile');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <h3>Inscription / تسجيل</h3>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
                <label className="form-label">CIN / رقم البطاقة</label>
                <input type="text" className="form-control" value={cin} onChange={(e) => setCin(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Nom / الاسم</label>
                <input type="text" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Numéro de téléphone / رقم الهاتف</label>
                <input type="tel" className="form-control" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email / البريد الإلكتروني</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Mot de passe / كلمة المرور</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">S'inscrire / تسجيل</button>

        </form>
    );
};

export default Register;