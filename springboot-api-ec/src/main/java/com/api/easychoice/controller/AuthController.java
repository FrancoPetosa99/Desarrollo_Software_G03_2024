package com.api.easychoice.controller;

import com.api.easychoice.dto.AuthDTO;
import com.api.easychoice.dto.ProfesorDTO;
import com.api.easychoice.exception.BadRequestException;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.exception.UnauthorizedException;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.response.HttpBodyResponse;
import com.api.easychoice.response.ResponseFactory;
import com.api.easychoice.service.AuthService;
import com.api.easychoice.service.ProfesorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ResponseFactory responseFactory;

    @Autowired
    private ProfesorService profesorService;

    @GetMapping("/")
    public ResponseEntity<Object> publicRoute() {
        return ResponseEntity.ok("Ruta publica...");
    }
    
    @PostMapping("/credentials")
    public ResponseEntity<Object> loginByCredentials(@RequestBody AuthDTO authDTO) {

        String email = authDTO.getEmail();
        String password = authDTO.getPassword();
        
        try {
            
            if (email == null || password == null) throw new BadRequestException("email y password son requeridos");
    
            String authToken = authService.loginByCredentials(email, password);

            HttpBodyResponse data = new HttpBodyResponse
                                    .Builder()
                                    .message("usuario autenticado")
                                    .data(authToken)
                                    .userFriendlyMessage("login exitoso")
                                    .build();
            
            // ResponseCookie authCookie = ResponseCookie.from("auth_token", authToken)
            // .httpOnly(false) // no permite que la cookie sea manipulada con js
            // .secure(true) // usar solo con HTTPS en un entorno de producción
            // .path("/") // hacer que la cookie esté disponible en toda la aplicación
            // .sameSite("None") // evitar que la cookie se envíe en solicitudes cross-site (CSRF)
            // .maxAge(7200) // cookie de sesion - no persiste en disco y se elimina si se cierra el navegador
            // .build();

            // devolver respuesta al cliente
            return ResponseEntity
            .status(data.getStatusCode())
            // .header("Set-Cookie", authCookie.toString())
            .body(data);

        }   catch(BadRequestException e) {
                return responseFactory.badRequest(e.getMessage());
        }   catch (NotFoundException e) {
                return responseFactory.errorNotFound("No existe Profesor con email: " + email);
        }   catch(UnauthorizedException e){
                return responseFactory.unauthorizedError();
        }   catch (Exception e) {
                return responseFactory.internalServerError();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody ProfesorDTO profesorDTO) {
        try {
            // 1. validar que los campos requeridos esten presentes
            // 2. invocar al servicio de profesores para crearlo
            Profesor profesor = profesorService.crearProfesor(profesorDTO);

            HttpBodyResponse data = new HttpBodyResponse
                                .Builder()
                                .message("Se ha registrado el profesor")
                                .status("Success")
                                .statusCode(200)
                                .userFriendlyMessage("Se ha registrado el profesor")
                                .data(profesor)
                                .build();
            // devolver respuesta al cliente
            return ResponseEntity
            .status(data.getStatusCode())
            .body(data);

        }catch (Exception e) {
            // devolver respuesta al cliente
            return ResponseEntity
            .status(400)
            .body("Ha ocurrido un error");
        }
    }
}