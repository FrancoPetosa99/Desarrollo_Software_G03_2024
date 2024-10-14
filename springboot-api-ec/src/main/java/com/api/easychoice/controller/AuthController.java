package com.api.easychoice.controller;

import com.api.easychoice.dto.AuthDTO;
import com.api.easychoice.exception.BadRequestException;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.exception.UnauthorizedException;
import com.api.easychoice.response.HttpBodyResponse;
import com.api.easychoice.response.ResponseFactory;
import com.api.easychoice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ResponseFactory responseFactory;

    @PostMapping("/")
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
            
            ResponseCookie authCookie = ResponseCookie.from("auth_token", authToken)
            .httpOnly(true) // no permite que la cookie sea manipulada con js
            .secure(false) // usar solo con HTTPS en un entorno de producción
            .path("/") // hacer que la cookie esté disponible en toda la aplicación
            .sameSite("None") // evitar que la cookie se envíe en solicitudes cross-site (CSRF)
            .maxAge(0) // cookie de sesion - no persiste en disco y se elimina si se cierra el navegador
            .build();

            // devolver respuesta al cliente
            return ResponseEntity
            .status(data.getStatusCode())
            .header("Set-Cookie", authCookie.toString())
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
}