package com.api.easychoice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.easychoice.model.Profesor;
import com.api.easychoice.service.ProfesorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

    @Autowired
    private ProfesorService profesorService;
    
    @GetMapping
    public String getProfesores() {
        return "Lista de profesores";
    }

    @GetMapping("/{id}")
    public Profesor getProfesorById(@PathVariable String id) {
        Profesor profesor = profesorService.getProfesorById(id);
        return profesor;
    }

    @PostMapping()
    public Profesor crearProfesor(@RequestBody Profesor profesor) {
        
        // 1. validar que los campos requeridos esten presentes
        
        // 2. invocar al servicio de profesores para crearlo
        return profesorService.crearProfesor(profesor);
    }
}