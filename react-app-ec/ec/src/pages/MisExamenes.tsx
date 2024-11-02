import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Layout from '../components/Layout';
import Warning from '../components/Warning';
import Alert from '../components/Alerts';
import wallpaperIcon from '../icons/wallpaper.svg';
import DesplegableConImagenes from '../components/DesplegableImagenes';
import getBaseUrl from '../utils/getBaseUrl.js';
import './MisExamenes.css';

// Exámenes iniciales de ejemplo para mostrar en el componente
const EXAMENES_INICIALES = [
    {
        id: 1,
        titulo: 'Examen de Matemática',
        tema: 'Álgebra',
        tiempo: '30 min',
        fecha: new Date().toISOString().split('T')[0],
        habilitado: true,
        imagenFondo: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGenerico.jpg',
    },
    {
        id: 2,
        titulo: 'Examen de Arte',
        tema: 'Renacimiento',
        tiempo: '45 min',
        fecha: new Date().toISOString().split('T')[0],
        habilitado: false,
        imagenFondo: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/david.jpg',
    },
    {
        id: 1,
        titulo: 'Examen de Matemática',
        tema: 'Álgebra',
        tiempo: '30 min',
        fecha: new Date().toISOString().split('T')[0],
        habilitado: true,
        imagenFondo: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGenerico.jpg',
    },
    {
        id: 3,
        titulo: 'Examen de Matemática',
        tema: 'Álgebra',
        tiempo: '30 min',
        fecha: new Date().toISOString().split('T')[0],
        habilitado: true,
        imagenFondo: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGenerico.jpg',
    },
    {
        id: 4,
        titulo: 'Examen de Matemática',
        tema: 'Álgebra',
        tiempo: '30 min',
        fecha: new Date().toISOString().split('T')[0],
        habilitado: false,
        imagenFondo: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGenerico.jpg',
    },
    // Más exámenes...
];

