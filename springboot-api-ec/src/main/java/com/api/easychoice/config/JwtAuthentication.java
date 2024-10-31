// package com.api.easychoice.config;

// import org.springframework.security.authentication.AbstractAuthenticationToken;
// import org.springframework.security.core.GrantedAuthority;
// import java.util.Collection;

// public class JwtAuthentication extends AbstractAuthenticationToken {
    
//     private final Object principal;
//     private final String token;

//     public JwtAuthentication(String token) {
//         super(null);
//         this.token = token;
//         this.principal = null;
//         setAuthenticated(false);
//     }

//     public JwtAuthentication(Object principal, String token, Collection<? extends GrantedAuthority> authorities) {
//         super(authorities);
//         this.token = token;
//         this.principal = principal;
//         setAuthenticated(true);
//     }

//     @Override
//     public Object getCredentials() {
//         return this.token;
//     }

//     @Override
//     public Object getPrincipal() {
//         return this.principal;
//     }

//     public String getToken() {
//         return this.token;
//     }
// }