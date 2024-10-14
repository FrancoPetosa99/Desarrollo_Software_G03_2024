package com.api.easychoice.config;

import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthCookieFilter extends OncePerRequestFilter {

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) 
        throws IOException, ServletException {

        final String jwtCookieName = "Auth_Token";
        String jwtToken = null;

        // obtener el JWT desde las cookies de la solicitud
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (jwtCookieName.equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        // si la cookie no existe detener ejecución y devolver respuesta de error al cliente
        if (jwtToken == null) chain.doFilter(request, response);

        // almacenar el token en el atributo de la solicitud
        request.setAttribute("jwtToken", jwtToken);

        // continua la ejecución de la cadena de filtros
        chain.doFilter(request, response);
    }
}

