package com.api.easychoice.controller;

import com.api.easychoice.dto.AuthDTO;
import com.api.easychoice.exception.BadRequestException;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.exception.UnauthorizedException;
import com.api.easychoice.response.HttpBodyResponse;
import com.api.easychoice.response.ResponseFactory;
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

    @Autowired
    private ResponseFactory responseFactory;

    @PostMapping("/credentials")
    public ResponseEntity<Object> loginByCredentials(@RequestBody AuthDTO authDTO) {

        String email = authDTO.getEmail();
        String password = authDTO.getPassword();
        
        try {
            

            if (email == null || password == null) throw new BadRequestException();
    
            String profesorId = authService.loginByCredentials(email, password);


            HttpBodyResponse data = new HttpBodyResponse
                                    .Builder()
                                    .message("usuario autenticado")
                                    .userFriendlyMessage("login exitoso")
                                    .data(profesorId)
                                    .build();

            // devolver respuesta al cliente
            return responseFactory.success(data);


        } catch(BadRequestException e) {
            return responseFactory.badRequest("Los datos proporcionados son inválidos. Por favor, revisa y vuelve a intentarlo");
        } catch (NotFoundException e) {
            return responseFactory.errorNotFound("No existe Profesor con email: " + email);
        } catch(UnauthorizedException e){
            return responseFactory.unauthorizedError();
        } catch (Exception e) {
            return responseFactory.internalServerError();
        }

    }
}