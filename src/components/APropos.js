import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './APropos.css';

const APropos = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="apropos">
            <h1>À Propos de Nous / معلومات عنا</h1>

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
                    {['Casablanca-Settat', 'Rabat-Salé-Kénitra', 'Marrakech-Safi', 'Fès-Meknès', 'Tanger-Tétouan-Al Hoceima'].map((province) => (
                        <div className="province-box" key={province} data-aos="zoom-in">
                            <h3>{province}</h3>
                            <p>Découvrez les meilleures offres et produits disponibles dans cette province.</p>
                            <p>اكتشف أفضل العروض والمنتجات المتاحة في هذه المقاطعة.</p>
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
                                <p>Client fidèle</p>
                            </div>
                        <div className="stars">
                            ⭐⭐⭐⭐⭐
                        </div>
                        <p>Un excellent service et des produits de haute qualité. Je recommande vivement!</p>
                        <p>خدمة ممتازة ومنتجات عالية الجودة. أوصي بشدة!</p>
                        </div>
                    </div>

                    {/* Témoignage 2 */}
                    <div className="temoignage-box" data-aos="zoom-in">
                        <div className="profile">
                            <img src="/profile.png" alt="Ahmed El Mansouri" className="avatar" />
                            <div className="profile-info">
                                <h3>Ahmed El Mansouri</h3>
                                <p>Client satisfait</p>
                            </div>
                        <div className="stars">
                            ⭐⭐⭐⭐
                        </div>
                        <p>J'ai toujours été satisfait de mes commandes. Bravo à l'équipe!</p>
                        <p>لقد كنت دائمًا راضيًا عن طلبي. أحسنت يا فريق!</p>
                        </div>
                    </div>

                    {/* Témoignage 3 */}
                    <div className="temoignage-box" data-aos="zoom-in">
                        <div className="profile">
                            <img src="/profile.png" alt="Fatima Zahra" className="avatar" />
                            <div className="profile-info">
                                <h3>Fatima Zahra</h3>
                                <p>Nouvelle cliente</p>
                            </div>
                        <div className="stars">
                            ⭐⭐⭐⭐⭐
                        </div>
                        <p>Une expérience d'achat incroyable! Je reviendrai sûrement.</p>
                        <p>تجربة تسوق رائعة! سأعود بالتأكيد.</p>
                        </div>
                    </div>

                    {/* Témoignage 4 */}
                    <div className="temoignage-box" data-aos="zoom-in">
                        <div className="profile">
                            <img src="/profile.png" alt="Omar Benali" className="avatar" />
                            <div className="profile-info">
                                <h3>Omar Benali</h3>
                                <p>Client régulier</p>
                            </div>
                        <div className="stars">
                            ⭐⭐⭐⭐
                        </div>
                        <p>Produits de qualité et livraison rapide. Très satisfait!</p>
                        <p>منتجات عالية الجودة وتوصيل سريع. أنا راضٍ جدًا!</p>
                    </div>
                        </div>
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
        </div>
    );
};

export default APropos;