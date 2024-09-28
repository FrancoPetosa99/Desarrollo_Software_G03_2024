package com.api.easychoice.mapper;

import com.api.easychoice.dto.examen.ExamenDTO;
import com.api.easychoice.dto.examen.NuevoExamenDTO;
import com.api.easychoice.dto.OpcionDTO;
import com.api.easychoice.dto.PreguntaDTO;
import com.api.easychoice.model.Examen;
import com.api.easychoice.model.Opcion;
import com.api.easychoice.model.Pregunta;
import com.api.easychoice.model.Profesor;

public class ExamenMapper {

    public ExamenMapper() { }

    public ExamenDTO getByProfesorId(Examen examen){

        // instanciar un DTO de Examen
        ExamenDTO dto = new ExamenDTO();

        // setear los atributos del dto
        dto.setTitulo(examen.getTitulo());
        dto.setTema(examen.getTema());
        dto.setFechaLimite(examen.getFechaLimite());
        dto.setTiempoLimite(examen.getTiempoLimite());
        dto.setId(examen.getId());

        return dto;
    }

    public Examen nuevoExamen(NuevoExamenDTO dto, Profesor profesor) {

        // instanciar un examen
        Examen examen = new Examen(
            dto.getTitulo(),
            dto.getTema(),
            dto.getFechaLimite(),
            dto.getTiempoLimite(),
            profesor
        );

        // crear preguntas para el examen
        for (PreguntaDTO preguntaDTO : dto.getPreguntas()) {

            Pregunta pregunta = new Pregunta(
                preguntaDTO.getEnunciado(),
                preguntaDTO.getPuntaje(),
                examen
            );

            examen.nuevaPregunta(pregunta);

            // crear opciones para cada pregunta
            for (OpcionDTO opcionDTO : preguntaDTO.getOpciones()) {
                Opcion opcion = new Opcion(
                    opcionDTO.getRespuesta(),
                    opcionDTO.getCorrecta(),
                    pregunta
                );

                pregunta.nuevaOpcion(opcion);
            }
        }

        return examen;
    }

}
