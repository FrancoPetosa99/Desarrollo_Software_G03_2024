import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './MisExamanes.css';
function PanelExamenes() {
    // Estado inicial de los exámenes, con algunos ejemplos
    const [examenes, setExamenes] = useState([
        {
            id: 1,
            titulo: 'Examen de Matemática',
            tema: 'Álgebra',
            tiempo: '30 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: true,
            imagen: 'url(../images/fondoGenerico.png)'
        },
        {
            id: 2,
            titulo: 'Examen de Historia',
            tema: 'Revolución Francesa',
            tiempo: '45 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: false,
            imagen: 'url(../images/fondoGenerico.png)'
        },
        {
            id: 3,
            titulo: 'Examen de Física',
            tema: 'Mecánica',
            tiempo: '40 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: false,
            imagen: 'url(../images/fondoGears.png)'
        },
        {
            id: 4,
            titulo: 'Examen Generico',
            tema: 'Generico',
            tiempo: '20 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: true,
            imagen: '../images/fondoGenerico.png'
        }
    ]);


    const navigate = useNavigate();

    // Estado para los filtros
    const [filtroTitulo, setFiltroTitulo] = useState('');
    const [filtroTema, setFiltroTema] = useState('');

    // Maneja los cambios en los filtros
    const manejarFiltroTitulo = (e) => setFiltroTitulo(e.target.value);
    const manejarFiltroTema = (e) => setFiltroTema(e.target.value);

    // Filtrar exámenes por título y tema
    const examenesFiltrados = examenes.filter(examen =>
        examen.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
        examen.tema.toLowerCase().includes(filtroTema.toLowerCase())
    );

    const advertencia = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este examen?");
        if (confirmar) {
            eliminarExamen(id);
        }
    };

    const eliminarExamen = (id) => {
        setExamenes((prevExamenes) => prevExamenes.filter((examen) => examen.id !== id));
    };

    // Funciones para manejar botones de los exámenes
    const editarExamen = (id) => {
    };

    const copiarLinkExamen = (id) => {
        console.log('Copiando link del examen con ID:', id);
    };

    const cambiarEstadoExamen = (id, habilitado) => {
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
 
                <div className="lista-examenes"
                    style={{
                        backgroundImage: "url(${fondo})",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    {examenesFiltrados.map((examen) => (
                        <div
                            key={examen.id}
                            className={`examen ${examen.habilitado ? 'habilitado' : ''}`}
                            style={{
                                backgroundImage: "url(${fondo})",
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
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default PanelExamenes;
