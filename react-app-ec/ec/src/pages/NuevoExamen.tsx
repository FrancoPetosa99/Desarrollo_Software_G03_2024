import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import './NuevoExamen.css';
import check from '../icons/check.png';
import uncheck from '../icons/uncheck.png';
function NuevoExamen() {
    const [formulario, setFormulario] = useState({
        titulo: '',
        tema: '',
        tiempo: '',
        fecha: new Date().toISOString().split('T')[0] 
    });;
    const [texto, setTexto] = useState('');
    const maxCaracteres = 600;

    const [preguntas, setPreguntas] = useState([
        { texto: '', respuestas: ['', ''], respuestasCorrectas: [0] }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prevFormulario) => ({
            ...prevFormulario,
            [name]: value
        }));
    };

    const handleChangeTextbox = (e) => {
        setTexto(e.target.value);
        e.target.style.height = 'auto'; 
        e.target.style.height = `${e.target.scrollHeight}px`; 
    };

    const agregarPregunta = () => {
    if (preguntas.length < 10) { 
        setPreguntas([...preguntas, { texto: '', respuestas: ['', ''], respuestasCorrectas: [0] }]);
    }
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
        const respuestasCorrectas = nuevasPreguntas[indexPregunta].respuestasCorrectas;

        if (respuestasCorrectas.includes(indexRespuesta)) {
            nuevasPreguntas[indexPregunta].respuestasCorrectas = respuestasCorrectas.filter(
                (respIndex) => respIndex !== indexRespuesta
            );
        } else {
            
            nuevasPreguntas[indexPregunta].respuestasCorrectas.push(indexRespuesta);
        }

        setPreguntas(nuevasPreguntas);
    };

    

    
    const quitarRespuesta = (indexPregunta, indexRespuesta) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].respuestas.splice(indexRespuesta, 1);

        nuevasPreguntas[indexPregunta].respuestasCorrectas = nuevasPreguntas[indexPregunta].respuestasCorrectas.filter(
            (respIndex) => respIndex !== indexRespuesta
        );

        setPreguntas(nuevasPreguntas);
    };

    const eliminarPregunta = (index) => {
        const nuevasPreguntas = preguntas.filter((_, i) => i !== index);  
        setPreguntas(nuevasPreguntas);  
    };

    return (
        <Layout>
            <h1 className="titulo" >Crea tu Examen</h1> 

            <div className='form-group'>
                <div className='mb-1'>
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formulario.titulo}
                        placeholder='Ingresar Título'
                        className='form-control'
                        onChange={handleChange}
                        required
                />
                </div>
                <div className='mb-1'>
                    <label htmlFor="tema">Tema</label>
                    <input
                        type="text"
                        id="tema"
                        name="tema"
                        value={formulario.tema}
                        placeholder='Ingresar Tema'
                        className='form-control'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-1'>
                    <label htmlFor="time">Tiempo Límite</label>
                    <input
                        type="time"
                        id="tiempo"
                        name="tiempo"
                        value={formulario.tiempo}
                        className='form-control'
                        min="00:00"  
                        max="23:59" 
                        pattern="[0-2][0-3]:[0-5][0-9]"  
                        placeholder="00:00 hs"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-1'>
                    <label htmlFor="tema">Fecha Límite</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formulario.fecha}
                        placeholder='Ingresar Tema'
                        className='form-control'
                        onChange={handleChange}
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
                        onChange={handleChangeTextbox}
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
                            {indexPregunta > 0 && (
                            <button
                                type="button"
                                style={{
                                    fontSize: '20px',
                                }}
                                onClick={() => eliminarPregunta(indexPregunta)}  
                                >❌
                                </button>
                            )}
                     </div>
                        
                    </div>
                {pregunta.respuestas.map((respuesta, indexRespuesta) => (
    <div
        key={indexRespuesta}
        className={`bloque-respuesta respuesta-${indexRespuesta} ${pregunta.respuestasCorrectas.includes(indexRespuesta) ? "respuesta-correcta" : "respuesta-incorrecta"}`}>
        <label htmlFor={`respuesta${indexRespuesta + 1}`}>
                Respuesta {indexRespuesta + 1}
        </label>
        <div className='contenido-respuesta'>
            
            <input
                type="text"
                id={`respuesta${indexRespuesta + 1}`}
                placeholder="Ingresar Respuesta"
                className="input-respuesta"
                value={respuesta}
                onChange={(e) =>
                    manejarTextoRespuesta(indexPregunta, indexRespuesta, e.target.value)
                }
                required
            />
            <span>
                <button
                    type="button"
                    className={`btn-correcta btn-correcta-${indexRespuesta} ${pregunta.respuestasCorrectas.includes(indexRespuesta) ? "marcada-correcta" : "marcada-incorrecta"}`}
                    onClick={() => marcarComoCorrecta(indexPregunta, indexRespuesta)}
                    >
                    {pregunta.respuestasCorrectas.includes(indexRespuesta) ? "✔️" : "❌"}
                </button>
            </span>
            {indexRespuesta >= 2 && (
                <button
                    type="button"
                    className={`btn-quitar-respuesta btn-quitar-${indexRespuesta}`}
                    onClick={() => quitarRespuesta(indexPregunta, indexRespuesta)}
                >
                    quitar
                </button>
            )}
        </div>
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
                        className="btn-agregar-pregunta"
                        style={{
                            height: '40px',
                            padding: '0 20px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: '1px solid black',
                            outline: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={agregarPregunta}
                    >
                        Agregar Pregunta
                    </button>
                )}
                <button
                    type="button"
                    className="btn-guardar"
                    style={{
                        height: '40px', 
                        padding: '0 20px',
                        backgroundColor: '#28A745',
                        color: 'white', 
                        border: '1px solid black', 
                        outline: 'none', 
                        cursor: 'pointer',
                    }}>Guardar Examen
                </button>
            </div>

            
        </Layout>
    );
}

export default NuevoExamen;
