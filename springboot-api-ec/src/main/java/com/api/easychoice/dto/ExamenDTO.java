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

    // Constructor - se implementa en la creacion de un nuevo examen
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

    // Constructor - se implementa para inicializar un constructor
    public ExamenDTO() {
        this.titulo = "";
        this.tema = "";
        this.fechaLimite = "";
        this.tiempoLimite = 0;
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

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }

    public void setFechaLimite(String fechaLimite) {
        this.fechaLimite = fechaLimite;
    }

    public void setTiempoLimite(int tiempoLimite) {
        this.tiempoLimite = tiempoLimite;
    }

}