package com.api.easychoice.model;

import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

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
