import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader'; 
import './Acceuil.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import emailjs from 'emailjs-com';

const produits = [
    { id: 1, nom: 'Produit en Gros 1', img: 'https://via.placeholder.com/150' },
    { id: 2, nom: 'Produit en Gros 2', img: 'https://via.placeholder.com/150' },
    { id: 3, nom: 'Produit en Gros 3', img: 'https://via.placeholder.com/150' },
];

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="/logo.png" alt="Logo" />
                </Link>
            </div>
            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? '✖' : '☰'}
            </button>
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/product">Produits - منتجات</Link></li>
                    <li><a href="#coupons">À Propos - حول</a></li>
                    <li><a href="#contact">Contact - تواصل معنا</a></li>
                    <li><Link to="/authentification">Profil - الملف الشخصي</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export const Acceuil = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    
    useEffect(() => {
        AOS.init();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleProductClick = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/product');
        }, 500);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_USER_ID')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSuccessMessage('Votre message a été envoyé avec succès !'); // Message de succès
                setFormData({ name: '', email: '', message: '' }); // Réinitialiser le formulaire
            }, (err) => {
                console.error('FAILED...', err);
                setSuccessMessage('Une erreur est survenue. Veuillez réessayer.'); // Message d'erreur
            });
    };

    if (loading) {
        return <Loader />;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="acceuil">
            <div className="carousel">
                <Slider {...settings}>
                    <div>
                        <img src="/carou1.png" alt="Carrousel 1" />
                    </div>
                    <div>
                        <img src="/carou2.png" alt="Carrousel 2" />
                    </div>
                    <div>
                        <img src="/carou3.png" alt="Carrousel 3" />
                    </div>
                    <div>
                        <img src="/carou4.png" alt="Carrousel 4" />
                    </div>
                </Slider>
            </div>

            <main className="main">
                <section className="hero" data-aos="fade-up">
                    <h2>Bienvenue chez </h2>
                    <h2>مرحبًا بك في </h2>
                    <h1>LabelMarket</h1>
                    <p>Découvrez nos produits en gros et nos meilleures offres!</p>
                    <p>اكتشف منتجاتنا بالجملة وأفضل العروض لدينا!</p>
                    <button onClick={handleProductClick} className="cta-button">Voir les produits - عرض المنتجات</button>
                </section>
                
                <section id="coupons" className="coupons fixed">
                    <h3>Coupons - قسائم</h3>
                    <p>Utilisez le code <strong>GROSS20</strong> pour obtenir 20% de réduction sur votre première commande en gros!</p>
                    <p>استخدم الرمز <strong>GROSS20</strong> للحصول على خصم 20% على طلبك الأول بالجملة!</p>
                </section>

                {/* <section id="produits" className="apropos" data-aos="fade-up">
                    <h3>Nos Produits - منتجاتنا</h3>
                    <div className="mission-box">
                        {produits.map(produit => (
                            <div key={produit.id} className="produit-card" data-aos="zoom-in">
                                <img src={produit.img} alt={produit.nom} className="produit-image" />
                                <h4>{produit.nom}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="apropos" className="apropos" data-aos="fade-up">
                    <h3>Promotions - عروض</h3>
                    <div className="historique">
                        {['20% de réduction sur tous les produits en gros!', 
                          '15% de réduction sur les commandes de plus de 1000DH!', 
                          'Achetez-en 2 en gros, obtenez-en 1 gratuit!'].map((promotion, index) => (
                            <div className="temoignage-box" data-aos="fade-right" key={index}>
                                <p>{promotion}</p>
                                <p>خصم {promotion.includes('20%') ? '20%' : promotion.includes('15%') ? '15%' : 'اشترِ 2 بالجملة، واحصل على 1 مجانًا!'}</p>
                            </div>
                        ))}
                    </div>
                </section> */}

                <section id="historique" className="historique" data-aos="fade-up">
                    <h2>Historique / التاريخ</h2>
                    <p><h5>
                        Fondé en 2000, LabelMarket a commencé comme une petite plateforme de vente de produits locaux. 
                        Grâce à notre engagement envers la qualité et le service client, nous avons rapidement grandi pour devenir 
                        l'un des principaux acteurs du commerce en ligne.
                        <br />
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

                <section className="temoignages">
                    <h2>Témoignages Clients / آراء العملاء</h2>
                    <div className="temoignage-boxes">
                        {[
                            { name: 'Marie Dupont', email: 'mariiie@gmail.com', stars: '⭐⭐⭐⭐⭐', comment: 'Un excellent service et des produits de haute qualité. Je recommande vivement!' },
                            { name: 'Ahmed El Mansouri', email: 'elmansouri@gmail.com', stars: '⭐⭐⭐⭐', comment: 'J\'ai toujours été satisfait de mes commandes. Bravo à l\'équipe 👏👏👏👏' },
                            { name: 'Fatima Zahra', email: 'fatimben@gmail.com', stars: '⭐⭐⭐⭐⭐', comment: 'Une expérience d\'achat incroyable! Je reviendrai sûrement.' },
                            { name: 'Omar Benali', email: 'omarbenali@gmail.com', stars: '⭐⭐⭐⭐', comment: 'Produits de qualité et livraison rapide. Très satisfait!' }
                        ].map((temoignage) => (
                            <div className="temoignage-box" data-aos="zoom-in" key={temoignage.name}>
                                <div className="profile">
                                    <img src="/photoProfile.png" alt={temoignage.name} className="avatar" />
                                    <div className="profile-info">
                                        <h3>{temoignage.name}</h3>
                                        <p>{temoignage.email}</p>
                                    </div>
                                </div>
                                <div className="stars">{temoignage.stars}</div>
                                <p>{temoignage.comment}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="contact" data-aos="fade-up">
                    <h2>Contactez-nous - تواصل معنا</h2>
                    <p>Pour toute question, n'hésitez pas à nous contacter : إذا كان لديك أي أسئلة ، فلا تتردد في التواصل معنا</p>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tr>
                                <td><label htmlFor="name">Nom - الاسم :</label></td>
                                <td><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="email">Email - البريد الإلكتروني :</label></td>
                                <td><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="message">Message - الرسالة :</label></td>
                                <td><input type="texte" id="message" name="message" value={formData.message} onChange={handleChange} required /></td>
                            </tr>
                        </table>
                        <button type="submit">Envoyer - إرسال</button>
                    </form>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="map-container">
                        <h3>Notre Localisation - موقعنا :</h3>
                        <iframe
                            title="Google Map Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509197!2d-7.60969161531567!3d33.57311088085962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12358e24d5a2c0ab%3A0x9f8d1a9b3d3d4b38!2sCasablanca%2C%20Maroc!5e0!3m2!1sen!2sus!4v1618417985084!5m2!1sen!2sus"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
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