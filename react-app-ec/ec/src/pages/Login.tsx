import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../screen-adjust.css';
import { Link } from 'react-router-dom';
function Login() {
    // Estados para almacenar email y contraseña
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // Para redirigir al usuario

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevenir el comportamiento por defecto del formulario

        try {
            // Petición POST a /api/auth
            const response = await fetch('/api/auth', {
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
                // Si la respuesta es 200, redirigir a la home
                navigate('/home');
            } else {
                // Manejar error (puedes mostrar un mensaje en la UI)
                console.error('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };
    return (
        <Layout>
            <div className='login template d-flex justify-content-center aling-items-center 100-w 100-vh '>
          
                <div className='50-w p-5 rounded bg-blue'>
                    <form onSubmit={handleSubmit}>
                      <h2 className='text-center'>Ingresa </h2>
                          <div className='mb-2'>
                              <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Ingresar Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                          </div>
                          <div className='mb-2'>
                              <label htmlFor="password">Contraseña</label>
                            <input type="password" placeholder='Ingresar Contraseña' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                          </div>
                          <div className='mb-2'>
                              <input type="checkbox" className='custom-control custom-checkbox' id="check"></input>
                              <label htmlFor="check" className='custom-imput-label ms-2'>
                                Recordarme
                              </label>
                          </div>
                          <div className='d-grid'>
                            <button className='btn btn-primary'>
                                Ingresar
                            </button>
                          </div>
                          <p className='text right'>
                            Recuperar<Link className="ms-1" to="/">Contraseña</Link><Link className="ms-2" to="/Registrarse">Registrarse</Link>
                          </p>
                    </form>
                </div>
          
            </div>
        </Layout>
    );
};

export default Login;