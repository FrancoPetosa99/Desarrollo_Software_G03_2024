package com.api.easychoice.repository;

import com.api.easychoice.model.InstanciaExamen;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstanciaExamenRepository extends JpaRepository<InstanciaExamen, String> {
    List<InstanciaExamen> findByExamenId(String examenId);
    boolean existsByEmailAndExamenId(String email, String examenId);
}