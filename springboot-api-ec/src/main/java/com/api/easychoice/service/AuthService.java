package com.api.easychoice.service;

import org.springframework.stereotype.Service;
import com.api.easychoice.dto.AuthDTO;

@Service
public class AuthService {
 
    public String loginByCredentials(AuthDTO credentials) {

        

        return "Token";
    } 
}
