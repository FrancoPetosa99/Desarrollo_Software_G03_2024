package com.api.easychoice.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Map;

public class TokenHandler {

    private static final String SECRET_KEY = "Desarrollo_Software_2024";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 horas

    // Constructor privado para evitar instanciación
    private TokenHandler() {}

    public static String generateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }    
}