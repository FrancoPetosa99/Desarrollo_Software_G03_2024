package com.api.easychoice.config;

public class UserAuthDTO {
    
    private String nombre;
    private String apellido;
    private String email;
    private String id;

    public UserAuthDTO(String nombre, String apellido, String email, String id) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public String getApellido() {
        return this.apellido;
    }

    public String getEmail() {
        return this.email;
    }

    public String getId() {
        return this.id;
    }
}

