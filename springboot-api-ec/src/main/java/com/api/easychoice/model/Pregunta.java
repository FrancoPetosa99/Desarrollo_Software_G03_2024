package com.api.easychoice.model;

import java.util.List;
import com.api.easychoice.model.Examen;
import com.api.easychoice.model.Opcion;
import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "Preguntas")
public class Pregunta {

    @Id
    private String id;

    @Column(name = "enunciado")
    private String enunciado;

    @Column(name = "puntaje")
    private float puntaje;

    // Una Pregunta posee un Examen
    @ManyToOne
    @JoinColumn(name = "examen_id", nullable = false)
    private Examen examen;

    // una Pregunta posee muchas opciones
    @OneToMany(mappedBy = "pregunta")
    private List<Opcion> opciones;

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
