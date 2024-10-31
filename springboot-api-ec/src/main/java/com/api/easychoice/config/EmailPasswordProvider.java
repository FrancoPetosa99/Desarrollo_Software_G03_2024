// package com.api.easychoice.config;

// import java.util.ArrayList;
// import java.util.Collection;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import com.api.easychoice.security.ProfesorDetailsService;
// import com.api.easychoice.security.ProfesorUserDetails;

// public class EmailPasswordProvider implements AuthenticationProvider {

//     private ProfesorDetailsService userDetailsService;
//     private PasswordEncoder passwordEncoder;

//     @Override
//     public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        
//         String email = (String) authentication.getPrincipal();
//         String password = (String) authentication.getCredentials();
        
//         // recuperar los datos del usuario para verificar las credenciales
//         ProfesorUserDetails principal = userDetailsService.loadUserByUsername(email);

//         // Verificar que el usuario exista y la contraseña sea correcta
//         if (principal == null || !passwordEncoder.matches(password, principal.getPassword())) throw new BadCredentialsException("Email or password is incorrect");
        
//         // actualmente la aplicación no maneja roles pero se considera a futuro...
//         Collection<GrantedAuthority> roles = new ArrayList<>();

//         // retornar token con los datos extraidos del token de autenticación
//         return new UsernamePasswordAuthenticationToken(principal, null, roles );
//     }

//     @Override
//     public boolean supports(Class<?> authentication) {
//         return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
//     }

//     public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
//         this.passwordEncoder = passwordEncoder;
//     }

//     public void setUserDetailsService(ProfesorDetailsService userDetailsService) {
//         this.userDetailsService = userDetailsService; 
//     }
// }
