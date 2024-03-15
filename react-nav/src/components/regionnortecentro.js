import React, { useState } from 'react';
import Boton from '../nortecentro/boton'; // Asegúrate de que la ruta del archivo sea correcta
import './regionnortecentro.css'; 

const ReportesEmpresas = () => (
  <div>
    Aquí encontrarás el Reportes de las empresas norte-centro.
  </div>
);

const RankingPorPuntuacion = () => (
  <div>
    Aquí encontrarás el Ranking por Puntuación norte-centro.
  </div>
);

const Regionnortecentro = () => {
    const [mostrarReportes, setMostrarReportes] = useState(true); // Inicialmente mostramos Reportes de empresa
    const [mostrarRanking, setMostrarRanking] = useState(false);

    const mostrarSoloReportes = () => {
        setMostrarReportes(true);
        setMostrarRanking(false);
    };

    const mostrarSoloRanking = () => {
        setMostrarReportes(false);
        setMostrarRanking(true);
    };

    return (
        <div className="table-container">
            <table className="excel-like-table">
                <tbody>
                    <tr>
                        <td style={{ backgroundColor: mostrarReportes ? '1E9AAA' : '', padding: '0' }}>
                            <h1 className="region-title">Región norte-centro</h1>
                        </td>
                        <td style={{ backgroundColor: mostrarReportes ? '1E9AAA' : '', padding: '0' }}>
                            {/* Botón para mostrar Reportes de Empresas */}
                            <div className="boton-container">
                                <Boton onClick={mostrarSoloReportes} color="1E9AAA">Reportes de Empresas</Boton>
                            </div>
                        </td>
                        <td style={{ backgroundColor: mostrarRanking ? '1E9AAA' : '', padding: '0' }}>
                            {/* Botón para mostrar Ranking por Puntuación */}
                            <div className="boton-container">
                                <Boton onClick={mostrarSoloRanking} color="1E9AAA">Ranking por Puntuación</Boton>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* Mostrar Reportes de Empresas si está activado */}
            {mostrarReportes && (
                <div>
                    <ReportesEmpresas />
                </div>
            )}
            {/* Mostrar Ranking por Puntuación si está activado */}
            {mostrarRanking && (
                <div>
                    <RankingPorPuntuacion />
                </div>
            )}
        </div>
    );
}

export default Regionnortecentro;
