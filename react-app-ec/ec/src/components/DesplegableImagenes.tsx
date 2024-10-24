import React, { useState } from 'react';
import CargadorDeArchivos from '../components/CargadorArchivo';
import './DesplegableImagenes.css';
const DesplegableConImagenes = ({ onSelect }) => {
    const [imagenSeleccionada, setImagenSeleccionada] = useState('');
    const [imagenConfirmada, setImagenConfirmada] = useState(null);
    const [visible, setVisible] = useState(true);
    // Las imágenes y sus nombres correspondientes
    const imagenes = [
        { nombre: 'Genérico', url: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGenerico.jpg' },
        { nombre: 'Gears', url: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/fondoGears.png' },
        { nombre: 'David', url: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/c1ee3fa4b868350b1ba1f2b4e35c29fda081fc37/david.jpg' },
        { nombre: 'IA', url: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/refs/heads/main/IA%20brain.jpg' },
        { nombre: 'DNA', url: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/refs/heads/main/DNA.jpg' },
        { nombre: 'Math', url: 'https://raw.githubusercontent.com/Kleos-ops/Imagenes/refs/heads/main/Mates.webp' },
        
    ];

    const manejarSeleccion = (urlImagen) => {
        setImagenSeleccionada(urlImagen);
    };

    const manejarArchivoSeleccionado = (archivo) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const urlImagen = reader.result as string; // Obtener la URL de datos
            manejarSeleccion(urlImagen); // Llamar a manejarSeleccion con la URL generada
        };

        if (archivo) {
            reader.readAsDataURL(archivo); // Leer el archivo como URL de datos
        }
    };

    const confirmarSeleccion = () => {
        setImagenConfirmada(imagenSeleccionada);
        onSelect(imagenSeleccionada); // Enviar URL de la imagen seleccionada al componente padre
    };

    const cancelar = () => {
        setVisible(false);
    };

    return (
        visible && (
        <div className="overlay">
            <div className="selector">
                <h3>Selecciona una imagen:</h3>
                <div className="imagenes-container">
                    {imagenes.map((imagen, index) => (
                        <img
                            key={index}
                            src={imagen.url}
                            alt={imagen.nombre}
                            onClick={() => manejarSeleccion(imagen.url)}
                            className={`imagen ${imagenSeleccionada === imagen.url ? 'selected' : ''}`}
                        />
                    ))}
                </div>
                <div className='cargador'>
                    <h6>o cargá tu propia imagen</h6>
                    <CargadorDeArchivos onChange={manejarArchivoSeleccionado} /> 
                </div>
                <div className='button'>
                    <button className='cancelar' onClick={cancelar}>
                        Cancelar
                    </button>
                    <button onClick={confirmarSeleccion} disabled={!imagenSeleccionada}>
                        Confirmar
                    </button>
                </div>  
            </div>
            </div>
        )
    );
};

export default DesplegableConImagenes;
