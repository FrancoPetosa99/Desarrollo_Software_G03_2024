import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Alert from '../components/Alerts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Historia.css'

function Historial() {
    /*const [examenes, setExamenes] = useState(EXAMENES_INICIALES);*/
    const [examenSeleccionado, setExamenSeleccionado] = useState(null);
    /*const [resoluciones, setResoluciones] = useState([]);*/
    const [resolucionesFiltradas, setResolucionesFiltradas] = useState([]);
    const { examenId } = useParams();
    const [filtro, setFiltro] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'nombre', direction: 'asc' });

    const resoluciones = [
        { examenId: 1, nombre: "Juan", apellido: "Pérez", nota: 9.5, tiempo: "45 min", fecha: "2024-10-01" },
        { examenId: 1, nombre: "Ana", apellido: "López", nota: 8.0, tiempo: "30 min", fecha: "2024-10-02" },
        { examenId: 1, nombre: "Luis", apellido: "García", nota: 7.8, tiempo: "55 min", fecha: "2024-10-03" },
        { examenId: 1, nombre: "Clara", apellido: "Martínez", nota: 9.0, tiempo: "35 min", fecha: "2024-10-04" },
        { examenId: 1, nombre: "Pedro", apellido: "Sánchez", nota: 6.5, tiempo: "40 min", fecha: "2024-10-05" },
        { examenId: 1, nombre: "Laura", apellido: "Ramírez", nota: 8.7, tiempo: "50 min", fecha: "2024-10-06" },
        { examenId: 1, nombre: "Roberto", apellido: "Torres", nota: 7.0, tiempo: "60 min", fecha: "2024-10-07" },
        { examenId: 1, nombre: "Sofía", apellido: "Díaz", nota: 9.2, tiempo: "45 min", fecha: "2024-10-08" },
        { examenId: 1, nombre: "Marcos", apellido: "Fernández", nota: 8.5, tiempo: "55 min", fecha: "2024-10-09" },
        { examenId: 1, nombre: "Daniel", apellido: "Jiménez", nota: 7.9, tiempo: "40 min", fecha: "2024-10-10" },
        { examenId: 1, nombre: "Natalia", apellido: "Ruiz", nota: 9.3, tiempo: "35 min", fecha: "2024-10-11" },
        { examenId: 1, nombre: "Andrés", apellido: "Gómez", nota: 7.6, tiempo: "45 min", fecha: "2024-10-12" },
        { examenId: 1, nombre: "Patricia", apellido: "Herrera", nota: 8.4, tiempo: "50 min", fecha: "2024-10-13" },
        { examenId: 1, nombre: "Esteban", apellido: "Molina", nota: 6.8, tiempo: "55 min", fecha: "2024-10-14" },
        { examenId: 1, nombre: "Carla", apellido: "Moreno", nota: 9.0, tiempo: "40 min", fecha: "2024-10-15" },
        { examenId: 1, nombre: "Adrián", apellido: "Cruz", nota: 7.3, tiempo: "45 min", fecha: "2024-10-16" },
        { examenId: 1, nombre: "Elena", apellido: "Silva", nota: 8.6, tiempo: "30 min", fecha: "2024-10-17" },
        { examenId: 1, nombre: "Fernando", apellido: "Castro", nota: 9.4, tiempo: "35 min", fecha: "2024-10-18" },
        { examenId: 1, nombre: "Paula", apellido: "Rojas", nota: 7.7, tiempo: "60 min", fecha: "2024-10-19" },
        { examenId: 1, nombre: "Gonzalo", apellido: "Vargas", nota: 8.2, tiempo: "55 min", fecha: "2024-10-20" },
        { examenId: 1, nombre: "Inés", apellido: "Ortiz", nota: 6.9, tiempo: "45 min", fecha: "2024-10-21" },
        { examenId: 1, nombre: "Manuel", apellido: "Luna", nota: 8.1, tiempo: "50 min", fecha: "2024-10-22" },
        { examenId: 1, nombre: "Gabriela", apellido: "Soto", nota: 7.5, tiempo: "60 min", fecha: "2024-10-23" },
        { examenId: 1, nombre: "Jorge", apellido: "Peña", nota: 8.9, tiempo: "55 min", fecha: "2024-10-24" },
        { examenId: 1, nombre: "María", apellido: "Romero", nota: 9.1, tiempo: "35 min", fecha: "2024-10-25" },
        { examenId: 1, nombre: "Lucas", apellido: "Delgado", nota: 6.7, tiempo: "45 min", fecha: "2024-10-26" },
        { examenId: 1, nombre: "Carmen", apellido: "Flores", nota: 8.3, tiempo: "50 min", fecha: "2024-10-27" },
        { examenId: 1, nombre: "Diego", apellido: "Medina", nota: 7.2, tiempo: "60 min", fecha: "2024-10-28" },
        { examenId: 1, nombre: "Alicia", apellido: "Santana", nota: 8.8, tiempo: "40 min", fecha: "2024-10-29" },
        { examenId: 1, nombre: "Ultimo", apellido: "Ultimo", nota: 9.0, tiempo: "35 min", fecha: "2024-10-30" },

        { examenId: 2, nombre: "Carlos", apellido: "Gómez", nota: 7.5, tiempo: "60 min", fecha: "2024-10-01" },
        { examenId: 2, nombre: "María", apellido: "Martínez", nota: 9.0, tiempo: "50 min", fecha: "2024-10-03" },
        { examenId: 2, nombre: "María", apellido: "Martínez", nota: 3.0, tiempo: "50 min", fecha: "2024-10-03" },

        { examenId: 3, nombre: "Luis", apellido: "Fernández", nota: 1.5, tiempo: "40 min", fecha: "2024-10-02" },
        
    ];
    const EXAMENES_INICIALES = [
        { id: 1, titulo: 'Examen de Matemática', tema: 'Álgebra', imagenFondo: null },
        { id: 2, titulo: 'Examen de Matemática', tema: 'Álgebra', imagenFondo: null },
        { id: 3, titulo: 'Examen de Matemática', tema: 'Álgebra', imagenFondo: null },
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

    const elementosFiltrados = resolucionesFiltradas
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

    const seleccionarExamen = (examenId) => {
        setExamenSeleccionado(examenId); 
        const resolucionesExamen = resoluciones.filter(resolucion => resolucion.examenId === examenId); 
        setResolucionesFiltradas(resolucionesExamen)
        calcularIndicadores(resolucionesFiltradas); 
    };

    
    useEffect(() => {
        // Desactiva el scroll
        document.body.style.overflow = 'hidden';

        // Vuelve a activar el scroll cuando el componente se desmonta
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    //indicadores scripts

    const calcularIndicadores = (resolucionesExamen) => {
        const totalResueltos = resolucionesExamen.length;
        const aprobados = resolucionesExamen.filter(r => r.nota >= 7).length;
        const porcentajeAprobacion = totalResueltos ? (aprobados / totalResueltos) * 100 : 0;

        const tiempoTotal = resolucionesExamen.reduce((acc, curr) => acc + parseInt(curr.tiempo), 0);
        const tiempoPromedio = totalResueltos ? (tiempoTotal / totalResueltos) : 0;

        const porcentajeAciertoPregunta = totalResueltos
            ? (resolucionesExamen.reduce((acc, curr) => acc + curr.nota, 0) / totalResueltos) * 10
            : 0;

        return { porcentajeAprobacion, tiempoPromedio, porcentajeAciertoPregunta };
    };

    const { porcentajeAprobacion, tiempoPromedio, porcentajeAciertoPregunta } = calcularIndicadores(resolucionesFiltradas);
    const [animacionAprobacion, setAnimacionAprobacion] = useState(0);
    const [animacionTiempo, setAnimacionTiempo] = useState(0);
    const [animacionAcierto, setAnimacionAcierto] = useState(0);

    useEffect(() => {
        // Animación para el porcentaje de aprobación
        const animarAprobacion = setInterval(() => {
            setAnimacionAprobacion((prev) => {
                if (prev < porcentajeAprobacion) {
                    return prev + 1;
                } else {
                    clearInterval(animarAprobacion);
                    return porcentajeAprobacion;
                }
            });
        }, 10); // Incrementa cada 10 ms para una animación suave

        // Animación para el tiempo promedio
        const tiempoObjetivo = (tiempoPromedio / 60) * 100;
        const animarTiempo = setInterval(() => {
            setAnimacionTiempo((prev) => {
                if (prev < tiempoObjetivo) {
                    return prev + 1;
                } else {
                    clearInterval(animarTiempo);
                    return tiempoObjetivo;
                }
            });
        }, 10);

        // Animación para el porcentaje de acierto
        const animarAcierto = setInterval(() => {
            setAnimacionAcierto((prev) => {
                if (prev < porcentajeAciertoPregunta) {
                    return prev + 1;
                } else {
                    clearInterval(animarAcierto);
                    return porcentajeAciertoPregunta;
                }
            });
        }, 10);

        // Limpiar los intervalos al desmontar
        return () => {
            clearInterval(animarAprobacion);
            clearInterval(animarTiempo);
            clearInterval(animarAcierto);
        };
    }, [porcentajeAprobacion, tiempoPromedio, porcentajeAciertoPregunta]);

    
    const getColorByPercentageUp = (percentage) => {
        if (percentage >= 80) return "#4CCEC4"; // Verde para alto
        if (percentage >= 50) return "#FED16A"; // Amarillo para medio
        return "#FE6A6B"; // Rojo para bajo
    };

    const getColorByPercentageDown = (percentage) => {
        if (percentage >= 90) return "#FE6A6B"; // Rojo para alto
        if (percentage >= 50) return "#FED16A"; // Amarillo para medio
        return "#4CCEC4"; // Verde para bajo
    };

    //// Función que obtiene los exámenes desde un API usando el ID del profesor almacenado en localStorage
    //const obtenerExamenes = async ({ profesorId }: { profesorId: string; }) => {
    //    // Indica que la carga ha comenzado

    //    try {
    //        const response = await fetch(`${endpoint}/api/examenes/profesores/${profesorId}`);

    //        if (response.ok) {
    //            const data = await response.json(); // Parsear la respuesta JSON
    //            setExamenes(data); // Actualizar los exámenes en el estado
    //        } else {
    //            const errorData = await response.json(); // Parsear la respuesta de error
    //            console.error('Error al obtener los exámenes:', errorData); // Loguear el error en consola
    //            setShowAlert(true); // Mostrar un mensaje de error en la UI
    //        }
    //    } catch (error) {
    //        console.error('Error de red al obtener los exámenes:', error); // Manejo de errores de red
    //        setShowAlert(true); // Mostrar un mensaje de error en la UI
    //    } finally {
    //        setTimeout(() => {
    //            setLoading(false); // Indicar que la carga ha finalizado
    //        }, 0);;
    //    }
    //};

    
    


    return (
        <Layout>
            <div className="historia">
                <div className="sidebar">
                    <div className="sidebar-title">
                        <h2>Exámenes</h2>
                    </div>
                    <div className="lista-examenes-historia">
                        {EXAMENES_INICIALES.map((examen) => (
                            <div key={examen.id} className={`examen-historia-container ${examenSeleccionado === examen.id ? 'seleccionado' : ''}`}
                                style={{
                                    backgroundImage: `url(${examen.imagenFondo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                onClick={() => seleccionarExamen(examen.id)}
                            >
                                <div className="historia-examen-grupo-info">
                                    <div className="historia-examen-info">
                                        <h3>{examen.titulo}</h3>
                                        <h6>{examen.tema}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="historia-container">
                    <h1 className='historia-titulo'>Historial examen</h1>
                    {examenSeleccionado && (
                        <div className="indicadores">
                            <div className="indicador">
                                <h6>Porcentaje de Aprobación</h6>
                                <CircularProgressbar
                                    value={animacionAprobacion}
                                    text={`${porcentajeAprobacion.toFixed(1)}%`}
                                    styles={buildStyles({
                                        textColor: getColorByPercentageUp(animacionAprobacion),
                                        pathColor: getColorByPercentageUp(animacionAprobacion),
                                        trailColor: "#d6d6d6"
                                    })}
                                />
                            </div>

                            <div className="indicador">
                                <h6>Tiempo Promedio de Resolución</h6>
                                <CircularProgressbar
                                    value={animacionTiempo} // Normalización para %
                                    text={`${tiempoPromedio.toFixed(1)} min`}
                                    styles={buildStyles({
                                        textColor: getColorByPercentageDown(animacionAprobacion),
                                        pathColor: getColorByPercentageDown(animacionAprobacion),
                                        trailColor: "#d6d6d6"
                                    })}
                                />
                            </div>

                            <div className="indicador">
                                <h6>Porcentaje de Acierto por Pregunta</h6>
                                <CircularProgressbar
                                    value={animacionAcierto}
                                    text={`${porcentajeAciertoPregunta.toFixed(1)}%`}
                                    styles={buildStyles({
                                        textColor: getColorByPercentageUp(animacionAprobacion),
                                        pathColor: getColorByPercentageUp(animacionAprobacion),
                                        trailColor: "#d6d6d6"
                                    })}
                                />
                            </div>
                        </div>
                    )}
                    <div className="historia-filtros">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#2e2e2e"
                            className="historia-inputIcon"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="historia-inputField"
                            value={filtro}
                            onChange={manejarFiltro}
                        />
                    </div>
                    {examenSeleccionado ? (
                        <>
                            <div className='historia-lista-container'>
                                <table className='historia-lista'>
                                    <thead className='historia-lista-titulo'>
                                        <tr>
                                            <th onClick={() => ordenarPor('nombre')}>Nombre {getIconoOrden('nombre')}</th>
                                            <th onClick={() => ordenarPor('apellido')}>Apellido {getIconoOrden('apellido')}</th>
                                            <th onClick={() => ordenarPor('nota')}>Nota {getIconoOrden('nota')}</th>
                                            <th onClick={() => ordenarPor('tiempo')}>Tiempo {getIconoOrden('tiempo')}</th>
                                            <th onClick={() => ordenarPor('fecha')}>Fecha {getIconoOrden('fecha')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className='historia-lista-notas'>
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
                        </>
                    ) : (
                    <h1 className='historia-titulo'>Selecciona un examen para ver el historial</h1>
                    )}
                </div>    
            </div>
        </Layout>
    );
}


export default Historial