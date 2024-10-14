package com.api.easychoice.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;

public class ProfesorUserDetails implements UserDetails {

    private final String email;
    private final String password;
    private final String nombre;
    private final String apellido;
    private final String id;

    public ProfesorUserDetails(Builder builder) {
        this.email = builder.getEmail();
        this.password = builder.getPassword();
        this.nombre = builder.getNombre();
        this.apellido = builder.getApellido();
        this.id = builder.getId();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null; // Puedes devolver una lista vacía o las autoridades si decides manejar roles más adelante
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email; // Utilizamos el email como username
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getId() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Clase Builder
    public static class Builder {

        private String email;
        private String password;
        private String nombre;
        private String apellido;
        private String id;

        public Builder() { }

        public String getEmail() {
            return email;
        }

        public String getPassword() {
            return password;
        }

        public String getNombre() {
            return nombre;
        }

        public String getApellido() {
            return apellido;
        }

        public String getId() {
            return id;
        }

        public Builder setEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder setPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder setNombre(String nombre) {
            this.nombre = nombre;
            return this;
        }

        public Builder setApellido(String apellido) {
            this.apellido = apellido;
            return this;
        }

        public Builder setId(String id) {
            this.id = id;
            return this;
        }

        public ProfesorUserDetails build() {
            return new ProfesorUserDetails(this);
        }

    }
}