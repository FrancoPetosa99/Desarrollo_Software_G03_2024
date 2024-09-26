package com.api.easychoice.model;

import java.util.List;

import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "Examenes")
public class Examen {

    @Id
    private String id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "tema")
    private String tema;

    @Column(name = "fechaLimite")
    private String fechaLimite;

    @Column(name = "tiempoLimite")
    private int tiempoLimite;

    // un Examen posee un Profesor
    @ManyToOne
    @JoinColumn(name = "profesor_id", nullable = false)
    private Profesor profesor;

    // un Examen posee muchas Preguntas
    @OneToMany(mappedBy = "examen")
    private List<Pregunta> preguntas;

    public Examen() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public Examen(String titulo, String tema, String fechaLimite, int tiempoLimite) {
        this(); 
        this.titulo = titulo;
        this.tema = tema;
        this.fechaLimite = fechaLimite;
        this.tiempoLimite = tiempoLimite;
    }

}
