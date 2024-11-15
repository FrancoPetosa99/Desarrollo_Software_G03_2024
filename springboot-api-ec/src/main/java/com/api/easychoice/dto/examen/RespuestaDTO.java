package com.api.easychoice.dto.examen;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RespuestaDTO {

    private String enunciado;
    private String opcion;
    private String opcionCorrecta;
    private float puntaje;
    
}
