import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Layout from '../components/Layout';
import DialogBox from '../components/Dialbox';
import './MisExamenes.css';
import fondoGenerico from '../images/fondoGenerico.jpg';
import fondoGears from '../images/fondoGears.png';
import fondoDavid from '../images/david.jpg';
import getBaseUrl from '../utils/getBaseUrl.js';

// Constante que contiene las imágenes de fondo utilizadas
const IMAGES = {
    fondoGenerico,
    fondoGears,
    fondoDavid,
};

// Exámenes iniciales de ejemplo para mostrar en el componente
const EXAMENES_INICIALES = [
    {
        id: 1,
        titulo: 'Examen de Matemática',
        tema: 'Álgebra',
        tiempo: '30 min',
        fecha: new Date().toISOString().split('T')[0],
        habilitado: true,
        imagen: IMAGES.fondoGenerico,
    },
    {
        id: 2,
        titulo: 'Examen de Arte',
        tema: 'Renacimiento',
        tiempo: '45 min',
        fecha: new Date().toISOString().split('T')[0],
        habilitado: true,
        imagen: IMAGES.fondoDavid,
    },
    // Más exámenes...
];

function PanelExamenes() {
    const [examenes, setExamenes] = useState(EXAMENES_INICIALES); // Estado para almacenar los exámenes
    const [loading, setLoading] = useState(true); // Estado para controlar si los datos están cargando
    const [error, setError] = useState(''); // Estado para manejar errores
    const [filtroTitulo, setFiltroTitulo] = useState(''); // Filtro de búsqueda por título
    const [filtroTema, setFiltroTema] = useState(''); // Filtro de búsqueda por tema
    const [showDialog, setShowDialog] = useState({ id: null, visible: false }); // Estado para mostrar u ocultar el diálogo de confirmación
    const navigate = useNavigate(); // Hook para redirigir a otras páginas
    const endpoint = getBaseUrl(); // Obtener la URL base del servidor

    // Función que obtiene los exámenes desde un API usando el ID del profesor almacenado en localStorage
    const obtenerExamenes = async ({ profesorId }: { profesorId: string; }) => {
        try {
            const response = await fetch(`${endpoint}/api/examenes/profesores/${profesorId}`);
            if (!response.ok) throw new Error('Error al obtener los exámenes'); // Manejo de errores en la respuesta

            const data = await response.json(); // Parsear la respuesta JSON
            setExamenes(data); // Actualizar los exámenes en el estado
            setLoading(false); // Indicar que la carga ha finalizado
        } catch (error) {
            console.error('Error al obtener los exámenes:', error); // Loguear el error en consola
            setError('Hubo un problema al cargar los exámenes.'); // Mostrar un mensaje de error en la UI
            setLoading(false);
        }
    };

    // Hook de efecto que se ejecuta al montar el componente (solo una vez)
    useEffect(() => {
        const profesorId = localStorage.getItem('profesorId') || '99649b61-1839-4541-bf6d-659aafb57595'; // Obtener el ID del profesor de localStorage
        localStorage.setItem('profesorId', profesorId); // Si no existe, almacenar un valor por defecto
        obtenerExamenes({ profesorId }); // Llamar a la función para obtener los exámenes
    }, []);

    // Funciones para manejar los filtros de búsqueda

    // Actualiza el filtro de búsqueda por título
    const manejarFiltroTitulo = (e) => setFiltroTitulo(e.target.value);

    // Actualiza el filtro de búsqueda por tema
    const manejarFiltroTema = (e) => setFiltroTema(e.target.value);

    // Filtra los exámenes según el título y el tema ingresados
    const examenesFiltrados = examenes.filter(
        (examen) =>
            examen.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
            examen.tema.toLowerCase().includes(filtroTema.toLowerCase())
    );

    // Función que se ejecuta cuando se presiona el botón para eliminar un examen, muestra el cuadro de diálogo de confirmación
    const handleDeleteClick = (id) => setShowDialog({ id, visible: true });

    // Función que se ejecuta cuando el usuario confirma la eliminación de un examen
    const handleConfirm = (id) => {
        eliminarExamen(id); // Elimina el examen seleccionado
        setShowDialog({ id: null, visible: false }); // Oculta el cuadro de diálogo
    };

    // Función que se ejecuta cuando el usuario cancela la eliminación de un examen
    const handleCancel = () => setShowDialog({ id: null, visible: false });

    // Función que elimina un examen del estado (usada por `handleConfirm`)
    const eliminarExamen = (id) => setExamenes((prevExamenes) => prevExamenes.filter((examen) => examen.id !== id));

    // Función que copia un texto al portapapeles (como la URL de un examen)
    const copiarAlPortapapeles = async (dato) => {
        try {
            await navigator.clipboard.writeText(dato); // Intenta copiar el texto al portapapeles
            alert('Dato copiado al portapapeles.'); // Muestra un mensaje de confirmación
        } catch (error) {
            alert('No se pudo copiar el dato al portapapeles.'); // Muestra un mensaje de error si falla
        }
    };

    // Función que genera y copia el link del examen al portapapeles
    const copiarLinkExamen = (id) => {
        const link = `${window.location.hostname}:${window.location.port}/examen/${id}`; // Genera el link del examen
        copiarAlPortapapeles(link); // Llama a la función para copiar el link al portapapeles
    };

    // Función que cambia el estado de habilitación de un examen (Iniciar o Finalizar)
    const cambiarEstadoExamen = (id, habilitado) => {
        setExamenes((prevExamenes) =>
            prevExamenes.map((examen) =>
                examen.id === id ? { ...examen, habilitado: !habilitado } : examen
            )
        );
    };

    // Función para redirigir al usuario a la página de creación de un nuevo examen
    const nuevoExamen = () => navigate('/nuevo-examen');

    return (
        <Layout>
            <div className="mis-examenes">
                <h1>Mis Exámenes</h1>

                <div className="menu">
                    {/* Filtros de búsqueda por título y tema */}
                    <div className="filtros">
                        <input
                            type="text"
                            placeholder="Buscar por título"
                            value={filtroTitulo}
                            onChange={manejarFiltroTitulo}
                        />
                        <input
                            type="text"
                            placeholder="Buscar por tema"
                            value={filtroTema}
                            onChange={manejarFiltroTema}
                        />
                    </div>
                    {/* Botón para crear un nuevo examen */}
                    <button className="botonNuevoExamen" onClick={nuevoExamen}>
                        Nuevo Examen
                    </button>
                </div>

                {/* Mostrar un mensaje de error si ocurre algún problema */}
                {error && <p>{error}</p>}

                {/* Animación de transición para la lista de exámenes */}
                <TransitionGroup className="lista-examenes">
                    {examenesFiltrados.map((examen) => (
                        <CSSTransition key={examen.id} timeout={300} classNames="examen">
                            <div
                                className={`examen ${examen.habilitado ? 'habilitado' : ''}`}
                                style={{
                                    backgroundImage: `url(${examen.imagen})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                {/* Diálogo de confirmación para eliminar un examen */}
                                {showDialog.visible && showDialog.id === examen.id && (
                                    <DialogBox
                                        title="Eliminar Examen"
                                        message="Esta acción no se puede deshacer"
                                        confirmar="Eliminar"
                                        cancelar="Cancelar"
                                        onConfirm={() => handleConfirm(examen.id)}
                                        onCancel={handleCancel}
                                    />
                                )}

                                <div className="examen-grupo-info">
                                    <div className="examen-info">
                                        <h3>{examen.titulo}</h3>
                                        <h6>{examen.tema}</h6>
                                    </div>
                                    <button className="boton-eliminar" onClick={() => handleDeleteClick(examen.id)}>
                                        ❌
                                    </button>
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
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        </Layout>
    );
}

export default PanelExamenes;
