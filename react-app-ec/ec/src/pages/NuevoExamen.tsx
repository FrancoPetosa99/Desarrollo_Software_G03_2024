import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import './NuevoExamen.css';


function NuevoExamen() {
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const maxCaracteres = 600;
    const [preguntas, setPreguntas] = useState([{ texto: '', respuestas: ['', ''] }]);

    const handleChange = (e) => {
        setTexto(e.target.value);
        e.target.style.height = 'auto'; 
        e.target.style.height = `${e.target.scrollHeight}px`; 
    };

    const agregarPregunta = () => {
        setPreguntas([...preguntas, { texto: '', respuestas: ['', ''] }]);
    };    

    const manejarTextoPregunta = (index, value) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[index].texto = value;
        setPreguntas(nuevasPreguntas);
    };

    const manejarTextoRespuesta = (indexPregunta, indexRespuesta, value) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].respuestas[indexRespuesta] = value;
        setPreguntas(nuevasPreguntas);
    };

    const agregarRespuesta = (index) => {
        const nuevasPreguntas = [...preguntas];
        if (nuevasPreguntas[index].respuestas.length < 4) {
            nuevasPreguntas[index].respuestas.push('');
            setPreguntas(nuevasPreguntas);
        }
    };

    const marcarComoCorrecta = (indexPregunta, indexRespuesta) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].respuestaCorrecta = indexRespuesta;
        setPreguntas(nuevasPreguntas);
    };

    const quitarRespuesta = (indexPregunta, indexRespuesta) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].respuestas.splice(indexRespuesta, 1);
        setPreguntas(nuevasPreguntas);
    };

    const eliminarPregunta = (index) => {
        const nuevasPreguntas = preguntas.filter((_, i) => i !== index);  
        setPreguntas(nuevasPreguntas);  
    };

    return (
        <Layout>
            <h1 className="form-group" >Crea tu Examen</h1> 

            <div className='form-group'>
                <div className='mb-1'>
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        placeholder='Ingresar Título'
                        className='form-control'
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                />
                </div>
                <div className='mb-1'>
                    <label htmlFor="tema">Tema</label>
                    <input
                        type="text"
                        id="tema"
                        placeholder='Ingresar Tema'
                        className='form-control'
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-1'>
                    <label htmlFor="time">Tiempo Límite</label>
                    <input
                        type="time"
                        id="tiempo"
                        className='form-control'
                        min="00:00"  
                        max="23:59" 
                        pattern="[0-2][0-3]:[0-5][0-9]"  
                        placeholder="00:00"
                        required
                    />
                </div>
                <div className='mb-1'>
                    <label htmlFor="tema">Fecha Límite</label>
                    <input
                        type="date"
                        id="fecha"
                        placeholder='Ingresar Tema'
                        className='form-control'
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>

                
                
            </div>
            {preguntas.map((pregunta, indexPregunta) => (
                <div className='consigna' key={indexPregunta}>
                    <label htmlFor={`pregunta ${indexPregunta}`}>Pregunta {indexPregunta + 1}</label>
                    <div className="pregunta-group">

                    <textarea
                        id={`pregunta${indexPregunta}`}
                        className='pregunta'
                        placeholder="Ingresa tu pregunta"
                        maxLength={maxCaracteres}
                        value={texto}
                        onChange={handleChange}
                        />

                    <span className="char-limit">
                        {texto.length}/{maxCaracteres}
                        </span>

                    <span className="puntaje">
                        <label htmlFor="pregunta-puntaje">Puntaje</label>
                        <input
                            type="text"
                            id="puntaje"
                            min="0,00"
                            max="10,00"
                            pattern="[0-1][0-9],[0-9][0-9]"
                            placeholder="0,00"
                            required
                            />
                        </span>
                    <div className='boton-eliminar'>
                        <button
                                type="button"
                                style={{
                                    fontSize: '20px',
                                }}
                                onClick={() => eliminarPregunta(indexPregunta)}  
                            >x
                        </button>
                     </div>
                        
                </div>
                    {pregunta.respuestas.map((respuesta, indexRespuesta) => (
                        <div
                            key={indexRespuesta}
                            className={`respuesta ${pregunta.respuestaCorrecta === indexRespuesta ? "correcta" : ""}`}
                        >
                            <label htmlFor={`respuesta${indexRespuesta + 1}`}>
                                Respuesta {indexRespuesta + 1}
                            </label>
                            <input
                                type="text"
                                id={`respuesta${indexRespuesta + 1}`}
                                placeholder="Ingresar Respuesta"
                                className="form-control"
                                value={respuesta}
                                onChange={(e) =>
                                    manejarTextoRespuesta(indexPregunta, indexRespuesta, e.target.value)
                                }
                                required
                            />
                        <button
                            type="button"
                            className={`btn-correcta ${pregunta.respuestaCorrecta === indexRespuesta ? "correcta" : ""
                                }`}
                            onClick={() => marcarComoCorrecta(indexPregunta, indexRespuesta)}
                        >
                            {pregunta.respuestaCorrecta === indexRespuesta
                                ? "✔️"
                                : "❌"}
                        </button>
                        {indexRespuesta >= 2 && (
                            <button
                                type="button"
                                className="btn-quitar-respuesta"
                                onClick={() => quitarRespuesta(indexPregunta, indexRespuesta)}
                            >
                                quitar
                            </button>
                        )}
                        
                        </div>
                ))}
                    <div className='boton-agregar'>
                        {pregunta.respuestas.length < 4 && (
                            <button
                                type="button"
                                className="btn"
                                style={{
                                    color: 'white',
                                    fontSize: '12px'
                                }}
                                onClick={() => agregarRespuesta(indexPregunta)}
                            >
                                Agregar Opción +
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <div className='boton-fondo'>
                {preguntas.length < 10 && (
                    <button
                        type="button"
                        className="btn"
                        style={{
                            height: '40px',
                            padding: '0 20px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: '1px solid black',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={agregarPregunta}
                    >
                        Agregar Pregunta
                    </button>
                )}
                <button
                    type="button"
                    className="btn"
                    style={{
                        height: '40px', 
                        padding: '0 20px',
                        backgroundColor: '#28A745',
                        color: 'white', 
                        border: '1px solid black', 
                        outline: 'none', 
                        cursor: 'pointer' 
                    }}>Guardar Examen
                </button>
            </div>

            
        </Layout>
    );
}

export default NuevoExamen;
