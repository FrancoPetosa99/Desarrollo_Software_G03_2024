package com.api.easychoice.dto;

import java.util.List;
import com.api.easychoice.dto.OpcionDTO;

public class PreguntaDTO {

    private String enunciado;
    private float puntaje;
    private List<OpcionDTO> opciones;
    

    // Constructor
    public PreguntaDTO(String enunciado, float puntaje, List<OpcionDTO> opciones) {
        this.enunciado = enunciado;
        this.puntaje = puntaje;
        this.opciones = opciones;
    }

    public String getEnunciado() {
        return enunciado;
    }

    public float getPuntaje() {
        return puntaje;
    }

    public List<OpcionDTO> getOpciones() {
        return opciones;
    }

}