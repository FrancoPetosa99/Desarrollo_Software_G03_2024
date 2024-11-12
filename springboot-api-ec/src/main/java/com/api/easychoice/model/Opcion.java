package com.api.easychoice.model;

import java.util.List;
import com.api.easychoice.model.Pregunta;
import com.api.easychoice.utils.UUIDGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    public Opcion() {
        this.id = new UUIDGenerator().generate(); 
    }

    // Constructor
    public Opcion(String respuesta, boolean correcta, Pregunta pregunta) {
        this(); 
        this.respuesta = respuesta;
        this.correcta = correcta;
        this.pregunta = pregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public boolean getCorrecta() {
        return correcta;
    }
}
