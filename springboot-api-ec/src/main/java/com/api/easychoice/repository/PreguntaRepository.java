package com.api.easychoice.repository;

import java.util.List;
import com.api.easychoice.model.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreguntaRepository extends JpaRepository<Pregunta, String> {
    List<Pregunta> findByExamenId(String examenId);
}