package com.api.easychoice.response;

import java.util.List;

public class ResponseHttp {
    
    private String status;
    private int statusCode;
    private String message;
    private Object data;
    private String errorCode; // Código de error específico
    private long timestamp; // Marca de tiempo
    private String path; // Ruta de la solicitud
    private List<String> validationErrors; // Errores de validación
    private String requestId; // ID de solicitud
    private String userFriendlyMessage; // Mensaje amigable para el usuario

    public ResponseHttp() {
        this.timestamp = System.currentTimeMillis();
    }

    public ResponseHttp setStatus(String status) {
        this.status = status;
        return this;
    }

    public ResponseHttp setStatusCode(int statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    public ResponseHttp setMessage(String message) {
        this.message = message;
        return this;
    }

    public ResponseHttp setData(Object data) {
        this.data = data;
        return this;
    }

    public ResponseHttp setErrorCode(String errorCode) {
        this.errorCode = errorCode;
        return this;
    }

    public ResponseHttp setPath(String path) {
        this.path = path;
        return this;
    }

    public ResponseHttp setValidationErrors(List<String> validationErrors) {
        this.validationErrors = validationErrors;
        return this;
    }

    public ResponseHttp setRequestId(String requestId) {
        this.requestId = requestId;
        return this;
    }

    public ResponseHttp setUserFriendlyMessage(String userFriendlyMessage) {
        this.userFriendlyMessage = userFriendlyMessage;
        return this;
    }

    public int getStatusCode() {
        return statusCode;
    }

}