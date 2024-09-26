package com.api.easychoice.model;

import java.util.List;
import com.api.easychoice.model.Opcion;
import com.api.easychoice.model.Alumno;

import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "AlumnoExamenes")
public class AlumnoExamen {

    @Id
    private String id;

    @Column(name = "fecha")
    private String fecha;

    @Column(name = "resultado")
    private float resultado;

    @Column(name = "tiempo")
    private int tiempo;

    // un AlumnoExamen posee muchas Opciones
    // una Opcion posee muchos AlumnoExamen
    @ManyToMany
    @JoinTable(
        name = "Respuestas",  // Nombre de la tabla intermedia
        joinColumns = @JoinColumn(name = "alumno_examen_id"),  // Clave foránea hacia AlumnoExamen
        inverseJoinColumns = @JoinColumn(name = "opcion_id")  // Clave foránea hacia Opcion
    )
    private List<Opcion> opciones;

    // un ExamenAlumno posee un Alumno
    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false)
    private Alumno alumno;

    public AlumnoExamen() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public AlumnoExamen(String fecha, float resultado, int tiempo) {
        this(); 
        this.fecha = fecha;
        this.resultado = resultado;
        this.tiempo = tiempo;
    }
 
}
