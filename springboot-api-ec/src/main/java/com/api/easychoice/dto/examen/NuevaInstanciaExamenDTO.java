package com.api.easychoice.dto.examen;

import java.util.List;
import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class NuevaInstanciaExamenDTO {
    
    private String fecha;
    private String nombre;
    private String apellido;
    private String email;
    private int tiempo;
    private float resultado;
    private List<RespuestaDTO> respuestas;
    
}