package com.api.easychoice.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.api.easychoice.dto.ProfesorDTO;
import com.api.easychoice.exception.NotFoundException;
import com.api.easychoice.model.Profesor;
import com.api.easychoice.repository.ProfesorRepository;

@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Profesor crearProfesor(ProfesorDTO profesorDTO) {

        //1. validar que los datos sean validos

        //2. verificar que el email del profesor no se encuentre duplicado

        //3. hashear la contraseña para mayor seguridad 
        String password = profesorDTO.getPassword();
        profesorDTO.setPassword(passwordEncoder.encode(password));

        //4. crear el profesor con sus datos y contraseña hasheada
        Profesor profesor = new Profesor(
            profesorDTO.getNombre(),
            profesorDTO.getApellido(),
            profesorDTO.getEmail(),
            profesorDTO.getPassword()
        );

        //5. invocar al repositorio para guardar en base de datos al profesor
        profesorRepository.save(profesor);
        return profesor;
    }

    //devuelve los profesores cargardos en la base de datos
    public List<Profesor> getProfesores(){
        return profesorRepository.findAll();
    }

    public Profesor getProfesorById(String id) throws NotFoundException {
        Profesor profesor = profesorRepository.findById(id).orElse(null);
        if (profesor == null) throw new NotFoundException("No existe profesor con id: ".concat(id));
        return profesor;
    }

    public Profesor getProfesorByEmail(String id) {
        return profesorRepository.findByEmail(id).orElse(null);
    }
}