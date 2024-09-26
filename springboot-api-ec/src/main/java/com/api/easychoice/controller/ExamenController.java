package com.api.easychoice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.api.easychoice.dto.ExamenDTO;
import com.api.easychoice.dto.OpcionDTO;
import com.api.easychoice.dto.PreguntaDTO;
import com.api.easychoice.model.Examen;
import com.api.easychoice.model.Opcion;
import com.api.easychoice.model.Pregunta;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.service.ExamenService;
import com.api.easychoice.service.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/examenes")
public class ExamenController {

    @Autowired
    private ExamenService examenService;

    @Autowired
    private ProfesorService profesorService;

    @GetMapping("/profesores/{id}")
    public ResponseEntity<Object> getExamenesByProfesorId(@PathVariable String id) {

        // invocar servicio para obtener los examenes
        List<Examen> examenes = examenService.getExamenByProfesorId(id);
        
        // devolver respuesta al cliente
        return ResponseEntity
        .status(200)
        .body(examenes);
    }

    @PostMapping()
    public ResponseEntity<Object> crearExamen(@RequestBody ExamenDTO examenDTO) {

        String profesorId = examenDTO.getProfesorId();
        Profesor profesor = profesorService.getProfesorById(profesorId);

        // validar si existe el profesor
        if(profesor == null) {
            return ResponseEntity   
            .badRequest()
            .body("No existe profesor con id: " + profesorId);
        }
        
        // instanciar un examen
        Examen examen = new Examen(
            examenDTO.getTitulo(),
            examenDTO.getTema(),
            examenDTO.getFechaLimite(),
            examenDTO.getTiempoLimite(),
            profesor
        );

        // crear preguntas para el examen
        for (PreguntaDTO preguntaDTO : examenDTO.getPreguntas()) {

            Pregunta pregunta = new Pregunta(
                preguntaDTO.getEnunciado(),
                preguntaDTO.getPuntaje(),
                examen
            );

            examen.nuevaPregunta(pregunta);

            // crear opciones para cada pregunta
            for (OpcionDTO opcionDTO : preguntaDTO.getOpciones()) {
                Opcion opcion = new Opcion(
                    opcionDTO.getRespuesta(),
                    opcionDTO.getCorrecta(),
                    pregunta
                );

                pregunta.nuevaOpcion(opcion);
            }
        }

        // invocar al servicio para crear un examen
        examenService.crearExamen(examen);

        // devolver respuesta al cliente
        return ResponseEntity.status(201).body("Se ha creado con exito el examen");
    }
}