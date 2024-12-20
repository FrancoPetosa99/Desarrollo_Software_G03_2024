import React, { useState } from 'react';
import './CargadorArchivo.css'; // Archivo CSS para los estilos

function CargadorDeArchivos({ onChange }) {
    const [archivo, setArchivo] = useState(null);
    const [preview, setPreview] = useState(null);
    const [arrastrando, setArrastrando] = useState(false);

    const manejarCambioArchivo = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArchivo(file); // Almacena el archivo en el estado local
            setPreview(URL.createObjectURL(file)); // Crear una URL para la vista previa
            onChange((file)); // Devuelve el archivo al manejador
        }
    };;


    // Funciones para manejar el arrastre
    const manejarArrastrarSobre = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(true);
    };

    const manejarSoltar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(false);
        const file = e.dataTransfer.files[0]; // Obtener archivo desde dataTransfer
        if (file) {
            setArchivo(file);
            setPreview(URL.createObjectURL(file));
            onChange(file);
        }
    };

    const manejarArrastrarSalir = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setArrastrando(false);
    };

    const eliminarImagen = () => {
        setArchivo(null);
        setPreview(null);
        onChange(null);
    };

    return (
        <div>
            <label
                className={`custum-file-upload ${arrastrando ? 'dragging' : ''} ${preview ? 'with-image' : ''}`}
                htmlFor="file"
                onDragOver={manejarArrastrarSobre}
                onDrop={manejarSoltar}
                onDragLeave={manejarArrastrarSalir}
            >
                {preview ? (
                    <div className="preview">
                        <img src={preview} alt="Vista previa" />
                        <div className="eliminar-imagen">
                            <svg
                                className="feather feather-x-circle"
                                fill="none"
                                height="24"
                                stroke="#FE6A6B"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={eliminarImagen}
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" x2="9" y1="9" y2="15" />
                                <line x1="9" x2="15" y1="9" y2="15" />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <div className="text">
                            <span>{arrastrando ? 'Suelta la imagen aqu�' : 'Haz clic o arrastra una imagen'}</span>
                        </div>
                    </>
                )}
                <input type="file" id="file" name="image/*" disabled={!!preview} onChange={manejarCambioArchivo} />
            </label>
        </div>
    );

}

export default CargadorDeArchivos;