package com.api.easychoice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

import com.api.easychoice.dto.examen.ExamenDTO;
import com.api.easychoice.dto.examen.NuevoExamenDTO;
import com.api.easychoice.dto.OpcionDTO;
import com.api.easychoice.dto.PreguntaDTO;
import com.api.easychoice.mapper.ExamenMapper;
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

        // instanciar un mapper de examenes
        ExamenMapper mapperToExamDTO = new ExamenMapper();
        
        // mappear los examenes a una lista de dtos
        List<ExamenDTO> listaExamenes = examenes
                                        .stream()
                                        .map(examen -> mapperToExamDTO.getByProfesorId(examen))
                                        .collect(Collectors.toList());

        // devolver respuesta al cliente
        return ResponseEntity
        .status(200)
        .body(listaExamenes);
    }

    @PostMapping()
    public ResponseEntity<Object> crearExamen(@RequestBody NuevoExamenDTO examenDTO) {

        String profesorId = examenDTO.getProfesorId();
        Profesor profesor = profesorService.getProfesorById(profesorId);

        // validar si existe el profesor
        if(profesor == null) {
            return ResponseEntity   
            .badRequest()
            .body("No existe profesor con id: " + profesorId);
        }
        
        // instanciar un mapper de examenes para crear un nuevo Examen
        ExamenMapper mapperToExam = new ExamenMapper(); 
        Examen examen = mapperToExam.nuevoExamen(examenDTO, profesor);

        // invocar al servicio para crear un Examen
        examenService.crearExamen(examen);

        // devolver respuesta al cliente
        return ResponseEntity.status(201).body("Se ha creado con exito el examen");
    }
}