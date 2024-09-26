package com.api.easychoice.model;

import java.util.List;
import com.api.easychoice.model.AlumnoExamen;

import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
@Table(name = "Alumnos")
public class Alumno {

    @Id
    private String id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "email")
    private String email;

    // un Alumno posee muchos AlumnosExamenes
    @OneToMany(mappedBy = "alumno")
    private List<AlumnoExamen> alumnoExamenes;

    public Alumno() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public Alumno(String nombre, String apellido, String email) {
        this(); 
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }

    // Métodos getters
    public String getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getEmail() {
        return email;
    }
}