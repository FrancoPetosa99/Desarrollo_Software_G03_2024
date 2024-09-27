package com.api.easychoice.mapper;

import com.api.easychoice.dto.ExamenDTO;
import com.api.easychoice.model.Examen;

public class ExamenMapper {

    public ExamenMapper() { }

    public ExamenDTO getByProfesorId(Examen examen){
        ExamenDTO dto = new ExamenDTO();
        dto.setTitulo(examen.getTitulo());
        dto.setTema(examen.getTema());
        dto.setFechaLimite(examen.getFechaLimite());
        dto.setTiempoLimite(examen.getTiempoLimite());
        return dto;
    }

}
