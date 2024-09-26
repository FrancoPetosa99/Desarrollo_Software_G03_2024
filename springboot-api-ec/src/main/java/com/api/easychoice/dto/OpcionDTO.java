package com.api.easychoice.dto;

public class OpcionDTO {

    private String respuesta;
    private boolean correcta;    

    // Constructor
    public OpcionDTO(String respuesta, boolean correcta) {
        this.respuesta = respuesta;
        this.correcta = correcta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public boolean getCorrecta() {
        return correcta;
    }
}