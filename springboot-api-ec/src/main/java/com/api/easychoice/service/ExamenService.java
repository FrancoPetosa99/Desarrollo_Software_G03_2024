package com.api.easychoice.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.easychoice.exception.BadRequestException;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.model.Examen;
import com.api.easychoice.model.InstanciaExamen;
import com.api.easychoice.model.Pregunta;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.repository.ExamenRepository;
import com.api.easychoice.repository.InstanciaExamenRepository;
import com.api.easychoice.repository.ProfesorRepository;

@Service
public class ExamenService {

    @Autowired
    private ExamenRepository examenRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private InstanciaExamenRepository instanciaExamenRepository;

    public Examen crearExamen(Examen examen) {
        examenRepository.save(examen);
        return examen;
    }

    public List<Examen> getExamenesByProfesorId(String profesorId) throws NotFoundException{
        
        Profesor profesor = profesorRepository.findProfesorById(profesorId);

        if (profesor == null) throw new NotFoundException("No existe profesor con id: ".concat(profesorId));

        List<Examen> examenes = profesor.getExamenes();
        
        return examenes;
    }

    public List<Pregunta> getPreguntas(String examenId) throws NotFoundException{

        // recuperar examen por id
        Examen examen = examenRepository.findExamenById(examenId);

        // verificar que existe el examen
        if (examen == null) throw new NotFoundException("No existe examen con id: " + examenId);

        List<Pregunta> preguntas = examen.getPreguntas();

        return preguntas;
    }

    public List<InstanciaExamen> getExamenesById(String id) {
        List<InstanciaExamen> examenes = instanciaExamenRepository.findByExamenId(id);
        return examenes;
    }

    public InstanciaExamen crearInstanciaExamen(InstanciaExamen examen) throws BadRequestException {

        String email = examen.getEmail();
        String examenId = examen.getExamenId();

        if (instanciaExamenRepository.existsByEmailAndExamenId(email, examenId)) 
            throw new BadRequestException("Alumno ya rindio examen con ID: " + examenId);

        return instanciaExamenRepository.save(examen);
    }
}