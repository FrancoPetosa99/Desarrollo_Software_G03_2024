package com.api.easychoice.model;

import java.util.List;
import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import com.api.easychoice.model.Examen;
import lombok.Data;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@Entity
@Table(name = "InstanciasExamen")
public class InstanciaExamen {

    @Id
    private String id;

    @Column(name = "fecha")
    private String fecha;

    @Column(name = "resultado")
    private float resultado;

    @Column(name = "tiempo")
    private int tiempo;
    
    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "email")
    private String email;


    // una InstanciaExamen posee muchas Respuestas
    // una Respuesta posee una InstanciaExamen
    @OneToMany(mappedBy = "instanciaExamen", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Respuesta> respuestas ;


    @ManyToOne
    @JoinColumn(name = "examenId", nullable = false)
    @JsonBackReference
    private Examen examen;


    public InstanciaExamen() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public InstanciaExamen(String fecha, float resultado, int tiempo, String nombre, String apellido, String email, String examenId) {
        this(); 
        this.fecha = fecha;
        this.resultado = resultado;
        this.tiempo = tiempo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;

    }
}