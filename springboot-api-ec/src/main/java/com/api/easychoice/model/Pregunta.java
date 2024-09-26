package com.api.easychoice.model;

import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

@Entity
@Table(name = "Preguntas")
public class Pregunta {

    @Id
    private String id;

    @Column(name = "enunciado")
    private String enunciado;

    @Column(name = "puntaje")
    private float puntaje;

    public Pregunta() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public Pregunta(String enunciado, float puntaje) {
        this(); 
        this.enunciado = enunciado;
        this.puntaje = puntaje;
    }

    public Opcion getRespuestaCorrecta() {

        // logica para recuperar la respuesta correcta

        // devolver respuesta al cliente
        return new Opcion();
    }
    
}
