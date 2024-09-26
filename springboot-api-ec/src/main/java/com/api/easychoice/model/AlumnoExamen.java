package com.api.easychoice.model;

import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

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
