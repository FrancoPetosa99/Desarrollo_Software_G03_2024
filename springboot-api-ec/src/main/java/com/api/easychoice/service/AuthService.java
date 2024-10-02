package com.api.easychoice.service;

import org.springframework.stereotype.Service;
import com.api.easychoice.dto.AuthDTO;
import com.api.easychoice.model.Profesor;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AuthService {
 
    @Autowired
    private ProfesorService profesorService;

    public String loginByCredentials(String email, String password) {

        Profesor profesor = profesorService.getProfesorByEmail(email);
        if(profesor == null){
            return null;

        }
        if(!password.equals(profesor.getPassword())){

            return null;
        }

        return profesor.getId();
    } 
}