function PanelExamenes() {
    const [examenes, setExamenes] = useState(EXAMENES_INICIALES); // Estado para almacenar los exámenes
    const [loading, setLoading] = useState(true); // Estado para controlar si los datos están cargando
    const [filtroBusqueda, setFiltroBusqueda] = useState(''); // Filtro de búsqueda por tema
    const [showDialog, setShowDialog] = useState({ id: null, visible: false }); // Estado para mostrar u ocultar el diálogo de confirmación
    const [showDesplegable, setShowDesplegable] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const navigate = useNavigate(); // Hook para redirigir a otras páginas
    //const endpoint = getBaseUrl(); // Obtener la URL base del servidor
    const [showAlert, setShowAlert] = useState(false);

    // Función que obtiene los exámenes desde un API usando el ID del profesor almacenado en localStorage
    const obtenerExamenes = async () => {
        // Indica que la carga ha comenzado
        const endpoint = getBaseUrl()
        try {
            const response = await fetch(`${endpoint}/api/examenes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            if (response.ok) {
                const data = await response.json(); // Parsear la respuesta JSON
                console.log('Respuesta completa:', data); // Verifica la estructura completa
                console.log('Data específica:', data.data); // Accede solo si existe data.data
                setExamenes(data.data); // Actualizar los exámenes en el estado
            } else {
                const errorData = await response.json(); // Parsear la respuesta de error
                console.error('Error al obtener los exámenes:', errorData); // Loguear el error en consola
                setAlertMessage('Error al cargar exámenes')
                setAlertType('error')
                setShowAlert(true); // Mostrar un mensaje de error en la UI
            }
        } catch (error) {
            console.error('Error de red al obtener los exámenes:', error); // Manejo de errores de red
            setAlertMessage('Error al cargar exámenes')
            setAlertType('error')
            setShowAlert(true); // Mostrar un mensaje de error en la UI
        } finally {
            setTimeout(() => {
                setLoading(false); // Indicar que la carga ha finalizado
            }, 0);; 
        }
    };

    // Hook de efecto que se ejecuta al montar el componente (solo una vez)
    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        obtenerExamenes();
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Funciones para manejar los filtros de búsqueda

    // Maneja el cambio en el input de búsqueda
    const manejarFiltroBusqueda = (e: { target: { value: React.SetStateAction<string>; }; }) => setFiltroBusqueda(e.target.value);

    // Filtra los exámenes según el título y el tema ingresados
    const examenesFiltrados = Array.isArray(examenes)
        ? examenes.filter((examen) => {
            const busqueda = filtroBusqueda.toLowerCase();
            const titulo = examen.titulo.toLowerCase();
            const tema = examen.tema.toLowerCase();

            // Divide la búsqueda en palabras
            const palabras = busqueda.split(" ");

            // Si hay dos palabras, busca cada una en título y tema
            if (palabras.length > 1) {
                return (
                    (titulo.includes(palabras[0]) && tema.includes(palabras[1])) ||
                    (tema.includes(palabras[0]) && titulo.includes(palabras[1]))
                );
            }

            // Si hay una sola palabra, busca en ambos campos
            return titulo.includes(busqueda) || tema.includes(busqueda);
        })
        : [];
    // Función que se ejecuta cuando se presiona el botón para eliminar un examen, muestra el cuadro de diálogo de confirmación
    function handleDeleteClick(id: number) {
        return setShowDialog({ id, visible: true });
    }

    // Función que se ejecuta cuando el usuario confirma la eliminación de un examen
    function handleConfirm(examen): void {
        eliminarExamen(examen); // Elimina el examen seleccionado
        setShowDialog({ id: null, visible: false }); // Oculta el cuadro de diálogo
    }

    // Función que se ejecuta cuando el usuario cancela la eliminación de un examen
    const handleCancel = () => setShowDialog({ id: null, visible: false });

    // Función que elimina un examen del estado (usada por `handleConfirm`)
    const eliminarExamen = (examenAEliminar) =>
        setExamenes((prevExamenes) =>
            prevExamenes.filter((examen) => examen !== examenAEliminar)
        );

    const verHistorial = () => {
        navigate(`/notas`);
    };

    const editarExamen = (examenId) => {
        localStorage.setItem('examenId', examenId);
        navigate(`/editar/examen`);
    };

    // Función para manejar la selección de la imagen y actualizar el estado
    const manejarSeleccionImagen = async (examen: { id: any; titulo?: string; tema?: string; tiempo?: string; fecha?: string; habilitado?: boolean; imagenFondo: any; imagen?: any; }, urlImagen: string) => {
        examen.imagen = urlImagen
        try {
            // Realizar la petición PUT
            const response = await fetch(`${endpoint}/api/examenes/${examen.id}`, {
                method: 'PUT', // Método PUT para actualizar
                headers: {
                    'Content-Type': 'application/json', // Especificar que el cuerpo será JSON
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    examen: examen
                }), // Cuerpo de la solicitud con la URL de la imagen
            });

            if (response.ok) {
                const data = await response.json(); // Parsear la respuesta JSON
                setExamenes(data); // Actualizar los exámenes en el estado
            } else {
                const errorData = await response.json(); // Parsear la respuesta de error
                console.error('Error al actualizar la imagen del examen:', errorData); // Loguear el error en consola
                setAlertMessage('Error al seleccionar imagen')
                setAlertType('error')
                setShowAlert(true) // Mostrar un mensaje de error en la UI
                examen.imagenFondo = urlImagen }
        } catch (error) {
            console.error('Error de red al actualizar la imagen del examen:', error); // Manejo de errores de red
            setAlertMessage('Imagen actualizada con exito')
            setAlertType('info')
            setShowAlert(true) // Mostrar un mensaje de error en la UI
            examen.imagenFondo = urlImagen
        } finally {
            setTimeout(() => {
                setLoading(false); // Indicar que la carga ha finalizado
            }, 0);
        }

        setShowDesplegable(null); // Cerrar el desplegable después de seleccionar una imagen
    };

    const manejarCambioFondo = (examenId: number) => {
        setShowDesplegable((prev) => (prev === examenId ? null : examenId)); // Alternar el estado de visibilidad del desplegable
    };

    // Función que genera y copia el link del examen al portapapeles
    const copiarLinkExamen = (id: number) => {
        const link = `${window.location.hostname}:${window.location.port}/examen/${id}`; // Genera el link del examen
        copiarAlPortapapeles(link); // Llama a la función para copiar el link al portapapeles
    };

    // Función que copia un texto al portapapeles (como la URL de un examen)
    const copiarAlPortapapeles = async (dato: string) => {
        setShowAlert(false);
        try {
            await navigator.clipboard.writeText(dato); // Intenta copiar el texto al portapapeles
            setAlertMessage('Url copiado al portapapeles')
            setAlertType('info')
            setShowAlert(true); // Muestra un mensaje de confirmación
        }
        catch (error) {
            setAlertMessage('No se pudo copiar el url')
            setAlertType('warning')
            setShowAlert(true);
        }
    };

    // Función que cambia el estado de habilitación de un examen (Iniciar o Finalizar)
    const cambiarEstadoExamen = (id: number, habilitado: boolean) => {
        setExamenes((prevExamenes) =>
            prevExamenes.map((examen) =>
                examen.id === id ? { ...examen, habilitado: !habilitado } : examen
            )
        );
    };

    // Función para redirigir al usuario a la página de creación de un nuevo examen
    const nuevoExamen = () => navigate('/nuevoExamen');

    return (
        <Layout>
            <div className="mis-examenes">
                <h1>Mis Exámenes</h1>

                <div className="menu">
                    {/* Filtros de búsqueda por título y tema */}
                    <div className="filtros">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#2e2e2e"
                            className="filtro-inputIcon"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="filtro-input"
                            value={filtroBusqueda}
                            onChange={manejarFiltroBusqueda}
                        />
                        <button className='historial' onClick={() => verHistorial()}>
                            Historial
                        </button>
                    </div>
                    {/* Botón para crear un nuevo examen */}
                    <button className="botonNuevoExamen" onClick={nuevoExamen}>
                        Nuevo Examen
                    </button>
                </div>

                {/* Mostrar un mensaje de error si ocurre algún problema */}
                {showAlert && (
                    <Alert
                        message={alertMessage}
                        alertType={alertType}
                    />
                )}
                {/* Animación de transición para la lista de exámenes */}
                <TransitionGroup className="lista-examenes">
                    {examenesFiltrados.map((examen) => (
                        <div key={examen.id} timeout={300} classNames="examen">
                            <div
                                className={`examen ${examen.habilitado ? 'habilitado' : ''}`}
                                style={{
                                    backgroundImage: `url(${examen.imagenFondo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* Diálogo de confirmación para eliminar un examen */}
                                {showDialog.visible && showDialog.id === examen.id && (
                                    <Warning
                                        title="Eliminar Examen"
                                        message="Esta acción no se puede deshacer"
                                        confirmar="Eliminar"
                                        cancelar="Cancelar"
                                        onConfirm={() => handleConfirm(examen)}
                                        onCancel={handleCancel}
                                    />
                                )}

                                <div className="examen-grupo-info">
                                    <div className="examen-info">
                                        <h3>{examen.titulo}</h3>
                                        <h6>{examen.tema}</h6>
                                    </div>
                                    <div className='examen-grupo-info-botones'> 
                                        <button className="boton-eliminar" onClick={() => handleDeleteClick(examen.id)}>
                                            ❌
                                        </button>
                                        {/* Desplegable para elegir la imagen */}
                                        <button className='boton-cambiar-fondo' onClick={() => manejarCambioFondo(examen.id)}>
                                            <img src={wallpaperIcon} alt="Cambiar Fondo" className="icono-wallpaper" />
                                        </button>
                                        {showDesplegable === examen.id && (
                                            <DesplegableConImagenes
                                                onSelect={(urlImagen: string) => manejarSeleccionImagen(examen, urlImagen)}
                                            />
                                            )}
                                    </div>
                                </div>

                                {/* Botones para editar, copiar link y cambiar el estado del examen */}
                                <div className="examen-grupo-boton">
                                    <button onClick={() => editarExamen(examen.id)}>Editar</button>
                                    
                                    <button onClick={() => copiarLinkExamen(examen.id)}>Copiar Link</button>
                                    <button
                                        className={`examen-boton ${examen.habilitado ? 'finalizar' : 'iniciar'}`}
                                        onClick={() => cambiarEstadoExamen(examen.id, examen.habilitado)}
                                    >
                                        {examen.habilitado ? 'Finalizar' : 'Iniciar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </TransitionGroup>
            </div>
        </Layout>
    );
}

export default PanelExamenes;
