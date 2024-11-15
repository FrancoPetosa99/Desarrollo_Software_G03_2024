package com.api.easychoice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.exception.UnauthorizedException;
import com.api.easychoice.jwt.JwtToken;
import com.api.easychoice.model.Profesor;

@Service
public class AuthService {

    // @Autowired
    // private AuthenticationManager authenticationManager;

    @Autowired
    private ProfesorService profesorService;

    public String loginByCredentials(String email, String password) throws NotFoundException, UnauthorizedException {

        Profesor profesor = profesorService.getProfesorByEmail(email);

        // generar el token JWT con los claims del usuario
        String token = JwtToken
        .generateToken()
        .addClaim("email", profesor.getEmail())
        .addClaim("nombre", profesor.getNombre())
        .addClaim("apellido", profesor.getApellido())
        .addClaim("id", profesor.getId())
        .setSubject(profesor.getId())
        .setTimeHours(200) // establecer tiempo de expiración del token
        .build();
                        
        return token;
    } 
}