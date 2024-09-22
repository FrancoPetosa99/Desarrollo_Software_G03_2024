package com.api.easychoice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {
    
    @GetMapping
    public String getProfesores() {
        return "Lista de profesores";
    }

    @GetMapping("/{id}")
    public String getProfesorById() {

        return "Lista de profesores";
    }
}