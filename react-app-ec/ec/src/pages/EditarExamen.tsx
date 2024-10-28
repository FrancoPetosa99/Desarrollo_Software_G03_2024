//import React, { useState, useEffect } from 'react';
//import Layout from '../components/Layout';
//import CargadorDeArchivos from '../components/CargadorArchivo';
//import './EditarExamen.css';

//function EditarExamen() {
//    const [formulario, setFormulario] = useState({
//        profesorId: '',
//        titulo: '',
//        tema: '',
//        tiempoLimite: 0,
//        fechaLimite: new Date().toISOString().split('T')[0]
//    });

//    const [preguntas, setPreguntas] = useState([]);
//    const maxCaracteres = 600;

//    // Obtener los datos del examen mediante POST
//    useEffect(() => {
//        const fetchExamen = async () => {
//            const examenId = 'ID_DEL_EXAMEN'; // Obtén el ID del examen que quieras cargar
//            try {
//                const response = await fetch(`/api/examenes/${examenId}`, {
//                    method: 'POST',
//                    headers: {
//                        'Content-Type': 'application/json',
//                    },
//                });
//                const data = await response.json();
//                setFormulario({
//                    profesorId: data.profesorId,
//                    titulo: data.titulo,
//                    tema: data.tema,
//                    tiempoLimite: data.tiempoLimite,
//                    fechaLimite: data.fechaLimite,
//                });
//                setPreguntas(data.preguntas);
//            } catch (error) {
//                console.error("Error al cargar el examen:", error);
//            }
//        };

//        fetchExamen();
//    }, []);

//    // Funciones de manejo similares a las que ya tienes para actualizar el estado
//    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//        const { name, value } = e.target;
//        setFormulario((prevFormulario) => ({
//            ...prevFormulario,
//            [name]: value,
//        }));
//    };

//    const manejarTextoPregunta = (indexPregunta: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
//        const { value } = e.target;
//        const nuevasPreguntas = [...preguntas];
//        nuevasPreguntas[indexPregunta].enunciado = value;
//        setPreguntas(nuevasPreguntas);
//    };

//    const manejarTextoRespuesta = (indexPregunta: number, indexOpcion: number, value: string) => {
//        const nuevasPreguntas = [...preguntas];
//        nuevasPreguntas[indexPregunta].opciones[indexOpcion].respuesta = value;
//        setPreguntas(nuevasPreguntas);
//    };

//    const guardarExamen = async () => {
//        // Obtener todos los campos requeridos
//        const camposRequeridos = document.querySelectorAll('input[required], textarea[required]');
//        let todosCompletos = true;

//        // Verificar si todos los campos requeridos están completados
//        camposRequeridos.forEach(campo => {
//            if (campo instanceof HTMLInputElement || campo instanceof HTMLTextAreaElement) {
//                if (!campo.value) {
//                    todosCompletos = false;
//                    campo.classList.add('is-invalid'); // Agregar clase para mostrar error
//                } else {
//                    campo.classList.remove('is-invalid'); // Eliminar clase si el campo está completo
//                }
//            }
//        });

//        if (todosCompletos) {
//            const [horas, minutos] = formulario.tiempoLimite.split(':').map(Number);
//            const tiempoLimiteEnMinutos = horas * 60 + minutos;

//            // Crear un FormData para enviar tanto los datos como los archivos
//            const formData = new FormData();
//            formData.append('profesorId', formulario.profesorId);
//            formData.append('titulo', formulario.titulo);
//            formData.append('tema', formulario.tema);
//            formData.append('fechaLimite', formulario.fechaLimite);
//            formData.append('tiempoLimite', tiempoLimiteEnMinutos);

//            // Agregar las preguntas, opciones y archivos al FormData
//            preguntas.forEach((pregunta, indexPregunta) => {
//                formData.append(`preguntas[${indexPregunta}][enunciado]`, pregunta.enunciado);
//                formData.append(`preguntas[${indexPregunta}][puntaje]`, pregunta.puntaje);

//                pregunta.opciones.forEach((opcion, indexOpcion) => {
//                    formData.append(`preguntas[${indexPregunta}][opciones][${indexOpcion}][respuesta]`, opcion.respuesta);
//                    formData.append(`preguntas[${indexPregunta}][opciones][${indexOpcion}][correcta]`, opcion.correcta);
//                });

//                // Si hay archivo adjunto en la pregunta, añadirlo al formData
//                if (pregunta.archivo) {
//                    formData.append(`preguntas[${indexPregunta}][archivo]`, pregunta.archivo);
//                }
//            });
//            console.log("Preguntas antes de enviar:", preguntas);
//            try {
//                // Realizar la solicitud PUT con fetch
//                const response = await fetch(endpoint + '/api/examenes/${id}', {
//                    method: 'PUT',
//                    body: formData
//                });

//                if (response.ok) { // Verifica si la respuesta fue exitosa
//                    const data = await response.json(); // Parsear la respuesta como JSON
//                    console.log("Examen guardado correctamente:", data);
//                    alert("Examen guardado correctamente");
//                } else {
//                    console.error("Error al guardar el examen:", response.statusText);
//                    alert("Hubo un error al guardar el examen");
//                }
//            } catch (error) {
//                console.error("Error en la solicitud:", error);
//                alert("Hubo un error al guardar el examen");
//            }
//        };
//    }

//    return (
//        <Layout>
//            <h1>Editar Examen</h1>
//            <div className='form-group'>
//                <label htmlFor="titulo">Título</label>
//                <input
//                    type="text"
//                    id="titulo"
//                    name="titulo"
//                    value={formulario.titulo}
//                    onChange={handleChange}
//                    required
//                />
//            </div>
//            <div className='form-group'>
//                <label htmlFor="tema">Tema</label>
//                <input
//                    type="text"
//                    id="tema"
//                    name="tema"
//                    value={formulario.tema}
//                    onChange={handleChange}
//                    required
//                />
//            </div>
//            <div className='form-group'>
//                <label htmlFor="tiempoLimite">Tiempo Límite</label>
//                <input
//                    type="time"
//                    id="tiempoLimite"
//                    name="tiempoLimite"
//                    value={formulario.tiempoLimite}
//                    onChange={handleChange}
//                    required
//                />
//            </div>
//            <div className='form-group'>
//                <label htmlFor="fechaLimite">Fecha Límite</label>
//                <input
//                    type="date"
//                    id="fechaLimite"
//                    name="fechaLimite"
//                    value={formulario.fechaLimite}
//                    onChange={handleChange}
//                />
//            </div>

//            {preguntas.map((pregunta, indexPregunta) => (
//                <div key={indexPregunta}>
//                    <label htmlFor={`pregunta${indexPregunta}`}>Pregunta {indexPregunta + 1}</label>
//                    <textarea
//                        id={`pregunta${indexPregunta}`}
//                        value={pregunta.enunciado}
//                        onChange={(e) => manejarTextoPregunta(indexPregunta, e)}
//                    />
//                    {pregunta.opciones.map((opcion, indexOpcion) => (
//                        <div key={indexOpcion}>
//                            <input
//                                type="text"
//                                value={opcion.respuesta}
//                                onChange={(e) => manejarTextoRespuesta(indexPregunta, indexOpcion, e.target.value)}
//                            />
//                        </div>
//                    ))}
//                </div>
//            ))}
//            <button onClick={guardarExamen}>Guardar Examen</button>
//        </Layout>
//    );
//}

//export default EditarExamen;
