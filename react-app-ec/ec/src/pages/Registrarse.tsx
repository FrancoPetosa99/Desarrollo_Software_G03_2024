import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Alert from '../components/Alerts';
import './Registrarse.css';
import getBaseUrl from '../utils/getBaseUrl.js';

function Registrarse() {
    // Estados para almacenar datos de registro
    const [email, setEmail] = useState('');          // Almacena el email del usuario
    const [password, setPassword] = useState('');    // Almacena la contraseña
    const [confirmPassword, setConfirmPassword] = useState(''); // Almacena la confirmación de contraseña
    const [passwordError, setPasswordError] = useState(''); // Almacena errores de contraseña
    const [showPassword, setShowPassword] = useState(false); // Controla la visibilidad de la contraseña
    const [error, setError] = useState('');          // Almacena mensajes de error generales
    const [alertMessage, setAlertMessage] = useState('x');
    const [alertType, setAlertType] = useState('x');
    const navigate = useNavigate();                   // Hook para redirigir al usuario
    const [nombre, setNombre] = useState('');        // Almacena el nombre del usuario
    const [apellido, setApellido] = useState('');    // Almacena el apellido del usuario
    const [showAlert, setShowAlert] = useState(false);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setShowAlert(false);
        // Validación de contraseñas
        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            setAlertMessage('Las contraseñas deben coincidir')
            setAlertType('warning')
            setShowAlert(true);
            return; // Detener el envío si hay un error
        }

        try {
            // Construir el endpoint y realizar la petición POST a /api/profesores
            const endpoint = getBaseUrl();
            const response = await fetch(`${endpoint}/api/profesores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                // Si la respuesta es exitosa, redirigir a la página de exámenes
                navigate('/misExamenes');
            } else {
                // Manejar el error en la respuesta
                setError('Error al registrar, por favor intenta nuevamente.');
                setAlertMessage('Ocurrió un error en el servidor')
                setAlertType('error')
                setShowAlert(true);
                return;
            }
        } catch (error) {
            // Manejar errores de conexión o del servidor
            console.error('Error en la solicitud:', error);
            setError('Ocurrió un error en el servidor.');
            setAlertMessage('Ocurrió un error en el servidor')
            setAlertType('error')
            setShowAlert(true);
            return;
        }
    }

    return (
        <Layout>
            <div className='login template d-flex justify-content-center aling-items-center 100-w 100-vh '>

                <form className="form_main" onSubmit={handleSubmit}>
                    <p className="heading">Registro</p>

                    {/* Campos de entrada para Nombre y Apellido */}
                    <div className='inputContainer'>
                        <input
                            type="text"
                            placeholder='Ingresar Nombre'
                            className='inputField'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder='Ingresar Apellido'
                            className='inputField'
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo de entrada para Email */}
                    <div className='inputContainer'>
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
                            type="email"
                            placeholder='Ingresar Email'
                            className='inputField'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campos de entrada para Contraseña */}
                    <div className='inputContainer'>
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
                            type={showPassword ? "text" : "password"}
                            placeholder='Ingresar Contraseña'
                            className='inputField'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='Confirmar Contraseña'
                            className='inputField'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {showAlert && (
                        <Alert
                            message={alertMessage}
                            alertType={alertType}
                        />
                    )}

                    {/* Botón para enviar el formulario */}
                    <button id="button" type="submit">
                        Registrarse
                    </button>

                    {/* Enlace para ir a la página de inicio de sesión */}
                    <div className="signupContainer">
                        <p>Ya tienes cuenta?</p>
                        <Link to="/Login">Ingresar</Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Registrarse;
