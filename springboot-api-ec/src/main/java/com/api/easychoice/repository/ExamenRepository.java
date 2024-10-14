package com.api.easychoice.repository;

import com.api.easychoice.model.Examen;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamenRepository extends JpaRepository<Examen, String> {
    List<Examen> findByProfesorId(String profesorId);
    Examen findExamenById(String id);
}