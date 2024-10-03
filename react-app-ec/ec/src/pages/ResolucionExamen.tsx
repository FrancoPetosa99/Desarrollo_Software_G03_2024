import React, { useState, useEffect } from 'react';
import './ResolucionExamen.css';

const ResolucionExamen = () => {
  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [examenFinalizado, setExamenFinalizado] = useState<boolean>(false);
  const [enRevision, setEnRevision] = useState<boolean>(false);
  const [tiempo, setTiempo] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await fetch('http://localhost:8080/examenes');
        const data = await response.json();
        setPreguntas(data);
        setSelectedAnswers(Array(data.length).fill(null));
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
      }
    };
  
    fetchPreguntas();
  }, []);
  

  useEffect(() => {
    if (!examenFinalizado && !enRevision) {
      const id = setInterval(() => {
        setTiempo((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
  }, [examenFinalizado, enRevision]);

  const detenerTemporizador = () => {
    if (intervalId) {
      clearInterval(intervalId);
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
            {pregunta.opciones.map((opcion: any, i: number) => (
              <div
                key={i}
                className={`answer-review ${
                  opcion.correcta
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
            <p>Tu respuesta: {pregunta.opciones[selectedAnswers[index]]?.respuesta}</p>
          </div>
        ))}
        <button className="finalize-button" onClick={handleConfirmarFinalizacion}>Confirmar y Finalizar Examen</button>
      </div>
    );
  }

  return (
    <div className="resolucion-examen-container">
      <header className="exam-header">
        <h1>Pregunta {currentQuestion + 1}</h1>
        <p className="question-text">{preguntas[currentQuestion]?.enunciado}</p>
      </header>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${calcularProgreso()}%` }}></div>
      </div>

      <div className="timer">
        Tiempo transcurrido: {formatearTiempo(tiempo)}
      </div>

      <div className="answers-container">
        {preguntas[currentQuestion]?.opciones.map((opcion: any, index: number) => (
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
        <button className="prev-button" onClick={handlePrev} disabled={currentQuestion === 0}>← Anterior</button>
        <button className="next-button" onClick={handleNext} disabled={currentQuestion === preguntas.length - 1}>Siguiente →</button>
      </div>

      {currentQuestion === preguntas.length - 1 && (
        <div className="finalize">
          <button className="finalize-button" onClick={handleFinalizarExamen}>Revisar Respuestas</button>
        </div>
      )}
    </div>
  );
};

export default ResolucionExamen;
