import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link para la navegación

const Regionnortecentro = () => {
    return (
        <div>
            <h1>Vista Región Norte-Centro</h1>
            {/* Agregar enlaces para la navegación interna */}
            <ul>
                <li>
                    <Link to="/regionnortecentro/reportesempresas">Reportes de Empresas</Link>
                </li>
                <li>
                    <Link to="/regionnortecentro/rankingporpuntuacion">Ranking por Puntuación</Link>
                </li>
            </ul>
        </div>
    );
}

export default Regionnortecentro;
