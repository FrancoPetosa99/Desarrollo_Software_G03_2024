import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './Login.css';
import { useAuth } from '../utils/AuthContext.jsx';
import getBaseUrl from '../utils/getBaseUrl.js';

function Login() {
    // Estado para los campos del formulario y el error
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const endpoint = getBaseUrl();
    const { isAuthenticated, setIsAuthenticated } = useAuth();

    const AUTH_ENDPOINT = '/api/auth/credentials'; // Constante para la URL de autenticación

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${endpoint}${AUTH_ENDPOINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(true); // Actualiza el estado de autenticación
                const professorId = data.data;
                localStorage.setItem('professorId', professorId); // Guarda el ID del profesor
                navigate('/MisExamenes'); // Redirige a Mis Exámenes
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Credenciales incorrectas.'); // Muestra un mensaje de error más descriptivo
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Ocurrió un error en el servidor.'); // Muestra un error en caso de fallo del servidor
        }
    };

    return (
        <Layout>
            <div className='login template d-flex justify-content-center aling-items-center 100-w 100-vh'>
                <form className="form_main_login" onSubmit={handleSubmit}>
                    <p className="heading">Login</p>

                    {/* Campo de entrada para el email */}
                    <div className="inputContainer">
                        <svg
                            viewBox="0 0 16 16"
                            fill="#2e2e2e"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inputIcon"
                        >
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                        </svg>
                        <input
                            placeholder="Email"
                            value={email}
                            className="inputField"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo de entrada para la contraseña */}
                    <div className="inputContainer">
                        <svg
                            viewBox="0 0 16 16"
                            fill="#2e2e2e"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inputIcon"
                        >
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                        <input
                            placeholder="Contraseña"
                            value={password}
                            className="inputField"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Muestra el mensaje de error si existe */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {/* Botón de envío */}
                    <button id="button" type="submit">
                        Acceder
                    </button>

                    <div className="signupContainer">
                        <p>No tienes cuenta?</p>
                        <Link to="/Registrarse">Regístrate</Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
