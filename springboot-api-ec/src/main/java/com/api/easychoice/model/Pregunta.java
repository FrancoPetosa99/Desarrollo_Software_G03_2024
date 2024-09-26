package com.api.easychoice.model;

import java.util.List;
import java.util.ArrayList;
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
import jakarta.persistence.CascadeType;

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
    // si se destruye la Pregunta tambien se destruyen sus opciones
    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Opcion> opciones;

    public Pregunta() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public Pregunta(String enunciado, float puntaje, Examen examen) {
        this(); 
        this.enunciado = enunciado;
        this.puntaje = puntaje;
        this.examen = examen;
        this.opciones = new ArrayList<Opcion>();
    }

    public void nuevaOpcion(Opcion opcion) {
        opciones.add(opcion);
    }

}
