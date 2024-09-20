package com.easychoice.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.easychoice.api.model.Profesor;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Long> {
    
}