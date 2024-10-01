package com.api.easychoice.response;

import org.springframework.http.ResponseEntity;

public class ErrorResponse extends RuntimeException{
    
    private ResponseHttp response;

    public ErrorResponse() {
        this.response = new ResponseHttp();
        this.response.setStatus("error");
        this.response.setStatusCode(500);
    }

    public ErrorResponse status(String status) {
        this.response.setStatus(status);
        return this;
    }

    public ErrorResponse statusCode(int statusCode) {
        this.response.setStatusCode(statusCode);
        return this;
    }

    public ErrorResponse message(String message) {
        this.response.setMessage(message);
        return this;
    }

    public ResponseEntity<ResponseHttp> build() {
        return ResponseEntity
        .status(this.response.getStatusCode())
        .body(this.response);
    }
}