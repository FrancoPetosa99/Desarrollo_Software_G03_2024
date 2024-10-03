package com.api.easychoice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.exception.UnauthorizedException;
import com.api.easychoice.model.Profesor;

@Service
public class AuthService {

    @Autowired
    private ProfesorService profesorService;

    public String loginByCredentials(String email, String password) throws NotFoundException, UnauthorizedException {

        Profesor profesor = profesorService.getProfesorByEmail(email);

        if (profesor == null) throw new NotFoundException();

        if(!password.equals(profesor.getPassword())) throw new UnauthorizedException("credenciales no validas");

        return profesor.getId();
    } 
}