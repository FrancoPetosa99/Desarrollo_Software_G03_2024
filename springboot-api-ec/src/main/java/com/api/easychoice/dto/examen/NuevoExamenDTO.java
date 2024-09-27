package com.api.easychoice.dto.examen;

import java.util.List;
import com.api.easychoice.dto.PreguntaDTO;
import com.api.easychoice.dto.examen.ExamenDTO;


public class NuevoExamenDTO extends ExamenDTO {
    
    private String profesorId;
    private List<PreguntaDTO> preguntas;

    // Constructor - se implementa en la creacion de un nuevo examen
    public NuevoExamenDTO(
            String titulo, 
            String tema, 
            String fechaLimite, 
            int tiempoLimite, 
            List<PreguntaDTO> preguntas,
            String profesorId
        ) {

        super(titulo, tema, fechaLimite, tiempoLimite);
        this.profesorId = profesorId;
        this.preguntas = preguntas;
        
    }

    public String getProfesorId() {
        return profesorId;
    }

    public List<PreguntaDTO> getPreguntas() {
        return preguntas;
    }

}