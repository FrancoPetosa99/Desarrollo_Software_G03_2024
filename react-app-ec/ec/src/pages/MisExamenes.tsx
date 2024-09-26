import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Layout from '../components/Layout';
import './MisExamanes.css';
import fondoGenerico from "../images/fondoGenerico.jpg"
import fondoGears from "../images/fondoGears.png"
import fondoDavid from "../images/david.jpg"

function PanelExamenes() {
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
        {
            id: 8,
            titulo: 'Examen Generico',
            tema: 'Generico',
            tiempo: '20 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: false,
            imagen: fondoGenerico,
        }
    ]);

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

    const advertencia = (id: number) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este examen?");
        if (confirmar) {
            eliminarExamen(id);
        }
    };

    const eliminarExamen = (id: number) => {
        setExamenes((prevExamenes) => prevExamenes.filter((examen) => examen.id !== id));
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
                    {examenesFiltrados.map((examen) => (
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
                                <button className="boton-eliminar" onClick={() => advertencia(examen.id)}>❌</button>
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
