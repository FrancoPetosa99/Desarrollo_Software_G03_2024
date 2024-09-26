package com.api.easychoice.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.easychoice.model.Examen;
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
}
