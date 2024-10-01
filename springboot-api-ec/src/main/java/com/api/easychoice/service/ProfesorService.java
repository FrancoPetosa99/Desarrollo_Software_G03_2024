package com.api.easychoice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.repository.ProfesorRepository;

@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;

    public Profesor crearProfesor(Profesor profesor) {

        //1. validar que los datos sean validos

        //2. verificar que el email del profesor no se encuentre duplicado

        //3. invocar al repositorio para guardar en base de datos al profesor
        profesorRepository.save(profesor);
        return profesor;
    }

    //devuelve los profesores cargardos en la base de datos
    public List<Profesor> getProfesores(){
        return profesorRepository.findAll();
    }

    public Profesor getProfesorById(String id) {
        return profesorRepository.findById(id).orElse(null);
    }

    public Profesor getProfesorByEmail(String id) {
        return profesorRepository.findByEmail(id).orElse(null);
    }
}