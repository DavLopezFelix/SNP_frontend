import React, { useState } from 'react';
import Boton from '../nortecentro/boton';
import RankingPorPuntuacion from '../nortecentro/rankingpuntuacion'; // Asegúrate de reemplazar esta ruta con la ruta correcta
import './estilosregiones.css'; 
import ReportesEmpresas from '../nortecentro/reportesempresas'; 


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
        <div>
            <div className="table-container">
                <table className="excel-like-table">
                    <tbody>
                        <tr>
                            <td>
                                <h1 className="region-title">Región norte-centro</h1>
                            </td>
                            <td style={{ backgroundColor: mostrarReportes ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Reportes de Empresas */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloReportes} color={mostrarReportes ? '#1E9AAA' : 'white'} textColor={mostrarReportes ? 'white' : 'black'}>
                                        Reportes de Empresas
                                    </Boton>
                                </div>
                            </td>
                            <td style={{ backgroundColor: mostrarRanking ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Ranking por Puntuación */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloRanking} color={mostrarRanking ? '#1E9AAA' : 'white'} textColor={mostrarRanking ? 'white' : 'black'}>
                                        Ranking por Puntuación
                                    </Boton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Cuadro grande para los mensajes debajo de la tabla */}
            <div className="cuadro-grande">
                {mostrarReportes && (
                    <div>
                        <ReportesEmpresas />
                    </div>
                )}
                {mostrarRanking && (
                    <div>
                        <RankingPorPuntuacion />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Regionnortecentro;
