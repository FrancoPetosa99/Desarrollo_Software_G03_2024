package com.easychoice.api.controller;

import com.easychoice.api.model.Profesor;
import com.easychoice.api.service.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfesorController {

    @Autowired
    private ProfesorService profesorService;

    @GetMapping("/profesores/{id}")
    public Profesor getProfesorById(@PathVariable Long id) {
        return profesorService.getProfesorById(id);
    }

    @GetMapping("/profesores")
    public Profesor getAllProfesores(@PathVariable Long id) {
        return profesorService.getAllProfesores();
    }

    @PostMapping("/profesores")
    public Profesor createProfesor(@RequestBody Profesor profesor) {
        return profesorService.createProfesor(profesor);
    }
}