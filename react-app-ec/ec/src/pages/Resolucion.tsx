import React, { useState, useEffect } from 'react';
import getBaseUrl from '../utils/getBaseUrl.js';
import './Resolucion.css';

const PreguntasPredeterminadas = () => {
    const [preguntas, setPreguntas] = useState<any[]>([
        {
            enunciado: "¿Qué es una variable en programación?",
            puntaje: 1.0,
            opciones: [
                { respuesta: "Una forma de almacenar datos temporales.", correcta: true },
                { respuesta: "Un tipo de dato que siempre contiene un valor numérico.", correcta: false },
                { respuesta: "Un lenguaje de programación.", correcta: false }
            ]
        },
        {
            enunciado: "¿Qué es un bucle `for` en programación?",
            puntaje: 1.0,
            opciones: [
                { respuesta: "Una estructura de control que repite un bloque de código un número específico de veces.", correcta: true },
                { respuesta: "Una función para llamar a un servidor.", correcta: false },
                { respuesta: "Un método para organizar datos.", correcta: false }
            ]
        },
        {
            enunciado: "¿Qué significa 'refactorización' en el código?",
            puntaje: 1.0,
            opciones: [
                { respuesta: "Modificar el código para mejorar su estructura sin cambiar su comportamiento externo.", correcta: true },
                { respuesta: "Optimizar el código para que se ejecute más rápido.", correcta: false },
                { respuesta: "Crear una nueva funcionalidad en una aplicación.", correcta: false }
            ]
        },
        {
            enunciado: "¿Cuál es el propósito de una función en la programación?",
            puntaje: 1.0,
            opciones: [
                { respuesta: "Encapsular un bloque de código reutilizable que puede ser ejecutado cuando sea necesario.", correcta: true },
                { respuesta: "Almacenar un valor que puede ser utilizado en otras partes del programa.", correcta: false },
                { respuesta: "Una estructura que permite manejar errores.", correcta: false }
            ]
        },
        {
            enunciado: "¿Qué es un firewall?",
            puntaje: 1.0,
            opciones: [
                { respuesta: "Un sistema de seguridad que controla el tráfico de red según reglas predefinidas.", correcta: true },
                { respuesta: "Un programa que protege contra virus.", correcta: false },
                { respuesta: "Un tipo de ataque de red.", correcta: false }
            ]
        },
        {
            enunciado: "¿Qué es la ingeniería social en ciberseguridad?",
            puntaje: 1.0,
            opciones: [
                { respuesta: "El uso de técnicas psicológicas para obtener información confidencial de las personas.", correcta: true },
                { respuesta: "Un ataque que involucra explotar vulnerabilidades de software.", correcta: false },
                { respuesta: "Un sistema de defensa contra ataques DDoS.", correcta: false }
            ]
        },
        {
            enunciado: "¿Qué es un ataque de fuerza bruta?",
            puntaje: 1.0,
            opciones: [
                { respuesta: "Un intento de adivinar contraseñas probando todas las combinaciones posibles.", correcta: true },
                { respuesta: "Una técnica para obtener acceso a sistemas mediante ingeniería social.", correcta: false },
                { respuesta: "Un ataque que aprovecha vulnerabilidades en el código de una aplicación.", correcta: false }
            ]
        }
    ]);

    return preguntas;
};

const ResolucionExamen: React.FC = () => {
    const endpoint = getBaseUrl();
    const [preguntas, setPreguntas] = useState<Pregunta[]>(PreguntasPredeterminadas());
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(preguntas.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [examenFinalizado, setExamenFinalizado] = useState<boolean>(false);
    const [enRevision, setEnRevision] = useState<boolean>(false);
    const [tiempo, setTiempo] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(`${endpoint}/examenes/8bed3c10-fe05-416d-af20-0b5b25221845/preguntas`);
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
            } catch (error) {
                console.error('Error al cargar las preguntas:', error);
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
                {preguntas.map((pregunta, index) => (
                    <div key={index} className="question-review">
                        <p className="question-text">{pregunta.enunciado}</p>
                        {pregunta.opciones.map((opcion, i) => (
                            <div
                                key={i}
                                className={`answer-review ${opcion.correcta
                                    ? 'correcto'
                                    : selectedAnswers[index] === i
                                        ? 'incorrecto'
                                        : ''
                                    }`}
                            >
                                {opcion.respuesta} {selectedAnswers[index] === i ? '(Tu respuesta)' : ''}
                            </div>
                        ))}
                    </div>
                ))}
                <button className="restart-button" onClick={() => window.location.reload()}>Reiniciar Examen</button>
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
                        <button className="change-answer-button" onClick={() => handleCambiarPregunta(index)}>
                            Cambiar Respuesta
                        </button>
                        <p>Tu respuesta: {pregunta.opciones[selectedAnswers[index] || 0]?.respuesta}</p>
                    </div>
                ))}
                <button className="finalize-button" onClick={handleConfirmarFinalizacion}>Confirmar y Finalizar Examen</button>
            </div>
        );
    }

    return (
        <div className="resolucion-examen-container">
            <header className="exam-header">
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

            {currentQuestion === preguntas.length - 1 && (
                <div className="finalize">
                    <button className="finalize-button" onClick={handleFinalizarExamen}>Revisar Respuestas</button>
                </div>
            )}

            <div className="progress-bar">
                <div className="progress" style={{ width: `${calcularProgreso()}%` }}></div>
            </div>

            <div className="timer">
                Tiempo transcurrido: {formatearTiempo(tiempo)}
            </div>

            <div className="pagination">
                <button className="prev-button" onClick={handlePrev} disabled={currentQuestion === 0}>← Anterior</button>
                <button className="next-button" onClick={handleNext} disabled={currentQuestion === preguntas.length - 1}>Siguiente →</button>
            </div>

        </div>
    );
};

export default ResolucionExamen;
