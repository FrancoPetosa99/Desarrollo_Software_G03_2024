package com.api.easychoice.exception;

public class BadRequestException extends Exception {
    
    public BadRequestException() {
        super();
    }

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public BadRequestException(Throwable cause) {
        super(cause);
    }
}