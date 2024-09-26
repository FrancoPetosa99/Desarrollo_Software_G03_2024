package com.api.easychoice.dto;

import java.util.List;
import com.api.easychoice.dto.PreguntaDTO;


public class ExamenDTO {

    private String titulo;
    private String tema;
    private String fechaLimite;
    private int tiempoLimite;
    private String profesorId;
    private List<PreguntaDTO> preguntas;

    // Constructor
    public ExamenDTO(
            String titulo, 
            String tema, 
            String fechaLimite, 
            int tiempoLimite, 
            List<PreguntaDTO> preguntas,
            String profesorId
        ) {

        this.titulo = titulo;
        this.tema = tema;
        this.fechaLimite = fechaLimite;
        this.tiempoLimite = tiempoLimite;
        this.profesorId = profesorId;
        this.preguntas = preguntas;

    }

    public String getTitulo() {
        return titulo;
    }

    public String getTema() {
        return tema;
    }

    public String getFechaLimite() {
        return fechaLimite;
    }

    public int getTiempoLimite() {
        return tiempoLimite;
    }

    public String getProfesorId() {
        return profesorId;
    }

    public List<PreguntaDTO> getPreguntas() {
        return preguntas;
    }

}