import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Alert from '../components/Alerts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import 'react-circular-progressbar/dist/styles.css';
import './Historia.css'
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Historial() {
    /*const [examenes, setExamenes] = useState(EXAMENES_INICIALES);*/
    const [examenSeleccionado, setExamenSeleccionado] = useState(null);
    /*const [resoluciones, setResoluciones] = useState([]);*/
    const [resolucionesFiltradas, setResolucionesFiltradas] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'nombre', direction: 'asc' });

    const resoluciones = [
        {
            examenId: 1, nombre: "Juan", apellido: "Pérez", nota: 9.5, tiempo: "45 min", fecha: "2024-10-01", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: false },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: true },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-1', correcta: true }
            ]
        },
        {
            examenId: 1, nombre: "Ana", apellido: "López", nota: 8.0, tiempo: "30 min", fecha: "2024-10-02", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: '2', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: '2', correcta: false },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: '2', correcta: true },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: '2', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-2', correcta: true }
            ]
        },
        {
            examenId: 1, nombre: "Luis", apellido: "García", nota: 7.8, tiempo: "55 min", fecha: "2024-10-03", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: true },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: false },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-3', correcta: false }
            ]
        },
        {
            examenId: 1, nombre: "Clara", apellido: "Martínez", nota: 9.0, tiempo: "35 min", fecha: "2024-10-04", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: false },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: true },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-256', correcta: true }
            ]
        },
        {
            examenId: 1, nombre: "Pedro", apellido: "Sánchez", nota: 6.5, tiempo: "40 min", fecha: "2024-10-05", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: true },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: false },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-256', correcta: false }
            ]
        },
        {
            examenId: 1, nombre: "Laura", apellido: "Ramírez", nota: 8.7, tiempo: "50 min", fecha: "2024-10-06", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: false },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: true },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-256', correcta: true }
            ]
        },
        {
            examenId: 1, nombre: "Roberto", apellido: "Torres", nota: 7.0, tiempo: "60 min", fecha: "2024-10-07", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: true },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: false },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-256', correcta: false }
            ]
        },
        {
            examenId: 1, nombre: "Sofía", apellido: "Díaz", nota: 9.2, tiempo: "45 min", fecha: "2024-10-08", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: true },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: false },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-256', correcta: false }
            ]
        },
        {
            examenId: 1, nombre: "Daniel", apellido: "Jiménez", nota: 7.9, tiempo: "40 min", fecha: "2024-10-10", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: true },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: false },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: true },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-256', correcta: true }
            ]
        },
        {
            examenId: 1, nombre: "Franco", apellido: "Cores", nota: 4, tiempo: "40 min", fecha: "2024-10-10", respuestas: [
                { pregunta: 'Lenguaje de una base de datos', respuesta: 'SQL', correcta: false },
                { pregunta: 'Principal lenguaje de frontend', respuesta: 'JavaScript', correcta: false },
                { pregunta: 'Protocolo seguro para transferir datos en la web', respuesta: 'HTTPS', correcta: false },
                { pregunta: 'Comando para listar archivos en Linux', respuesta: 'ls', correcta: true },
                { pregunta: 'Función de hashing comúnmente usada en ciberseguridad', respuesta: 'SHA-256', correcta: true }
            ]
        },
        

        {
            examenId: 2, nombre: "Carlos", apellido: "Gómez", nota: 6, tiempo: "60 min", fecha: "2024-10-01", respuestas: [
                { pregunta: 1, correcta: true },
                { pregunta: 2, correcta: false },
                { pregunta: 3, correcta: true },
            ] },
        {
            examenId: 2, nombre: "María", apellido: "Martínez", nota: 3.0, tiempo: "50 min", fecha: "2024-10-03", respuestas: [
                { pregunta: 1, correcta: true },
                { pregunta: 2, correcta: false },
                { pregunta: 3, correcta: false },
            ] },
        {
            examenId: 2, nombre: "María", apellido: "Martínez", nota: 10, tiempo: "50 min", fecha: "2024-10-03", respuestas: [
                { pregunta: 1, correcta: true },
                { pregunta: 2, correcta: true },
                { pregunta: 3, correcta: true },
            ] },

        {
            examenId: 3, nombre: "Luis", apellido: "Fernández", nota: 0, tiempo: "250 min", fecha: "2024-10-02", respuestas: [
                { pregunta: 1, correcta: false },
                { pregunta: 2, correcta: false },
                { pregunta: 3, correcta: false },
            ]
        },
        
    ];
    const EXAMENES_INICIALES = [
        { id: 1, titulo: 'Examen de Matemática', tema: 'Álgebra', imagenFondo: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGenerico.jpg', tiempo:60 },
        { id: 2, titulo: 'Examen de Quimica', tema: 'Moleculas', imagenFondo: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGears.png', tiempo: 70 },
        { id: 3, titulo: 'Examen de Fisica', tema: 'Fuerza', imagenFondo: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGenerico.jpg', tiempo: 250 },
 
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

    
    const manejarFiltro = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setFiltro(e.target.value);
    };

    const ordenarPor = (key: string) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getIconoOrden = (key: string) => {
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

    const seleccionarExamen = (examenId: number | React.SetStateAction<null>) => {
        setExamenSeleccionado(examenId); 
        const resolucionesExamen = resoluciones.filter(resolucion => resolucion.examenId === examenId); 
        setResolucionesFiltradas(resolucionesExamen)
        calcularIndicadores(resolucionesFiltradas); 
    };
    
    useEffect(() => {
        // Desactiva el scroll
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
        // Vuelve a activar el scroll cuando el componente se desmonta
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    //indicadores scripts

    const calcularIndicadores = (resolucionesExamen: { respuestas?: { correcta: boolean }[]; nota: number; tiempo: string; }[]) => {
        const totalResueltos = resolucionesExamen.length;
        const aprobados = resolucionesExamen.filter((r) => r.nota >= 7).length;
        const porcentajeAprobacion = totalResueltos ? (aprobados / totalResueltos) * 100 : 0;

        const tiempoTotal = resolucionesExamen.reduce((acc, curr) => acc + parseInt(curr.tiempo), 0);
        const tiempoPromedio = totalResueltos ? (tiempoTotal / totalResueltos) : 0;

        const calcularPorcentajesPorPregunta = (resoluciones) => {
            if (resoluciones.length === 0 || !resoluciones[0].respuestas) return [];

            const totalPreguntas = resoluciones[0].respuestas.length;
            const porcentajesPorPregunta = Array(totalPreguntas).fill(0);

            // Recorremos cada pregunta para calcular su porcentaje de acierto
            for (let i = 0; i < totalPreguntas; i++) {
                const aciertos = resoluciones.reduce((acc, curr) => {
                    if (curr.respuestas && curr.respuestas[i] && curr.respuestas[i].correcta) {
                        return acc + 1;
                    }
                    return acc;
                }, 0);
                porcentajesPorPregunta[i] = (aciertos / totalResueltos) * 100; // Cambiar resoluciones.length por totalResueltos
            }

            return porcentajesPorPregunta;
        };

        const porcentajeAciertoPregunta = calcularPorcentajesPorPregunta(resolucionesExamen); // Llama a la función para obtener porcentajes

        return { porcentajeAprobacion, tiempoPromedio, porcentajeAciertoPregunta }; // Incluye porcentajeAciertoPregunta en el retorno
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
        }, 1); // Incrementa cada 10 ms para una animación suave

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
        }, 1);

        // Animación para el porcentaje de acierto
        const animarAcierto = setInterval(() => {
            setAnimacionAcierto((prev) => {
                const target = parseFloat(porcentajeAciertoPregunta); // Asegúrate de que esto sea un número
                if (prev < target) {
                    // Incremento más controlado
                    const increment = (target - prev) / 100; // Divide para que sea más suave
                    return Math.min(prev + increment, target); // Asegúrate de no sobrepasar el objetivo
                } else {
                    clearInterval(animarAcierto);
                    return target; // Establece el valor final al objetivo
                }
            });
        }, 1);

        // Limpiar los intervalos al desmontar
        return () => {
            clearInterval(animarAprobacion);
            clearInterval(animarTiempo);
            clearInterval(animarAcierto);
        };
    }, [porcentajeAprobacion, tiempoPromedio, porcentajeAciertoPregunta]);

    
    const getColorByPercentageUp = (percentage: number) => {
        if (percentage >= 80) return "#4CCEC4"; // Verde para alto
        if (percentage >= 50) return "#FED16A"; // Amarillo para medio
        return "#FE6A6B"; // Rojo para bajo
    };

    const getColorByPercentageDown = (percentage: number) => {
        if (percentage >= 90) return "#FE6A6B"; // Rojo para alto
        if (percentage >= 50) return "#FED16A"; // Amarillo para medio
        return "#4CCEC4"; // Verde para bajo
    };

    const data = {
        labels: porcentajeAciertoPregunta.map((_, index) => `Pregunta ${index + 1}`), // Cambia `porcentajeAciertoPorPregunta` a `porcentajeAciertoPregunta`
        datasets: [
            {
                label: 'Porcentaje de Acierto',
                data: porcentajeAciertoPregunta, // Asegúrate de que esta variable esté definida
                backgroundColor: porcentajeAciertoPregunta.map(porcentaje => getColorByPercentageUp(porcentaje)),
            }
        ]
    };

    const options = {
        responsive: true,
        animation: {
            duration: 50,
            easing: 'easeIn',
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: (value: any) => `${value}%`
                }
            }
        }
    };

    const [mostrarPreguntas, setMostrarPreguntas] = useState(null);
    const [abrirPreguntas, setAbrirPreguntas] = useState(false);
    const [respuestas, setRespuestas] = useState([]);
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const togglePreguntas = async (resolucionIndex, resolucion) => {
        if (mostrarPreguntas === resolucionIndex) {
            setAbrirPreguntas(false);
            await sleep(400);
            setMostrarPreguntas(null);
            setRespuestas([]);
        } else {
            setAbrirPreguntas(true);
            setMostrarPreguntas(resolucionIndex);
            setRespuestas(resolucion.respuestas);
        }
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
                <div className="sidebar-top">
                    <div className="sidebar-title">
                        <h3>Historial examen</h3>
                    </div>
                </div>
                <div className="sidebar">
                   
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
                    {examenSeleccionado && (
                        <div className="indicadores">

                            <div className="indicador">
                                <h6>Promedio de aprobación</h6>
                                <CircularProgressbar
                                    className='circular-progressbar'
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
                                <h6>Promedio de tiempo</h6>
                                <CircularProgressbar
                                    className='circular-progressbar'
                                    value={animacionTiempo} // Normalización para %
                                    text={`${tiempoPromedio.toFixed(1)} min`}
                                    styles={buildStyles({
                                        textColor: getColorByPercentageDown(animacionTiempo),
                                        pathColor: getColorByPercentageDown(animacionTiempo),
                                        trailColor: "#d6d6d6"
                                    })}
                                />
                            </div>

                            <div className="indicador-bar">
                                <h6>Acierto por Pregunta</h6>
                                <Bar className='bar' data={data} options={options} />
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
                            placeholder="Buscar resolución"
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
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className='historia-lista-notas'>
                                        {elementosFiltrados.map((resolucion, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <td>{resolucion.nombre}</td>
                                                    <td>{resolucion.apellido}</td>
                                                    <td className={resolucion.nota >= 7 ? 'nota-alta' : 'nota-baja'}>
                                                        {resolucion.nota}
                                                    </td>
                                                    <td>{resolucion.tiempo}</td>
                                                    <td>{resolucion.fecha}</td>
                                                    <td
                                                        className={`respuestas-icon ${mostrarPreguntas ? 'icono-activo' : ''}`}
                                                        onClick={() => togglePreguntas(index, resolucion)}
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M2 5.75C2 5.33579 2.33579 5 2.75 5H20.75C21.1642 5 21.5 5.33579 21.5 5.75C21.5 6.16421 21.1642 6.5 20.75 6.5H2.75C2.33579 6.5 2 6.16421 2 5.75ZM2 9.75C2 9.33579 2.33579 9 2.75 9H20.75C21.1642 9 21.5 9.33579 21.5 9.75C21.5 10.1642 21.1642 10.5 20.75 10.5H2.75C2.33579 10.5 2 10.1642 2 9.75ZM2 13.75C2 13.3358 2.33579 13 2.75 13H9.75C10.1642 13 10.5 13.3358 10.5 13.75C10.5 14.1642 10.1642 14.5 9.75 14.5H2.75C2.33579 14.5 2 14.1642 2 13.75ZM2 17.75C2 17.3358 2.33579 17 2.75 17H9.75C10.1642 17 10.5 17.3358 10.5 17.75C10.5 18.1642 10.1642 18.5 9.75 18.5H2.75C2.33579 18.5 2 18.1642 2 17.75Z" fill="#1C274C"></path> <path d="M20.2113 12.6587C20.5379 12.9134 20.5961 13.3847 20.3414 13.7113L16.4414 18.7113C16.3022 18.8898 16.0899 18.9958 15.8636 18.9999C15.6373 19.004 15.4213 18.9057 15.2757 18.7324L13.1757 16.2324C12.9093 15.9153 12.9505 15.4422 13.2676 15.1758C13.5848 14.9093 14.0579 14.9505 14.3243 15.2676L15.8284 17.0583L19.1586 12.7888C19.4134 12.4622 19.8847 12.4039 20.2113 12.6587Z" fill="#1C274C"></path> </g></svg>

                                                    </td>
                                                </tr>
                                                {mostrarPreguntas === index && (
                                                    <div className="desplegable-pop">
                                                        <div className={`desplegable ${abrirPreguntas ? '' : 'slideOut'}`}>
                                                            <div className="resolucion-info">
                                                                <h5>{resolucion.nombre} {resolucion.apellido}</h5>
                                                                <label>Nota:
                                                                    <span className={resolucion.nota >= 7 ? 'nota-alta' : 'nota-baja'}>{resolucion.nota}</span>
                                                                </label>
                                                                {respuestas.map((respuesta, respuestaIndex) => (
                                                                    <div key={respuestaIndex} className="respuesta-item">
                                                                        <p>{respuesta.pregunta}</p>
                                                                        <p className={`respuesta ${respuesta.correcta ? 'correcto' : 'incorrecto'}`}>{respuesta.respuesta}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="cerrar-desplegable" >
                                                                <button className="cerrar-desplegable-boton"
                                                                    onClick={() => togglePreguntas(index, resolucion)}>
                                                                <svg
                                                                    fill="#19575F"
                                                                    version="1.1"
                                                                    viewBox="0 0 20 26"
                                                                    stroke="#19575F"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g strokeWidth="0"></g>
                                                                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                                                                    <g>
                                                                        <style type="text/css"> {`.st0 { fill: none; }`} </style>
                                                                        <path d="M15,6l-7,6l7,6V6z"></path>
                                                                        </g>
                                                                </svg>
                                                                </button>


                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                )}
                                            </React.Fragment>
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