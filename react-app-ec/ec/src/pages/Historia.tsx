import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Layout from '../components/Layout';
import Alert from '../components/Alerts';
import fondoGenerico from '../images/fondoGenerico.jpg';
import fondoGears from '../images/fondoGears.png';
import fondoDavid from '../images/david.jpg';
import './Historia.css'

function Historial() {
    const { examenId } = useParams();
    const resoluciones = [
        { nombre: "Juan", apellido: "Pérez", nota: 9.5, tiempo: "45 min", fecha: "2024-10-01" },
        { nombre: "Ana", apellido: "López", nota: 8.0, tiempo: "30 min", fecha: "2024-10-02" },
        { nombre: "Carlos", apellido: "Gómez", nota: 7.5, tiempo: "60 min", fecha: "2024-10-01" },
        { nombre: "María", apellido: "Martínez", nota: 9.0, tiempo: "50 min", fecha: "2024-10-03" },
        { nombre: "Luis", apellido: "Fernández", nota: 6.5, tiempo: "40 min", fecha: "2024-10-02" },
        { nombre: "Sofía", apellido: "Rodríguez", nota: 10.0, tiempo: "55 min", fecha: "2024-10-01" },
        { nombre: "Pedro", apellido: "García", nota: 8.5, tiempo: "35 min", fecha: "2024-10-03" },
        { nombre: "Laura", apellido: "Hernández", nota: 7.0, tiempo: "65 min", fecha: "2024-10-04" },
        { nombre: "Javier", apellido: "Jiménez", nota: 6.0, tiempo: "70 min", fecha: "2024-10-04" },
        { nombre: "Claudia", apellido: "Ríos", nota: 9.2, tiempo: "30 min", fecha: "2024-10-05" }
    ];
    const IMAGES = {
        fondoGenerico,
        fondoGears,
        fondoDavid,
    };
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
            id: 3,
            titulo: 'Examen de Matemática',
            tema: 'Álgebra',
            tiempo: '30 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: true,
            imagen: IMAGES.fondoGenerico,
        },
        {
            id: 4,
            titulo: 'Examen de Matemática',
            tema: 'Álgebra',
            tiempo: '30 min',
            fecha: new Date().toISOString().split('T')[0],
            habilitado: true,
            imagen: IMAGES.fondoGenerico,
        },
        // Más exámenes...
    ];

    
    //useEffect(() => {
    //    // Función para obtener las resoluciones desde el servidor
    //    const fetchResoluciones = async () => {
    //        try {
    //            const response = await fetch(`${endpoint}/api/resoluciones?examenId=${examenId}`);
    //            if (!response.ok) {
    //                throw new Error('Error al obtener las resoluciones');
    //            }
    //            const data = await response.json(); // Asume que el servidor retorna un JSON
    //            setResoluciones(data);
    //        } catch (error) {
    //            setError(error.message);
    //        } finally {
    //            setLoading(false);
    //        }
    //    };

    //    fetchResoluciones();
    //}, [examenId, endpoint]);

    const [filtro, setFiltro] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'nombre', direction: 'asc' });

    const manejarFiltro = (e) => {
        setFiltro(e.target.value);
    };

    const ordenarPor = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getIconoOrden = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '↑' : '↓';
        }
        return '↑↓';
    };

    const elementosFiltrados = resoluciones
        .filter((elemento) =>
            `${elemento.nombre.toLowerCase()} ${elemento.apellido.toLowerCase()}`.includes(filtro.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    

    return (
        <Layout>
            <div className="flex h-screen bg-gray-100">
                <div className="sidebar">
                    <div className="sidebar-title">
                        <h2>Exámenes</h2>
                    </div>
                    <TransitionGroup className="lista-examenes">
                        {EXAMENES_INICIALES.map((examen) => (
                            <CSSTransition key={examen.id} timeout={300} classNames="examen">
                                <div
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
                                    </div>
                                </div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>

                <div className="notas-container">
                    <h1 className='titulo'>Historial examen</h1>
                    <div className="notas-container">
                        <div className="filtros">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="#2e2e2e"
                                className="inputIcon"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Buscar"
                                value={filtro}
                                onChange={manejarFiltro}
                            />
                        </div>
                        <table className='lista'>
                            <thead className='lista_titulo'>
                                <tr>
                                    <th onClick={() => ordenarPor('nombre')}>Nombre {getIconoOrden('nombre')}</th>
                                    <th onClick={() => ordenarPor('apellido')}>Apellido {getIconoOrden('apellido')}</th>
                                    <th onClick={() => ordenarPor('nota')}>Nota {getIconoOrden('nota')}</th>
                                    <th onClick={() => ordenarPor('tiempo')}>Tiempo {getIconoOrden('tiempo')}</th>
                                    <th onClick={() => ordenarPor('fecha')}>Fecha {getIconoOrden('fecha')}</th>
                                </tr>
                            </thead>
                            <tbody className='lista_notas'>
                                {elementosFiltrados.map((resolucion, index) => (
                                    <tr key={index}>
                                        <td>{resolucion.nombre}</td>
                                        <td>{resolucion.apellido}</td>
                                        <td className={resolucion.nota >= 7 ? 'nota-alta' : 'nota-baja'}>
                                            {resolucion.nota}
                                        </td>
                                        <td>{resolucion.tiempo}</td>
                                        <td>{resolucion.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


export default Historial