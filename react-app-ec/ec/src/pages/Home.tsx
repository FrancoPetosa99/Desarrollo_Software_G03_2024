﻿import React from 'react';
import Layout from '../components/Layout';
import { Link } from "react-router-dom";
import logo from '../Logo-ec.png';
import logo2 from '../Logo2-ec.png';
import x from '../icons/x.svg';
import facebook from '../icons/facebook.svg';
import instagram from '../icons/instagram.svg';
import linkedin from '../icons/linkedin.svg';
import check from '../icons/check.svg'
import time from '../icons/time.svg'
import analitics from '../icons/analisis.svg'

const App = () => {
    return (
        <div style={styles.app}>
            <Layout></Layout>
            <main>
                <HeroSection />
                <FeaturesSection />
                <BenefitsSection />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
};

const HeroSection = () => (
    <section style={styles.heroSection}>
        <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Creador de examenes online</h1>
            <p style={styles.heroText}>
                Usar un creador de exámenes online te permitirá automatizar este proceso, ahorrar
                tiempo y obtener los resultados al término de la prueba.
            </p>
            <Link to="/Registrarse">
                <button style={styles.ctaButton}>Crea tu cuenta</button>
            </Link>
        </div>
        <div style={styles.heroImageContainer}>
            <img src={logo} alt="Online Exam Illustration" style={styles.heroImage} />
        </div>
    </section>
);

const FeaturesSection = () => (
    <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Características principales</h2>
        <div style={styles.featuresGrid}>
            <FeatureCard
                title="Exámenes personalizados"
                description="Crea exámenes adaptados a tus necesidades específicas"
                image={check}
            />
            <FeatureCard
                title="Ahorro de tiempo"
                description="Genera exámenes en minutos, no en horas"
                image={time}
            />
            <FeatureCard
                title="Análisis detallado"
                description="Obtén insights valiosos sobre el rendimiento de los estudiantes"
                image={analitics}
            />
        </div>
    </section>
);

const FeatureCard = ({ title, description, image }) => (
    <div style={styles.featureCard}>
        <img src={image} alt={title} style={styles.featureImage} />
        <h3 style={styles.featureTitle}>{title}</h3>
        <p style={styles.featureDescription}>{description}</p>
    </div>
);

const BenefitsSection = () => (
    <section style={styles.benefitsSection}>
        <h2 style={styles.sectionTitle}>¿Por qué hacer exámenes en línea?</h2>
        <div style={styles.benefitsContent}>
            <div style={styles.benefitsImageContainer}>
                <img src={logo2} alt="Online Exam Benefits" style={styles.benefitsImage} />
            </div>
            <div style={styles.benefitsList}>
                <h3 style={styles.benefitsListTitle}>Beneficios clave:</h3>
                <ul style={styles.benefitsListItems}>
                    <BenefitItem text="Ahorro de tiempo significativo" />
                    <BenefitItem text="Resultados inmediatos y precisos" />
                    <BenefitItem text="Mayor seguridad y prevención de trampas" />
                    <BenefitItem text="Posibilidad de exámenes interactivos" />
                    <BenefitItem text="Evaluación más profunda y detallada" />
                </ul>
            </div>
        </div>
    </section>
);

const BenefitItem = ({ text }) => (
    <li style={styles.benefitItem}>
        <span style={styles.benefitBullet}></span>
        <span style={styles.benefitText}>{text}</span>
    </li>
);

const CTASection = () => (
    <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Empieza hoy mismo</h2>
        <p style={styles.ctaText}>
            Únete a miles de educadores que ya están aprovechando los beneficios de los exámenes en línea
        </p>
        <Link to="/Registrarse">
            <button style={styles.ctaButton}>
                Crea tu cuenta gratis
            </button>
        </Link></section>
);

const Footer = () => (
    <footer style={styles.footer}>
        <div style={styles.footerContent}>
            <div style={styles.footerGrid}>
                <FooterColumn title="Casos de uso" links={['Exámenes escolares', 'Certificaciones', 'Evaluaciones corporativas', 'Concursos']} />
                <FooterColumn title="Explorar" links={['Características', 'Integraciones', 'Precios', 'Seguridad']} />
                <FooterColumn title="Recursos" links={['Blog', 'Guías', 'Webinars', 'Soporte']} />
                <FooterColumn title="Empresa" links={['Acerca de nosotros', 'Carreras', 'Legal', 'Privacidad']} />
            </div>
            <div style={styles.footerBottom}>
                <div style={styles.footerLogo}>
                    <img src={logo2} alt="Easy Choice Logo" style={styles.footerLogoImage} />
                    <span style={styles.footerLogoText}>© 2023 Easy Choice. Todos los derechos reservados.</span>
                </div>
                <div style={styles.socialLinks}>
                    <a href="https://twitter.com" style={styles.socialLink}>
                        <img src={x} alt="Twitter" height="24" width="24" />
                    </a>
                    <a href="https://facebook.com" style={styles.socialLink}>
                        <img src={facebook} alt="Facebook" height="24" width="24" />
                    </a>
                    <a href="https://linkedin.com" style={styles.socialLink}>
                        <img src={linkedin} alt="LinkedIn" height="24" width="24" />
                    </a>
                    <a href="https://instagram.com" style={styles.socialLink}>
                        <img src={instagram} alt="Instagram" height="24" width="24" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

const FooterColumn = ({ title, links }) => (
    <div style={styles.footerColumn}>
        <h4 style={styles.footerColumnTitle}>{title}</h4>
        <ul style={styles.footerColumnList}>
            {links.map((link, index) => (
                <li key={index}><a href="" style={styles.footerLink}>{link}</a></li>
            ))}
        </ul>
    </div>
);

const styles = {
    app: {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    },
    ctaButton: {
        padding: '1rem 2rem',
        backgroundColor: '#1A525B',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    heroSection: {
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#4FD1C5',
        color: '#fff',
    },
    heroContent: {
        flex: 1,
    },
    heroTitle: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    heroText: {
        fontSize: '1.4rem',
        marginBottom: '2rem',
    },
    heroImageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    heroImage: {
        maxWidth: '100%',
        height: 'auto',
    },
    featuresSection: {
        padding: '4rem 2rem',
        backgroundColor: '#EEF7EE',
    },
    sectionTitle: {
        fontSize: '3rem',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#19575F',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
    },
    featureCard: {
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        textAlign: 'center',
        maxHeight: '330px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    featureTitle: {
        fontSize: '1.7rem',
        marginBottom: '2rem',
        color: '#1A525B',
    },
    featureDescription: {
        color: '#4A5568',
    },
    featureImage: {
        width: '70%',
        height: '30%',
        marginBottom: '40px',
        borderRadius: '8px',
    },
    benefitsSection: {
        padding: '4rem 10rem',
    },
    benefitsContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    benefitsImageContainer: {
        marginLeft: '20rem',
        flex: 1,
    },
    benefitsImage: {
        maxWidth: '100%',
        height: 'auto',
    },
    benefitsList: {
        flex: 1,
        backgroundColor: '#EEF7EE',
        padding: '2rem',
        borderRadius: '8px',
    },
    benefitsListTitle: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: '#4CCEC4',
    },
    benefitsListItems: {
        listStyleType: 'none',
        padding: 0,
    },
    benefitItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    benefitBullet: {
        width: '10px',
        height: '10px',
        backgroundColor: '#FED16A',
        borderRadius: '50%',
        marginRight: '1rem',
    },
    benefitText: {
        fontSize: '1.1rem',
    },
    ctaSection: {
        padding: '4rem 2rem',
        backgroundColor: '#EEF7EE',
        textAlign: 'center',
    },
    ctaTitle: {
        fontSize: '2rem',
        marginBottom: '1rem',
        color: '#2C7A7B',
    },
    ctaText: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
        color: '#4A5568',
    },
    footer: {
        backgroundColor: '#f7fafc',
        padding: '4rem 2rem',
    },
    footerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    footerGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
    },
    footerColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    footerColumnTitle: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#2C7A7B',
    },
    footerColumnList: {
        listStyleType: 'none',
        padding: 0,
    },
    footerLink: {
        color: '#4A5568',
        textDecoration: 'none',
        marginBottom: '0.5rem',
        display: 'inline-block',
    },
    footerBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #E2E8F0',
        paddingTop: '2rem',
    },
    footerLogo: {
        display: 'flex',
        alignItems: 'center',
    },
    footerLogoImage: {
        width: '40px',
        height: '40px',
        marginRight: '1rem',
    },
    footerLogoText: {
        color: '#4A5568',
    },
    socialLinks: {
        display: 'flex',
        gap: '1rem',
    },
    socialLink: {
        display: 'inline-block',
    },
};

export default App;