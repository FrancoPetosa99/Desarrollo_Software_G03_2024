import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import './NuevoExamen.css';
function NuevoExamen() {
    // Inicializando el formulario con los valores necesarios
    const [formulario, setFormulario] = useState({
        profesorId: "",
        titulo: '',
        tema: '',
        tiempoLimite: 0,
        //habilitado: false
        fechaLimite: new Date().toISOString().split('T')[0] // Fecha inicial actual
    });

    const maxCaracteres = 600;

    // Preguntas con sus respuestas y respuestasCorrectas
    const [preguntas, setPreguntas] = useState([
        { enunciado: '', puntaje: 1.0, opciones: [{ respuesta: '', correcta: false }, { respuesta: '', correcta: false }] }
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
            setPreguntas([...preguntas, { enunciado: '', puntaje: 1.0, opciones: [{ respuesta: '', correcta: false }, { respuesta: '', correcta: false }] }]);
        }
    };

    // Manejar cambios en el texto de la pregunta
    const manejarTextoPregunta = (indexPregunta: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].enunciado = value;
        setPreguntas(nuevasPreguntas);

        // Ajustar altura del textarea
        e.target.style.height = 'auto'; // Reiniciar altura
        e.target.style.height = `${e.target.scrollHeight}px`; // Ajustar altura
    };

    // Manejar cambios en el texto de las respuestas
    const manejarTextoRespuesta = (indexPregunta: number, indexOpcion: number, value: string) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].opciones[indexOpcion].respuesta = value;
        setPreguntas(nuevasPreguntas);
    };

    // Agregar una respuesta adicional, asegurando que no haya más de 4 respuestas por pregunta
    const agregarRespuesta = (index: number) => {
        const nuevasPreguntas = [...preguntas];
        if (nuevasPreguntas[index].opciones.length < 4) {
            nuevasPreguntas[index].opciones.push({ respuesta: '', correcta: false });
            setPreguntas(nuevasPreguntas);
        }
    };

    // Marcar una respuesta como correcta (se permite más de una)
    const marcarComoCorrecta = (indexPregunta: number, indexRespuesta: number) => {
        const nuevasPreguntas = [...preguntas];
        const opciones = nuevasPreguntas[indexPregunta].opciones;

        opciones.forEach((opcion, i) => {
            // Si la opción es la seleccionada, cambia su valor 'correcta'
            if (i === indexRespuesta) {
                opcion.correcta = !opcion.correcta;
            } else {
                opcion.correcta = false; // Si solo quieres que una opción sea correcta
            }
        });

        setPreguntas(nuevasPreguntas);
    };

    // Quitar una respuesta de la lista, y removerla de las respuestas correctas si está marcada
    const quitarRespuesta = (indexPregunta: number, indexRespuesta: number) => {
        const nuevasPreguntas = [...preguntas];

        // Eliminar la respuesta en el índice proporcionado
        nuevasPreguntas[indexPregunta].opciones.splice(indexRespuesta, 1);

        setPreguntas(nuevasPreguntas);
    };

    // Eliminar una pregunta del cuestionario
    const eliminarPregunta = (index: number) => {
        const nuevasPreguntas = preguntas.filter((_, i) => i !== index);
        setPreguntas(nuevasPreguntas);
    };

    const guardarExamen = async () => {
        // Obtener todos los campos requeridos
        const camposRequeridos = document.querySelectorAll('input[required], textarea[required]');
        let todosCompletos = true;

        // Verificar si todos los campos requeridos están completados
        camposRequeridos.forEach(campo => {
            if (campo instanceof HTMLInputElement || campo instanceof HTMLTextAreaElement) {
                if (!campo.value) {
                    todosCompletos = false;
                    campo.classList.add('is-invalid'); // Agregar clase para mostrar error
                } else {
                    campo.classList.remove('is-invalid'); // Eliminar clase si el campo está completo
                }
            }
        });

        if (todosCompletos) {
            const [horas, minutos] = formulario.tiempoLimite.split(':').map(Number);
            const tiempoLimiteEnMinutos = horas * 60 + minutos;
            const examenData = {
                profesorId: formulario.profesorId,
                titulo: formulario.titulo,
                tema: formulario.tema,
                fechaLimite: formulario.fechaLimite,
                tiempoLimite: tiempoLimiteEnMinutos,
                preguntas: preguntas.map(pregunta => ({
                    enunciado: pregunta.enunciado,
                    puntaje: pregunta.puntaje,
                    opciones: pregunta.opciones.map(opcion => ({
                        respuesta: opcion.respuesta,
                        correcta: opcion.correcta
                    }))
                }))
            };
            console.log(examenData)
            try {
                // Realizar la solicitud POST con fetch
                console.log( examenData)
                const response = await fetch('https://tu-endpoint.com/api/examenes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Indica que se enviará JSON
                    },
                    body: JSON.stringify(examenData) // Convierte el objeto a un string JSON
                });

                if (response.ok) { // Verifica si la respuesta fue exitosa
                    const data = await response.json(); // Parsear la respuesta como JSON
                    console.log("Examen guardado correctamente:", data);
                    alert("Examen guardado correctamente");
                } else {
                    console.error("Error al guardar el examen:", response.statusText);
                    alert("Hubo un error al guardar el examen");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                alert("Hubo un error al guardar el examen");
            }
        };
    }


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
                        id="tiempoLimite"
                        name="tiempoLimite"
                        value={formulario.tiempoLimite}
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
                        id="fechaLimite"
                        name="fechaLimite"
                        value={formulario.fechaLimite}
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
                            value={pregunta.enunciado}
                            onChange={(e) => manejarTextoPregunta(indexPregunta, e)}
                            required>
                        </textarea>

                        <span className="char-limit">
                            {pregunta.enunciado.length}/{maxCaracteres}
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

                    {pregunta.opciones.map((opcion, indexOpcion) => (

                        <div key={indexOpcion} className={`bloque-respuesta respuesta-${indexOpcion}`}>
                            <label htmlFor={`respuesta${indexOpcion + 1}`}>
                                Respuesta {indexOpcion + 1}
                            </label>
                            <div className='contenido-respuesta'>
            
                                <input
                                    id={`respuesta${indexPregunta}-${indexOpcion}`}
                                    placeholder="Ingresar Respuesta"
                                    maxLength={50}
                                    className={`input-respuesta ${opcion.correcta ? "input-correcta" : ""}`}
                                    value={opcion.respuesta}
                                    onChange={(e) => manejarTextoRespuesta(indexPregunta, indexOpcion, e.target.value)}
                                    data-correcta={opcion.correcta}
                                    required>
                                </input>
                                <div className="botones-respuesta">
                                    <button
                                        type="button"
                                        onClick={() => marcarComoCorrecta(indexPregunta, indexOpcion)}
                                        style={{ border: "black", background: "none" }}>
                                        {opcion.correcta ? "✔️" : "❌"}
                                    </button>
                                    {indexOpcion >= 2 && (
                                        <button
                                            type="button"
                                            className={`boton-quitar-respuesta boton-quitar-respuesta${indexOpcion}`}
                                            onClick={() => quitarRespuesta(indexPregunta, indexOpcion)}
                                        >
                                        Quitar
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
            
                    <div className='boton-agregar-respuesta'>
                        {preguntas[indexPregunta].opciones.length < 4 && (
                            <button
                                type="button"
                                className="btn"
                                style={{
                                    color: 'black',
                                    fontSize: '12px',
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
                                backgroundColor: '#19575F',
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
                            backgroundColor: '#1A525B',
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
