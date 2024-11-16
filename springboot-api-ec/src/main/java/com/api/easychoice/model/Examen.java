package com.api.easychoice.model;

import java.util.List;
import java.util.ArrayList;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.model.Pregunta;
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

    @Column(name = "imagen_fondo")
    private String imagenFondo;

    // un Examen posee un Profesor
    @ManyToOne
    @JoinColumn(name = "profesor_id", nullable = false)
    private Profesor profesor;

    // un Examen posee muchas Preguntas
    // si se destruye un Examen tambien se destruyen las Preguntas
    @OneToMany(mappedBy = "examen", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pregunta> preguntas;

    @OneToMany(mappedBy = "examen", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InstanciaExamen> instanciaExamen;

    public Examen() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public Examen(String titulo, String tema, String fechaLimite, int tiempoLimite, String imagenFondo, Profesor profesor) {
        this(); 
        this.titulo = titulo;
        this.tema = tema;
        this.fechaLimite = fechaLimite;
        this.tiempoLimite = tiempoLimite;
        this.imagenFondo = imagenFondo;
        this.profesor = profesor;
        this.preguntas = new ArrayList<Pregunta>();
    }

    public void nuevaPregunta(Pregunta pregunta) {
        preguntas.add(pregunta);
    }

    public String getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getTema() {
        return tema;
    }

    public String getFechaLimite() {
        return fechaLimite;
    }

    public int getTiempoLimite() {
        return tiempoLimite;
    }

    public String getImagenFondo() {
        return imagenFondo;
    }

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

}
