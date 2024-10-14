package com.api.easychoice.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.model.Examen;
import com.api.easychoice.model.Pregunta;
import com.api.easychoice.repository.ExamenRepository;

@Service
public class ExamenService {

    @Autowired
    private ExamenRepository examenRepository;

    public Examen crearExamen(Examen examen) {
        examenRepository.save(examen);
        return examen;
    }

    public List<Examen> getExamenByProfesorId(String profesorId) {
        return examenRepository.findByProfesorId(profesorId);
    }

    public List<Pregunta> getPreguntas(String examenId) throws NotFoundException{

        // recuperar examen por id
        Examen examen = examenRepository.findExamenById(examenId);

        // verificar que existe el examen
        if (examen == null) throw new NotFoundException("No existe examen con id: " + examenId);

        List<Pregunta> preguntas = examen.getPreguntas();

        return preguntas;
    }
}
