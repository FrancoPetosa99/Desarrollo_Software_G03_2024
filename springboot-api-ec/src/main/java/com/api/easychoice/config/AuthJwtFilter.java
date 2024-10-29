// package com.api.easychoice.config;

// import java.io.IOException;
// import java.util.Map;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.filter.OncePerRequestFilter;
// import com.api.easychoice.jwt.JwtToken;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.Cookie;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// public class AuthJwtFilter extends OncePerRequestFilter {

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//         throws ServletException, IOException {
    
//         final String jwtCookieName = "Auth_Token";
//         String jwtToken = null;

//         // obtener el JWT desde las cookies de la solicitud
//         if (request.getCookies() != null) {
//             for (Cookie cookie : request.getCookies()) {
//                 if (jwtCookieName.equals(cookie.getName())) {
//                     jwtToken = cookie.getValue();
//                     break;
//                 }
//             }
//         }

//         // verificar si el token existe
//         if (jwtToken == null) {
//             chain.doFilter(request, response);
//         }

//         // desencriptar los datos guardados en el token
//         Map<String, Object> payload = JwtToken.getPayload(jwtToken);

//         // verificar que el token sea valido
//         if (payload == null) {
//             chain.doFilter(request, response);
//         }

//         String nombre = payload.get("nombre").toString(); 
//         String apellido = payload.get("apellido").toString();
//         String email = payload.get("email").toString();
//         String id = payload.get("id").toString();

//         UserAuthDTO userAuth = new UserAuthDTO(nombre, apellido, email, id);

//         // seteo el usuario autenticado para que pueda ser accedido desde el contexto de seguridad
//         SecurityContextHolder
//         .getContext()
//         .setAuthentication(new UsernamePasswordAuthenticationToken(userAuth, null, null));
    
//         // continuar con la ejecución de la cadena
//         chain.doFilter(request, response);
//     }
// }