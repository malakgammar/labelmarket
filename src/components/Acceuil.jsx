import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader'; 
import './Acceuil.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';

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
    <li><a href="#apropos">À Propos - حول</a></li>
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
        AOS.init();
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
                        <img src="/carou1.png" alt="1" />
                    </div>
                    <div>
                        <img src="/carou2.png" alt="2" />
                    </div>
                    <div>
                        <img src="/carou3.png" alt="3" />
                    </div>
                    <div>
                        <img src="/carou4.png" alt="4" />
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
                <h3>Coupons  -  قسائم</h3>
                <p>Utilisez le code <strong>GROSS20</strong> pour obtenir 20% de réduction sur votre première commande en gros!</p>
                <p>استخدم الرمز <strong>GROSS20</strong> للحصول على خصم 20% على طلبك الأول بالجملة!</p>
            </section>
                <section id="produits" className="apropos" data-aos="fade-up">
                    <h3>Nos Produits   -  منتجاتنا</h3>
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
                    <h3>Promotions   -   عروض</h3>
                    <div className="historique">
                        <div className="temoignage-box" data-aos="fade-right">
                            <p>20% de réduction sur tous les produits en gros!</p>
                            <p> خصم 20% على جميع المنتجات بالجملة!</p>
                        </div>
                        <div className="temoignage-box" data-aos="fade-right">
                            <p>15% de réduction sur les commandes de plus de 1000DH!</p>
                            <p>  خصم 15% على الطلبات التي تزيد عن 1000 درهم!</p>
                        </div>
                        <div className="temoignage-box" data-aos="fade-right">
                            <p>Achetez-en 2 en gros, obtenez-en 1 gratuit!</p>
                            <p> اشترِ 2 بالجملة، واحصل على 1 مجانًا!</p>
                        </div>
                    </div>
                </section>

                <section className="historique">
                    <h2>Historique / التاريخ</h2>
                    <p>
                        Fondé en 2000, LabelMarket a commencé comme une petite plateforme de vente de produits locaux. 
                        Grâce à notre engagement envers la qualité et le service client, nous avons rapidement grandi pour devenir 
                        l'un des principaux acteurs du commerce en ligne.
                        <br />
                        تأسست LabelMarket في عام 2000، وبدأت كمنصة صغيرة لبيع المنتجات المحلية. بفضل التزامنا بالجودة وخدمة العملاء، نما بسرعة لنصبح أحد اللاعبين الرئيسيين في التجارة الإلكترونية.
                    </p>
                </section>

                <section className="provinces">
    <h2>Nos Provinces / مقاطعاتنا</h2>
    <div className="province-boxes">
        {[
            { name: 'Casablanca-Settat', location: 'Centre économique du Maroc, avec une grande diversité culturelle.' },
            { name: 'Rabat-Salé-Kénitra', location: 'Capitale politique et administrative du Maroc.' },
            { name: 'Marrakech-Safi', location: 'Ville historique connue pour ses souks et sa médina.' },
            { name: 'Fès-Meknès', location: 'Célèbre pour ses anciens sites historiques et ses artisans.' },
            { name: 'Tanger-Tétouan-Al Hoceima', location: 'Port méditerranéen avec une riche histoire maritime.' }
        ].map((province) => (
            <div className="province-box" key={province.name} data-aos="zoom-in">
                <h3>{province.name}</h3>
                <p>Localisation : {province.location}</p>
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
                {/* Section de Témoignages Clients */}
                <section className="temoignages">
                    <h2>Témoignages Clients / آراء العملاء</h2>
                    <div className="temoignage-boxes">
                        {/* Témoignage 1 */}
                        <div className="temoignage-box" data-aos="zoom-in">
                            <div className="profile">
                                <img src="/profile.png" alt="Marie Dupont" className="avatar" />
                                <div className="profile-info">
                                    <h3>Marie Dupont</h3>
                                    <p>mariiie@gmail.com</p>
                                </div>
                            </div>
                            <div className="stars">⭐⭐⭐⭐⭐</div>
                            <p>Un excellent service et des produits de haute qualité. Je recommande vivement!</p>
                            <p>خدمة ممتازة ومنتجات عالية الجودة. أوصي بشدة!</p>
                        </div>

                        {/* Témoignage 2 */}
                        <div className="temoignage-box" data-aos="zoom-in">
                            <div className="profile">
                                <img src="/profile.png" alt="Ahmed El Mansouri" className="avatar" />
                                <div className="profile-info">
                                    <h3>Ahmed El Mansouri</h3>
                                    <p>elmansouri@gmail.com</p>
                                </div>
                            </div>
                            <div className="stars">⭐⭐⭐⭐</div>
                            <p>J'ai toujours été satisfait de mes commandes. Bravo à l'équipe!</p>
                            <p>لقد كنت دائمًا راضيًا عن طلبي. أحسنت يا فريق!</p>
                        </div>

                        {/* Témoignage 3 */}
                        <div className="temoignage-box" data-aos="zoom-in">
                            <div className="profile">
                                <img src="/profile.png" alt="Fatima Zahra" className="avatar" />
                                <div className="profile-info">
                                    <h3>Fatima Zahra</h3>
                                    <p>fatimben@gmail.com</p>
                                </div>
                            </div>
                            <div className="stars">⭐⭐⭐⭐⭐</div>
                            <p>Une expérience d'achat incroyable! Je reviendrai sûrement.</p>
                            <p>تجربة تسوق رائعة! سأعود بالتأكيد.</p>
                        </div>

                        {/* Témoignage 4 */}
                        <div className="temoignage-box" data-aos="zoom-in">
                            <div className="profile">
                                <img src="/profile.png" alt="Omar Benali" className="avatar" />
                                <div className="profile-info">
                                    <h3>Omar Benali</h3>
                                    <p>omarbenali@gmail.com</p>
                                </div>
                            </div>
                            <div className="stars">⭐⭐⭐⭐</div>
                            <p>Produits de qualité et livraison rapide. Très satisfait!</p>
                            <p>منتجات عالية الجودة وتوصيل سريع. أنا راضٍ جدًا!</p>
                        </div>
                    </div>
                </section>

            </div>
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