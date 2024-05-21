import React, { useState } from 'react';
import Boton from '../nortecentro/boton';
import RankingPorPuntuacionSur from '../sur/rankingpuntuacionsur'; // Asegúrate de reemplazar esta ruta con la ruta correcta
import './estilosregiones.css'; 
import ReportesEmpresasSur from '../sur/reportesempresasur'; 


const Regionsur = () => {
    const [mostrarReportesEmpresasSur, setMostrarReportesEmpresasSur] = useState(true); // Inicialmente mostramos Reportes de empresa
    const [mostrarRankingPorPuntuacionSur, setMostrarRankingPorPuntuacionSur] = useState(false);

    const mostrarSoloReportesEmpresasSur = () => {
        setMostrarReportesEmpresasSur(true);
        setMostrarRankingPorPuntuacionSur(false);
    };

    const mostrarSoloRankingPorPuntuacionSur = () => {
        setMostrarReportesEmpresasSur(false);
        setMostrarRankingPorPuntuacionSur(true);
    };

    return (
        <div>
            <div className="table-container">
                <table className="excel-like-table">
                    <tbody>
                        <tr>
                            <td>
                                <h1 className="region-title">Región sur</h1>
                            </td>
                            <td style={{ backgroundColor: mostrarReportesEmpresasSur ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Reportes de Empresas */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloReportesEmpresasSur} color={mostrarReportesEmpresasSur ? '#1E9AAA' : 'white'} textColor={mostrarReportesEmpresasSur ? 'white' : 'black'}>
                                        Reportes de Empresas
                                    </Boton>
                                </div>
                            </td>
                            <td style={{ backgroundColor: mostrarRankingPorPuntuacionSur ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Ranking por Puntuación */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloRankingPorPuntuacionSur} color={mostrarRankingPorPuntuacionSur ? '#1E9AAA' : 'white'} textColor={mostrarRankingPorPuntuacionSur ? 'white' : 'black'}>
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
                {mostrarReportesEmpresasSur && (
                    <div>
                        <ReportesEmpresasSur />
                    </div>
                )}
                {mostrarRankingPorPuntuacionSur && (
                    <div>
                        <RankingPorPuntuacionSur />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Regionsur;
