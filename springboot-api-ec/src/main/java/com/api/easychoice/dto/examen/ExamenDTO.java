package com.api.easychoice.dto.examen;

public class ExamenDTO {

    private String titulo;
    private String tema;
    private String fechaLimite;
    private int tiempoLimite;

    // Constructor
    public ExamenDTO(
            String titulo, 
            String tema, 
            String fechaLimite, 
            int tiempoLimite
        ) {

        this.titulo = titulo;
        this.tema = tema;
        this.fechaLimite = fechaLimite;
        this.tiempoLimite = tiempoLimite;
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
