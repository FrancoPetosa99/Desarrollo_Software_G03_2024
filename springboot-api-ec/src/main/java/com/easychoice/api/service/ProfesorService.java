package com.easychoice.api.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easychoice.api.model.Profesor;
import com.easychoice.api.repository.ProfesorRepository;

@Service
public class ProfesorService {
    
    @Autowired
    private ProfesorRepository profesorRepository;

    public Profesor getProfesorById(Long id) {
        return profesorRepository.findById(id).orElse(null);
    }

    public Profesor createProfesor(Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    public ArrayList<Profesor> getAllProfesores() {
        return (ArrayList<Profesor>) profesorRepository.findAll();
    }
   
}