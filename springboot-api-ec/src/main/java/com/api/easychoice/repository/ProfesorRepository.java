package com.api.easychoice.repository;

import com.api.easychoice.model.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, String> {
    // Puedes agregar métodos personalizados aquí si es necesario
}