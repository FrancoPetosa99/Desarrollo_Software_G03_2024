package com.api.easychoice.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Map;

public class JwtToken {

    private static final String SECRET_KEY = "Desarrollo_Software_2024";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 horas    

    // Constructor
    private JwtToken() {}

    public static String generateToken(Map<String, Object> claims, String subject, long time) {
        return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + time))
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        .compact();
    }

    public static Claims extractClaims(String token) {
        return Jwts.parser()
        .setSigningKey(SECRET_KEY)
        .parseClaimsJws(token)
        .getBody();
    }

    public static String extractSubject(String token) {
        return extractClaims(token)
        .getSubject();
    }

    public static boolean isTokenExpired(String token) {
        return extractClaims(token)
        .getExpiration()
        .before(new Date());
    }

    public static boolean validateToken(String token, String subject) {
        final String extractedSubject = extractSubject(token);
        return (extractedSubject.equals(subject) && !isTokenExpired(token));
    }
}
