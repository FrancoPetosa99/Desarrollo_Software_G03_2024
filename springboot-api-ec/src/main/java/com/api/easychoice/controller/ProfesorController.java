package com.api.easychoice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.api.easychoice.dto.ProfesorDTO;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.service.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*") // Permite todos los orígenes
@RequestMapping("/api/profesores")
public class ProfesorController {

    @Autowired
    private ProfesorService profesorService;

    @PostMapping()
    public Profesor crearProfesor(@RequestBody ProfesorDTO profesorDTO) {
        
        // 1. validar que los campos requeridos esten presentes
        
        // 2. invocar al servicio de profesores para crearlo
        return profesorService.crearProfesor(profesorDTO);
    }
}