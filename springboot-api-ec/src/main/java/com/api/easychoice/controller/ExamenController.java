package com.api.easychoice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;
import com.api.easychoice.config.UserAuthDTO;
import com.api.easychoice.dto.examen.ExamenDTO;
import com.api.easychoice.dto.examen.NuevoExamenDTO;
import com.api.easychoice.exception.BadRequestException;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.mapper.ExamenMapper;
import com.api.easychoice.model.Examen;
import com.api.easychoice.model.Pregunta;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.response.HttpBodyResponse;
import com.api.easychoice.response.ResponseFactory;
import com.api.easychoice.service.ExamenService;
import com.api.easychoice.service.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/examenes")
@CrossOrigin(origins = "*")
public class ExamenController {

    @Autowired
    private ExamenService examenService;

    @Autowired
    private ProfesorService profesorService;

    @Autowired
    private ResponseFactory responseFactory;

    @GetMapping()
    public ResponseEntity<Object> getExamenesByProfesorId() {
        try {

            // obtener el Authentication desde el SecurityContext
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserAuthDTO user = (UserAuthDTO) authentication.getPrincipal();
            String profesorId = user.getId();

            // verificar que exista el id del examen
            if (profesorId == null) throw new BadRequestException("El id del profesor es requerido");
    
            // invocar servicio para obtener los examenes
            List<Examen> examenes = examenService.getExamenesByProfesorId(profesorId);
    
            // instanciar un mapper de examenes
            ExamenMapper mapperToExamDTO = new ExamenMapper();
            
            // mappear los examenes a una lista de dtos
            List<ExamenDTO> listaExamenes = examenes
                                            .stream()
                                            .map(examen -> mapperToExamDTO.getByProfesorId(examen))
                                            .collect(Collectors.toList());
    
           // construir la respuesta al cliente
           HttpBodyResponse data = new HttpBodyResponse
           .Builder()
           .status("Success")
           .statusCode(200)
           .message("Se han encontrado los examenes del profesor con id:", profesorId)
           .data(listaExamenes)
           .build();

           // devolver respuesta al cliente
           return ResponseEntity
           .status(200)
           .body(data);
            
        } catch(BadRequestException e) {
                return responseFactory.badRequest(e.getMessage());
        }   catch (NotFoundException e) {
                return responseFactory.errorNotFound(e.getMessage());
        }   catch (Exception e) {
                return responseFactory.internalServerError();
        }
    }

    @GetMapping("/{id}/preguntas")
    public ResponseEntity<Object> getPreguntasByExamenId(@PathVariable String id) {
        try {

            // verificar que exista el id del examen
            if (id == null) throw new BadRequestException("El id del examen es requerido");

            // invocar servicio para obtener los examenes
            List<Pregunta> preguntas = examenService.getPreguntas(id);

            // construir la respuesta al cliente
            HttpBodyResponse data = new HttpBodyResponse
            .Builder()
            .status("Success")
            .statusCode(200)
            .message("Se han encontrado las preguntas del examen con id:", id)
            .data(preguntas)
            .build();

            // devolver respuesta al cliente
            return ResponseEntity
            .status(200)
            .body(data);

        }   catch(BadRequestException e) {
                return responseFactory.badRequest(e.getMessage());
        }   catch (NotFoundException e) {
                return responseFactory.errorNotFound(e.getMessage());
        }   catch (Exception e) {
                return responseFactory.internalServerError();
        }
    }

    @PostMapping()
    public ResponseEntity<Object> crearExamen(@RequestBody NuevoExamenDTO examenDTO) {        
        try {

            // Obtener el Authentication desde el SecurityContext
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserAuthDTO user = (UserAuthDTO) authentication.getPrincipal();
            String profesorId = user.getId();
            
            // verificar que exista el id del profesor
            if (profesorId == null || profesorId.isEmpty()) throw new BadRequestException("El id del profesor es requerido");
            
            // obtener el profesor por id
            Profesor profesor = profesorService.getProfesorById(profesorId);

            // instanciar un mapper de examenes para crear un nuevo Examen
            ExamenMapper mapperToExam = new ExamenMapper(); 
            Examen examen = mapperToExam.nuevoExamen(examenDTO, profesor);

            // invocar al servicio para crear un Examen
            examenService.crearExamen(examen);

            // construir la respuesta al cliente
            HttpBodyResponse data = new HttpBodyResponse
            .Builder()
            .status("Success")
            .statusCode(200)
            .message("Se ha creado un nuevo examen")
            .data(examen.getId())
            .build();

            // devolver respuesta al cliente
            return ResponseEntity
            .status(200)
            .body(data);

        } catch(BadRequestException e) {
            return responseFactory.badRequest(e.getMessage());
        }   catch (NotFoundException e) {
                return responseFactory.errorNotFound(e.getMessage());
        }   catch (Exception e) {
                return responseFactory.internalServerError();
        }
    }
}