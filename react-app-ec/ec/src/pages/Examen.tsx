import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getBaseUrl from '../utils/getBaseUrl.js'; 
import logo2 from '../Logo2-ec.png';
import './Examen.css';
import { each } from 'chart.js/helpers';

// Componente principal para la resolución del examen
const ResolucionExamen: React.FC = () => {
    const endpoint = getBaseUrl(); 
    const [preguntas, setPreguntas] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState<(object | null)[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [examenFinalizado, setExamenFinalizado] = useState<boolean>(false);
    const [enRevision, setEnRevision] = useState<boolean>(false);
    const [resolviendo, setResolviendo] = useState<boolean>(false);
    const [cargandoDatos, setCargandoDatos ] = useState<boolean>(true);
    const [tiempo, setTiempo] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [tituloExamen, setTituloExamen] = useState('');
    const [temaExamen, setTemaExamen] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');

    const examId = useParams().examenId; 

    // Efecto para cargar las preguntas del examen
    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await fetch(`${endpoint}/api/examenes/${examId}/preguntas`);
                if (response.ok) {
                    const data = await response.json();
                    // Formatear las preguntas
                    console.log(data)
                    setTituloExamen(data.data.titulo)
                    setTemaExamen(data.data.tema)
                    setTiempo(data.data.tiempoLimite)
                    const preguntasFormateadas = data.data.preguntas.map((pregunta: any) => ({
                        enunciado: pregunta.enunciado,
                        puntaje: pregunta.puntaje,
                        opciones: pregunta.opciones.map((opcion: any) => ({
                            respuesta: opcion.respuesta,
                            correcta: opcion.correcta,
                        })),
                    }));
                    setPreguntas(preguntasFormateadas);
                    setSelectedAnswers(Array(preguntasFormateadas.length).fill(null)); 
                } else {
                    console.error('Error al cargar las preguntas:', response.statusText);
                }
            } catch (error) {
                console.error('Error al cargar preguntas:', error);
            }
        };

        fetchPreguntas();
    }, [endpoint, examId]);

    const calcularResultado = (selectedAnswers) => {
        let total = 0
        selectedAnswers.forEach(answer => {
            if (answer.correcta) {
                total = total + answer.puntaje
            }
        }) 
        return total
    }

    const [tiempoRestante, setTiempoRestante] = useState(tiempo * 60); // Convierte minutos a segundos

    useEffect(() => {
        if (resolviendo && tiempoRestante > 0) {
            const id = window.setInterval(() => {
                setTiempoRestante((prevTiempo) => {
                    if (prevTiempo <= 1) {
                        window.clearInterval(id); // Detiene el intervalo al llegar a 0
                        return 0;
                    }
                    return prevTiempo - 1; // Resta 1 segundo
                });
            }, 1000);

            // Limpiar el intervalo al desmontar el componente o al finalizar el examen
            return () => window.clearInterval(id);
        }
    }, [examenFinalizado, resolviendo]); // No incluyas tiempoRestante

    // Opcional: convierte tiempo restante a minutos y segundos para mostrar
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0'); // Día con dos dígitos
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (0-11)
        const año = fecha.getFullYear();
        const fechaFormateada = `${dia}/${mes}/${año}`;
        const alumnoData = {
            fecha: fechaFormateada,
            nombre,
            apellido,
            email,
            tiempo: tiempo,
            resultado: calcularResultado(selectedAnswers),
            respuestas: selectedAnswers
        };

        try {
            console.log(alumnoData)
            const response = await fetch(`${endpoint}/api/examenes/${examId}/alumnos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alumnoData),
            });

            if (response.status === 200) {
                console.log("exito")
            } else {
                console.log("fallo");
            }
        } catch (error) {
            console.log("fallo");
        }
    };


    // Manejo de la selección de respuestas
    const handleAnswerSelect = (opcion, index: number) => {
        const answer = {};
        answer.enunciado = preguntas[currentQuestion].enunciado;
        answer.opcion = opcion.respuesta;
        answer.puntaje = opcion.correcta ? preguntas[currentQuestion].puntaje : 0;  
        answer.correcta = opcion.correcta 
        answer.opcionCorrecta = preguntas[currentQuestion].opciones.find((opcion) => opcion.correcta).respuesta;
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = answer;
        setSelectedAnswers(newAnswers);
    };

    // Navegación entre preguntas
    const handleNext = () => {
        if (currentQuestion < preguntas.length - 1) {
            console.log(selectedAnswers.length)
            console.log(preguntas.length)
            console.log(selectedAnswers)
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    // Manejo de finalización del examen
    //const handleFinalizarExamen = () => {
    //    setExamenFinalizado(true);
    //};

    //const handleConfirmarFinalizacion = () => {
    //    setExamenFinalizado(true);
    //    window.clearInterval(intervalId!); // Detener el temporizador
    //};

    const handleCambiarPregunta = (index: number) => {
        setCurrentQuestion(index);
        setEnRevision(false);
    };

    const quitarRespuesta = (preguntaIndex) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[preguntaIndex] = null; 
        setSelectedAnswers(newAnswers); 
    };

    if (cargandoDatos) {
        return (
            <div className="form-container">
                <div className="form-card">
                    <div className="form-logo">
                        <div className="footer-logo">
                            <img src={logo2} alt="Easy Choice Logo" className="footer-logo-image" />
                            <span className="footer-logo-text">© 2024 Easy Choice. Todos los derechos reservados.</span>
                        </div></div>
                    <h2 className="form-title">{tituloExamen}</h2>
                    <p className="form-subtitle">{temaExamen}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Apellido:</label>
                            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <button type="submit" onClick={() => {
                            setCargandoDatos(false);
                            setResolviendo(true)
                        }} className="submit-button">Comenzar Examen</button>
                    </form>
                </div>
            </div>
        );
    }

    if (resolviendo) {
        return (
            <div className="resolucion-examen-container">
                <div className="timer">
                    {minutos}:{segundos.toString().padStart(2, '0')}
                </div>
                <header className="exam-header">
                    {selectedAnswers.every((answer) => answer) && ( 
                        <button className="finalize-button" onClick={(e) => {
                            setResolviendo(false);
                            handleSubmit(e);
                        }}>
                            Finalizar
                        </button>
                     )}
                    <p className="pregunta-numero">Pregunta {currentQuestion + 1}</p>
                    <div className="score-display">Puntaje: {preguntas[currentQuestion]?.puntaje}</div>
                    <p className="question-text">{preguntas[currentQuestion]?.enunciado}</p>
                </header>

                <div className="answers-container">
                    {preguntas[currentQuestion]?.opciones.map((opcion, index) => (
                        <div
                            key={index}
                            className={`answer ${selectedAnswers[currentQuestion]?.opcion === opcion.respuesta ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(opcion, index)}
                        >
                            {opcion.respuesta}
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    {currentQuestion !== 0 && (
                        <button className="move-button" onClick={handlePrev} disabled={currentQuestion === 0}>
                            <svg fill="#19575F" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml: space="preserve" stroke="#19575F" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.859,0,0,114.837,0,256c0,141.141,114.859,256,256,256c141.163,0,256-114.859,256-256 C512,114.837,397.163,0,256,0z M403.691,264.149c-1.088,2.603-2.645,4.971-4.608,6.933l-85.333,85.333 c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.901-2.091-15.083-6.251c-8.32-8.341-8.32-21.845,0-30.165l48.917-48.917H128 c-11.776,0-21.333-9.557-21.333-21.333c0-11.797,9.557-21.333,21.333-21.333h204.501l-48.917-48.917 c-8.32-8.341-8.32-21.845,0-30.165c8.341-8.341,21.845-8.341,30.165,0l85.333,85.312c1.963,1.963,3.52,4.331,4.608,6.955 C405.845,253.056,405.845,258.923,403.691,264.149z"></path> </g> </g> </g></svg>
                        </button>
                    )}
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
                    {currentQuestion !== preguntas.length - 1 && (
                        <button className="move-button" onClick={handleNext}>
                            <svg fill="#19575F" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml: space="preserve" stroke="#19575F"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.859,0,0,114.837,0,256c0,141.141,114.859,256,256,256c141.163,0,256-114.859,256-256 C512,114.837,397.163,0,256,0z M403.691,264.149c-1.088,2.603-2.645,4.971-4.608,6.933l-85.333,85.333 c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.901-2.091-15.083-6.251c-8.32-8.341-8.32-21.845,0-30.165l48.917-48.917H128 c-11.776,0-21.333-9.557-21.333-21.333c0-11.797,9.557-21.333,21.333-21.333h204.501l-48.917-48.917 c-8.32-8.341-8.32-21.845,0-30.165c8.341-8.341,21.845-8.341,30.165,0l85.333,85.312c1.963,1.963,3.52,4.331,4.608,6.955 C405.845,253.056,405.845,258.923,403.691,264.149z"></path> </g> </g> </g></svg>
                        </button>
                    )}
                </div>
            </div>
        );
    };
   
    return (
        <div className="result-container">
            <h2>Resultados del Examen</h2>
            <p>Tiempo total: {tiempoRestante}</p>
            {selectedAnswers.map((answer, index) => 
                 
                    <div key={index} className="question-review">
                        <p className="question-text">{answer.enunciado}</p>
                        <div className={`answer-review ${answer.correcta ? 'correcto' : 'incorrecto'}`}>
                            Tu respuesta: {answer.opcion}
                        </div>
                        {!answer.correcta && (
                            <div className="correct-answer">
                                Respuesta correcta: {answer.opcionCorrecta}
                            </div>
                        )}
                    </div>
            )}
        </div>
    );


};

export default ResolucionExamen;
