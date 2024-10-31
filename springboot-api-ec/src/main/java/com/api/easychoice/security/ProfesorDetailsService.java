// package com.api.easychoice.security;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;
// import com.api.easychoice.model.Profesor;
// import com.api.easychoice.repository.ProfesorRepository;

// @Service
// public class ProfesorDetailsService implements UserDetailsService {
    
//     @Autowired
//     private ProfesorRepository profesorRepository;

//     @Override
//     public ProfesorUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
//         Profesor profesor = profesorRepository.findByEmail(email).orElse(null);

//         // si el profesor no existe devolver un error
//         if (profesor == null) throw new UsernameNotFoundException(email);

//         // se crea un objeto de UserDetails con los datos del profesor
//         String profesorEmail = profesor.getEmail();
//         String profesorPassword = profesor.getPassword();
//         String profesorId = profesor.getId();
//         String profesorNombre = profesor.getNombre();
//         String profesorApellido = profesor.getApellido();
//         // UserDetails user = new User(profesorEmail, profesorPassword, new ArrayList<>());
//         ProfesorUserDetails user = new ProfesorUserDetails
//                                     .Builder()
//                                     .setEmail(profesorEmail)
//                                     .setPassword(profesorPassword)
//                                     .setNombre(profesorNombre)
//                                     .setApellido(profesorApellido)
//                                     .setId(profesorId)
//                                     .build();
                                    
//         return user;
//     }
// }