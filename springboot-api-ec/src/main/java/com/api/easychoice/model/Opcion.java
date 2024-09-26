package com.api.easychoice.model;

import java.util.List;
import com.api.easychoice.model.AlumnoExamen;
import com.api.easychoice.model.Pregunta;
import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "Opciones")
public class Opcion {

    @Id
    private String id;

    @Column(name = "respuesta")
    private String respuesta;

    @Column(name = "correcta")
    private boolean correcta;

    // una Opcion posee una Pregunta
    @ManyToOne
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;

    // una Opcion posee muchos AlumnoExamen
    // un AlumnoExamen posee muchas Opciones
    // Relación Many-to-One con Pregunta
    @ManyToMany(mappedBy = "opciones")
    private List<AlumnoExamen> alumnoExamenes;

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
