import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import logo from '../Logo-ec.png';
import logo2 from '../Logo2-ec.png';
import x from '../icons/x.svg';
import facebook from '../icons/facebook.svg';
import instagram from '../icons/instagram.svg';
import linkedin from '../icons/linkedin.svg';
import check from '../icons/check.svg';
import time from '../icons/time.svg';
import analytics from '../icons/analisis.svg'; 
import exam from '../icons/examen.svg';
import './Home.css'; // Importa los estilos CSS

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); 

    // Redireccionar si el usuario ya está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/MisExamenes');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="Home">
            <Layout>
                <main>
                    <HeroSection />
                    <FeaturesSection />
                    <BenefitsSection />
                    <CTASection />
                </main>
            </Layout>
            <Footer />
        </div>
    );
};

// Sección Hero
const HeroSection = () => (
    <section className="hero-section">
        <div className="hero-content">
            <h1 className="hero-title">Creador de exámenes online</h1>
            <p className="hero-text">
                Imagina poder diseñar exámenes personalizados en cuestión de minutos, sin complicaciones.
                Automatiza todo el proceso y despídete del estrés, mientras disfrutas de resultados instantáneos y precisos al final de cada prueba.
            </p>
            <Link to="/Registrarse">
                <button className="cta-button">Crea tu cuenta gratis</button>
            </Link>
        </div>
        <div className="hero-image-container">
            <img src={logo} alt="Online Exam Illustration" className="hero-image" />
        </div>
    </section>
);

// Sección Características
const FeaturesSection = () => (
    <section className="features-section">
        <h2 className="section-title">Características principales</h2>
        <div className="features-grid">
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
                image={analytics} 
            />
        </div>
    </section>
);

// Componente de tarjeta de característica
const FeatureCard = ({ title, description, image }) => (
    <div className="feature-card">
        <img src={image} alt={title} className="feature-image" />
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
    </div>
);

// Sección Beneficios
const BenefitsSection = () => (
    <section className="benefits-section">
        <h2 className="section-title">¿Por qué hacer exámenes en línea?</h2>
        <div className="benefits-content">
            <div className="benefits-image-container">
                <img src={exam} alt="Online Exam Benefits" className="benefits-image" height="300" width="300" />
            </div>
            <div className="benefits-list">
                <h3 className="benefits-list-title">Beneficios clave:</h3>
                <ul className="benefits-list-items">
                    <BenefitItem text="Ahorro de tiempo significativo" />
                    <BenefitItem text="Resultados inmediatos y precisos" />
                    <BenefitItem text="Evaluación personalizada y adaptativa con IA" />
                    <BenefitItem text="Posibilidad de exámenes interactivos" />
                    <BenefitItem text="Evaluación más profunda y detallada" />
                </ul>
            </div>
        </div>
    </section>
);

// Componente de ítem de beneficio
const BenefitItem = ({ text }) => (
    <li className="benefit-item">
        <span className="benefit-bullet"></span>
        <span className="benefit-text">{text}</span>
    </li>
);

// Sección CTA (Llamado a la acción)
const CTASection = () => (
    <section className="cta-section">
        <h2 className="cta-title">Empieza hoy mismo</h2>
        <p className="cta-text">
            Únete a miles de educadores que ya elegieron la opción mas sencilla, Easy Choice
        </p>
        <Link to="/Registrarse">
            <button className="cta-button">Crea tu cuenta gratis</button>
        </Link>
    </section>
);

// Pie de página (Footer)
const Footer = () => (
    <footer className="footer">
        <div className="footer-content">
            <div className="footer-grid">
                <FooterColumn title="Casos de uso" links={['Exámenes escolares', 'Certificaciones', 'Evaluaciones corporativas', 'Concursos']} />
                <FooterColumn title="Explorar" links={['Características', 'Integraciones', 'Precios', 'Seguridad']} />
                <FooterColumn title="Recursos" links={['Blog', 'Guías', 'Webinars', 'Soporte']} />
                <FooterColumn title="Empresa" links={['Acerca de nosotros', 'Carreras', 'Legal', 'Privacidad']} />
            </div>
            <div className="footer-bottom">
                <div className="footer-logo">
                    <img src={logo2} alt="Easy Choice Logo" className="footer-logo-image" />
                    <span className="footer-logo-text">© 2024 Easy Choice. Todos los derechos reservados.</span>
                </div>
                <div className="social-links">
                    <a href="https://twitter.com" className="social-link">
                        <img src={x} alt="Twitter" height="24" width="24" />
                    </a>
                    <a href="https://facebook.com" className="social-link">
                        <img src={facebook} alt="Facebook" height="24" width="24" />
                    </a>
                    <a href="https://linkedin.com" className="social-link">
                        <img src={linkedin} alt="LinkedIn" height="24" width="24" />
                    </a>
                    <a href="https://instagram.com" className="social-link">
                        <img src={instagram} alt="Instagram" height="24" width="24" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

// Componente de columna de pie de página
const FooterColumn = ({ title, links }) => (
    <div className="footer-column">
        <h4 className="footer-column-title">{title}</h4>
        <ul className="footer-column-list">
            {links.map((link, index) => (
                <li key={index}><a href="#" className="footer-link">{link}</a></li>
            ))}
        </ul>
    </div>
);

export default Home;
