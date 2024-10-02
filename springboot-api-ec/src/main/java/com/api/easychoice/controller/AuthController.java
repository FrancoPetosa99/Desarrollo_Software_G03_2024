package com.api.easychoice.controller;

import com.api.easychoice.dto.AuthDTO;
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
}