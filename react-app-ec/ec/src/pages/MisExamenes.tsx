import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Layout from '../components/Layout';
import DialogBox from '../components/Dialbox';
import './MisExamanes.css';
import fondoGenerico from "../images/fondoGenerico.jpg"
import fondoGears from "../images/fondoGears.png"
import fondoDavid from "../images/david.jpg"
import getBaseUrl from '../utils/getBaseUrl.js';

function PanelExamenes() {
    const baseUrl = getBaseUrl(); 
    const [examenes, setExamenes] = useState([ 
        {
            id: 1,
            titulo: 'Examen de Matemática',
            tema: 'Álgebra',
            tiempo: '30 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: true,
            imagen: fondoGenerico,
        },
        {
            id: 2,
            titulo: 'Examen de Arte',
            tema: 'Renacimiento',
            tiempo: '45 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: true,
            imagen: fondoDavid,
        },
        {
            id: 3,
            titulo: 'Examen de Física',
            tema: 'Mecánica',
            tiempo: '40 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: false,
            imagen: fondoGears,
        },
        {
            id: 4,
            titulo: 'Examen Generico',
            tema: 'Generico',
            tiempo: '20 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: false,
            imagen: fondoGenerico,
        },
        {
            id: 5,
            titulo: 'Examen Generico',
            tema: 'Generico',
            tiempo: '20 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: false,
            imagen: fondoGenerico,
        },
        {
            id: 6,
            titulo: 'Examen Generico',
            tema: 'Generico',
            tiempo: '20 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: false,
            imagen: fondoGenerico,
        },
        {
            id: 7,
            titulo: 'Examen Generico',
            tema: 'Generico',
            tiempo: '20 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: false,
            imagen: fondoGenerico,
        },
    
]);
    const [loading, setLoading] = useState(true);
    const endpoint = baseUrl;
    useEffect(() => {
        const obtenerExamenes = async () => {
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error('Error al obtener los exámenes');
                }
                const data = await response.json();
                setExamenes(data);
                setLoading(false); // Deja de cargar cuando se obtienen los datos
            } catch (error) {
                console.error('Error al obtener los exámenes:', error);
                setLoading(false);
            }
        };

        obtenerExamenes(); // Llamada a la función dentro del useEffect
    }, []); // [] para ejecutar solo una vez al montar el componente


    const navigate = useNavigate();

    // Estado para los filtros
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroTema, setFiltroTema] = useState('');

    // Maneja los cambios en los filtros
    const manejarFiltroTitulo = (e: { target: { value: React.SetStateAction<string>; }; }) => setFiltroTitulo(e.target.value);
    const manejarFiltroTema = (e: { target: { value: React.SetStateAction<string>; }; }) => setFiltroTema(e.target.value);

    // Filtrar exámenes por título y tema
    const examenesFiltrados = examenes.filter(examen =>
        examen.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
        examen.tema.toLowerCase().includes(filtroTema.toLowerCase())
    );

        const [showDialog, setShowDialog] = useState(false);

        const handleDeleteClick = () => {
            setShowDialog(true); // Mostrar el cuadro de diálogo
        };

        const handleConfirm = (result) => {
            if (result) {
                console.log("Usuario confirmó la acción");
            }
            setShowDialog(false) // Ocultar el cuadro de diálogo
        };

        const handleCancel = () => {
            console.log("Acción cancelada");
            setShowDialog(false); // Ocultar el cuadro de diálogo
        };


    // Funciones para manejar botones de los exámenes
    const editarExamen = (id: number) => {
    };

    const copiarLinkExamen = (id: number) => {
    };

    const cambiarEstadoExamen = (id: number, habilitado: boolean) => {
        const nuevosExamenes = examenes.map(examen =>
            examen.id === id ? { ...examen, habilitado: !habilitado } : examen
        );
        setExamenes(nuevosExamenes);
    };

    const nuevoExamen = () => {
        navigate('/nuevo-examen');
    };

    if (loading) {
        return <div>Cargando exámenes...</div>; // Muestra un mensaje de carga
    }
    return (
        <Layout>
            <div className="mis-examenes">
                <h1>Mis Exámenes</h1>

                <div className="menu">
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
                    <button
                        className="botonNuevoExamen"
                        onClick={nuevoExamen}>
                        Nuevo Examen
                    </button>
                </div>
 
                <TransitionGroup className="lista-examenes">
                    {showDialog && (
                        <DialogBox
                            title="Eliminar Examen"
                            message="Esta accion no se puede deshacer"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )}
                    {examenesFiltrados.map((examen, index) => (
                        <CSSTransition
                            key={examen.id}
                            timeout={300}
                            classNames="examen"
                        >
                        <div
                            key={examen.id}
                            className={`examen ${examen.habilitado ? 'habilitado' : ''}`}
                            style={{
                                backgroundImage: `url(${examen.imagen})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="examen-grupo-info">
                                <div className="examen-info">
                                    <h3>{examen.titulo}</h3>
                                    <h6>{examen.tema}</h6>
                                </div>
                                    <button className="boton-eliminar" >❌</button>
                            </div>
                            <div className="examen-grupo-boton">
                                <button onClick={() => editarExamen(examen.id)}>Editar</button>
                                <button onClick={() => copiarLinkExamen(examen.id)}>Copiar Link</button>
                                <button
                                    className={`examen-boton ${examen.habilitado ? 'finalizar' : 'iniciar'}`}
                                    onClick={() => cambiarEstadoExamen(examen.id, examen.habilitado)}>
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
