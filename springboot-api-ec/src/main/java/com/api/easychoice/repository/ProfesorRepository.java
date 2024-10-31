package com.api.easychoice.repository;

import com.api.easychoice.model.Profesor;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, String> {
    Optional<Profesor> findByEmail(String email);
    Profesor findProfesorById(String profesorId);
    boolean existsByEmail(String email);
}