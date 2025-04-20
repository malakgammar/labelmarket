import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader'; 
import './Acceuil.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/"><img src="/logo.png" alt="Logo" /></Link>
            </div>
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? '✖' : '☰'}
            </button>
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/product">Produits - منتجات</Link></li>
                    <li><a href="#coupons">À Propos - حول</a></li>
                    <li><a href="#temoignage-boxes">Contact - تواصل معنا</a></li>
                    <li><Link to="/authentification">Profil - الملف الشخصي</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export const Acceuil = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState({ name: '', email: '', message: '', rating: 0 });

    useEffect(() => {
        AOS.init();
        setTimeout(() => setLoading(false), 2000);
    }, []);

    // Récupération des témoignages depuis l'API
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("http://localhost:5000/message/getallmessages");
                if (!response.ok) throw new Error("Erreur lors de la récupération des messages");
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error("Erreur :", error);
            }
        };
        fetchMessages();
    }, []);

    const handleProductClick = () => {
        setLoading(true);
        setTimeout(() => navigate('/product'), 500);
    };

    if (loading) return <Loader />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/message/createM", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMessage),
            });
            if (!response.ok) throw new Error("Erreur lors de l'ajout du témoignage");

            const addedMessage = await response.json();
            setMessages([...messages, addedMessage]);
            setNewMessage({ name: '', email: '', message: '', rating: 0 });
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    const handleStarClick = (rating) => {
        setNewMessage({ ...newMessage, rating });
    };

    return (
        <div className="acceuil">

            <div className="carousel">
                <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1} autoplay autoplaySpeed={2000}>
                    <div><img src="/carou1.png" alt="Carrousel 1" /></div>
                    <div><img src="/carou2.png" alt="Carrousel 2" /></div>
                    <div><img src="/carou3.png" alt="Carrousel 3" /></div>
                    <div><img src="/carou4.png" alt="Carrousel 4" /></div>
                </Slider>
            </div>

            <main className="main">
                <section className="hero" data-aos="fade-up">
                    <h2>Bienvenue chez </h2>
                    <h2>مرحبًا بك في </h2>
                    <h1>LabelMarket</h1>
                    <p>Découvrez nos produits en gros et nos meilleures offres!</p>
                    <button onClick={handleProductClick} className="cta-button">
                        Voir les produits - عرض المنتجات
                    </button>
                </section>

                <section id="coupons" className="coupons fixed">
                    <h3>Coupons - قسائم</h3>
                    <p>Utilisez le code <strong>GROSS20</strong> pour obtenir 20% de réduction sur votre première commande en gros!</p>
                    <p>استخدم الرمز <strong>GROSS20</strong> للحصول على خصم 20% على طلبك الأول بالجملة!</p>
                </section>

                <section id="historique" className="historique" data-aos="fade-up">
                    <h2>Historique / التاريخ</h2>
                    <p><h5>
                        Fondé en 2000, LabelMarket a commencé comme une petite plateforme de vente de produits locaux. 
                        Grâce à notre engagement envers la qualité et le service client, nous avons rapidement grandi pour devenir 
                        l'un des principaux acteurs du commerce en ligne.
                        <br /> <br />
                        تأسست LabelMarket في عام 2000، وبدأت كمنصة صغيرة لبيع المنتجات المحلية. بفضل التزامنا بالجودة وخدمة العملاء، نما بسرعة لنصبح أحد اللاعبين الرئيسيين في التجارة الإلكترونية.
                    </h5></p>
                </section>

                <section className="provinces">
                    <h2>Nos Provinces / مقاطعاتنا</h2>
                    <div className="province-boxes">
                        {[
                            { name: 'Casablanca-Settat', location: 'Quartier Beausite, Voie AS-31, Casablanca 20250، المغرب' },
                            { name: 'Rabat-Salé-Kénitra', location: 'Hay Ryad, Rabat' },
                            { name: 'Marrakech-Safi', location: 'Rez de chausse Al Fiddia lotissement 1 et lotissement 2 Avenue, Agadir 80060' },
                            { name: 'Fès-Meknès', location: 'N 157 Rue 17 Hay Sidi Hadi El Hadi Zouagha, Fes, Fes-meknes 30000' },
                            { name: 'Tanger-Tétouan-Al Hoceima', location: 'Rue bilal res arkhabil, 90000 Tangier' }
                        ].map((province) => (
                            <div className="province-box" key={province.name} data-aos="zoom-in">
                                <h3>{province.name}</h3>
                                <p><strong>Localisation : </strong>{province.location}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="missions">
                    <h2>Nos Missions / مهامنا</h2>
                    <div className="mission-boxes">
                        {['Fournir une expérience d\'achat exceptionnelle', 
                          'Promouvoir des pratiques durables', 
                          'Soutenir les communautés locales', 
                          'Offrir un service client de qualité'].map((mission) => (
                            <div className="mission-box" key={mission} data-aos="zoom-in">
                                <h3>{mission}</h3>
                                <p>Nous nous engageons à réaliser cette mission pour le bien de nos clients et de la société.</p>
                                <p>نحن ملتزمون بتحقيق هذه المهمة من أجل مصلحة عملائنا والمجتمع.</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="valeurs">
                    <h2>Nos Valeurs / قيمنا</h2>
                    <div className="valeur-boxes">
                        {['Qualité', 'Intégrité', 'Innovation', 'Responsabilité Sociale'].map((valeur) => (
                            <div className="valeur-box" key={valeur} data-aos="zoom-in">
                                <h3>{valeur}</h3>
                                <p>Nous valorisons cette qualité dans tout ce que nous faisons.</p>
                                <p>نحن نقدر هذه القيمة في كل ما نقوم به.</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="temoignages" id="temoignages">
   
                <h2>Témoignages Clients / آراء العملاء</h2>
                <div className="temoignage-boxes">
                    {messages.length > 0 ? (
                        messages.map(({ _id, name, email, message, rating}) => (
                            <div className="temoignage-box" data-aos="zoom-in" key={_id}>
                                {/* Profil en haut */}
                                <div className="profile">
                                    <img src="/photoProfile.png" alt={name} className="avatar" />
                                    <div className="profile-info">
                                        <h3>{name}</h3>
                                        <p className="email">{email}</p>
                                    </div>
                                </div>

                                {/* Message du client */}
                                <p className="message">{message}</p>

                                {/* Étoiles de notation */}
                                <div className="stars">
                                    {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucun témoignage disponible pour le moment.</p>
                    )}
                </div>
            </section>

            {/* Formulaire d'ajout de témoignage */}
            <section className="ajout-temoignage">
                <h2>Ajouter votre témoignage</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nom" value={newMessage.name} onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })} required />
                    <input type="email" placeholder="Email" value={newMessage.email} onChange={(e) => setNewMessage({ ...newMessage, email: e.target.value })} required />
                    <textarea placeholder="Votre message" value={newMessage.message} onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })} required></textarea>

                    Sélecteur d'étoiles
                    <div className="stars-selector">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= newMessage.rating ? "selected-star" : ""} onClick={() => handleStarClick(star)}>
                                ★
                            </span>
                        ))}
                    </div>

                    <button type="submit">Envoyer</button>
                </form>
            </section>

                        </main>

                    </div>
                );
            };

export const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2025 LabelMarket.</p> 
            <p>Tous droits réservés. جميع الحقوق محفوظة</p>
        </footer>
    );
};

export default Acceuil;
