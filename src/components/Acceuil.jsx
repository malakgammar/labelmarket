import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader'; 
import './Acceuil.css';

const produits = [
    { id: 1, nom: 'Produit en Gros 1', img: 'https://via.placeholder.com/150' },
    { id: 2, nom: 'Produit en Gros 2', img: 'https://via.placeholder.com/150' },
    { id: 3, nom: 'Produit en Gros 3', img: 'https://via.placeholder.com/150' },
];

export const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" />
                </Link>
            </div>
            <h1>LabelMarket</h1>
            <nav className="nav">
                <ul>
                    <li><Link to="/authentification">Profil - الملف الشخصي</Link></li>
                    <li><Link to="/produits">Produits - منتجات </Link></li>
                    <li><Link to="/apropos">À Propos - حول</Link></li>
                    <li><Link to="#contact">Contact - تواصل معنا</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export const Acceuil = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleProductClick = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/produits');
        }, 500);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="acceuil">
            <h2>Bienvenue client(e)! !مرحبًا بك زبون(ة)</h2>
            <section id="coupons" className="coupons fixed">
                <h3>Coupons  -  قسائم</h3>
                <p>Utilisez le code <strong>GROSS20</strong> pour obtenir 20% de réduction sur votre première commande en gros!</p>
                <p>استخدم الرمز <strong>GROSS20</strong> للحصول على خصم 20% على طلبك الأول بالجملة!</p>
            </section>

            <main className="main">
                <section className="hero">
                    <h2>Bienvenue chez </h2>
                    <h2>مرحبًا بك في </h2>
                    <h1>LabelMarket</h1>
                    <p>Découvrez nos produits en gros et nos meilleures offres!</p>
                    <p>اكتشف منتجاتنا بالجملة وأفضل العروض لدينا!</p>
                    <button onClick={handleProductClick} className="cta-button">Voir les produits - عرض المنتجات</button>
                </section>
                
                <section id="produits" className="produits">
                    <h3>Nos Produits en Gros  -  منتجاتنا بالجملة</h3>
                    <div className="produit-list">
                        {produits.map(produit => (
                            <div key={produit.id} className="produit-card">
                                <img src={produit.img} alt={produit.nom} className="produit-image" />
                                <h4>{produit.nom}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="promotions" className="promotions">
                    <h3>Promotions   -   عروض ترويجية</h3>
                    <div className="promo-list">
                        <div className="promo-card"><p>20% de réduction sur tous les produits en gros!</p><p> خصم 20% على جميع المنتجات بالجملة!</p></div>
                        <div className="promo-card"><p>15% de réduction sur les commandes de plus de 1000DH!</p><p>  خصم 15% على الطلبات التي تزيد عن 1000 درهم!</p></div>
                        <div className="promo-card"><p>Achetez-en 2 en gros, obtenez-en 1 gratuit! </p><p> اشترِ 2 بالجملة، واحصل على 1 مجانًا!</p></div>
                    </div>
                </section>

                <section id="publicite" className="publicite">
                    <div className="pub-list">
                        <div className="pub-card"><p>Nouveau! Produits frais en gros tous les jours! </p><p> جديد! منتجات طازجة بالجملة كل يوم!</p></div>
                        <div className="pub-card"><p>Venez découvrir notre sélection de produits en gros!</p> <p>  !تعال واكتشف مجموعتنا من المنتجات بالجملة</p></div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2023 LabelMarket.</p> 
            <p>Tous droits réservés. جميع الحقوق محفوظة</p>
        </footer>
    );
};

export default Acceuil;