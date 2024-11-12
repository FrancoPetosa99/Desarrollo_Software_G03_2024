package com.api.easychoice.model;

import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Entity
@Table(name = "Respuestas")
public class Respuesta {

    @Id
    private String id;

    @Column(name = "enunciado")
    private String enunciado;

    @Column(name = "opcion")
    private String opcion;

    @Column(name = "opcionCorrecta")
    private String opcionCorrecta;

    @Column(name = "puntaje")
    private float puntaje;

    @ManyToOne
    @JoinColumn(name = "examen_id", nullable = false)
    @JsonBackReference
    private InstanciaExamen instanciaExamen;

    public Respuesta() {
        this.id = new UUIDGenerator().generate(); 
    }

    public Respuesta(String enunciado, String opcion, String opcionCorrecta, float puntaje, InstanciaExamen examen) {
        this();
        this.enunciado = enunciado;
        this.opcion = opcion;
        this.opcionCorrecta = opcionCorrecta;
        this.puntaje = puntaje;
        this.instanciaExamen = examen;
    }
}