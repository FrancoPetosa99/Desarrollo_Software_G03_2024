package com.api.easychoice.model;


import com.api.easychoice.utils.UUIDGenerator;
import com.api.easychoice.model.Examen;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "Profesores")
public class Profesor {

    @Id
    private String id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    // un Profesor posee muchos Examenes
    @OneToMany(mappedBy = "profesor")
    private List<Examen> examenes;
    

    public Profesor() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public Profesor(String nombre, String apellido, String email, String password) {
        this(); 
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
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

    public String getPassword() {
        return password;
    }
}