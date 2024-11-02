import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getBaseUrl from '../utils/getBaseUrl.js'; 
import './Examen.css';

// Componente principal para la resolución del examen
const ResolucionExamen: React.FC = () => {
    const endpoint = getBaseUrl(); // Obtener la URL base de la API
    // Estados para almacenar las preguntas, respuestas seleccionadas, estado del examen, etc.
    const [preguntas, setPreguntas] = useState<any[]>([
        {
            enunciado: "¿Cuál es la capital de Francia?",
            puntaje: 5,
            opciones: [
                { respuesta: "Madrid", correcta: false },
                { respuesta: "París", correcta: true },
                { respuesta: "Londres", correcta: false },
                { respuesta: "Roma", correcta: false },
            ]
        },
        {
            enunciado: "¿Qué lenguaje se utiliza principalmente para el desarrollo web frontend?",
            puntaje: 5,
            opciones: [
                { respuesta: "Python", correcta: false },
                { respuesta: "JavaScript", correcta: true },
                { respuesta: "Java", correcta: false },
                { respuesta: "C#", correcta: false },
            ]
        },
        {
            enunciado: "¿Quién escribió 'Cien años de soledad'?",
            puntaje: 5,
            opciones: [
                { respuesta: "Gabriel García Márquez", correcta: true },
                { respuesta: "Pablo Neruda", correcta: false },
                { respuesta: "Mario Vargas Llosa", correcta: false },
                { respuesta: "Julio Cortázar", correcta: false },
            ]
        },
        {
            enunciado: "¿Cuál es el planeta más cercano al Sol?",
            puntaje: 5,
            opciones: [
                { respuesta: "Venus", correcta: false },
                { respuesta: "Tierra", correcta: false },
                { respuesta: "Mercurio", correcta: true },
                { respuesta: "Marte", correcta: false },
            ]
        }
    ]);


    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [examenFinalizado, setExamenFinalizado] = useState<boolean>(false);
    const [enRevision, setEnRevision] = useState<boolean>(false);
    const [tiempo, setTiempo] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const examId = useParams().examenId; // Obtener el ID del examen de los parámetros de la URL

    // Efecto para cargar las preguntas del examen
    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(`${endpoint}/api/examenes/${examId}/preguntas`);
                if (response.ok) {
                    const data = await response.json();
                    // Formatear las preguntas
                    const preguntasFormateadas = data.map((pregunta: any) => ({
                        enunciado: pregunta.enunciado,
                        puntaje: pregunta.puntaje,
                        opciones: pregunta.opciones.map((opcion: any) => ({
                            respuesta: opcion.respuesta,
                            correcta: opcion.correcta,
                        })),
                    }));
                    setPreguntas(preguntasFormateadas);
                    setSelectedAnswers(Array(preguntasFormateadas.length).fill(null)); // Inicializar respuestas
                } else {
                    console.error('Error al cargar las preguntas:', response.statusText);
                }
            } catch (error) {
                console.error('Error al cargar preguntas:', error);
            }
        };

        fetchPreguntas();
    }, [endpoint, examId]);

    // Efecto para manejar el temporizador del examen
    useEffect(() => {
        if (!examenFinalizado && !enRevision) {
            const id = window.setInterval(() => {
                setTiempo((prev) => prev + 1);
            }, 1000);
            setIntervalId(id);

            // Limpiar el intervalo al desmontar el componente o al finalizar el examen
            return () => window.clearInterval(id);
        }
    }, [examenFinalizado, enRevision]);

    // Función para formatear el tiempo en minutos y segundos
    const formatearTiempo = (segundos: number) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
    };

    // Función para calcular el progreso del examen
    const calcularProgreso = () => {
        return ((currentQuestion + 1) / preguntas.length) * 100;
    };

    // Manejo de la selección de respuestas
    const handleAnswerSelect = (index: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = index;
        setSelectedAnswers(newAnswers);
    };

    // Navegación entre preguntas
    const handleNext = () => {
        if (currentQuestion < preguntas.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    // Manejo de finalización del examen
    const handleFinalizarExamen = () => {
        setEnRevision(true);
    };

    const handleConfirmarFinalizacion = () => {
        setExamenFinalizado(true);
        window.clearInterval(intervalId!); // Detener el temporizador
    };

    const handleCambiarPregunta = (index: number) => {
        setCurrentQuestion(index);
        setEnRevision(false);
    };

    const quitarRespuesta = (preguntaIndex) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[preguntaIndex] = undefined; // Elimina la respuesta seleccionada para la pregunta actual
        setSelectedAnswers(newAnswers); // Actualiza el estado
    };

    // Renderizado cuando el examen ha sido finalizado
    if (examenFinalizado) {
        return (
            <div className="result-container">
                <h2>Resultados del Examen</h2>
                <p>Tiempo total: {formatearTiempo(tiempo)}</p>
                {preguntas.map((pregunta, index) => {
                    const respuestaSeleccionada = pregunta.opciones[selectedAnswers[index]];
                    const respuestaCorrecta = pregunta.opciones.find(opcion => opcion.correcta);

                    return (
                        <div key={index} className="question-review">
                            <p className="question-text">{pregunta.enunciado}</p>
                            <div className={`answer-review ${respuestaSeleccionada?.correcta ? 'correcto' : 'incorrecto'}`}>
                                Tu respuesta: {respuestaSeleccionada?.respuesta}
                            </div>
                            {!respuestaSeleccionada?.correcta && (
                                <div className="correct-answer">
                                    Respuesta correcta: {respuestaCorrecta?.respuesta}
                                </div>
                            )}
                        </div>
                    );
                })}
                <button className="restart-button" onClick={() => window.location.reload()}>
                    Reiniciar Examen
                </button>
            </div>
        );
    }

    // Renderizado durante la revisión de respuestas
    if (enRevision) {
        return (
            <div className="review-container">
                <h2>Revisión de Respuestas</h2>
                <p>Puedes revisar tus respuestas y hacer cambios antes de finalizar el examen.</p>
                {preguntas.map((pregunta, index) => (
                    <div key={index} className="question-review">
                        <p className="question-text">{pregunta.enunciado}</p>
                        <p>Tu respuesta: {pregunta.opciones[selectedAnswers[index] || 0]?.respuesta}</p>
                        <button className="change-answer-button" onClick={() => handleCambiarPregunta(index)}>
                            Cambiar Respuesta
                        </button>
                    </div>
                ))}
                <button className="finalize-button" onClick={handleConfirmarFinalizacion}>
                    Finalizar Examen
                </button>
            </div>
        );
    }

    // Renderizado del examen
    return (
        <div className="resolucion-examen-container">
            <div className="timer">
                {formatearTiempo(tiempo)}
            </div>
            <header className="exam-header">
                <p className="pregunta-numero">Pregunta {currentQuestion + 1}</p>
                <div className="score-display">Puntaje: {preguntas[currentQuestion]?.puntaje}</div>
                <p className="question-text">{preguntas[currentQuestion]?.enunciado}</p>
            </header>

            <div className="answers-container">
                {preguntas[currentQuestion]?.opciones.map((opcion, index) => (
                    <div
                        key={index}
                        className={`answer ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(index)}
                    >
                        {opcion.respuesta}
                    </div>
                ))}
                {selectedAnswers[currentQuestion] !== undefined && (
                    <button className="remove-answer-button" onClick={() => quitarRespuesta(currentQuestion)}>
                        Quitar Respuesta
                    </button>
                )}
            </div>

            <div className="pagination">
                <button className="prev-button" onClick={handlePrev} disabled={currentQuestion === 0}>
                    ←
                </button>
                <div className="navigation-bar">
                    {preguntas.map((_, index) => (
                        <button
                            key={index}
                            className={`nav-button 
                                ${currentQuestion === index ? 'active' : ''} 
                                ${selectedAnswers[index] !== undefined && selectedAnswers[index] !== null ? 'selected' : ''}`}
                            onClick={() => setCurrentQuestion(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100">
                                <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="12" />
                            </svg>
                            <span className="question-number">{index + 1}</span>
                        </button>
                    ))}
                </div>
                {currentQuestion === preguntas.length - 1 ? (
                    <button className="finalize-button" onClick={handleFinalizarExamen}>
                        Finalizar
                    </button>
                ) : (
                    <button className="next-button" onClick={handleNext}>
                        →
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResolucionExamen;
