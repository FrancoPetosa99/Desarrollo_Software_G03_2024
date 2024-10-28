package com.api.easychoice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;
import com.api.easychoice.security.ProfesorDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.disable())
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/api/profesores").permitAll()
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
            // .anyRequest().denyAll() 
        )
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(authJwtFilter(), UsernamePasswordAuthenticationFilter.class)
        .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, AuthenticationConfiguration config) throws Exception {
        AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
        builder.authenticationProvider(jwtAuthProvider());
        builder.authenticationProvider(emailPasswordProvider(passwordEncoder(), profesorDetailsService()));
        return builder.build();
    }

    @Bean
    public AuthenticationProvider emailPasswordProvider(PasswordEncoder passwordEncoder, ProfesorDetailsService profesorDetailsService) {
        EmailPasswordProvider provider = new EmailPasswordProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(profesorDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationProvider jwtAuthProvider() {
        return new JwtAuthProvider();
    }

    @Bean
    public ProfesorDetailsService profesorDetailsService() {
        return new ProfesorDetailsService();
    }

    @Bean
    public OncePerRequestFilter authJwtFilter() {
        return new AuthJwtFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}