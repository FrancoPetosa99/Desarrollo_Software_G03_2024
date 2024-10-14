package com.api.easychoice.dto.examen;

import java.util.List;
import com.api.easychoice.dto.PreguntaDTO;
import com.api.easychoice.dto.examen.ExamenDTO;


public class NuevoExamenDTO extends ExamenDTO {
    
    private List<PreguntaDTO> preguntas;

    // Constructor - se implementa en la petición para crear nuevo examen
    public NuevoExamenDTO(
            String titulo, 
            String tema, 
            String fechaLimite, 
            int tiempoLimite, 
            List<PreguntaDTO> preguntas
        ) {

        super(titulo, tema, fechaLimite, tiempoLimite);
        this.preguntas = preguntas;
        
    }
    
    public List<PreguntaDTO> getPreguntas() {
        return preguntas;
    }

}