import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación

const Regionsur = () => {
    return (
        <div>
            <h1>Región sur</h1>
            {/* Agregar enlaces para la navegación interna */}
            <ul>
                <li>
                    <Link to="/Regionsur/reportesempresasur">Reportes de Empresas</Link>
                </li>
                <li>
                    <Link to="/Regionsur/rankingporpuntuacionsur">Ranking por Puntuación</Link>
                </li>
            </ul>
        </div>
    );
}

export default Regionsur;