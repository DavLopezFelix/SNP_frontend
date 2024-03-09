import React from 'react';
import { Link } from 'react-router-dom';

const Sesionsnp = () => {
    return (
        <div>
            <h1>Sesión de SNP</h1>
            {/* Enlace para regresar a la vista principal */}
            <Link to="/">Inicio</Link>
            {/* Aquí puedes agregar más contenido si es necesario */}
        </div>
    );
}

export default Sesionsnp;
