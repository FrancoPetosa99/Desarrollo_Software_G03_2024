package com.api.easychoice.response;

import org.springframework.http.ResponseEntity;

public class SuccessResponse {

    private ResponseHttp response;

    public SuccessResponse() {
        this.response = new ResponseHttp();
        this.response.setStatus("Success");
        this.response.setStatusCode(200);
    }

    public SuccessResponse status(String status) {
        this.response.setStatus(status);
        return this;
    }

    public SuccessResponse statusCode(int statusCode) {
        this.response.setStatusCode(statusCode);
        return this;
    }

    public SuccessResponse message(String message) {
        this.response.setMessage(message);
        return this;
    }

    public SuccessResponse data(Object data) {
        this.response.setData(data);
        return this;
    }

    public ResponseEntity<ResponseHttp> build() {
        return ResponseEntity
        .status(this.response.getStatusCode())
        .body(this.response);
    }

}
