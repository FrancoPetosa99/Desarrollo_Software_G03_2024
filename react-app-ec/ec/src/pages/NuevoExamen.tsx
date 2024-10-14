import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import Archivo from '../components/CargadorArchivo';
import './NuevoExamen.css';
function NuevoExamen() {
    const profesorId = localStorage.getItem('profesorId');
    const [formulario, setFormulario] = useState({
        profesorId: profesorId,
        titulo: '',
        tema: '',
        tiempoLimite: 0,
        //habilitado: false
        fechaLimite: new Date().toISOString().split('T')[0] // Fecha inicial actual
    });

    const maxCaracteres = 600;
    // Preguntas con sus respuestas y respuestasCorrectas
    const [preguntas, setPreguntas] = useState([
        { enunciado: '', puntaje: 1.0, archivo: null, opciones: [{ respuesta: '', correcta: true }, { respuesta: '', correcta: false }] }
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

    const manejarArchivoAdjunto = (indexPregunta, e) => {
        const archivo = e.target.files[0];
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[indexPregunta].archivo = archivo;
        setPreguntas(nuevasPreguntas);
    };

    // Agregar una nueva pregunta asegurando que no haya más de 10 preguntas
    const agregarPregunta = () => {
        if (preguntas.length < 10) {
            setPreguntas([...preguntas, { enunciado: '', archivo: null, puntaje: 1, opciones: [{ respuesta: '', correcta: true }, { respuesta: '', correcta: false }] }]);
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

            // Crear un FormData para enviar tanto los datos como los archivos
            const formData = new FormData();
            formData.append('profesorId', formulario.profesorId);
            formData.append('titulo', formulario.titulo);
            formData.append('tema', formulario.tema);
            formData.append('fechaLimite', formulario.fechaLimite);
            formData.append('tiempoLimite', tiempoLimiteEnMinutos);

            // Agregar las preguntas, opciones y archivos al FormData
            preguntas.forEach((pregunta, indexPregunta) => {
                formData.append(`preguntas[${indexPregunta}][enunciado]`, pregunta.enunciado);
                formData.append(`preguntas[${indexPregunta}][puntaje]`, pregunta.puntaje);

                pregunta.opciones.forEach((opcion, indexOpcion) => {
                    formData.append(`preguntas[${indexPregunta}][opciones][${indexOpcion}][respuesta]`, opcion.respuesta);
                    formData.append(`preguntas[${indexPregunta}][opciones][${indexOpcion}][correcta]`, opcion.correcta);
                });

                // Si hay archivo adjunto en la pregunta, añadirlo al formData
                if (pregunta.archivo) {
                    formData.append(`preguntas[${indexPregunta}][archivo]`, pregunta.archivo);
                }
            });
            try {
                // Realizar la solicitud POST con fetch
                const response = await fetch(endpoint + '/api/examenes', {
                    method: 'POST',
                    body: formData
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

                        <div className="pregunta-info">

                            <div className="char-limit">
                                {pregunta.enunciado.length}/{maxCaracteres}
                            </div>

                            <div className="puntaje">
                                <label htmlFor="pregunta-puntaje">Puntaje</label>
                                <input
                                    type="text"
                                    id="puntaje"
                                    min="0,00"
                                    max="1,00"
                                    pattern="[0-1],[0-9][0-9]"
                                    placeholder="0,00"
                                    style={{ width: "30px" }}
                                    onChange={manejarPuntaje}
                                    required
                                />
                            </div>
                        </div>
                        <div className='boton-eliminar-pregunta'>
                            {indexPregunta > 0 && (
                                <svg
                                    className="feather feather-x-circle"
                                    fill="none"
                                    height="24"
                                    stroke="#FE6A6B"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => eliminarPregunta(indexPregunta)} // Función para eliminar pregunta
                                    style={{ cursor: "pointer" }} // Cambiar el cursor para indicar que es clickeable
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" x2="9" y1="9" y2="15" />
                                    <line x1="9" x2="15" y1="9" y2="15" />
                                </svg>
                            )}
                        </div>

                    </div>

                    <Archivo></Archivo>

                    <p>Respuestas</p>

                    {pregunta.opciones.map((opcion, indexOpcion) => (

                        <div key={indexOpcion} className={`bloque-respuesta respuesta-${indexOpcion}`}>

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
                                    <label className="container">
                                        <input
                                            type="checkbox"
                                            checked={opcion.correcta}
                                            onChange={() => marcarComoCorrecta(indexPregunta, indexOpcion)}
                                        />
                                        <svg viewBox="0 0 64 64" height="2em" width="2em">
                                            <path
                                                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                                pathLength="575.0541381835938"
                                                className="path"
                                            />
                                        </svg>
                                    </label>
                                    {indexOpcion >= 2 && (
                                        <div className='boton-quitar-respuesta'>
                                            <svg
                                                className="feather feather-x-circle"
                                                fill="none"
                                                height="24"
                                                stroke="#FE6A6B"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                width="24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={() => quitarRespuesta(indexPregunta, indexOpcion)} // Función para eliminar pregunta
                                                style={{ cursor: "pointer" }} // Cambiar el cursor para indicar que es clickeable
                                            >
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="15" x2="9" y1="9" y2="15" />
                                                <line x1="9" x2="15" y1="9" y2="15" />
                                            </svg>
                                        </div>
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
                                    color: 'white',
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
