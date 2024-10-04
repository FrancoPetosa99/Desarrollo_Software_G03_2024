import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getBaseUrl from '../utils/getBaseUrl.js';
import './Examen.css';

const ResolucionExamen: React.FC = () => {
    const endpoint = getBaseUrl();
    const [preguntas, setPreguntas] = useState<any[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(preguntas.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [examenFinalizado, setExamenFinalizado] = useState<boolean>(false);
    const [enRevision, setEnRevision] = useState<boolean>(false);
    const [tiempo, setTiempo] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const examId = useParams().examenId 
    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(`${endpoint}/api/examenes/${examId}/preguntas`);
                if (response.ok) {
                    const data = await response.json();
                    const preguntasFormateadas = data.map((pregunta: any) => ({
                        enunciado: pregunta.enunciado,
                        puntaje: pregunta.puntaje,
                        opciones: pregunta.opciones.map((opcion: any) => ({
                            respuesta: opcion.respuesta,
                            correcta: opcion.correcta,
                        })),
                    }));
                    setPreguntas(preguntasFormateadas);
                    setSelectedAnswers(Array(preguntasFormateadas.length).fill(null));
                }
            } catch (error) {
                console.error('Error al cargar las preguntas:', error);
                <h2>Error al cargar examen</h2>
            }
        };

        fetchPreguntas();
    }, [endpoint]);

    useEffect(() => {
        if (!examenFinalizado && !enRevision) {
            const id = window.setInterval(() => {
                setTiempo((prev) => prev + 1);
            }, 1000);
            setIntervalId(id);

            return () => window.clearInterval(id);
        }
    }, [examenFinalizado, enRevision]);

    const detenerTemporizador = () => {
        if (intervalId) {
            window.clearInterval(intervalId);
        }
    };

    const formatearTiempo = (segundos: number) => {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
    };

    const calcularProgreso = () => {
        return ((currentQuestion + 1) / preguntas.length) * 100;
    };

    const handleAnswerSelect = (index: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = index;
        setSelectedAnswers(newAnswers);
    };

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

    const handleFinalizarExamen = () => {
        setEnRevision(true);
    };

    const handleConfirmarFinalizacion = () => {
        setExamenFinalizado(true);
        detenerTemporizador();
    };

    const handleCambiarPregunta = (index: number) => {
        setCurrentQuestion(index);
        setEnRevision(false);
    };

    if (examenFinalizado) {
        return (
            <div className="result-container">
                <h2>Resultados del Examen</h2>
                <p>Tiempo total: {formatearTiempo(tiempo)}</p>

                {preguntas.map((pregunta, index) => {
                    // Obtener la opción seleccionada por el usuario y la opción correcta
                    const respuestaSeleccionada = pregunta.opciones[selectedAnswers[index]];
                    const respuestaCorrecta = pregunta.opciones.find(opcion => opcion.correcta);

                    return (
                        <div key={index} className="question-review">
                            <p className="question-text">{pregunta.enunciado}</p>

                            {/* Mostrar la respuesta seleccionada por el usuario */}
                            <div
                                className={`answer-review ${respuestaSeleccionada.correcta
                                    ? 'correcto'
                                    : 'incorrecto'
                                    }`}
                            >
                                Tu respuesta: {respuestaSeleccionada.respuesta}
                            </div>

                            {/* Mostrar la respuesta correcta, solo si la respuesta seleccionada es incorrecta */}
                            {!respuestaSeleccionada.correcta && (
                                <div className="correct-answer">
                                    Respuesta correcta: {respuestaCorrecta.respuesta}
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
                <button className="finalize-button" onClick={handleConfirmarFinalizacion}>Finalizar Examen</button>
            </div>
        );
    }

    return (
        <div className="resolucion-examen-container">
            <div className="timer">
                {formatearTiempo(tiempo)}
            </div>
            <header className="exam-header">
                <p>Pregunta {currentQuestion + 1}</p>
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
            </div>
            
            
            <div className="pagination">
                <button className="prev-button" onClick={handlePrev} disabled={currentQuestion === 0}>
                    ← Anterior
                </button>
                <div className="navigation-bar">
                    {preguntas.map((_, index) => (
                        <button
                            key={index}
                            className={`nav-button ${currentQuestion === index ? 'active' : ''}`}
                            onClick={() => setCurrentQuestion(index)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} // Alinea el contenido
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 100 100">
                                <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" stroke-width="12" />
                            </svg>
                        </button>
                    ))}
                </div>
                {currentQuestion === preguntas.length - 1 ? (
                    <button
                        className="finalize-button"
                        onClick={handleFinalizarExamen}
                    >
                        Finalizar
                    </button>
                ) : (
                    <button
                        className="next-button"
                        onClick={handleNext}
                    >
                        Siguiente →
                    </button>
                )}
            </div>

        </div>
    );
};

export default ResolucionExamen;
