package com.api.easychoice.controller;

import com.api.easychoice.dto.AuthDTO;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.response.ErrorResponse;
import com.api.easychoice.response.ResponseHttp;
import com.api.easychoice.response.SuccessResponse;
import com.api.easychoice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/credentials")
    public ResponseEntity<Object> loginByCredentials(@RequestBody AuthDTO authDTO) {

        


        // devolver respuesta al cliente
        return ResponseEntity
        .status(201)
        .body("Token");
    }


    @PostMapping("/login")
    public ResponseEntity<Object> loginProfesor(@RequestBody AuthDTO authDTO) {
        
        Profesor profesor = authService.loginProfesor(authDTO.getEmail(), authDTO.getPassword());

        if (profesor != null) {
            // Retornar una respuesta exitosa con información del profesor
            //return ResponseEntity.ok("Login exitoso, bienvenido " + profesor.getNombre());
            return ResponseEntity.ok(profesor.getId());
        } else {
            // Retornar una respuesta de error (credenciales inválidas)
            //return ResponseEntity.status(401).body("Email o contraseña incorrectos");
            return ResponseEntity.status(401).build();
        }
    }
}