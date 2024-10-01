package com.api.easychoice.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.api.easychoice.dto.AuthDTO;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.repository.ProfesorRepository;

@Service
public class AuthService {
 
    public String loginByCredentials(AuthDTO credentials) {

        

        return "Token";
    } 

    @Autowired ProfesorRepository profesorRepository;

    public Profesor loginProfesor(String email, String password) {
        Optional<Profesor> profesorOpt = profesorRepository.findByEmail(email);
        
        if (profesorOpt.isPresent()) {
            Profesor profesor = profesorOpt.get();
            
            // Verificar si la contraseña es correcta
            /* 
            if (passwordEncoder.matches(password, profesor.getPassword())) {
                return profesor; // Autenticación exitosa
            }
            */
            if(password.equals(profesor.getPassword())){
                return profesor; // Autenticación exitosa
            } 
        }
        
        return null; // Falló el login (email o contraseña incorrectos)
    }




}
