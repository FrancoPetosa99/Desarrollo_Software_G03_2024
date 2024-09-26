package com.api.easychoice.model;

import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

@Entity
@Table(name = "Preguntas")
public class Opcion {

    @Id
    private String id;

    @Column(name = "respuesta")
    private String respuesta;

    @Column(name = "correcta")
    private boolean correcta;

    public Opcion() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public Opcion(String respuesta, boolean correcta) {
        this(); 
        this.respuesta = respuesta;
        this.correcta = correcta;
    }
}
