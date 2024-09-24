import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import './NuevoExamen.css';
import check from '../icons/check.png';
import uncheck from '../icons/uncheck.png';
function NuevoExamen() {
    // Inicializando el formulario con los valores necesarios
    const [formulario, setFormulario] = useState({
        titulo: '',
        tema: '',
        tiempo: '',
        habilitado: false,
        fecha: new Date().toISOString().split('T')[0] // Fecha inicial actual
    });

    const maxCaracteres = 600;

    // Preguntas con sus respuestas y respuestasCorrectas
    const [preguntas, setPreguntas] = useState([
        { texto: '', respuestas: ['', ''], respuestasCorrectas: [0] }
    ]);

    // Función para manejar cambios en los inputs generales (título, tema, etc.)
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormulario((prevFormulario) => ({
            ...prevFormulario,
            [name]: value
        }));
    };

    const manejarPuntaje = (e: { target: { value: any; }; }) => {
        let value = e.target.value;
        value = value.replace(',', '.');
        if (parseFloat(value) > 1) {
            value = '1.00';
        }
        e.target.value = value; 
    };

    // Agregar una nueva pregunta asegurando que no haya más de 10 preguntas
    const agregarPregunta = () => {
        if (preguntas.length < 10) {
            setPreguntas([...preguntas, { texto: '', respuestas: ['', ''], respuestasCorrectas: [0] }]);
        }
    };

    // Manejar cambios en el texto de la pregunta
    const manejarTextoPregunta = (indexPregunta: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].texto = value;
        setPreguntas(nuevasPreguntas);

        // Ajustar altura del textarea
        e.target.style.height = 'auto'; // Reiniciar altura
        e.target.style.height = `${e.target.scrollHeight}px`; // Ajustar altura
    };

    // Manejar cambios en el texto de las respuestas
    const manejarTextoRespuesta = (indexPregunta: number, indexRespuesta: number, value: string) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].respuestas[indexRespuesta] = value;
        setPreguntas(nuevasPreguntas);
    };

    // Agregar una respuesta adicional, asegurando que no haya más de 4 respuestas por pregunta
    const agregarRespuesta = (index: number) => {
        const nuevasPreguntas = [...preguntas];
        if (nuevasPreguntas[index].respuestas.length < 4) {
            nuevasPreguntas[index].respuestas.push('');
            setPreguntas(nuevasPreguntas);
        }
    };

    // Marcar una respuesta como correcta (se permite más de una)
    const marcarComoCorrecta = (indexPregunta: number, indexRespuesta: number) => {
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

    // Quitar una respuesta de la lista, y removerla de las respuestas correctas si está marcada
    const quitarRespuesta = (indexPregunta: number, indexRespuesta: number) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].respuestas.splice(indexRespuesta, 1);

        nuevasPreguntas[indexPregunta].respuestasCorrectas = nuevasPreguntas[indexPregunta].respuestasCorrectas.filter(
            (respIndex) => respIndex !== indexRespuesta
        );

        setPreguntas(nuevasPreguntas);
    };

    // Eliminar una pregunta del cuestionario
    const eliminarPregunta = (index: number) => {
        const nuevasPreguntas = preguntas.filter((_, i) => i !== index);
        setPreguntas(nuevasPreguntas);
    };

    const guardarExamen = () => {
        // Obtener todos los campos requeridos
        const camposRequeridos = document.querySelectorAll('input[required], textarea[required]');
        let todosCompletos = true;

        // Verificar si todos los campos requeridos están completados
        camposRequeridos.forEach(campo => {
            if (!campo.value) {
                todosCompletos = false;
                campo.classList.add('is-invalid'); // Opcional: agregar clase para mostrar error
            } else {
                campo.classList.remove('is-invalid'); // Eliminar clase si el campo está completo
            }
        });

        if (todosCompletos) {
            // Aquí puedes realizar la acción de guardar el examen
            console.log("Todos los campos están completos. Guardando examen...");
            // Agrega tu lógica de guardado aquí
        } else {
            console.log("Por favor, completa todos los campos requeridos.");
        }
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
                        maxLength={25}
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
                        maxLength={25}
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
                        className='pregunta-input'
                        placeholder="Ingresa tu pregunta"
                        maxLength={maxCaracteres}
                        value={pregunta.texto}
                        onChange={(e) => manejarTextoPregunta(indexPregunta, e)}
                        required
                        />

                    <span className="char-limit">
                        {pregunta.texto.length}/{maxCaracteres}
                        </span>

                    <span className="puntaje">
                        <label htmlFor="pregunta-puntaje">Puntaje</label>
                        <input
                            type="text"
                            id="puntaje"
                            min="0,00"
                            max="1,00"
                            pattern="[0-1],[0-9][0-9]"
                            placeholder="0,00"
                            style={{ width:"30px"}}
                            onChange={manejarPuntaje}
                            required
                            />
                        </span>
                        <div className='boton-eliminar-pregunta'>
                            {indexPregunta > 0 && (
                            <button
                                type="button"
                                style={{border: "black",background: "none"}}
                                onClick={() => eliminarPregunta(indexPregunta)}  
                                >⛔
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
                id={`respuesta${indexRespuesta + 1}`}
                placeholder="Ingresar Respuesta"
                maxLength={50}
                className={`input-respuesta ${pregunta.respuestasCorrectas.includes(indexRespuesta) ? "input-correcta" : ""}`}
                value={respuesta}
                onChange={(e) =>manejarTextoRespuesta(indexPregunta, indexRespuesta, e.target.value)}
                data-correcta={pregunta.respuestasCorrectas.includes(indexRespuesta)}
                required
            />
            <div className="botones-respuesta">
                <button
                    type="button"
                    className={`boton-correcta boton-correcta-${indexRespuesta} ${pregunta.respuestasCorrectas.includes(indexRespuesta) ? "marcada-correcta" : "marcada-incorrecta"}`}
                    onClick={() => marcarComoCorrecta(indexPregunta, indexRespuesta)}
                    style={{border: "black",background: "none"}}
                    >
                    {pregunta.respuestasCorrectas.includes(indexRespuesta) ? "✔️" : "❌"}
                </button>
            {indexRespuesta >= 2 && (
                <button
                    type="button"
                    className={`boton-quitar-respuesta boton-quitar-respuesta${indexRespuesta}`}
                    onClick={() => quitarRespuesta(indexPregunta, indexRespuesta)}
                >
                    quitar
                </button>  
            )}
            </div>
        </div>
    </div>
))}

                    <div className='boton-agregar-respuesta'>
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
                        className="boton-agregar-pregunta"
                        style={{
                            height: '40px',
                            padding: '0 20px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: '0px',
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
                    className="boton-guardar"
                    style={{
                        height: '40px', 
                        padding: '0 20px',
                        backgroundColor: '#28A745',
                        color: 'white', 
                        border: '0px', 
                        outline: 'none', 
                        cursor: 'pointer',
                    }}
                    onClick={guardarExamen}
                >Guardar Examen
                </button>
            </div>

            
        </Layout>
    );
}

export default NuevoExamen;
