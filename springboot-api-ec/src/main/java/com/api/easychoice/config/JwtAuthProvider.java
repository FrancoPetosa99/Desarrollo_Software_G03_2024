// package com.api.easychoice.config;

// import java.util.ArrayList;
// import java.util.Collection;
// import java.util.Map;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.core.GrantedAuthority;
// import com.api.easychoice.jwt.JwtToken;

// public class JwtAuthProvider implements AuthenticationProvider {

//     @Override
//     public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        
//         String token = (String) authentication.getCredentials();
        
//         Map<String, Object> payload =  JwtToken.getPayload(token);

//         if (payload == null) throw new InvalidTokenException();

//         String nombre = payload.get("nombre").toString();
//         String apellido = payload.get("apellido").toString();
//         String email = payload.get("email").toString();
//         String id = payload.get("id").toString();

//         UserAuthDTO principal = new UserAuthDTO(nombre, apellido, email, id);

//         // actualmente la aplicación no maneja roles pero se considera a futuro...
//         Collection<GrantedAuthority> roles = new ArrayList<>();

//         // retornar token con los datos extraidos del token de autenticación
//         return new UsernamePasswordAuthenticationToken(principal, null, roles );
//     }

//     @Override
//     public boolean supports(Class<?> authentication) {
//         return JwtAuthentication.class.isAssignableFrom(authentication);
//     }
// }