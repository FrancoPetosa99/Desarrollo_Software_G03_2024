package com.api.easychoice.service;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.exception.UnauthorizedException;
import com.api.easychoice.jwt.JwtToken;
// import com.api.easychoice.security.ProfesorUserDetails;
import com.api.easychoice.model.Profesor;

@Service
public class AuthService {

    // @Autowired
    // private AuthenticationManager authenticationManager;

    @Autowired
    private ProfesorService profesorService;

    public String loginByCredentials(String email, String password) throws NotFoundException, UnauthorizedException {

        // crear una petición de autenticación con email y password
        // UsernamePasswordAuthenticationToken emailAndPasswordAuthentication = new UsernamePasswordAuthenticationToken(email, password);
            
        // el AuthenticationManager se encarga de resolver la petición delegando la responsabilidad a uno de sus proveedores de autenticación
        // los proveedores de autenticación definen la diferentes estrategias de autenticación en la aplciación
        // Authentication authentication = authenticationManager.authenticate(emailAndPasswordAuthentication);
        
        // obtener los detalles del usuario autenticado
        // ProfesorUserDetails profesorUserDetails = (ProfesorUserDetails) authentication.getPrincipal();

        Profesor profesor = profesorService.getProfesorByEmail(email);

        // generar el token JWT con los claims del usuario
        String token = JwtToken
        .generateToken()
        .addClaim("email", profesor.getEmail())
        .addClaim("nombre", profesor.getNombre())
        .addClaim("apellido", profesor.getApellido())
        .addClaim("id", profesor.getId())
        .setSubject(profesor.getId())
        .setTimeHours(20) // establecer tiempo de expiración del token
        .build();
                        
        return token;
    } 
}