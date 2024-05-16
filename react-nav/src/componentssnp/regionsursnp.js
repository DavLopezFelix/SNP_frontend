import React, { useState } from 'react';
import Boton from '../nortecentro/boton';
import '../componentsclient/estilosregiones.css'; 
import UbicacionCarpetasSur from '../sursesionsnp/ubicacioncarpetassur';
import DescargasSur from '../sursesionsnp/descargassur';
import LongitudPesoSur from '../sursesionsnp/longitudpesosur';

const RegionSurSNP = () => {
    const [mostrarLongitudPesoSur, setMostrarLongitudPesoSur] = useState(true); // Inicialmente mostramos Reportes de empresa
    const [mostrarUbicacionCarpetasSur, setMostrarUbicacionCarpetasSur] = useState(false);
    const [mostrarDescargasSur, setMostrarDescargasSur] = useState(false);


    const mostrarSoloLongitudPesoSur = () => {
        setMostrarLongitudPesoSur(true);
        setMostrarUbicacionCarpetasSur(false);
        setMostrarDescargasSur(false);
    };

    const mostrarSoloUbicacionCarpetasSur = () => {
        setMostrarLongitudPesoSur(false);
        setMostrarUbicacionCarpetasSur(true);
        setMostrarDescargasSur(false);
    };
    const mostrarSoloDescargasSur = () => {
        setMostrarLongitudPesoSur(false);
        setMostrarUbicacionCarpetasSur(false);
        setMostrarDescargasSur(true);
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
                            <td style={{ backgroundColor: mostrarLongitudPesoSur ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Reportes de Empresas */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloLongitudPesoSur} color={mostrarLongitudPesoSur ? '#1E9AAA' : 'white'} textColor={mostrarLongitudPesoSur ? 'white' : 'black'}>
                                        Relación Longitud - Peso
                                    </Boton>
                                </div>
                            </td>
                            <td style={{ backgroundColor: mostrarUbicacionCarpetasSur ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Ranking por Puntuación */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloUbicacionCarpetasSur} color={mostrarUbicacionCarpetasSur? '#1E9AAA' : 'white'} textColor={mostrarUbicacionCarpetasSur ? 'white' : 'black'}>
                                        Ubicación de carpetas
                                    </Boton>
                                </div>
                            </td>
                            <td style={{ backgroundColor: mostrarDescargasSur ? '#1E9AAA' : 'white' }}>
                                {/* Botón para mostrar Ranking por Puntuación */}
                                <div className="boton-container">
                                    <Boton onClick={mostrarSoloDescargasSur} color={mostrarDescargasSur? '#1E9AAA' : 'white'} textColor={mostrarDescargasSur ? 'white' : 'black'}>
                                        Descargas
                                    </Boton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Cuadro grande para los mensajes debajo de la tabla */}
            <div className="cuadro-grande">
                {mostrarLongitudPesoSur && (
                    <div>
                        <LongitudPesoSur />
                    </div>
                )}
                {mostrarUbicacionCarpetasSur && (
                    <div>
                        <UbicacionCarpetasSur />
                    </div>
                )}
                 {mostrarDescargasSur && (
                    <div>
                        <DescargasSur />
                    </div>
                )}
            </div>
        </div>
    );
}

export default RegionSurSNP;
